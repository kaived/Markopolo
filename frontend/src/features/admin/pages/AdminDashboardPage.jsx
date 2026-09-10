import DashboardLayout from "../../dashboard/components/DashboardLayout";
import StatsCard from "../../dashboard/components/StatsCard";
import { Users, Activity, ShieldCheck, Database, ArrowUpRight } from "lucide-react";

export default function AdminDashboardPage() {
  const stats = [
    { title: "Total Users", value: "24,582", change: "+14%", icon: <Users size={20} />, color: "bg-indigo-500" },
    { title: "System Uptime", value: "99.9%", change: "+0.01%", icon: <Activity size={20} />, color: "bg-emerald-500" },
    { title: "Security Alerts", value: "0", change: "-100%", icon: <ShieldCheck size={20} />, color: "bg-red-500" },
    { title: "Database Load", value: "12%", change: "-2%", icon: <Database size={20} />, color: "bg-amber-500" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-[#29353d]">Admin Control Center ⚡</h1>
          <p className="text-sm text-gray-500 mt-1">System-wide overview and management.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <StatsCard key={i} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-3xl bg-white p-8 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-[#29353d] mb-6">Server Instances</h3>
            <div className="space-y-4">
              {['US-EAST-1', 'EU-WEST-1', 'AP-SOUTHEAST-1'].map((region) => (
                <div key={region} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm font-bold text-[#29353d]">{region}</span>
                  </div>
                  <span className="text-xs font-medium text-gray-400">Stable</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-[#29353d] p-8 text-white">
            <h3 className="text-lg font-bold mb-4">Quick Admin Tasks</h3>
            <div className="grid grid-cols-2 gap-4">
              {['User Logs', 'DB Backup', 'Clear Cache', 'API Status'].map((task) => (
                <button key={task} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10 text-left">
                  <span className="text-sm font-medium">{task}</span>
                  <ArrowUpRight size={16} className="text-white/40" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
