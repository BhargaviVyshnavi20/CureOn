import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { LayoutDashboard, Stethoscope, Calendar, Settings, User, Bell, Shield, Users, Pill, FlaskConical } from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Doctors", href: "/admin/doctors", icon: Stethoscope },
  { name: "Patients", href: "/admin/patients", icon: Users },
  { name: "Pharmacy", href: "/admin/pharmacy", icon: Pill },
  { name: "Labs", href: "/admin/labs", icon: FlaskConical },
  { name: "Appointments", href: "/admin/appointments", icon: Calendar },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

const AdminSettings = () => (
  <DashboardLayout navItems={navItems} userType="admin">
    <div className="space-y-6 max-w-4xl">
      <div><h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">Settings</h1><p className="text-muted-foreground mt-1">Manage admin preferences</p></div>
      <div className="dashboard-card p-6">
        <div className="flex items-center gap-3 mb-6"><Bell className="w-5 h-5 text-primary" /><h2 className="font-display text-lg font-semibold text-foreground">Notifications</h2></div>
        <div className="space-y-4">
          <div className="flex items-center justify-between"><div><p className="font-medium text-foreground">Email Alerts</p><p className="text-sm text-muted-foreground">System notifications</p></div><Switch defaultChecked /></div>
          <div className="flex items-center justify-between"><div><p className="font-medium text-foreground">New User Alerts</p><p className="text-sm text-muted-foreground">When new users register</p></div><Switch defaultChecked /></div>
        </div>
      </div>
      <div className="dashboard-card p-6">
        <div className="flex items-center gap-3 mb-6"><Shield className="w-5 h-5 text-primary" /><h2 className="font-display text-lg font-semibold text-foreground">Security</h2></div>
        <div className="space-y-4">
          <div className="space-y-2"><Label>Current Password</Label><Input type="password" /></div>
          <div className="space-y-2"><Label>New Password</Label><Input type="password" /></div>
          <Button variant="outline">Update Password</Button>
        </div>
      </div>
    </div>
  </DashboardLayout>
);

export default AdminSettings;
