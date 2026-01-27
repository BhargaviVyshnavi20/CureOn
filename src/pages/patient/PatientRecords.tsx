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
  File,
  Image,
  Download,
  HeartPulse,
  Stethoscope,
  User,
  Upload,
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
  fileName?: string;
}

const defaultUserRecords = [
  { id: "u1", name: "Blood Test Report", placeholder: true },
  { id: "u2", name: "X-Ray Images", placeholder: true },
  { id: "u3", name: "Prescription History", placeholder: true },
  { id: "u4", name: "Vaccination Records", placeholder: true },
  { id: "u5", name: "Insurance Documents", placeholder: true },
];

const PatientRecords = () => {
  const [userRecords, setUserRecords] = useState<Record<string, MedicalRecord | null>>({
    u1: null,
    u2: null,
    u3: null,
    u4: null,
    u5: null,
  });

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

  const handleFileUpload = (recordId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const record = defaultUserRecords.find(r => r.id === recordId);
      const newRecord: MedicalRecord = {
        id: recordId,
        name: record?.name || file.name,
        type: "Uploaded Document",
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        fileType: file.type.includes("pdf") ? "pdf" : "image",
        size: `${(file.size / 1024).toFixed(0)} KB`,
        uploadedBy: "user",
        fileName: file.name,
      };
      setUserRecords(prev => ({ ...prev, [recordId]: newRecord }));
    }
  };

  const RecordCard = ({ record }: { record: MedicalRecord }) => (
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
      <Button variant="ghost" size="sm">
        <Download className="w-4 h-4" />
      </Button>
    </div>
  );

  const UserRecordSlot = ({ recordDef, uploadedRecord }: { recordDef: { id: string; name: string }; uploadedRecord: MedicalRecord | null }) => (
    <div className="dashboard-card p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${uploadedRecord ? "bg-success/10" : "bg-muted"}`}>
            {uploadedRecord ? (
              uploadedRecord.fileType === "pdf" ? (
                <File className="w-6 h-6 text-success" />
              ) : (
                <Image className="w-6 h-6 text-success" />
              )
            ) : (
              <FileText className="w-6 h-6 text-muted-foreground" />
            )}
          </div>
          <div>
            <h3 className="font-medium text-foreground">{recordDef.name}</h3>
            {uploadedRecord ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{uploadedRecord.fileName}</span>
                <span>•</span>
                <span>{uploadedRecord.date}</span>
                <span>•</span>
                <span>{uploadedRecord.size}</span>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No file uploaded</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {uploadedRecord && (
            <Button variant="ghost" size="sm">
              <Download className="w-4 h-4" />
            </Button>
          )}
          <Label htmlFor={`file-${recordDef.id}`} className="cursor-pointer">
            <Input
              id={`file-${recordDef.id}`}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={(e) => handleFileUpload(recordDef.id, e)}
            />
            <Button variant="outline" size="sm" asChild>
              <span>
                <Upload className="w-4 h-4 mr-2" />
                {uploadedRecord ? "Update" : "Choose File"}
              </span>
            </Button>
          </Label>
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
            Medical Records
          </h1>
          <p className="text-muted-foreground mt-1">
            View and manage your medical documents
          </p>
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
              My Uploads
            </TabsTrigger>
          </TabsList>

          <TabsContent value="doctor" className="mt-6">
            <div className="space-y-4">
              {doctorRecords.length > 0 ? (
                doctorRecords.map((record) => (
                  <RecordCard key={record.id} record={record} />
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
              {defaultUserRecords.map((recordDef) => (
                <UserRecordSlot
                  key={recordDef.id}
                  recordDef={recordDef}
                  uploadedRecord={userRecords[recordDef.id]}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PatientRecords;
