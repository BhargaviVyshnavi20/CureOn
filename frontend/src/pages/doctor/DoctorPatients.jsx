import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
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
import { toast } from "sonner";

const DoctorPatients = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const fileInputRefs = useRef({});

  const navItems = [
    { name: "Dashboard", href: "/doctor/dashboard", icon: LayoutDashboard },
    { name: "Appointments", href: "/doctor/appointments", icon: Calendar },
    { name: "Patients", href: "/doctor/patients", icon: Users },
    { name: "Manage Availability", href: "/doctor/availability", icon: Clock },
    { name: "Settings", href: "/doctor/settings", icon: Settings },
  ];

  // State for patient files (persistence across modal opens)
  const [patientFiles, setPatientFiles] = useState({});

  const patients = [
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

  const handleViewDetails = (patientId) => {
    navigate(`/doctor/patients/${patientId}`);
  };

  const handleUploadClick = (patientId) => {
    const input = fileInputRefs.current[patientId];
    if (input) {
      input.click();
    }
  };

  const handleFileUpload = (patientId, event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const patient = patients.find(p => p.id === patientId);
      
      const newFile = {
        id: Date.now(),
        name: file.name,
        type: "Uploaded Document",
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        uploadedBy: "Doctor",
      };

      setPatientFiles(prev => ({
        ...prev,
        [patientId]: [...(prev[patientId] || []), newFile]
      }));

      toast.success(`Uploaded ${file.name} for ${patient?.name}`);
    }
    // Reset input
    const input = fileInputRefs.current[patientId];
    if (input) {
      input.value = "";
    }
  };

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout
      navItems={navItems}
      userType="doctor"
    >
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
            Patients
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your patients and view their history
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search patients..." 
            className="pl-10" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Patients Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient) => (
            <div key={patient.id} className="dashboard-card p-5 hover-lift">
              <div className="flex items-start gap-4 mb-4 cursor-pointer group" onClick={() => handleViewDetails(patient.id)}>
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 overflow-hidden group-hover:scale-105 transition-transform duration-300">
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
                  <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">{patient.name}</h3>
                  <p className="text-sm text-muted-foreground">{patient.age} {t('doctor.patients.yearsOld')}</p>
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
                  <p className="text-muted-foreground">{t('doctor.patients.lastVisit')}</p>
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
                  <Button variant="outline" size="sm" onClick={() => handleViewDetails(patient.id)}>
                    <FileText className="w-4 h-4 mr-2" />
                    {t('doctor.patients.history')}
                  </Button>
                </div>
              </div>
            </div>
          ))
          ) : (
            <div className="col-span-full text-center py-10 text-muted-foreground">
              {t('doctor.patients.noPatientsFound')}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DoctorPatients;
