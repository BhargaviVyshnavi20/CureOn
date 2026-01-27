import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import AppointmentCard from "@/components/dashboard/AppointmentCard";
import LanguageSelector from "@/components/dashboard/LanguageSelector";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Pill,
  Settings,
  CheckCircle2,
  ArrowRight,
  HeartPulse,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const navItems = [
  { name: "Dashboard", href: "/patient/dashboard", icon: LayoutDashboard },
  { name: "Appointments", href: "/patient/appointments", icon: Calendar },
  { name: "Medical Records", href: "/patient/records", icon: FileText },
  { name: "Prescriptions", href: "/patient/prescriptions", icon: Pill },
  { name: "Health Assistant", href: "/patient/chatbot", icon: HeartPulse },
  { name: "Settings", href: "/patient/settings", icon: Settings },
];

const PatientDashboard = () => {
  const navigate = useNavigate();
  
  const upcomingAppointments = [
    {
      doctorName: "Sarah Johnson",
      specialty: "General Physician",
      date: "Jan 25, 2026",
      time: "10:00 AM",
      type: "video" as const,
      status: "upcoming" as const,
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
    {
      doctorName: "Michael Chen",
      specialty: "Cardiologist",
      date: "Jan 28, 2026",
      time: "2:30 PM",
      type: "in-person" as const,
      status: "upcoming" as const,
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
  ];

  const recentRecords = [
    { name: "Blood Test Results", date: "Jan 15, 2026", type: "Lab Report" },
    { name: "General Checkup", date: "Jan 10, 2026", type: "Consultation" },
    { name: "Prescription - Antibiotics", date: "Jan 10, 2026", type: "Prescription" },
  ];

  return (
    <DashboardLayout
      navItems={navItems}
      userType="patient"
      userName="Alex Thompson"
    >
      <div className="space-y-8">
        {/* Welcome Section with Language Selector */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
              Welcome back, Alex! 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's an overview of your health journey
            </p>
          </div>
          <LanguageSelector />
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <StatCard
            title="Upcoming Appointments"
            value={2}
            icon={Calendar}
            iconColor="text-primary"
            iconBg="bg-primary/10"
          />
          <StatCard
            title="Completed Visits"
            value={12}
            change="+3 this month"
            changeType="positive"
            icon={CheckCircle2}
            iconColor="text-success"
            iconBg="bg-success/10"
          />
          <StatCard
            title="Active Prescriptions"
            value={3}
            icon={Pill}
            iconColor="text-accent"
            iconBg="bg-accent/10"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Upcoming Appointments */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-foreground">
                Upcoming Appointments
              </h2>
              <Button variant="ghost" size="sm" onClick={() => navigate("/patient/appointments")}>
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment, index) => (
                <AppointmentCard
                  key={index}
                  {...appointment}
                  userType="patient"
                />
              ))}
            </div>
          </div>

          {/* Recent Records */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-foreground">
                Recent Records
              </h2>
              <Button variant="ghost" size="sm" onClick={() => navigate("/patient/records")}>
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="dashboard-card divide-y divide-border">
              {recentRecords.map((record, index) => (
                <div key={index} className="p-4 hover:bg-secondary/50 transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-foreground truncate">{record.name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{record.type}</span>
                        <span>•</span>
                        <span>{record.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientDashboard;
