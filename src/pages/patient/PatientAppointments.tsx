import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AppointmentCard from "@/components/dashboard/AppointmentCard";
import BookingModal from "@/components/patient/BookingModal";
import RescheduleModal from "@/components/patient/RescheduleModal";
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
import { format } from "date-fns";

const navItems = [
  { name: "Dashboard", href: "/patient/dashboard", icon: LayoutDashboard },
  { name: "Appointments", href: "/patient/appointments", icon: Calendar },
  { name: "Medical Records", href: "/patient/records", icon: FileText },
  { name: "Prescriptions", href: "/patient/prescriptions", icon: Pill },
  { name: "Health Assistant", href: "/patient/chatbot", icon: HeartPulse },
  { name: "Settings", href: "/patient/settings", icon: Settings },
];

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  type: "video" | "in-person";
  status: "upcoming" | "completed" | "cancelled";
  avatar?: string;
}

const PatientAppointments = () => {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      doctorName: "Sarah Johnson",
      specialty: "General Physician",
      date: "Jan 25, 2026",
      time: "10:00 AM",
      type: "video" as const,
      status: "upcoming" as const,
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: "2",
      doctorName: "Michael Chen",
      specialty: "Cardiologist",
      date: "Jan 28, 2026",
      time: "2:30 PM",
      type: "in-person" as const,
      status: "upcoming" as const,
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: "3",
      doctorName: "Emily Williams",
      specialty: "Dermatologist",
      date: "Feb 5, 2026",
      time: "11:00 AM",
      type: "video" as const,
      status: "upcoming" as const,
    },
  ]);

  const completedAppointments: Appointment[] = [
    {
      id: "4",
      doctorName: "Sarah Johnson",
      specialty: "General Physician",
      date: "Jan 10, 2026",
      time: "10:00 AM",
      type: "video" as const,
      status: "completed" as const,
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: "5",
      doctorName: "James Wilson",
      specialty: "Orthopedic",
      date: "Dec 28, 2025",
      time: "3:00 PM",
      type: "in-person" as const,
      status: "completed" as const,
    },
  ];

  const cancelledAppointments: Appointment[] = [
    {
      id: "6",
      doctorName: "Robert Brown",
      specialty: "Neurologist",
      date: "Jan 5, 2026",
      time: "2:00 PM",
      type: "video" as const,
      status: "cancelled" as const,
    },
  ];

  const upcomingAppointments = appointments.filter(a => a.status === "upcoming");

  const handleBookingConfirmed = (booking: { specialization: string; date: Date; time: string }) => {
    const specNames: Record<string, string> = {
      general: "General Physician",
      cardio: "Cardiologist",
      neuro: "Neurologist",
      ortho: "Orthopedic",
      eye: "Ophthalmologist",
      pedia: "Pediatrician",
      derma: "Dermatologist",
    };

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      doctorName: "Available Doctor",
      specialty: specNames[booking.specialization] || booking.specialization,
      date: format(booking.date, "MMM d, yyyy"),
      time: booking.time,
      type: "video",
      status: "upcoming",
    };

    setAppointments([...appointments, newAppointment]);
  };

  const handleReschedule = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setRescheduleModalOpen(true);
  };

  const handleRescheduleConfirm = (newDate: Date, newTime: string) => {
    if (selectedAppointment) {
      setAppointments(appointments.map(apt => 
        apt.id === selectedAppointment.id 
          ? { ...apt, date: format(newDate, "MMM d, yyyy"), time: newTime }
          : apt
      ));
    }
    setSelectedAppointment(null);
  };

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
                upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="dashboard-card p-5 hover-lift">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        {appointment.avatar ? (
                          <img src={appointment.avatar} alt={appointment.doctorName} className="w-full h-full rounded-xl object-cover" />
                        ) : (
                          <span className="text-primary font-semibold">
                            {appointment.doctorName?.charAt(0) || "?"}
                          </span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <h4 className="font-semibold text-foreground truncate">
                              Dr. {appointment.doctorName}
                            </h4>
                            <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                          </div>
                          <span className="badge-status badge-pending capitalize">
                            {appointment.status}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            <span>{appointment.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span>{appointment.time}</span>
                          </div>
                          <span className="capitalize">{appointment.type}</span>
                        </div>

                        <div className="flex items-center gap-2 mt-4">
                          {appointment.type === "video" && (
                            <Button size="sm" variant="default">
                              Join Call
                            </Button>
                          )}
                          <Button size="sm" variant="outline" onClick={() => handleReschedule(appointment)}>
                            Reschedule
                          </Button>
                          <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
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
              {completedAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
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
                cancelledAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
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
      <BookingModal 
        open={bookingModalOpen} 
        onOpenChange={setBookingModalOpen}
        onBookingConfirmed={handleBookingConfirmed}
      />

      {/* Reschedule Modal */}
      <RescheduleModal
        open={rescheduleModalOpen}
        onOpenChange={setRescheduleModalOpen}
        appointmentDetails={selectedAppointment ? {
          doctorName: selectedAppointment.doctorName,
          currentDate: selectedAppointment.date,
          currentTime: selectedAppointment.time,
        } : undefined}
        onConfirm={handleRescheduleConfirm}
      />
    </DashboardLayout>
  );
};

export default PatientAppointments;
