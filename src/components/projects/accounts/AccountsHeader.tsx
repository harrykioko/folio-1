
import React from "react";
import { Plus, LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";

interface AccountsHeaderProps {
  view: "grid" | "list";
  setView: (view: "grid" | "list") => void;
  onAddAccount: () => void;
  title?: string;
}

const AccountsHeader: React.FC<AccountsHeaderProps> = ({
  view,
  setView,
  onAddAccount,
  title = "Linked Accounts"
}) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="flex items-center gap-3">
        <div className="flex border rounded-md">
          <Toggle
            pressed={view === "grid"}
            onPressedChange={() => setView("grid")}
            className="px-3 data-[state=on]:bg-muted"
            aria-label="Grid view"
          >
            <LayoutGrid className="h-4 w-4" />
          </Toggle>
          <Toggle
            pressed={view === "list"}
            onPressedChange={() => setView("list")}
            className="px-3 data-[state=on]:bg-muted"
            aria-label="List view"
          >
            <List className="h-4 w-4" />
          </Toggle>
        </div>
        <Button onClick={onAddAccount}>
          <Plus className="mr-2 h-4 w-4" />
          Add Account
        </Button>
      </div>
    </div>
  );
};

export default AccountsHeader;
