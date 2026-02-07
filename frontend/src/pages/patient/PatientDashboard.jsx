import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import AppointmentCard from "@/components/dashboard/AppointmentCard";
import { useUser } from "@/context/UserContext";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { enUS, hi, te } from "date-fns/locale";
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

const PatientDashboard = () => {
  const navigate = useNavigate();
  const { getUser } = useUser();
  const { t, i18n } = useTranslation();
  const patientProfile = getUser("patient");

  const getDateLocale = () => {
    switch (i18n.language) {
      case 'hi': return hi;
      case 'te': return te;
      default: return enUS;
    }
  };

  const navItems = [
    { name: t('common.dashboard'), href: "/patient/dashboard", icon: LayoutDashboard },
    { name: t('common.appointments'), href: "/patient/appointments", icon: Calendar },
    { name: t('common.myRecords'), href: "/patient/records", icon: FileText },
    { name: t('common.prescriptions'), href: "/patient/prescriptions", icon: Pill },
    { name: t('common.aiHealthAssistant'), href: "/patient/chatbot", icon: HeartPulse },
    { name: t('common.settings'), href: "/patient/settings", icon: Settings },
  ];
  
  const upcomingAppointments = [
    {
      doctorName: "appointments.doctors.sarahJohnson",
      specialty: "appointments.specialties.general",
      date: new Date(2026, 0, 25),
      time: "10:00 AM",
      type: "video",
      status: "upcoming",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
    {
      doctorName: "appointments.doctors.michaelChen",
      specialty: "appointments.specialties.cardio",
      date: new Date(2026, 0, 28),
      time: "2:30 PM",
      type: "in-person",
      status: "upcoming",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
  ];

  const recentRecords = [
    { name: t('dashboard.recentRecordsData.bloodTestResults'), date: new Date(2026, 0, 15), type: t('dashboard.recentRecordsData.labReport') },
    { name: t('dashboard.recentRecordsData.generalCheckup'), date: new Date(2026, 0, 10), type: t('dashboard.recentRecordsData.consultation') },
    { name: t('dashboard.recentRecordsData.antibiotics'), date: new Date(2026, 0, 10), type: t('dashboard.recentRecordsData.prescription') },
  ];

  return (
    <DashboardLayout
      navItems={navItems}
      userType="patient"
    >
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
              {t('dashboard.welcome', { 
                name: patientProfile?.name?.split(' ')[0] === 'Alex' 
                  ? t('dashboard.alex') 
                  : patientProfile?.name?.split(' ')[0] 
              })}
            </h1>
            <p className="text-muted-foreground mt-1">
              {t('dashboard.overview')}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <div onClick={() => navigate("/patient/appointments")} className="cursor-pointer transition-transform hover:scale-105">
            <StatCard
              title={t('dashboard.upcomingAppointments')}
              value={2}
              icon={Calendar}
              iconColor="text-primary"
              iconBg="bg-primary/10"
            />
          </div>
          <div className="cursor-pointer transition-transform hover:scale-105">
            <StatCard
              title={t('dashboard.completedVisits')}
              value={12}
              icon={CheckCircle2}
              iconColor="text-success"
              iconBg="bg-success/10"
            />
          </div>
          <div onClick={() => navigate("/patient/prescriptions")} className="cursor-pointer transition-transform hover:scale-105">
            <StatCard
              title={t('dashboard.activePrescriptions')}
              value={3}
              icon={Pill}
              iconColor="text-accent"
              iconBg="bg-accent/10"
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Upcoming Appointments */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-foreground">
                {t('dashboard.upcomingAppointments')}
              </h2>
              <Button variant="ghost" size="sm" onClick={() => navigate("/patient/appointments")}>
                {t('common.viewAll')}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment, index) => (
                <AppointmentCard
                  key={index}
                  {...appointment}
                  date={format(appointment.date, "PP", { locale: getDateLocale() })}
                  userType="patient"
                />
              ))}
            </div>
          </div>

          {/* Recent Records */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-foreground">
                {t('dashboard.recentRecords')}
              </h2>
              <Button variant="ghost" size="sm" onClick={() => navigate("/patient/records")}>
                {t('common.viewAll')}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="dashboard-card divide-y divide-border">
              {recentRecords.map((record, index) => (
                <div 
                  key={index} 
                  className="p-4 hover:bg-secondary/50 transition-colors cursor-pointer"
                  onClick={() => navigate("/patient/records")}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-foreground truncate">{record.name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{record.type}</span>
                        <span>•</span>
                        <span>{format(record.date, "PP", { locale: getDateLocale() })}</span>
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
