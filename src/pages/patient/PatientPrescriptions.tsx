import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Pill,
  Settings,
  CheckCircle2,
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

interface Prescription {
  id: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  duration: string;
  prescribedBy: string;
  prescribedDate: string;
}

const PatientPrescriptions = () => {
  const activePrescriptions: Prescription[] = [
    {
      id: "1",
      medicineName: "Amoxicillin 500mg",
      dosage: "1 tablet",
      frequency: "3 times daily",
      duration: "7 days",
      prescribedBy: "Dr. Sarah Johnson",
      prescribedDate: "Jan 20, 2026",
    },
    {
      id: "2",
      medicineName: "Lisinopril 10mg",
      dosage: "1 tablet",
      frequency: "Once daily",
      duration: "30 days",
      prescribedBy: "Dr. Michael Chen",
      prescribedDate: "Jan 15, 2026",
    },
    {
      id: "3",
      medicineName: "Metformin 500mg",
      dosage: "1 tablet",
      frequency: "Twice daily",
      duration: "30 days",
      prescribedBy: "Dr. Lisa Anderson",
      prescribedDate: "Jan 10, 2026",
    },
  ];

  const PrescriptionCard = ({ prescription }: { prescription: Prescription }) => (
    <div className="dashboard-card p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Pill className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{prescription.medicineName}</h3>
            <p className="text-sm text-muted-foreground">Prescribed by {prescription.prescribedBy}</p>
          </div>
        </div>
        <span className="badge-status badge-success">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          Active
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Dosage</p>
          <p className="text-sm font-medium text-foreground">{prescription.dosage}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Frequency</p>
          <p className="text-sm font-medium text-foreground">{prescription.frequency}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Duration</p>
          <p className="text-sm font-medium text-foreground">{prescription.duration}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Prescribed On</p>
          <p className="text-sm font-medium text-foreground">{prescription.prescribedDate}</p>
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout
      navItems={navItems}
      userType="patient"
      userName="Alex Thompson"
    >
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
            Prescriptions
          </h1>
          <p className="text-muted-foreground mt-1">
            View your active prescriptions
          </p>
        </div>

        {/* Active Prescriptions */}
        <div className="space-y-4">
          <h2 className="font-display text-lg font-semibold text-foreground">
            Active Prescriptions ({activePrescriptions.length})
          </h2>
          {activePrescriptions.map((prescription) => (
            <PrescriptionCard key={prescription.id} prescription={prescription} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientPrescriptions;
