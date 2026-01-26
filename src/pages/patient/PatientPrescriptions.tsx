import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Pill,
  Settings,
  Clock,
  CheckCircle2,
  RefreshCw,
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
  status: "active" | "completed";
  refillsLeft?: number;
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
      status: "active",
      refillsLeft: 2,
    },
    {
      id: "2",
      medicineName: "Lisinopril 10mg",
      dosage: "1 tablet",
      frequency: "Once daily",
      duration: "30 days",
      prescribedBy: "Dr. Michael Chen",
      prescribedDate: "Jan 15, 2026",
      status: "active",
      refillsLeft: 5,
    },
    {
      id: "3",
      medicineName: "Metformin 500mg",
      dosage: "1 tablet",
      frequency: "Twice daily",
      duration: "30 days",
      prescribedBy: "Dr. Lisa Anderson",
      prescribedDate: "Jan 10, 2026",
      status: "active",
      refillsLeft: 3,
    },
  ];

  const pastPrescriptions: Prescription[] = [
    {
      id: "4",
      medicineName: "Ibuprofen 400mg",
      dosage: "1 tablet",
      frequency: "As needed",
      duration: "5 days",
      prescribedBy: "Dr. James Wilson",
      prescribedDate: "Dec 15, 2025",
      status: "completed",
    },
    {
      id: "5",
      medicineName: "Cetirizine 10mg",
      dosage: "1 tablet",
      frequency: "Once daily",
      duration: "14 days",
      prescribedBy: "Dr. Emily Williams",
      prescribedDate: "Nov 28, 2025",
      status: "completed",
    },
  ];

  const PrescriptionCard = ({ prescription }: { prescription: Prescription }) => (
    <div className={`dashboard-card p-5 ${prescription.status === "completed" ? "opacity-70 bg-muted/30" : ""}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            prescription.status === "active" ? "bg-primary/10" : "bg-muted"
          }`}>
            <Pill className={`w-6 h-6 ${prescription.status === "active" ? "text-primary" : "text-muted-foreground"}`} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{prescription.medicineName}</h3>
            <p className="text-sm text-muted-foreground">Prescribed by {prescription.prescribedBy}</p>
          </div>
        </div>
        <span className={`badge-status ${prescription.status === "active" ? "badge-success" : "bg-muted text-muted-foreground"}`}>
          {prescription.status === "active" ? (
            <>
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Active
            </>
          ) : (
            "Completed"
          )}
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
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

      {prescription.status === "active" && prescription.refillsLeft !== undefined && (
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{prescription.refillsLeft} refills remaining</span>
          </div>
          <Button size="sm" variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Request Refill
          </Button>
        </div>
      )}
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
            View and manage your prescriptions
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="active">
              Active ({activePrescriptions.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              Past ({pastPrescriptions.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-6">
            <div className="space-y-4">
              {activePrescriptions.map((prescription) => (
                <PrescriptionCard key={prescription.id} prescription={prescription} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="past" className="mt-6">
            <div className="space-y-4">
              {pastPrescriptions.map((prescription) => (
                <PrescriptionCard key={prescription.id} prescription={prescription} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PatientPrescriptions;
