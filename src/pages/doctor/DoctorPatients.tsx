import { useState, useRef } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PatientHistoryModal from "@/components/doctor/PatientHistoryModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Clock,
  Settings,
  Search,
  FileText,
  Phone,
  Mail,
  Upload,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/doctor/dashboard", icon: LayoutDashboard },
  { name: "Appointments", href: "/doctor/appointments", icon: Calendar },
  { name: "Patients", href: "/doctor/patients", icon: Users },
  { name: "Manage Availability", href: "/doctor/availability", icon: Clock },
  { name: "Settings", href: "/doctor/settings", icon: Settings },
];

interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  condition: string;
  lastVisit: string;
  totalVisits: number;
  avatar?: string;
}

const DoctorPatients = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const patients: Patient[] = [
    {
      id: "1",
      name: "Emily Rodriguez",
      email: "emily.r@email.com",
      phone: "+1 (555) 123-4567",
      age: 32,
      condition: "Hypertension",
      lastVisit: "Jan 20, 2026",
      totalVisits: 8,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: "2",
      name: "James Wilson",
      email: "james.w@email.com",
      phone: "+1 (555) 234-5678",
      age: 45,
      condition: "Diabetes Type 2",
      lastVisit: "Jan 18, 2026",
      totalVisits: 12,
    },
    {
      id: "3",
      name: "Sarah Chen",
      email: "sarah.c@email.com",
      phone: "+1 (555) 345-6789",
      age: 28,
      condition: "Routine Checkup",
      lastVisit: "Jan 15, 2026",
      totalVisits: 3,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: "4",
      name: "Michael Brown",
      email: "michael.b@email.com",
      phone: "+1 (555) 456-7890",
      age: 52,
      condition: "Arthritis",
      lastVisit: "Jan 12, 2026",
      totalVisits: 15,
    },
    {
      id: "5",
      name: "Lisa Anderson",
      email: "lisa.a@email.com",
      phone: "+1 (555) 567-8901",
      age: 38,
      condition: "Migraine",
      lastVisit: "Jan 10, 2026",
      totalVisits: 6,
    },
    {
      id: "6",
      name: "David Martinez",
      email: "david.m@email.com",
      phone: "+1 (555) 678-9012",
      age: 41,
      condition: "Allergies",
      lastVisit: "Jan 8, 2026",
      totalVisits: 4,
    },
  ];

  const handleViewHistory = (patient: Patient) => {
    setSelectedPatient(patient);
    setHistoryModalOpen(true);
  };

  const handleUploadClick = (patientId: string) => {
    const input = fileInputRefs.current[patientId];
    if (input) {
      input.click();
    }
  };

  const handleFileUpload = (patientId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      console.log(`Uploading file for patient ${patientId}:`, files[0].name);
      // Here you would handle the actual upload
    }
    // Reset input
    const input = fileInputRefs.current[patientId];
    if (input) {
      input.value = "";
    }
  };

  return (
    <DashboardLayout
      navItems={navItems}
      userType="doctor"
      userName="Dr. Sarah Johnson"
      userAvatar="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    >
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
            Patients
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your patient records
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search patients..." className="pl-10" />
        </div>

        {/* Patients Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {patients.map((patient) => (
            <div key={patient.id} className="dashboard-card p-5 hover-lift">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {patient.avatar ? (
                    <img
                      src={patient.avatar}
                      alt={patient.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-primary font-semibold text-lg">
                      {patient.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{patient.name}</h3>
                  <p className="text-sm text-muted-foreground">{patient.age} years old</p>
                  <span className="badge-status badge-pending mt-1">{patient.condition}</span>
                </div>
              </div>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{patient.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{patient.phone}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="text-sm">
                  <p className="text-muted-foreground">Last visit</p>
                  <p className="font-medium text-foreground">{patient.lastVisit}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    ref={(el) => { fileInputRefs.current[patient.id] = el; }}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={(e) => handleFileUpload(patient.id, e)}
                  />
                  <Button variant="outline" size="sm" onClick={() => handleUploadClick(patient.id)}>
                    <Upload className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleViewHistory(patient)}>
                    <FileText className="w-4 h-4 mr-2" />
                    History
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Patient History Modal */}
      <PatientHistoryModal
        open={historyModalOpen}
        onOpenChange={setHistoryModalOpen}
        patient={selectedPatient}
      />
    </DashboardLayout>
  );
};

export default DoctorPatients;
