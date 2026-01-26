import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Pill,
  Settings,
  Upload,
  File,
  Image,
  Trash2,
  Download,
  HeartPulse,
  Stethoscope,
  User,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/patient/dashboard", icon: LayoutDashboard },
  { name: "Appointments", href: "/patient/appointments", icon: Calendar },
  { name: "Medical Records", href: "/patient/records", icon: FileText },
  { name: "Prescriptions", href: "/patient/prescriptions", icon: Pill },
  { name: "Health Assistant", href: "/patient/chatbot", icon: HeartPulse },
  { name: "Settings", href: "/patient/settings", icon: Settings },
];

interface MedicalRecord {
  id: string;
  name: string;
  type: string;
  date: string;
  fileType: "pdf" | "image";
  size: string;
  uploadedBy: "doctor" | "user";
  doctorName?: string;
}

const PatientRecords = () => {
  const [userRecords, setUserRecords] = useState<MedicalRecord[]>([
    {
      id: "u1",
      name: "Previous Hospital Report",
      type: "Medical History",
      date: "Jan 12, 2026",
      fileType: "pdf",
      size: "320 KB",
      uploadedBy: "user",
    },
    {
      id: "u2",
      name: "Vaccination Certificate",
      type: "Immunization",
      date: "Dec 15, 2025",
      fileType: "image",
      size: "1.1 MB",
      uploadedBy: "user",
    },
  ]);

  const doctorRecords: MedicalRecord[] = [
    {
      id: "d1",
      name: "Blood Test Results",
      type: "Lab Report",
      date: "Jan 15, 2026",
      fileType: "pdf",
      size: "245 KB",
      uploadedBy: "doctor",
      doctorName: "Dr. Sarah Johnson",
    },
    {
      id: "d2",
      name: "Chest X-Ray",
      type: "Imaging",
      date: "Jan 10, 2026",
      fileType: "image",
      size: "1.2 MB",
      uploadedBy: "doctor",
      doctorName: "Dr. Michael Chen",
    },
    {
      id: "d3",
      name: "General Checkup Report",
      type: "Consultation",
      date: "Dec 20, 2025",
      fileType: "pdf",
      size: "156 KB",
      uploadedBy: "doctor",
      doctorName: "Dr. Sarah Johnson",
    },
    {
      id: "d4",
      name: "MRI Scan Results",
      type: "Imaging",
      date: "Dec 5, 2025",
      fileType: "image",
      size: "3.4 MB",
      uploadedBy: "doctor",
      doctorName: "Dr. Lisa Anderson",
    },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const newRecord: MedicalRecord = {
        id: Date.now().toString(),
        name: file.name,
        type: "Uploaded Document",
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        fileType: file.type.includes("pdf") ? "pdf" : "image",
        size: `${(file.size / 1024).toFixed(0)} KB`,
        uploadedBy: "user",
      };
      setUserRecords([newRecord, ...userRecords]);
    }
  };

  const handleDelete = (id: string) => {
    setUserRecords(userRecords.filter((record) => record.id !== id));
  };

  const RecordCard = ({ record, canDelete = false }: { record: MedicalRecord; canDelete?: boolean }) => (
    <div className="dashboard-card p-4 flex items-center justify-between hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          {record.fileType === "pdf" ? (
            <File className="w-6 h-6 text-primary" />
          ) : (
            <Image className="w-6 h-6 text-primary" />
          )}
        </div>
        <div>
          <h3 className="font-medium text-foreground">{record.name}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
            <span>{record.type}</span>
            <span>•</span>
            <span>{record.date}</span>
            <span>•</span>
            <span>{record.size}</span>
            {record.doctorName && (
              <>
                <span>•</span>
                <span className="text-primary">{record.doctorName}</span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">
          <Download className="w-4 h-4" />
        </Button>
        {canDelete && (
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive"
            onClick={() => handleDelete(record.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
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
            Medical Records
          </h1>
          <p className="text-muted-foreground mt-1">
            View and manage your medical documents
          </p>
        </div>

        {/* Upload Section */}
        <div className="dashboard-card p-6">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">
            Upload New Record
          </h2>
          <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
            <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-medium text-foreground mb-2">
              Drop files here or click to upload
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Supports PDF, JPG, PNG (Max 10MB)
            </p>
            <Label htmlFor="file-upload" className="cursor-pointer">
              <Input
                id="file-upload"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={handleFileUpload}
              />
              <Button variant="outline" asChild>
                <span>
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </span>
              </Button>
            </Label>
          </div>
        </div>

        {/* Records Tabs */}
        <Tabs defaultValue="doctor" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="doctor" className="gap-2">
              <Stethoscope className="w-4 h-4" />
              Doctor Uploaded ({doctorRecords.length})
            </TabsTrigger>
            <TabsTrigger value="user" className="gap-2">
              <User className="w-4 h-4" />
              My Uploads ({userRecords.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="doctor" className="mt-6">
            <div className="space-y-4">
              {doctorRecords.length > 0 ? (
                doctorRecords.map((record) => (
                  <RecordCard key={record.id} record={record} canDelete={false} />
                ))
              ) : (
                <div className="dashboard-card p-8 text-center">
                  <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold text-foreground">No records from doctors yet</h3>
                  <p className="text-muted-foreground mt-2">
                    Records uploaded by your doctors will appear here
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="user" className="mt-6">
            <div className="space-y-4">
              {userRecords.length > 0 ? (
                userRecords.map((record) => (
                  <RecordCard key={record.id} record={record} canDelete={true} />
                ))
              ) : (
                <div className="dashboard-card p-8 text-center">
                  <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold text-foreground">No uploaded records</h3>
                  <p className="text-muted-foreground mt-2">
                    Upload your medical documents to keep them organized
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PatientRecords;
