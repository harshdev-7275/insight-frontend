import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

export const DashboardHeader = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center justify-between  border-border px-6 py-4 text-white">
      <div>
        <h1 className="text-xl font-bold text-gradient">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        {/* <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="text-sm font-medium text-primary">IN</span>
        </div> */}
      </div>
    </div>
  );
};
