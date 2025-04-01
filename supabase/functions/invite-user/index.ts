
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the service role key (for admin operations)
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Get the authenticated user's JWT from the Authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing Authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verify the authenticated user and check if they are an admin
    const token = authHeader.replace("Bearer ", "");
    const {
      data: { user: authenticatedUser },
      error: authError,
    } = await supabaseAdmin.auth.getUser(token);

    if (authError || !authenticatedUser) {
      return new Response(
        JSON.stringify({ error: "Unauthorized request" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if the user is an admin
    const { data: adminData, error: adminError } = await supabaseAdmin
      .from("users")
      .select("role")
      .eq("id", authenticatedUser.id)
      .single();

    if (adminError || !adminData || adminData.role !== "admin") {
      return new Response(
        JSON.stringify({ error: "Only admins can invite users" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse the request body
    const { email, role } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create an invitation record
    const { data: invitation, error: invitationError } = await supabaseAdmin
      .from("invitations")
      .insert({
        email,
        invited_by: authenticatedUser.id,
        role: role || "user",
      })
      .select()
      .single();

    if (invitationError) {
      console.error("Error creating invitation:", invitationError);
      return new Response(
        JSON.stringify({ error: "Failed to create invitation", details: invitationError.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create the user in Supabase Auth
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.createUser({
      email,
      email_confirm: true, // Auto-confirm the email
      password: generateRandomPassword(), // Generate a random password
      user_metadata: { 
        invited_by: authenticatedUser.id,
        invitation_id: invitation.id,
        role: role || "user"
      }
    });

    if (userError) {
      console.error("Error creating user:", userError);
      // Clean up the invitation if user creation fails
      await supabaseAdmin.from("invitations").delete().eq("id", invitation.id);
      
      return new Response(
        JSON.stringify({ error: "Failed to create user", details: userError.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send a password reset link to allow the user to set their password
    const { error: resetError } = await supabaseAdmin.auth.admin.generateLink({
      type: "recovery",
      email
    });

    if (resetError) {
      console.error("Error generating password reset link:", resetError);
      // We don't fail the request here since the user was created successfully
    }

    // Update the invitation as accepted
    await supabaseAdmin
      .from("invitations")
      .update({
        accepted: true,
        accepted_at: new Date().toISOString()
      })
      .eq("id", invitation.id);

    return new Response(
      JSON.stringify({ success: true, user: userData.user }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred", details: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

// Helper function to generate a random password
function generateRandomPassword() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  let password = "";
  for (let i = 0; i < 16; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}
