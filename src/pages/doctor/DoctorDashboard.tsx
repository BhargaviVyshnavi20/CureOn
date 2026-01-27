import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import AppointmentCard from "@/components/dashboard/AppointmentCard";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Clock,
  Settings,
  UserCheck,
  Video,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const navItems = [
  { name: "Dashboard", href: "/doctor/dashboard", icon: LayoutDashboard },
  { name: "Appointments", href: "/doctor/appointments", icon: Calendar },
  { name: "Patients", href: "/doctor/patients", icon: Users },
  { name: "Manage Availability", href: "/doctor/availability", icon: Clock },
  { name: "Settings", href: "/doctor/settings", icon: Settings },
];

const DoctorDashboard = () => {
  const navigate = useNavigate();

  const todayAppointments = [
    {
      patientName: "Emily Rodriguez",
      date: "Today",
      time: "10:00 AM",
      type: "video" as const,
      status: "upcoming" as const,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
    {
      patientName: "James Wilson",
      date: "Today",
      time: "11:30 AM",
      type: "in-person" as const,
      status: "upcoming" as const,
    },
    {
      patientName: "Sarah Chen",
      date: "Today",
      time: "2:00 PM",
      type: "video" as const,
      status: "upcoming" as const,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
  ];

  const weeklySchedule = [
    { day: "Mon", slots: 8, booked: 6 },
    { day: "Tue", slots: 8, booked: 8 },
    { day: "Wed", slots: 6, booked: 4 },
    { day: "Thu", slots: 8, booked: 7 },
    { day: "Fri", slots: 6, booked: 3 },
  ];

  return (
    <DashboardLayout
      navItems={navItems}
      userType="doctor"
      userName="Dr. Sarah Johnson"
      userAvatar="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    >
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
            Good morning, Dr. Johnson! 🩺
          </h1>
          <p className="text-muted-foreground mt-1">
            You have 5 appointments scheduled for today
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <StatCard
            title="Today's Appointments"
            value={5}
            icon={Calendar}
            iconColor="text-primary"
            iconBg="bg-primary/10"
          />
          <StatCard
            title="Total Patients"
            value={248}
            change="+12 this week"
            changeType="positive"
            icon={UserCheck}
            iconColor="text-success"
            iconBg="bg-success/10"
          />
          <StatCard
            title="Monthly Consultations"
            value={32}
            change="This month"
            changeType="neutral"
            icon={Video}
            iconColor="text-accent"
            iconBg="bg-accent/10"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Today's Schedule */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-foreground">
                Today's Schedule
              </h2>
              <Button variant="ghost" size="sm" onClick={() => navigate("/doctor/appointments")}>
                View Full Schedule
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-4">
              {todayAppointments.map((appointment, index) => (
                <AppointmentCard
                  key={index}
                  {...appointment}
                  userType="doctor"
                />
              ))}
            </div>
          </div>

          {/* Weekly Overview */}
          <div className="space-y-4">
            <h2 className="font-display text-xl font-semibold text-foreground">
              Weekly Overview
            </h2>
            <div className="dashboard-card p-5">
              <div className="space-y-4">
                {weeklySchedule.map((day) => (
                  <div key={day.day} className="flex items-center gap-4">
                    <span className="w-10 text-sm font-medium text-muted-foreground">
                      {day.day}
                    </span>
                    <div className="flex-1 h-3 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${(day.booked / day.slots) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {day.booked}/{day.slots}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Weekly capacity</span>
                  <span className="font-medium text-foreground">75%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DoctorDashboard;
