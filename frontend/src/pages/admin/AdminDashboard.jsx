import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import { useUser } from "@/context/UserContext";
<<<<<<< HEAD
import { LayoutDashboard, Users, Calendar, Settings, Stethoscope, CheckCircle2, Clock, XCircle, Pill, FlaskConical, AlertTriangle } from "lucide-react";
=======
import { LayoutDashboard, Users, Calendar, Settings, Stethoscope, CheckCircle2, Clock, XCircle, Pill, FlaskConical } from "lucide-react";
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Doctors", href: "/admin/doctors", icon: Stethoscope },
  { name: "Patients", href: "/admin/patients", icon: Users },
  { name: "Pharmacy", href: "/admin/pharmacy", icon: Pill },
  { name: "Labs", href: "/admin/labs", icon: FlaskConical },
  { name: "Appointments", href: "/admin/appointments", icon: Calendar },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

const AdminDashboard = () => {
  const { getUser } = useUser();
  const adminProfile = getUser("admin");

  const appointmentStats = [
    { label: "Completed", value: 1248, icon: CheckCircle2, color: "text-success" },
    { label: "Pending", value: 56, icon: Clock, color: "text-warning" },
    { label: "Cancelled", value: 23, icon: XCircle, color: "text-destructive" },
  ];

  return (
    <DashboardLayout navItems={navItems} userType="admin">
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">{adminProfile?.name} 🛡️</h1>
          <p className="text-muted-foreground mt-1">Platform overview and management</p>
        </div>

        {/* Main Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <StatCard title="Total Users" value="12,458" icon={Users} iconColor="text-primary" iconBg="bg-primary/10" />
          <StatCard title="Active Doctors" value="186" icon={Stethoscope} iconColor="text-success" iconBg="bg-success/10" />
          <StatCard title="Total Appointments" value="3,842" icon={Calendar} iconColor="text-accent" iconBg="bg-accent/10" />
        </div>

        {/* Appointment Stats */}
<<<<<<< HEAD
        <div className="grid lg:grid-cols-3 gap-6">
=======
        <div className="grid lg:grid-cols-2 gap-6">
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
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
<<<<<<< HEAD

          {/* Lab Equipment Issues */}
          <div className="space-y-4">
            <h2 className="font-display text-xl font-semibold text-foreground">Lab Equipment Issues</h2>
            <div className="dashboard-card p-5 space-y-4">
              <div className="flex items-start justify-between p-3 rounded-xl bg-destructive/5 border border-destructive/10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-foreground">Centrifuge A</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-destructive/10 text-destructive font-medium">Critical</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Motor failure - BioTest Diagnostics</p>
                </div>
                <AlertTriangle className="w-5 h-5 text-destructive mt-1" />
              </div>
              <div className="flex items-start justify-between p-3 rounded-xl bg-warning/5 border border-warning/10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-foreground">Chemistry Analyzer</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-warning/10 text-warning-foreground font-medium">Warning</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Calibration overdue - QuickLab</p>
                </div>
                <AlertTriangle className="w-5 h-5 text-warning mt-1" />
              </div>
              <div className="flex items-start justify-between p-3 rounded-xl bg-secondary/30">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-foreground">Microscope B</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground font-medium">Reported</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Focus knob loose - QuickLab</p>
                </div>
                <FlaskConical className="w-5 h-5 text-muted-foreground mt-1" />
              </div>
            </div>
          </div>
=======
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
