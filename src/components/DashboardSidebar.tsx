import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Menu, 
  Database, 
  FileText, 
  Search 
} from "lucide-react";

type SidebarItemProps = {
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  onClick: () => void;
};

const SidebarItem = ({ icon: Icon, label, isActive, onClick }: SidebarItemProps) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-3 px-3 py-6 text-base transition-all duration-300",
        isActive 
          ? "bg-[#222355] text-white " 
          : "text-white hover:bg-[#222355] hover:text-foreground"
      )}
      onClick={onClick}
    >
      <Icon className={cn("h-5 w-5", isActive ? "text-white" : "text-muted-foreground")}  />
      <span className="font-medium">{label}</span>
    </Button>
  );
};

interface DashboardSidebarProps {
  onNavigate: (path: "upload" | "ask") => void;
  activePath: "upload" | "ask";
}

export const DashboardSidebar = ({ onNavigate, activePath }: DashboardSidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "h-screen p-4 flex flex-col transition-all duration-300 border-r border-border bg-[#11162a]",
        collapsed ? "w-[80px]" : "w-[260px]"
      )}
    >
      <div className="flex items-center justify-between mb-8">
        {!collapsed && (
          <div className="flex items-center">
            <span className="text-white text-xl font-bold">Insight AI</span>
          </div>
        )}
        <Button 

          onClick={() => setCollapsed(!collapsed)}
          className="text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <Menu className="h-5 w-5" color="white" />
        </Button>
      </div>

      <div className="space-y-1 flex-1">
        <SidebarItem
        
          icon={Database}
          label={collapsed ? "" : "Upload Data"}
          isActive={activePath === "upload"}
          onClick={() => onNavigate("upload")}
        />
        <SidebarItem
          icon={Search}
          label={collapsed ? "" : "Ask Question"}
          isActive={activePath === "ask"}
          onClick={() => onNavigate("ask")}
        />
      </div>

      {!collapsed && (
        <div className="mt-auto pt-4 border-t border-border">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
              <FileText className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Insight AI</p>
              <p className="text-xs text-muted-foreground">Data Intelligence</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};