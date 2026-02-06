import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { getDateLocale } from "@/lib/utils";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Pill,
  Settings,
  HeartPulse,
  Search,
  Download,
  Filter
} from "lucide-react";

const PatientPrescriptions = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");

  const navItems = [
    { name: t('common.dashboard'), href: "/patient/dashboard", icon: LayoutDashboard },
    { name: t('common.appointments'), href: "/patient/appointments", icon: Calendar },
    { name: t('common.myRecords'), href: "/patient/records", icon: FileText },
    { name: t('common.prescriptions'), href: "/patient/prescriptions", icon: Pill },
    { name: t('common.aiHealthAssistant'), href: "/patient/chatbot", icon: HeartPulse },
    { name: t('common.settings'), href: "/patient/settings", icon: Settings },
  ];

  const prescriptionGroups = [
    {
      id: "1",
      date: new Date(2026, 0, 20),
<<<<<<< HEAD
      prescribedBy: `${t('common.dr')} Sarah Johnson`,
=======
      prescribedBy: "Dr. Sarah Johnson",
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
      status: "Active",
      medicines: [
        {
          name: "Amoxicillin 500mg",
<<<<<<< HEAD
          dosage: `1 ${t('prescriptions.dosage.tablet')}`,
          frequency: t('prescriptions.dosage.timesDaily', { count: 3 }),
          duration: `7 ${t('prescriptions.dosage.days')}`,
        },
        {
          name: "Paracetamol 500mg",
          dosage: `1 ${t('prescriptions.dosage.tablet')}`,
          frequency: t('prescriptions.dosage.asNeeded'),
          duration: `5 ${t('prescriptions.dosage.days')}`,
=======
          dosage: "1 tablet",
          frequency: "3 times daily",
          duration: "7 days",
        },
        {
          name: "Paracetamol 500mg",
          dosage: "1 tablet",
          frequency: "As needed",
          duration: "5 days",
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
        },
      ],
    },
    {
      id: "2",
      date: new Date(2026, 0, 15),
<<<<<<< HEAD
      prescribedBy: `${t('common.dr')} Michael Chen`,
=======
      prescribedBy: "Dr. Michael Chen",
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
      status: "Active",
      medicines: [
        {
          name: "Lisinopril 10mg",
<<<<<<< HEAD
          dosage: `1 ${t('prescriptions.dosage.tablet')}`,
          frequency: t('prescriptions.dosage.onceDaily'),
          duration: `30 ${t('prescriptions.dosage.days')}`,
        },
        {
          name: "Atorvastatin 20mg",
          dosage: `1 ${t('prescriptions.dosage.tablet')}`,
          frequency: t('prescriptions.dosage.atNight'),
          duration: `30 ${t('prescriptions.dosage.days')}`,
=======
          dosage: "1 tablet",
          frequency: "Once daily",
          duration: "30 days",
        },
        {
          name: "Atorvastatin 20mg",
          dosage: "1 tablet",
          frequency: "At night",
          duration: "30 days",
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
        },
      ],
    },
    {
      id: "3",
      date: new Date(2026, 0, 10),
<<<<<<< HEAD
      prescribedBy: `${t('common.dr')} Lisa Anderson`,
=======
      prescribedBy: "Dr. Lisa Anderson",
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
      status: "Active",
      medicines: [
        {
          name: "Metformin 500mg",
<<<<<<< HEAD
          dosage: `1 ${t('prescriptions.dosage.tablet')}`,
          frequency: t('prescriptions.dosage.twiceDaily'),
          duration: `30 ${t('prescriptions.dosage.days')}`,
=======
          dosage: "1 tablet",
          frequency: "Twice daily",
          duration: "30 days",
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
        },
      ],
    },
    {
      id: "4",
      date: new Date(2025, 11, 28),
<<<<<<< HEAD
      prescribedBy: `${t('common.dr')} Sarah Johnson`,
=======
      prescribedBy: "Dr. Sarah Johnson",
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
      status: "Completed",
      medicines: [
        {
          name: "Azithromycin 500mg",
<<<<<<< HEAD
          dosage: `1 ${t('prescriptions.dosage.tablet')}`,
          frequency: t('prescriptions.dosage.onceDaily'),
          duration: `3 ${t('prescriptions.dosage.days')}`,
=======
          dosage: "1 tablet",
          frequency: "Once daily",
          duration: "3 days",
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
        },
        {
          name: "Cough Syrup",
          dosage: "10ml",
<<<<<<< HEAD
          frequency: t('prescriptions.dosage.timesDaily', { count: 3 }),
          duration: `5 ${t('prescriptions.dosage.days')}`,
=======
          frequency: "3 times daily",
          duration: "5 days",
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
        },
      ],
    },
    {
      id: "5",
      date: new Date(2025, 11, 15),
<<<<<<< HEAD
      prescribedBy: `${t('common.dr')} James Wilson`,
=======
      prescribedBy: "Dr. James Wilson",
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
      status: "Completed",
      medicines: [
        {
          name: "Ibuprofen 400mg",
<<<<<<< HEAD
          dosage: `1 ${t('prescriptions.dosage.tablet')}`,
          frequency: t('prescriptions.dosage.twiceDaily'),
          duration: `5 ${t('prescriptions.dosage.days')}`,
=======
          dosage: "1 tablet",
          frequency: "Twice daily",
          duration: "5 days",
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
        },
      ],
    },
  ];

  const filteredPrescriptions = prescriptionGroups.filter(group => 
    group.medicines.some(med => med.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    group.prescribedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = (group) => {
    toast.success(t('prescriptions.download', { date: format(group.date, "PP", { locale: getDateLocale() }) }));
  };

  return (
    <DashboardLayout navItems={navItems} userType="patient">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
              {t('prescriptions.title')}
            </h1>
            <p className="text-muted-foreground mt-1">
              {t('prescriptions.subtitle')}
            </p>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder={t('common.search')}
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Prescription Groups */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPrescriptions.map((group) => (
            <div key={group.id} className="dashboard-card p-4 hover:shadow-md transition-shadow">
              {/* Card Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">
                      {format(group.date, "PP", { locale: getDateLocale() })}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {group.prescribedBy}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    group.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {group.status === "Active" ? t('prescriptions.active') : t('prescriptions.completed')}
                </span>
              </div>

              {/* Medicines List */}
              <div className="space-y-3">
                {group.medicines.map((med, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-muted/30 p-2.5 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center border border-border shrink-0">
                        <Pill className="w-4 h-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {med.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {med.dosage} • {med.frequency}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="pt-3 mt-3 border-t border-border flex items-center justify-between">
                   <p className="text-xs text-muted-foreground">{t('common.duration')}: {group.medicines[0].duration}</p>
                   <Button variant="ghost" size="sm" onClick={() => handleDownload(group)}>
                     <Download className="w-4 h-4 mr-2" />
                     {t('common.download', { defaultValue: 'Download' })}
                   </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientPrescriptions;
