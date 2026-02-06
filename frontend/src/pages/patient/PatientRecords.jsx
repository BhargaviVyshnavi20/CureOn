import { useState } from "react";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { getDateLocale } from "@/lib/utils";
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
import { toast } from "sonner";

const PatientRecords = () => {
  const { t } = useTranslation();
  
  const navItems = [
    { name: t('common.dashboard'), href: "/patient/dashboard", icon: LayoutDashboard },
    { name: t('common.appointments'), href: "/patient/appointments", icon: Calendar },
    { name: t('common.myRecords'), href: "/patient/records", icon: FileText },
    { name: t('common.prescriptions'), href: "/patient/prescriptions", icon: Pill },
    { name: t('common.aiHealthAssistant'), href: "/patient/chatbot", icon: HeartPulse },
    { name: t('common.settings'), href: "/patient/settings", icon: Settings },
  ];

  const defaultUserRecords = [
    { id: "u1", name: t('records.types.bloodTest'), placeholder: true },
    { id: "u2", name: t('records.types.xray'), placeholder: true },
    { id: "u3", name: t('records.types.prescription'), placeholder: true },
    { id: "u4", name: t('records.types.vaccination'), placeholder: true },
    { id: "u5", name: t('records.types.insurance'), placeholder: true },
  ];

  const [userRecords, setUserRecords] = useState({
    u1: null,
    u2: null,
    u3: null,
    u4: null,
    u5: null,
  });

  const doctorRecords = [
    {
      id: "d1",
<<<<<<< HEAD
      name: t('records.doctorRecords.bloodTestResults'),
=======
      name: "Blood Test Results",
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
      type: "labReport",
      date: new Date(2026, 0, 15),
      fileType: "pdf",
      size: "245 KB",
      uploadedBy: "doctor",
<<<<<<< HEAD
      doctorName: `${t('common.dr')} Sarah Johnson`,
    },
    {
      id: "d2",
      name: t('records.doctorRecords.chestXRay'),
=======
      doctorName: "Dr. Sarah Johnson",
    },
    {
      id: "d2",
      name: "Chest X-Ray",
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
      type: "imaging",
      date: new Date(2026, 0, 10),
      fileType: "image",
      size: "1.2 MB",
      uploadedBy: "doctor",
<<<<<<< HEAD
      doctorName: `${t('common.dr')} Michael Chen`,
    },
    {
      id: "d3",
      name: t('records.doctorRecords.generalCheckupReport'),
=======
      doctorName: "Dr. Michael Chen",
    },
    {
      id: "d3",
      name: "General Checkup Report",
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
      type: "consultation",
      date: new Date(2025, 11, 20),
      fileType: "pdf",
      size: "156 KB",
      uploadedBy: "doctor",
<<<<<<< HEAD
      doctorName: `${t('common.dr')} Sarah Johnson`,
    },
    {
      id: "d4",
      name: t('records.doctorRecords.mriScanResults'),
=======
      doctorName: "Dr. Sarah Johnson",
    },
    {
      id: "d4",
      name: "MRI Scan Results",
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
      type: "imaging",
      date: new Date(2025, 11, 5),
      fileType: "image",
      size: "3.4 MB",
      uploadedBy: "doctor",
<<<<<<< HEAD
      doctorName: `${t('common.dr')} Lisa Anderson`,
=======
      doctorName: "Dr. Lisa Anderson",
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
    },
  ];

  const handleFileUpload = (recordId, event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const record = defaultUserRecords.find(r => r.id === recordId);
      const newRecord = {
        id: recordId,
        name: record?.name || file.name,
        type: "uploaded",
        date: new Date(),
        fileType: file.type.includes("pdf") ? "pdf" : "image",
        size: `${(file.size / 1024).toFixed(0)} KB`,
        uploadedBy: "user",
        fileName: file.name,
      };
      setUserRecords(prev => ({ ...prev, [recordId]: newRecord }));
      toast.success(t('records.uploadSuccess', { name: file.name }));
    }
  };

  const handleDownload = (fileName) => {
    toast.success(t('records.downloading', { name: fileName }));
  };

  const RecordCard = ({ record }) => (
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
            <span>{t(`records.types.${record.type}`, record.type)}</span>
            <span>•</span>
            <span>{format(record.date, "PP", { locale: getDateLocale() })}</span>
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
      <Button variant="ghost" size="sm" onClick={() => handleDownload(record.name)}>
        <Download className="w-4 h-4" />
      </Button>
    </div>
  );

  const UserRecordSlot = ({ recordDef, uploadedRecord }) => (
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
                <span>{format(uploadedRecord.date, "PP", { locale: getDateLocale() })}</span>
                <span>•</span>
                <span>{uploadedRecord.size}</span>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">{t('records.noFile')}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {uploadedRecord && (
            <Button variant="ghost" size="sm" onClick={() => handleDownload(uploadedRecord.fileName)}>
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
                {uploadedRecord ? t('records.update') : t('records.chooseFile')}
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
    >
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
            {t('records.title')}
          </h1>
          <p className="text-muted-foreground mt-1">
            {t('records.subtitle')}
          </p>
        </div>

        {/* Records Tabs */}
        <Tabs defaultValue="doctor" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="doctor" className="gap-2">
              <Stethoscope className="w-4 h-4" />
              {t('records.sharedByDoctor')} ({doctorRecords.length})
            </TabsTrigger>
            <TabsTrigger value="user" className="gap-2">
              <User className="w-4 h-4" />
              {t('records.myUploads')}
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
                  <h3 className="font-semibold text-foreground">{t('records.noRecordsDoctor')}</h3>
                  <p className="text-muted-foreground mt-2">
                    {t('records.noRecordsDoctorSub')}
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
