import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Calendar, 
  FileText, 
  Pill, 
  Activity, 
  Clock, 
  Phone, 
  Mail, 
  MapPin, 
  AlertCircle, 
  Download, 
  Upload, 
  CheckCircle2,
  Stethoscope,
  Thermometer,
  Heart,
  Weight
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const DoctorPatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const fileInputRef = useRef(null);
  
  // Mock patient data - normally fetched by ID
  // Using the same data structure as DoctorPatients.jsx for consistency
  const patientData = {
    id: id,
    name: id === "1" ? "Emily Rodriguez" : "James Wilson", // Simple toggle for demo
    email: id === "1" ? "emily.r@email.com" : "james.w@email.com",
    phone: id === "1" ? "+1 (555) 123-4567" : "+1 (555) 234-5678",
    age: id === "1" ? 32 : 45,
    gender: id === "1" ? "Female" : "Male",
    bloodType: id === "1" ? "O+" : "A-",
    height: id === "1" ? "165 cm" : "180 cm",
    weight: id === "1" ? "62 kg" : "85 kg",
    condition: id === "1" ? "Hypertension" : "Diabetes Type 2",
    address: "123 Medical Center Dr, Suite 100, New York, NY",
    allergies: ["Penicillin", "Peanuts"],
    chronicConditions: id === "1" ? ["Hypertension", "Asthma"] : ["Diabetes Type 2"],
    emergencyContact: {
      name: "Roberto Rodriguez",
      relation: "Husband",
      phone: "+1 (555) 987-6543"
    },
    avatar: id === "1" ? "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" : undefined
  };

  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Mock Nav Items
  const navItems = [
    { name: "Dashboard", href: "/doctor/dashboard", icon: Activity },
    { name: "Appointments", href: "/doctor/appointments", icon: Calendar },
    { name: "Patients", href: "/doctor/patients", icon: Stethoscope },
    { name: "Manage Availability", href: "/doctor/availability", icon: Clock },
  ];

  const visits = [
    { id: 1, date: "Jan 20, 2026", type: "Follow-up", doctor: "Dr. Sarah Johnson", notes: "Patient reports feeling better. BP 120/80.", diagnosis: "Hypertension managed" },
    { id: 2, date: "Dec 15, 2025", type: "Emergency", doctor: "Dr. Michael Chen", notes: "Complained of chest pain. ECG normal.", diagnosis: "Acid Reflux" },
    { id: 3, date: "Nov 01, 2025", type: "Routine Checkup", doctor: "Dr. Sarah Johnson", notes: "Regular annual physical.", diagnosis: "Healthy" },
  ];

  const prescriptions = [
    { id: 1, medicine: "Amoxicillin 500mg", dosage: "1 tablet, 3 times daily", duration: "7 days", date: "Jan 20, 2026", doctor: "Dr. Sarah Johnson", status: "Active" },
    { id: 2, medicine: "Paracetamol 650mg", dosage: "1 tablet as needed", duration: "5 days", date: "Jan 15, 2026", doctor: "Dr. Sarah Johnson", status: "Completed" },
    { id: 3, medicine: "Lisinopril 10mg", dosage: "1 tablet daily", duration: "Ongoing", date: "Dec 28, 2025", doctor: "Dr. Michael Chen", status: "Active" },
  ];

  const reports = [
    { id: 1, name: "Blood Test Report", type: "Lab Report", date: "Jan 18, 2026", uploadedBy: "Doctor" },
    { id: 2, name: "Chest X-Ray", type: "Imaging", date: "Jan 16, 2026", uploadedBy: "Doctor" },
    { id: 3, name: "Previous Medical History", type: "Document", date: "Jan 10, 2026", uploadedBy: "Patient" },
    ...uploadedFiles
  ];

  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const newFile = {
        id: Date.now(),
        name: file.name,
        type: "Uploaded Document",
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        uploadedBy: "Doctor"
      };
      setUploadedFiles([...uploadedFiles, newFile]);
      toast.success(`Uploaded ${file.name}`);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <DashboardLayout navItems={navItems} userType="doctor">
      <div className="space-y-6 animate-fade-in">
        {/* Header / Navigation */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/doctor/patients")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Patient Details</h1>
            <p className="text-muted-foreground">View full history and records for {patientData.name}</p>
          </div>
        </div>

        {/* Patient Profile Card */}
        <Card className="border-border/50 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <Avatar className="w-24 h-24 md:w-32 md:h-32 rounded-2xl border-4 border-background shadow-lg">
                  <AvatarImage src={patientData.avatar} alt={patientData.name} />
                  <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                    {patientData.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                      {patientData.name}
                      <Badge variant={patientData.condition === "Healthy" ? "success" : "warning"}>
                        {patientData.condition}
                      </Badge>
                    </h2>
                    <p className="text-muted-foreground mt-1">
                      {patientData.gender} • {patientData.age} years old • Blood Type: <span className="font-medium text-foreground">{patientData.bloodType}</span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                    <Button variant="outline">
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-muted-foreground">Phone</p>
                      <p className="font-medium">{patientData.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-muted-foreground">Email</p>
                      <p className="font-medium">{patientData.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-muted-foreground">Address</p>
                      <p className="font-medium truncate">{patientData.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comprehensive Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="visits">Visits History</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="reports">Lab Reports</TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Vitals */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary" /> Current Vitals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">Blood Pressure</span>
                    <span className="font-bold">120/80</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">Heart Rate</span>
                    <span className="font-bold">72 bpm</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">Temperature</span>
                    <span className="font-bold">98.6 °F</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">SpO2</span>
                    <span className="font-bold">98%</span>
                  </div>
                </CardContent>
              </Card>

              {/* Allergies */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-destructive" /> Allergies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {patientData.allergies.map((allergy, i) => (
                      <Badge key={i} variant="destructive" className="bg-destructive/10 text-destructive hover:bg-destructive/20 border-0">
                        {allergy}
                      </Badge>
                    ))}
                    {patientData.allergies.length === 0 && <span className="text-muted-foreground text-sm">No known allergies</span>}
                  </div>
                </CardContent>
              </Card>

              {/* Chronic Conditions */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium flex items-center gap-2">
                    <Heart className="w-4 h-4 text-orange-500" /> Chronic Conditions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                   <div className="space-y-2">
                    {patientData.chronicConditions.map((condition, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-orange-500" />
                        <span>{condition}</span>
                      </div>
                    ))}
                   </div>
                </CardContent>
              </Card>
            </div>

             <Card>
                <CardHeader>
                  <CardTitle>Emergency Contact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p className="font-medium">{patientData.emergencyContact.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Relation</p>
                      <p className="font-medium">{patientData.emergencyContact.relation}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{patientData.emergencyContact.phone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
          </TabsContent>

          {/* VISITS TAB */}
          <TabsContent value="visits" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Visit History</CardTitle>
                <CardDescription>Record of past appointments and consultations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {visits.map((visit) => (
                    <div key={visit.id} className="flex flex-col md:flex-row gap-4 pb-6 border-b border-border last:border-0 last:pb-0">
                      <div className="min-w-[120px]">
                        <div className="font-semibold text-foreground">{visit.date}</div>
                        <div className="text-sm text-muted-foreground">{visit.type}</div>
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{visit.diagnosis}</h4>
                          <span className="text-sm text-primary bg-primary/10 px-2 py-1 rounded-md">{visit.doctor}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{visit.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* PRESCRIPTIONS TAB */}
          <TabsContent value="prescriptions" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Medications</CardTitle>
                <CardDescription>Active and past prescriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {prescriptions.map((rx) => (
                    <div key={rx.id} className="flex items-center justify-between p-4 rounded-xl border border-border bg-card/50 hover:bg-accent/5 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 mt-1">
                          <Pill className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{rx.medicine}</h4>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
                            <span>{rx.dosage}</span>
                            <span>•</span>
                            <span>{rx.duration}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Prescribed by {rx.doctor} on {rx.date}</p>
                        </div>
                      </div>
                      <Badge variant={rx.status === "Active" ? "default" : "secondary"}>
                        {rx.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* REPORTS TAB */}
          <TabsContent value="reports" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Medical Records & Reports</CardTitle>
                  <CardDescription>Lab results, imaging, and other documents</CardDescription>
                </div>
                <div>
                  <Input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <Button onClick={() => fileInputRef.current?.click()}>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Report
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {reports.map((report, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-border hover:bg-accent/5 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{report.name}</h4>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{report.type}</span>
                            <span>•</span>
                            <span>{report.date}</span>
                            <span>•</span>
                            <span>Uploaded by {report.uploadedBy}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DoctorPatientDetails;
