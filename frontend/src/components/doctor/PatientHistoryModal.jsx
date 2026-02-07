import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Pill, Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PatientHistoryModal = ({ open, onOpenChange, patient }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);

  if (!patient) return null;

  const prescriptions = [
    { id: 1, medicine: "Amoxicillin 500mg", dosage: "1 tablet, 3 times daily", duration: "7 days", date: "Jan 20, 2026", doctor: "Dr. Sarah Johnson" },
    { id: 2, medicine: "Paracetamol 650mg", dosage: "1 tablet as needed", duration: "5 days", date: "Jan 15, 2026", doctor: "Dr. Sarah Johnson" },
    { id: 3, medicine: "Vitamin D3", dosage: "1 capsule daily", duration: "30 days", date: "Dec 28, 2025", doctor: "Dr. Michael Chen" },
  ];

  const records = [
    { id: 1, name: "Blood Test Report", type: "Lab Report", date: "Jan 18, 2026", uploadedBy: "Doctor" },
    { id: 2, name: "Chest X-Ray", type: "Imaging", date: "Jan 16, 2026", uploadedBy: "Doctor" },
    { id: 3, name: "Previous Medical History", type: "Document", date: "Jan 10, 2026", uploadedBy: "Patient" },
    { id: 4, name: "Allergy Test Results", type: "Lab Report", date: "Dec 20, 2025", uploadedBy: "Doctor" },
    ...uploadedFiles.map((file, index) => ({
      id: 100 + index,
      name: file.name,
      type: "Uploaded Document",
      date: file.date,
      uploadedBy: "Doctor",
    })),
  ];

  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const newFile = {
        name: file.name,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      };
      setUploadedFiles([...uploadedFiles, newFile]);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            Patient History - {patient.name}
          </DialogTitle>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{patient.age} years old</span>
            <span>•</span>
            <span className="text-primary font-medium">{patient.condition}</span>
          </div>
        </DialogHeader>

        <Tabs defaultValue="prescriptions" className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="prescriptions" className="gap-2">
              <Pill className="w-4 h-4" />
              Prescriptions
            </TabsTrigger>
            <TabsTrigger value="records" className="gap-2">
              <FileText className="w-4 h-4" />
              Records
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto mt-4">
            <TabsContent value="prescriptions" className="mt-0 space-y-3">
              {prescriptions.map((rx) => (
                <div key={rx.id} className="p-4 rounded-xl bg-secondary/50 border border-border">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-foreground">{rx.medicine}</h4>
                      <p className="text-sm text-muted-foreground">{rx.doctor}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{rx.date}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-foreground">{rx.dosage}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{rx.duration}</span>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="records" className="mt-0 space-y-3">
              {/* Upload Button */}
              <div className="p-4 rounded-xl border-2 border-dashed border-border">
                <Label htmlFor="doctor-file-upload" className="cursor-pointer">
                  <Input
                    id="doctor-file-upload"
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <div className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                    <Upload className="w-5 h-5" />
                    <span className="font-medium">Upload prescription or medical file</span>
                  </div>
                </Label>
              </div>

              {records.map((record) => (
                <div key={record.id} className="p-4 rounded-xl bg-secondary/50 border border-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{record.name}</h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{record.type}</span>
                        <span>•</span>
                        <span>{record.date}</span>
                        <span>•</span>
                        <span className={record.uploadedBy === "Doctor" ? "text-primary" : "text-accent"}>
                          {record.uploadedBy}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default PatientHistoryModal;
