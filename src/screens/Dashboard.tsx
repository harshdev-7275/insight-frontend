import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

import {
  LayoutDashboard,
  HelpCircle,
  Search,
  LineChart,
  Bell,
  Settings,
  Upload
} from 'lucide-react';
import Home from '@/components/Home';
import UplaodData from '@/components/UploadData';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { UploadDataSection } from '@/components/UploadDataSection';
import ChatBot from '@/components/ChatBot';


interface DashboardProps {
  user: {
    id: string;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
  } | null;
}

const sidebarOptions = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Ask Questions', icon: HelpCircle },
  { label: 'Deep Insights', icon: Search },
  { label: 'Forecasting', icon: LineChart },
  { label: 'Alerts', icon: Bell },
  { label: 'Settings', icon: Settings },
  { label: 'Upload Data', icon: Upload },
];

const Dashboard = ({ user }: DashboardProps) => {
  const [activePath, setActivePath] = useState<"upload" | "ask">("upload");

  const handleNavigate = (path: "upload" | "ask") => {
    setActivePath(path);
  };


  return (
     <div className="flex h-screen bg-[#020817]">
     <DashboardSidebar onNavigate={handleNavigate} activePath={activePath} />
     <div className="flex-1 flex flex-col overflow-hidden">
       <DashboardHeader title={activePath === "upload" ? "Upload Data" : "Ask Questions"} />
       <div className="flex-1 overflow-auto">
         {activePath === "upload" ? (user?.id ? <UploadDataSection user_id={user.id} email={user.email} /> : <div>Please log in to upload data</div>) : <ChatBot user_id={user?.id} email={user?.email}/>}
       </div>
     </div>
   </div>
  );
};

export default Dashboard;