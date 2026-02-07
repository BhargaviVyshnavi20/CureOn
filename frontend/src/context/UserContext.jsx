import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Mock data for different user types
  const [patientProfile, setPatientProfile] = useState({
    name: "Alex Thompson",
    email: "alex.t@example.com",
    phone: "+1 (555) 123-4567",
    dob: "1990-05-15",
    address: "123 Health Street, Medical District, NY 10001",
    bloodType: "o+",
    height: "175",
    weight: "70",
    allergies: "Penicillin, Peanuts",
    chronicDiseases: "Mild Asthma, Hypertension",
    pastDiseases: "Appendectomy (2015), Chickenpox (1995)",
    familyHistory: "Father: Diabetes Type 2",
    avatar: null,
    patientId: "#PT-2024-001"
  });

  const [doctorProfile, setDoctorProfile] = useState({
    name: "Dr. Sarah Johnson",
    email: "sarah.j@medicare.com",
    phone: "+1 (555) 123-4567",
    specialty: "General Physician",
    experience: "12 Years",
    location: "Building A, Room 204",
    about: "Dr. Sarah Johnson is a compassionate General Physician...",
    avatar: null, // "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    licenseNumber: "MED-55667788",
    hospital: "Central City Heart Center",
    dob: "1982-08-20"
  });

  const [adminProfile, setAdminProfile] = useState({
    name: "Admin User",
    email: "admin@medicare.com",
    phone: "+1 (555) 000-0000",
    role: "Super Admin",
    employeeId: "ADM-001",
    avatar: null
  });

  const [pharmacyProfile, setPharmacyProfile] = useState({
    name: "Central Pharmacy",
    email: "pharmacy@medicare.com",
    phone: "+1 (555) 999-8888",
    licenseNumber: "PH-12345",
    address: "Building B, Ground Floor",
    avatar: null
  });

  const [labProfile, setLabProfile] = useState({
    name: "Medicare Labs",
    email: "labs@medicare.com",
    phone: "+1 (555) 777-6666",
    licenseNumber: "LAB-98765",
    department: "Pathology & Diagnostics",
    avatar: null
  });

  const updateUser = (type, data) => {
    switch (type) {
      case "patient":
        setPatientProfile((prev) => ({ ...prev, ...data }));
        break;
      case "doctor":
        setDoctorProfile((prev) => ({ ...prev, ...data }));
        break;
      case "admin":
        setAdminProfile((prev) => ({ ...prev, ...data }));
        break;
      case "pharmacy":
        setPharmacyProfile((prev) => ({ ...prev, ...data }));
        break;
      case "labs":
        setLabProfile((prev) => ({ ...prev, ...data }));
        break;
      default:
        console.warn("Unknown user type:", type);
    }
  };

  const getUser = (type) => {
    switch (type) {
      case "patient":
        return patientProfile;
      case "doctor":
        return doctorProfile;
      case "admin":
        return adminProfile;
      case "pharmacy":
        return pharmacyProfile;
      case "labs":
        return labProfile;
      default:
        return null;
    }
  };

  return (
    <UserContext.Provider value={{ patientProfile, doctorProfile, adminProfile, pharmacyProfile, labProfile, updateUser, getUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
