import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  Activity,
  FileText,
  Pill,
  Clock,
  LayoutDashboard,
  Stethoscope,
  Users,
  FlaskConical,
  Settings
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Reuse navItems from AdminPatients context
const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Doctors", href: "/admin/doctors", icon: Stethoscope },
  { name: "Patients", href: "/admin/patients", icon: Users },
  { name: "Pharmacy", href: "/admin/pharmacy", icon: Pill },
  { name: "Labs", href: "/admin/labs", icon: FlaskConical },
  { name: "Appointments", href: "/admin/appointments", icon: Calendar },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

const AdminPatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock Data
  useEffect(() => {
    // Simulate API fetch
    const fetchPatientDetails = () => {
      // Mock patient data based on ID
      const mockPatient = {
        id: id,
        name: id === "1" ? "John Doe" : id === "2" ? "Jane Smith" : "Robert Johnson",
        age: id === "1" ? 34 : id === "2" ? 28 : 45,
        gender: id === "1" ? "Male" : id === "2" ? "Female" : "Male",
        email: id === "1" ? "john.d@example.com" : "patient@example.com",
        phone: "+1 (555) 123-4567",
        address: "123 Main St, New York",
        bloodGroup: "O+",
        height: "178 cm",
        weight: "75 kg",
        allergies: "Penicillin",
        chronicConditions: "Hypertension",
        status: "active",
        visits: [
          { id: "V-001", date: "2024-02-15", doctor: "Dr. Sarah Wilson", specialty: "Cardiology", type: "Follow-up", status: "Completed", diagnosis: "Stable Hypertension" },
          { id: "V-002", date: "2024-01-10", doctor: "Dr. James Chen", specialty: "General Medicine", type: "Consultation", status: "Completed", diagnosis: "Viral Fever" },
          { id: "V-003", date: "2023-11-05", doctor: "Dr. Sarah Wilson", specialty: "Cardiology", type: "Check-up", status: "Completed", diagnosis: "Routine Checkup" },
        ],
        prescriptions: [
          { id: "P-001", date: "2024-02-15", doctor: "Dr. Sarah Wilson", medicines: ["Lisinopril 10mg", "Aspirin 81mg"], status: "Active" },
          { id: "P-002", date: "2024-01-10", doctor: "Dr. James Chen", medicines: ["Paracetamol 650mg"], status: "Completed" },
        ],
        labReports: [
          { id: "L-001", date: "2024-02-14", test: "Lipid Profile", lab: "BioTest Diagnostics", result: "Normal", status: "Available" },
          { id: "L-002", date: "2024-01-10", test: "CBC", lab: "QuickLab Services", result: "Normal", status: "Available" },
        ]
      };
      setPatient(mockPatient);
      setLoading(false);
    };

    fetchPatientDetails();
  }, [id]);

  if (loading) {
    return (
      <DashboardLayout navItems={navItems} userType="admin">
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Loading patient details...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!patient) {
    return (
      <DashboardLayout navItems={navItems} userType="admin">
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <p className="text-muted-foreground">Patient not found</p>
          <Button onClick={() => navigate("/admin/patients")}>Back to Patients</Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout navItems={navItems} userType="admin">
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <Button 
            variant="ghost" 
            className="w-fit -ml-2 text-muted-foreground hover:text-foreground"
            onClick={() => navigate("/admin/patients")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Patients
          </Button>
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold text-2xl">{patient.name.charAt(0)}</span>
              </div>
              <div>
                <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">{patient.name}</h1>
                <div className="flex items-center gap-2 text-muted-foreground mt-1">
                  <User className="w-4 h-4" />
                  <span>{patient.age} years • {patient.gender}</span>
                  <span className="mx-2">•</span>
                  <Badge variant={patient.status === "active" ? "default" : "secondary"}>
                    {patient.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="visits">Visits History</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="reports">Lab Reports</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Full Name</p>
                      <p className="font-medium">{patient.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date of Birth</p>
                      <p className="font-medium">Jan 15, 1990</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Gender</p>
                      <p className="font-medium">{patient.gender}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Blood Group</p>
                      <p className="font-medium">{patient.bloodGroup}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{patient.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{patient.phone}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium">{patient.address}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" />
                    Medical Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Height</p>
                      <p className="font-medium">{patient.height}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Weight</p>
                      <p className="font-medium">{patient.weight}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Allergies</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-200 border-none">
                        {patient.allergies}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Chronic Conditions</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-none">
                        {patient.chronicConditions}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Visits History Tab */}
          <TabsContent value="visits" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Past Visits ({patient.visits.length})
                </CardTitle>
                <CardDescription>
                  History of doctor appointments and consultations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Specialty</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Diagnosis</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patient.visits.map((visit) => (
                      <TableRow key={visit.id}>
                        <TableCell className="font-medium">{visit.date}</TableCell>
                        <TableCell>{visit.doctor}</TableCell>
                        <TableCell>{visit.specialty}</TableCell>
                        <TableCell>{visit.type}</TableCell>
                        <TableCell>{visit.diagnosis}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {visit.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Prescriptions Tab */}
          <TabsContent value="prescriptions" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Pill className="w-5 h-5 text-primary" />
                  Prescription History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patient.prescriptions.map((script) => (
                    <div key={script.id} className="p-4 rounded-lg border border-border bg-card/50">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium text-foreground">{script.date}</p>
                          <p className="text-sm text-muted-foreground">Prescribed by {script.doctor}</p>
                        </div>
                        <Badge variant="secondary">{script.status}</Badge>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Medicines:</p>
                        <ul className="list-disc list-inside text-sm">
                          {script.medicines.map((med, idx) => (
                            <li key={idx}>{med}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Lab Reports Tab */}
          <TabsContent value="reports" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Lab Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Test Name</TableHead>
                      <TableHead>Laboratory</TableHead>
                      <TableHead>Result</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patient.labReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.date}</TableCell>
                        <TableCell>{report.test}</TableCell>
                        <TableCell>{report.lab}</TableCell>
                        <TableCell>{report.result}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {report.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminPatientDetails;
