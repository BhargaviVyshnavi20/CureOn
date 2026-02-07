import { useState } from "react";
import { useTranslation } from "react-i18next";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AppointmentCard from "@/components/dashboard/AppointmentCard";
import BookingModal from "@/components/patient/BookingModal";
import RescheduleModal from "@/components/patient/RescheduleModal";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
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
import { getDateLocale } from "@/lib/utils";

const PatientAppointments = () => {
  const { t } = useTranslation();
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const navItems = [
    { name: t('common.dashboard'), href: "/patient/dashboard", icon: LayoutDashboard },
    { name: t('common.appointments'), href: "/patient/appointments", icon: Calendar },
    { name: t('common.myRecords'), href: "/patient/records", icon: FileText },
    { name: t('common.prescriptions'), href: "/patient/prescriptions", icon: Pill },
    { name: t('common.aiHealthAssistant'), href: "/patient/chatbot", icon: HeartPulse },
    { name: t('common.settings'), href: "/patient/settings", icon: Settings },
  ];
  
  const [appointments, setAppointments] = useState([
    {
      id: "1",
<<<<<<< HEAD
      doctorName: "appointments.doctors.sarahJohnson",
      specialty: "appointments.specialties.general",
=======
<<<<<<< HEAD
      doctorName: "appointments.doctors.sarahJohnson",
      specialty: "appointments.specialties.general",
=======
      doctorName: "Sarah Johnson",
      specialty: t('appointments.specialties.general'),
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68
      date: new Date(2026, 0, 25), // Jan 25, 2026
      time: "10:00 AM",
      type: "video",
      status: "upcoming",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: "2",
<<<<<<< HEAD
      doctorName: "appointments.doctors.michaelChen",
      specialty: "appointments.specialties.cardio",
=======
<<<<<<< HEAD
      doctorName: "appointments.doctors.michaelChen",
      specialty: "appointments.specialties.cardio",
=======
      doctorName: "Michael Chen",
      specialty: t('appointments.specialties.cardio'),
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68
      date: new Date(2026, 0, 28), // Jan 28, 2026
      time: "2:30 PM",
      type: "in-person",
      status: "upcoming",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: "3",
<<<<<<< HEAD
      doctorName: "appointments.doctors.emilyWilliams",
      specialty: "appointments.specialties.derma",
=======
<<<<<<< HEAD
      doctorName: "appointments.doctors.emilyWilliams",
      specialty: "appointments.specialties.derma",
=======
      doctorName: "Emily Williams",
      specialty: t('appointments.specialties.derma'),
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68
      date: new Date(2026, 1, 5), // Feb 5, 2026
      time: "11:00 AM",
      type: "video",
      status: "upcoming",
    },
  ]);

  const completedAppointments = [
    {
      id: "4",
<<<<<<< HEAD
      doctorName: "appointments.doctors.sarahJohnson",
      specialty: "appointments.specialties.general",
=======
<<<<<<< HEAD
      doctorName: "appointments.doctors.sarahJohnson",
      specialty: "appointments.specialties.general",
=======
      doctorName: "Sarah Johnson",
      specialty: t('appointments.specialties.general'),
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68
      date: new Date(2026, 0, 10), // Jan 10, 2026
      time: "10:00 AM",
      type: "video",
      status: "completed",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: "5",
<<<<<<< HEAD
      doctorName: "appointments.doctors.jamesWilson",
      specialty: "appointments.specialties.ortho",
=======
<<<<<<< HEAD
      doctorName: "appointments.doctors.jamesWilson",
      specialty: "appointments.specialties.ortho",
=======
      doctorName: "James Wilson",
      specialty: t('appointments.specialties.ortho'),
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68
      date: new Date(2025, 11, 28), // Dec 28, 2025
      time: "3:00 PM",
      type: "in-person",
      status: "completed",
    },
  ];

  const cancelledAppointments = [
    {
      id: "6",
<<<<<<< HEAD
      doctorName: "appointments.doctors.robertBrown",
      specialty: "appointments.specialties.neuro",
=======
<<<<<<< HEAD
      doctorName: "appointments.doctors.robertBrown",
      specialty: "appointments.specialties.neuro",
=======
      doctorName: "Robert Brown",
      specialty: t('appointments.specialties.neuro'),
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68
      date: new Date(2026, 0, 5), // Jan 5, 2026
      time: "2:00 PM",
      type: "video",
      status: "cancelled",
    },
  ];

  const upcomingAppointments = appointments.filter(a => a.status === "upcoming");

  const handleBookingConfirmed = (booking) => {
    const specNames = {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68
      general: "appointments.specialties.general",
      cardio: "appointments.specialties.cardio",
      neuro: "appointments.specialties.neuro",
      ortho: "appointments.specialties.ortho",
      eye: "appointments.specialties.eye",
      pedia: "appointments.specialties.pedia",
      derma: "appointments.specialties.derma",
<<<<<<< HEAD
=======
=======
      general: t('appointments.specialties.general'),
      cardio: t('appointments.specialties.cardio'),
      neuro: t('appointments.specialties.neuro'),
      ortho: t('appointments.specialties.ortho'),
      eye: t('appointments.specialties.eye'),
      pedia: t('appointments.specialties.pedia'),
      derma: t('appointments.specialties.derma'),
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68
    };

    const newAppointment = {
      id: Date.now().toString(),
<<<<<<< HEAD
      doctorName: "appointments.specialties.availableDoctor",
=======
<<<<<<< HEAD
      doctorName: "appointments.specialties.availableDoctor",
=======
      doctorName: t('appointments.specialties.availableDoctor'),
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68
      specialty: specNames[booking.specialization] || booking.specialization,
      date: booking.date,
      time: booking.time,
      type: "video",
      status: "upcoming",
    };

    setAppointments([...appointments, newAppointment]);
  };

  const handleReschedule = (appointment) => {
    setSelectedAppointment(appointment);
    setRescheduleModalOpen(true);
  };

  const handleRescheduleConfirm = (newDate, newTime) => {
    if (selectedAppointment) {
      setAppointments(appointments.map(apt => 
        apt.id === selectedAppointment.id 
          ? { ...apt, date: newDate, time: newTime }
          : apt
      ));
      toast.success(t('appointments.rescheduleSuccess'));
    }
    setSelectedAppointment(null);
    setRescheduleModalOpen(false);
  };

  const handleJoinCall = (appointment) => {
    toast.success(t('appointments.joinCall', { name: appointment.doctorName }));
  };

  const handleCancel = (appointment) => {
    toast.error(t('appointments.cancelSuccess', { name: appointment.doctorName }));
    setAppointments(appointments.map(a => 
      a.id === appointment.id ? { ...a, status: "cancelled" } : a
    ));
  };

  return (
    <DashboardLayout
      navItems={navItems}
      userType="patient"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
              {t('appointments.title')}
            </h1>
            <p className="text-muted-foreground mt-1">
              {t('appointments.subtitle')}
            </p>
          </div>
          <Button variant="hero" onClick={() => setBookingModalOpen(true)}>
            <CalendarPlus className="w-5 h-5" />
            {t('appointments.bookNew')}
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="upcoming">
              {t('appointments.upcoming')} ({upcomingAppointments.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              {t('appointments.completed')} ({completedAppointments.length})
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              {t('appointments.cancelled')} ({cancelledAppointments.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6">
            <div className="space-y-4">
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    {...appointment}
                    date={format(appointment.date, "PP", { locale: getDateLocale() })}
                    userType="patient"
                    showActions={true}
                    onJoin={() => handleJoinCall(appointment)}
                    onReschedule={() => handleReschedule(appointment)}
                    onCancel={() => handleCancel(appointment)}
                  />
                ))
              ) : (
                <div className="dashboard-card p-8 text-center">
                  <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">{t('appointments.noUpcoming')}</h3>
                  <p className="text-muted-foreground mb-4">{t('appointments.bookToStart')}</p>
                  <Button variant="hero" onClick={() => setBookingModalOpen(true)}>
                    <CalendarPlus className="w-5 h-5" />
                    {t('appointments.bookBtn')}
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <div className="space-y-4">
              {completedAppointments.length > 0 ? (
                completedAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    {...appointment}
                    date={format(appointment.date, "PP", { locale: getDateLocale() })}
                    userType="patient"
                    showActions={false}
                  />
                ))
              ) : (
                <div className="dashboard-card p-8 text-center">
                  <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold text-foreground">{t('appointments.noCompleted')}</h3>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="cancelled" className="mt-6">
            <div className="space-y-4">
              {cancelledAppointments.length > 0 ? (
                cancelledAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    {...appointment}
                    date={format(appointment.date, "PP", { locale: getDateLocale() })}
                    userType="patient"
                    showActions={false}
                  />
                ))
              ) : (
                <div className="dashboard-card p-8 text-center">
                  <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold text-foreground">{t('appointments.noCancelled')}</h3>
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
