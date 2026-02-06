import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/context/UserContext";
import ScrollToHashElement from "@/components/utils/ScrollToHashElement";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
<<<<<<< HEAD
import ForgotPassword from "./pages/ForgotPassword";
=======
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
import PatientDashboard from "./pages/patient/PatientDashboard";
import PatientAppointments from "./pages/patient/PatientAppointments";
import PatientRecords from "./pages/patient/PatientRecords";
import PatientPrescriptions from "./pages/patient/PatientPrescriptions";
import PatientChatbot from "./pages/patient/PatientChatbot";
import PatientSettings from "./pages/patient/PatientSettings";
import PatientProfile from "./pages/patient/PatientProfile";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import DoctorPatients from "./pages/doctor/DoctorPatients";
<<<<<<< HEAD
import DoctorPatientDetails from "./pages/doctor/DoctorPatientDetails";
=======
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
import DoctorAvailability from "./pages/doctor/DoctorAvailability";
import DoctorSettings from "./pages/doctor/DoctorSettings";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminDoctors from "./pages/admin/AdminDoctors";
import AdminPatients from "./pages/admin/AdminPatients";
<<<<<<< HEAD
import AdminPatientDetails from "./pages/admin/AdminPatientDetails";
import AdminLabs from "./pages/admin/AdminLabs";
import AdminLabDetails from "./pages/admin/AdminLabDetails";
import AdminPharmacy from "./pages/admin/AdminPharmacy";
import AdminPharmacyInventory from "./pages/admin/AdminPharmacyInventory";
import AdminPharmacyOrders from "./pages/admin/AdminPharmacyOrders";
=======
import AdminPharmacy from "./pages/admin/AdminPharmacy";
import AdminLabs from "./pages/admin/AdminLabs";
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
import AdminDoctorDetails from "./pages/admin/AdminDoctorDetails";
import AdminAppointments from "./pages/admin/AdminAppointments";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminProfile from "./pages/admin/AdminProfile";
import PharmacyDashboard from "./pages/pharmacy/PharmacyDashboard";
import PharmacyOrders from "./pages/pharmacy/PharmacyOrders";
import PharmacyInventory from "./pages/pharmacy/PharmacyInventory";
import PharmacyHistory from "./pages/pharmacy/PharmacyHistory";
import PharmacySettings from "./pages/pharmacy/PharmacySettings";
import PharmacyProfile from "./pages/pharmacy/PharmacyProfile";
import LabsDashboard from "./pages/labs/LabsDashboard";
import LabsRequests from "./pages/labs/LabsRequests";
import LabsResults from "./pages/labs/LabsResults";
import LabsEquipment from "./pages/labs/LabsEquipment";
import LabsEquipmentIssues from "./pages/labs/LabsEquipmentIssues";
import LabsHistory from "./pages/labs/LabsHistory";
import LabsSettings from "./pages/labs/LabsSettings";
import LabsProfile from "./pages/labs/LabsProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToHashElement />
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
<<<<<<< HEAD
          <Route path="/forgot-password" element={<ForgotPassword />} />
=======
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
          {/* Patient Routes */}
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
          <Route path="/patient/appointments" element={<PatientAppointments />} />
          <Route path="/patient/records" element={<PatientRecords />} />
          <Route path="/patient/prescriptions" element={<PatientPrescriptions />} />
          <Route path="/patient/chatbot" element={<PatientChatbot />} />
          <Route path="/patient/settings" element={<PatientSettings />} />
          <Route path="/patient/profile" element={<PatientProfile />} />
          {/* Doctor Routes */}
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor/appointments" element={<DoctorAppointments />} />
          <Route path="/doctor/patients" element={<DoctorPatients />} />
<<<<<<< HEAD
          <Route path="/doctor/patients/:id" element={<DoctorPatientDetails />} />
=======
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
          <Route path="/doctor/availability" element={<DoctorAvailability />} />
          <Route path="/doctor/settings" element={<DoctorSettings />} />
          <Route path="/doctor/profile" element={<DoctorProfile />} />
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/doctors" element={<AdminDoctors />} />
          <Route path="/admin/patients" element={<AdminPatients />} />
<<<<<<< HEAD
          <Route path="/admin/patients/:id" element={<AdminPatientDetails />} />
          <Route path="/admin/labs" element={<AdminLabs />} />
        <Route path="/admin/labs/:id" element={<AdminLabDetails />} />
        <Route path="/admin/pharmacy" element={<AdminPharmacy />} />
        <Route path="/admin/pharmacy/inventory" element={<AdminPharmacyInventory />} />
        <Route path="/admin/pharmacy/orders" element={<AdminPharmacyOrders />} />
=======
          <Route path="/admin/pharmacy" element={<AdminPharmacy />} />
          <Route path="/admin/labs" element={<AdminLabs />} />
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
          <Route path="/admin/doctors/:id" element={<AdminDoctorDetails />} />
          <Route path="/admin/appointments" element={<AdminAppointments />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          {/* Pharmacy Routes */}
          <Route path="/pharmacy/dashboard" element={<PharmacyDashboard />} />
          <Route path="/pharmacy/orders" element={<PharmacyOrders />} />
          <Route path="/pharmacy/inventory" element={<PharmacyInventory />} />
          <Route path="/pharmacy/history" element={<PharmacyHistory />} />
          <Route path="/pharmacy/settings" element={<PharmacySettings />} />
          <Route path="/pharmacy/profile" element={<PharmacyProfile />} />
          {/* Labs Routes */}
          <Route path="/labs/dashboard" element={<LabsDashboard />} />
          <Route path="/labs/requests" element={<LabsRequests />} />
          <Route path="/labs/results" element={<LabsResults />} />
          <Route path="/labs/equipment" element={<LabsEquipment />} />
          <Route path="/labs/equipment/issues" element={<LabsEquipmentIssues />} />
          <Route path="/labs/history" element={<LabsHistory />} />
          <Route path="/labs/settings" element={<LabsSettings />} />
          <Route path="/labs/profile" element={<LabsProfile />} />
          <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
