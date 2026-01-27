import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import { LayoutDashboard, Users, Calendar, Settings, Stethoscope, CheckCircle2, Clock, XCircle } from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Doctors", href: "/admin/doctors", icon: Stethoscope },
  { name: "Appointments", href: "/admin/appointments", icon: Calendar },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

const AdminDashboard = () => {
  const appointmentStats = [
    { label: "Completed", value: 1248, icon: CheckCircle2, color: "text-success" },
    { label: "Pending", value: 56, icon: Clock, color: "text-warning" },
    { label: "Cancelled", value: 23, icon: XCircle, color: "text-destructive" },
  ];

  return (
    <DashboardLayout navItems={navItems} userType="admin" userName="Admin User">
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">Admin 🛡️</h1>
          <p className="text-muted-foreground mt-1">Platform overview and management</p>
        </div>

        {/* Main Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <StatCard title="Total Users" value="12,458" change="+342 this month" changeType="positive" icon={Users} iconColor="text-primary" iconBg="bg-primary/10" />
          <StatCard title="Active Doctors" value="186" change="+8 this week" changeType="positive" icon={Stethoscope} iconColor="text-success" iconBg="bg-success/10" />
          <StatCard title="Total Appointments" value="3,842" change="This month" changeType="neutral" icon={Calendar} iconColor="text-accent" iconBg="bg-accent/10" />
        </div>

        {/* Appointment Stats */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="font-display text-xl font-semibold text-foreground">Appointment Overview</h2>
            <div className="dashboard-card p-5 space-y-4">
              {appointmentStats.map((stat) => (
                <div key={stat.label} className="flex items-center justify-between p-3 rounded-xl bg-secondary/30">
                  <div className="flex items-center gap-3">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    <span className="text-foreground">{stat.label}</span>
                  </div>
                  <span className="font-semibold text-foreground">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Summary */}
          <div className="space-y-4">
            <h2 className="font-display text-xl font-semibold text-foreground">Quick Summary</h2>
            <div className="dashboard-card p-5 space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-primary/5 border border-primary/10">
                <span className="text-foreground">New patients today</span>
                <span className="font-semibold text-primary">24</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-success/5 border border-success/10">
                <span className="text-foreground">Active consultations</span>
                <span className="font-semibold text-success">8</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-warning/5 border border-warning/10">
                <span className="text-foreground">Pending verifications</span>
                <span className="font-semibold text-warning">3</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-accent/5 border border-accent/10">
                <span className="text-foreground">System health</span>
                <span className="font-semibold text-accent">Good</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
