import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AppointmentCard from "@/components/dashboard/AppointmentCard";
import RescheduleModal from "@/components/patient/RescheduleModal";
import PrescriptionModal from "@/components/doctor/PrescriptionModal";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { format } from "date-fns";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Clock,
  Settings,
  Pill,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/doctor/dashboard", icon: LayoutDashboard },
  { name: "Appointments", href: "/doctor/appointments", icon: Calendar },
  { name: "Patients", href: "/doctor/patients", icon: Users },
  { name: "Manage Availability", href: "/doctor/availability", icon: Clock },
  { name: "Settings", href: "/doctor/settings", icon: Settings },
];

const DoctorAppointments = () => {
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [prescriptionModalOpen, setPrescriptionModalOpen] = useState(false);
  const [selectedPrescriptionAppointment, setSelectedPrescriptionAppointment] = useState(null);

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "Emily Rodriguez",
      date: "Today",
      time: "10:00 AM",
      type: "video",
      status: "upcoming",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: 2,
      patientName: "James Wilson",
      date: "Today",
      time: "11:30 AM",
      type: "in-person",
      status: "upcoming",
    },
    {
      id: 3,
      patientName: "Sarah Chen",
      date: "Today",
      time: "2:00 PM",
      type: "video",
      status: "upcoming",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: 4,
      patientName: "Michael Brown",
      date: "Jan 26, 2026",
      time: "9:00 AM",
      type: "in-person",
      status: "upcoming",
    },
    {
      id: 5,
      patientName: "Lisa Anderson",
      date: "Jan 27, 2026",
      time: "10:30 AM",
      type: "video",
      status: "upcoming",
    },
    {
      id: 6,
      patientName: "David Martinez",
      date: "Jan 28, 2026",
      time: "2:00 PM",
      type: "in-person",
      status: "upcoming",
    },
    {
      id: 7,
      patientName: "Jennifer Smith",
      date: "Jan 20, 2026",
      time: "10:00 AM",
      type: "video",
      status: "completed",
    },
    {
      id: 8,
      patientName: "Robert Johnson",
      date: "Jan 19, 2026",
      time: "3:00 PM",
      type: "in-person",
      status: "completed",
    },
    {
      id: 9,
      patientName: "Amanda White",
      date: "Jan 18, 2026",
      time: "11:00 AM",
      type: "video",
      status: "completed",
    },
    {
      id: 10,
      patientName: "Thomas Lee",
      date: "Jan 22, 2026",
      time: "1:00 PM",
      type: "video",
      status: "cancelled",
    },
  ]);

  const handleJoinCall = (appointment) => {
    toast.success(`Starting video call with ${appointment.patientName}`);
    // Simulate opening a video call window
    window.open(`https://meet.google.com/new`, '_blank');
  };

  const handleCancel = (appointment) => {
    setAppointments(prev => prev.map(app => 
      app.id === appointment.id ? { ...app, status: 'cancelled' } : app
    ));
    toast.error(`Appointment with ${appointment.patientName} cancelled`);
  };

  const handleReschedule = (appointment) => {
    setSelectedAppointment({
      ...appointment,
      currentDate: appointment.date,
      currentTime: appointment.time,
    });
    setRescheduleOpen(true);
  };

  const handleRescheduleConfirm = (newDate, newTime) => {
    const formattedDate = format(newDate, "MMM d, yyyy");
    setAppointments(prev => prev.map(app => 
      app.id === selectedAppointment.id 
        ? { ...app, date: formattedDate, time: newTime, status: 'upcoming' } 
        : app
    ));
    toast.success("Appointment rescheduled successfully");
    setRescheduleOpen(false);
  };

  const handlePrescribe = (appointment) => {
    setSelectedPrescriptionAppointment(appointment);
    setPrescriptionModalOpen(true);
  };

  const todayAppointments = appointments.filter(app => app.date === "Today" && app.status !== 'cancelled');
  const upcomingAppointments = appointments.filter(app => app.date !== "Today" && app.status === 'upcoming');
  const completedAppointments = appointments.filter(app => app.status === 'completed');
  const cancelledAppointments = appointments.filter(app => app.status === 'cancelled');

  return (
    <DashboardLayout
      navItems={navItems}
      userType="doctor"
    >
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
            Appointments
          </h1>
          <p className="text-muted-foreground mt-1">
            View and manage your appointments
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="today" className="w-full">
          <TabsList className="grid w-full max-w-lg grid-cols-4">
            <TabsTrigger value="today">
              Today ({todayAppointments.length})
            </TabsTrigger>
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

          <TabsContent value="today" className="mt-6">
            <div className="space-y-4">
              {todayAppointments.length > 0 ? (
                todayAppointments.map((appointment, index) => (
                  <AppointmentCard
                    key={index}
                    {...appointment}
                    userType="doctor"
                    onJoin={() => handleJoinCall(appointment)}
                    onReschedule={() => handleReschedule(appointment)}
                    onCancel={() => handleCancel(appointment)}
                  />
                ))
              ) : (
                <div className="dashboard-card p-8 text-center">
                  <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">No appointments today</h3>
                  <p className="text-muted-foreground">Enjoy your free day!</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="mt-6">
            <div className="space-y-4">
              {upcomingAppointments.map((appointment, index) => (
                <AppointmentCard
                  key={index}
                  {...appointment}
                  userType="doctor"
                  onJoin={() => handleJoinCall(appointment)}
                  onReschedule={() => handleReschedule(appointment)}
                  onCancel={() => handleCancel(appointment)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <div className="space-y-4">
              {completedAppointments.map((appointment, index) => (
                <AppointmentCard
                  key={index}
                  {...appointment}
                  userType="doctor"
                  showActions={false}
                  customActions={
                    <Button size="sm" variant="hero" onClick={() => handlePrescribe(appointment)}>
                      <Pill className="w-4 h-4 mr-2" />
                      Prescribe
                    </Button>
                  }
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
                    userType="doctor"
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
      {/* Reschedule Modal */}
      <RescheduleModal
        open={rescheduleOpen}
        onOpenChange={setRescheduleOpen}
        appointmentDetails={selectedAppointment}
        onConfirm={handleRescheduleConfirm}
      />

      <PrescriptionModal
        open={prescriptionModalOpen}
        onOpenChange={setPrescriptionModalOpen}
        appointment={selectedPrescriptionAppointment}
      />
    </DashboardLayout>
  );
};

export default DoctorAppointments;
