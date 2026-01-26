import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AppointmentCard from "@/components/dashboard/AppointmentCard";
import BookingModal from "@/components/patient/BookingModal";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Pill,
  Settings,
  CalendarPlus,
  HeartPulse,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/patient/dashboard", icon: LayoutDashboard },
  { name: "Appointments", href: "/patient/appointments", icon: Calendar },
  { name: "Medical Records", href: "/patient/records", icon: FileText },
  { name: "Prescriptions", href: "/patient/prescriptions", icon: Pill },
  { name: "Health Assistant", href: "/patient/chatbot", icon: HeartPulse },
  { name: "Settings", href: "/patient/settings", icon: Settings },
];

const PatientAppointments = () => {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

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
    {
      doctorName: "Emily Williams",
      specialty: "Dermatologist",
      date: "Feb 5, 2026",
      time: "11:00 AM",
      type: "video" as const,
      status: "upcoming" as const,
    },
  ];

  const completedAppointments = [
    {
      doctorName: "Sarah Johnson",
      specialty: "General Physician",
      date: "Jan 10, 2026",
      time: "10:00 AM",
      type: "video" as const,
      status: "completed" as const,
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
    {
      doctorName: "James Wilson",
      specialty: "Orthopedic",
      date: "Dec 28, 2025",
      time: "3:00 PM",
      type: "in-person" as const,
      status: "completed" as const,
    },
    {
      doctorName: "Lisa Anderson",
      specialty: "ENT Specialist",
      date: "Dec 15, 2025",
      time: "9:30 AM",
      type: "in-person" as const,
      status: "completed" as const,
    },
  ];

  const cancelledAppointments = [
    {
      doctorName: "Robert Brown",
      specialty: "Neurologist",
      date: "Jan 5, 2026",
      time: "2:00 PM",
      type: "video" as const,
      status: "cancelled" as const,
    },
  ];

  return (
    <DashboardLayout
      navItems={navItems}
      userType="patient"
      userName="Alex Thompson"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
              My Appointments
            </h1>
            <p className="text-muted-foreground mt-1">
              View and manage your appointments
            </p>
          </div>
          <Button variant="hero" onClick={() => setBookingModalOpen(true)}>
            <CalendarPlus className="w-5 h-5" />
            Book New Appointment
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="upcoming">
              Upcoming ({upcomingAppointments.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedAppointments.length})
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              Cancelled ({cancelledAppointments.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6">
            <div className="space-y-4">
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map((appointment, index) => (
                  <AppointmentCard
                    key={index}
                    {...appointment}
                    userType="patient"
                  />
                ))
              ) : (
                <div className="dashboard-card p-8 text-center">
                  <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">No upcoming appointments</h3>
                  <p className="text-muted-foreground mb-4">Book an appointment to get started</p>
                  <Button variant="hero" onClick={() => setBookingModalOpen(true)}>
                    <CalendarPlus className="w-5 h-5" />
                    Book Appointment
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <div className="space-y-4">
              {completedAppointments.map((appointment, index) => (
                <AppointmentCard
                  key={index}
                  {...appointment}
                  userType="patient"
                  showActions={false}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cancelled" className="mt-6">
            <div className="space-y-4">
              {cancelledAppointments.length > 0 ? (
                cancelledAppointments.map((appointment, index) => (
                  <AppointmentCard
                    key={index}
                    {...appointment}
                    userType="patient"
                    showActions={false}
                  />
                ))
              ) : (
                <div className="dashboard-card p-8 text-center">
                  <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold text-foreground">No cancelled appointments</h3>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Booking Modal */}
      <BookingModal open={bookingModalOpen} onOpenChange={setBookingModalOpen} />
    </DashboardLayout>
  );
};

export default PatientAppointments;
