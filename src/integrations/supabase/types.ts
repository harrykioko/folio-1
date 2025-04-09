export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      account_domains: {
        Row: {
          account_id: string
          hosted_on: string | null
          renewal_cost: number | null
        }
        Insert: {
          account_id: string
          hosted_on?: string | null
          renewal_cost?: number | null
        }
        Update: {
          account_id?: string
          hosted_on?: string | null
          renewal_cost?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "account_domains_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: true
            referencedRelation: "account_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "account_domains_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: true
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      account_services: {
        Row: {
          account_id: string
          monthly_cost: number | null
        }
        Insert: {
          account_id: string
          monthly_cost?: number | null
        }
        Update: {
          account_id?: string
          monthly_cost?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "account_services_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: true
            referencedRelation: "account_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "account_services_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: true
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      account_social_media: {
        Row: {
          account_id: string
          followers: number | null
          impressions: number | null
          platform: Database["public"]["Enums"]["social_platform"]
        }
        Insert: {
          account_id: string
          followers?: number | null
          impressions?: number | null
          platform: Database["public"]["Enums"]["social_platform"]
        }
        Update: {
          account_id?: string
          followers?: number | null
          impressions?: number | null
          platform?: Database["public"]["Enums"]["social_platform"]
        }
        Relationships: [
          {
            foreignKeyName: "account_social_media_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: true
            referencedRelation: "account_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "account_social_media_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: true
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      accounts: {
        Row: {
          created_at: string | null
          id: string
          name: string
          owner_id: string | null
          password: string | null
          project_id: number | null
          renewal_date: string | null
          type: Database["public"]["Enums"]["account_type"]
          updated_at: string | null
          url: string | null
          username: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          owner_id?: string | null
          password?: string | null
          project_id?: number | null
          renewal_date?: string | null
          type: Database["public"]["Enums"]["account_type"]
          updated_at?: string | null
          url?: string | null
          username?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          owner_id?: string | null
          password?: string | null
          project_id?: number | null
          renewal_date?: string | null
          type?: Database["public"]["Enums"]["account_type"]
          updated_at?: string | null
          url?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "accounts_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "accounts_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      invitations: {
        Row: {
          accepted: boolean | null
          accepted_at: string | null
          created_at: string
          email: string
          id: string
          invited_by: string
          role: string | null
        }
        Insert: {
          accepted?: boolean | null
          accepted_at?: string | null
          created_at?: string
          email: string
          id?: string
          invited_by: string
          role?: string | null
        }
        Update: {
          accepted?: boolean | null
          accepted_at?: string | null
          created_at?: string
          email?: string
          id?: string
          invited_by?: string
          role?: string | null
        }
        Relationships: []
      }
      milestones: {
        Row: {
          due_date: string | null
          id: number
          project_id: number | null
          sort_order: number | null
          start_date: string | null
          status: string | null
          title: string | null
        }
        Insert: {
          due_date?: string | null
          id?: number
          project_id?: number | null
          sort_order?: number | null
          start_date?: string | null
          status?: string | null
          title?: string | null
        }
        Update: {
          due_date?: string | null
          id?: number
          project_id?: number | null
          sort_order?: number | null
          start_date?: string | null
          status?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "milestones_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_members: {
        Row: {
          created_at: string | null
          id: number
          project_id: number | null
          role: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          project_id?: number | null
          role?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          project_id?: number | null
          role?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_members_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: number
          name: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: number
          name: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: number
          name?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      prompts: {
        Row: {
          content: string
          created_at: string | null
          created_by: string | null
          description: string | null
          id: number
          name: string | null
          project_id: number | null
          tags: string[] | null
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: number
          name?: string | null
          project_id?: number | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: number
          name?: string | null
          project_id?: number | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prompts_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      related_tasks: {
        Row: {
          created_at: string | null
          id: string
          related_task_id: number | null
          task_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          related_task_id?: number | null
          task_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          related_task_id?: number | null
          task_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "related_tasks_related_task_id_fkey"
            columns: ["related_task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "related_tasks_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      subtasks: {
        Row: {
          created_at: string
          due_date: string | null
          id: string
          is_complete: boolean
          task_id: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          due_date?: string | null
          id?: string
          is_complete?: boolean
          task_id?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          due_date?: string | null
          id?: string
          is_complete?: boolean
          task_id?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subtasks_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      task_activity: {
        Row: {
          created_at: string
          created_by: string
          id: string
          message: string
          task_id: number | null
          type: string
        }
        Insert: {
          created_at?: string
          created_by: string
          id?: string
          message: string
          task_id?: number | null
          type: string
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          message?: string
          task_id?: number | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_activity_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          assigned_to: string | null
          created_at: string | null
          created_by: string | null
          deadline: string | null
          description: string | null
          id: number
          priority: string | null
          project_id: number | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string | null
          created_by?: string | null
          deadline?: string | null
          description?: string | null
          id?: number
          priority?: string | null
          project_id?: number | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          created_at?: string | null
          created_by?: string | null
          deadline?: string | null
          description?: string | null
          id?: number
          priority?: string | null
          project_id?: number | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          role: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      account_details: {
        Row: {
          created_at: string | null
          followers: number | null
          hosted_on: string | null
          id: string | null
          impressions: number | null
          monthly_cost: number | null
          name: string | null
          owner_id: string | null
          password: string | null
          project_id: number | null
          renewal_cost: number | null
          renewal_date: string | null
          social_platform: Database["public"]["Enums"]["social_platform"] | null
          type: Database["public"]["Enums"]["account_type"] | null
          updated_at: string | null
          url: string | null
          username: string | null
        }
        Relationships: [
          {
            foreignKeyName: "accounts_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "accounts_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      check_task_relation_exists: {
        Args: { task_id_param: number; related_task_id_param: number }
        Returns: boolean
      }
      get_related_task_ids: {
        Args: { current_task_id: number }
        Returns: number[]
      }
      link_related_task: {
        Args: { task_id_param: number; related_task_id_param: number }
        Returns: undefined
      }
      unlink_related_task: {
        Args: { task_id_param: number; related_task_id_param: number }
        Returns: undefined
      }
    }
    Enums: {
      account_type:
        | "Domain"
        | "SocialMedia"
        | "Email"
        | "Repository"
        | "Service"
      social_platform:
        | "Instagram"
        | "Facebook"
        | "LinkedIn"
        | "Twitter"
        | "TikTok"
        | "Pinterest"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      account_type: ["Domain", "SocialMedia", "Email", "Repository", "Service"],
      social_platform: [
        "Instagram",
        "Facebook",
        "LinkedIn",
        "Twitter",
        "TikTok",
        "Pinterest",
      ],
    },
  },
} as const
