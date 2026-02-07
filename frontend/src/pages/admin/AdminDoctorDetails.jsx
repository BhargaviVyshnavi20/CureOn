import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Stethoscope,
  Calendar,
  Settings,
  Mail,
  Phone,
  ArrowLeft,
  Award,
  Clock,
  MapPin,
  User,
  Users,
  Pill,
  FlaskConical
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Doctors", href: "/admin/doctors", icon: Stethoscope },
  { name: "Patients", href: "/admin/patients", icon: Users },
  { name: "Pharmacy", href: "/admin/pharmacy", icon: Pill },
  { name: "Labs", href: "/admin/labs", icon: FlaskConical },
  { name: "Appointments", href: "/admin/appointments", icon: Calendar },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

// Mock data for doctors
const doctorsData = {
  "1": {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "General Physician",
    email: "sarah.j@medicare.com",
    phone: "+1 (555) 123-4567",
    experience: "12 Years",
    location: "Building A, Room 204",
    about: "Dr. Sarah Johnson is a compassionate General Physician with over a decade of experience in providing comprehensive healthcare. She specializes in preventive medicine and chronic disease management.",
    patientsTreated: [
      { id: 101, name: "Emily Rodriguez", treatment: "Regular Checkup", date: "2024-01-15", status: "Completed" },
      { id: 102, name: "Michael Chang", treatment: "Flu Treatment", date: "2024-01-18", status: "Completed" },
      { id: 103, name: "Jessica Smith", treatment: "Vaccination", date: "2024-01-20", status: "Completed" },
      { id: 104, name: "David Wilson", treatment: "Blood Pressure Monitoring", date: "2024-01-22", status: "Follow-up" },
    ]
  },
  "2": {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Cardiologist",
    email: "michael.c@medicare.com",
    phone: "+1 (555) 234-5678",
    experience: "15 Years",
    location: "Heart Center, Wing B",
    about: "Dr. Michael Chen is a renowned Cardiologist dedicated to heart health. He has extensive experience in diagnosing and treating cardiovascular diseases.",
    patientsTreated: [
      { id: 201, name: "Robert Brown", treatment: "Cardiac Consultation", date: "2024-01-10", status: "Completed" },
      { id: 202, name: "Linda Davis", treatment: "ECG Test", date: "2024-01-12", status: "Completed" },
      { id: 203, name: "James Miller", treatment: "Heart Surgery Follow-up", date: "2024-01-25", status: "Scheduled" },
    ]
  },
  "3": {
    id: "3",
    name: "Dr. Emily Williams",
    specialty: "Dermatologist",
    email: "emily.w@medicare.com",
    phone: "+1 (555) 345-6789",
    experience: "8 Years",
    location: "Skin Care Clinic, Room 305",
    about: "Dr. Emily Williams is a skilled Dermatologist specializing in skin care and cosmetic procedures. She is committed to helping patients achieve healthy, radiant skin.",
    patientsTreated: [
      { id: 301, name: "Sophia Taylor", treatment: "Acne Treatment", date: "2024-01-05", status: "Completed" },
      { id: 302, name: "Daniel Anderson", treatment: "Skin Allergy", date: "2024-01-08", status: "Completed" },
    ]
  },
  "4": {
    id: "4",
    name: "Dr. James Wilson",
    specialty: "Orthopedic",
    email: "james.w@medicare.com",
    phone: "+1 (555) 456-7890",
    experience: "14 Years",
    location: "Orthopedic Wing, Room 102",
    about: "Dr. James Wilson is an expert Orthopedic Surgeon with a focus on sports injuries and joint replacement. He has helped numerous athletes recover and return to peak performance.",
    patientsTreated: [
      { id: 401, name: "Chris Evans", treatment: "Knee Surgery", date: "2024-01-02", status: "Completed" },
      { id: 402, name: "Patricia Moore", treatment: "Physical Therapy Consultation", date: "2024-01-12", status: "Follow-up" },
    ]
  },
  "5": {
    id: "5",
    name: "Dr. Lisa Anderson",
    specialty: "Neurologist",
    email: "lisa.a@medicare.com",
    phone: "+1 (555) 567-8901",
    experience: "10 Years",
    location: "Neuroscience Center, Room 404",
    about: "Dr. Lisa Anderson is a dedicated Neurologist specializing in the diagnosis and treatment of disorders of the nervous system, including epilepsy and migraines.",
    patientsTreated: [
      { id: 501, name: "Nancy White", treatment: "Migraine Treatment", date: "2024-01-14", status: "Completed" },
      { id: 502, name: "George King", treatment: "Epilepsy Management", date: "2024-01-18", status: "Scheduled" },
    ]
  },
  "6": {
    id: "6",
    name: "Dr. Robert Brown",
    specialty: "Pediatrician",
    email: "robert.b@medicare.com",
    phone: "+1 (555) 678-9012",
    experience: "6 Years",
    location: "Children's Ward, Room 201",
    about: "Dr. Robert Brown is a caring Pediatrician who loves working with children. He focuses on the physical, emotional, and social health of infants, children, and adolescents.",
    patientsTreated: []
  }
};

const AdminDoctorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const doctor = doctorsData[id] || {
    name: "Doctor Not Found",
    specialty: "-",
    email: "-",
    phone: "-",
    experience: "-",
    location: "-",
    about: "No details available.",
    patientsTreated: []
  };

  return (
    <DashboardLayout navItems={navItems} userType="admin">
      <div className="space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate("/admin/doctors")}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Doctor Details</h1>
            <p className="text-muted-foreground">View detailed information and patient history</p>
          </div>
        </div>

        {/* Doctor Profile Card */}
        <div className="dashboard-card p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-primary font-bold text-3xl">{doctor.name.split(" ")[1]?.charAt(0)}</span>
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground">{doctor.name}</h2>
                <p className="text-lg text-muted-foreground font-medium">{doctor.specialty}</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>{doctor.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>{doctor.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Award className="w-4 h-4 text-primary" />
                  <span>Experience: {doctor.experience}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{doctor.location}</span>
                </div>
              </div>

              <div className="pt-2">
                <h3 className="font-semibold mb-1">About</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{doctor.about}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Patients Treated Table */}
        <div className="space-y-4">
          <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Patients Treated
          </h2>
          
          <div className="dashboard-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Treatment/Condition</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {doctor.patientsTreated.length > 0 ? (
                  doctor.patientsTreated.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell className="font-medium">{patient.name}</TableCell>
                      <TableCell>{patient.treatment}</TableCell>
                      <TableCell>{patient.date}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          patient.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                          patient.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {patient.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                      No patients treated yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDoctorDetails;
