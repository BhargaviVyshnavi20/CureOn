import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FlaskConical,
  TestTube2,
  FileBarChart,
  ClipboardCheck,
  History,
  Settings,
  Activity,
  Microscope,
  CheckCircle2,
  Clock,
  ChevronRight,
} from "lucide-react";
import { useUser } from "@/context/UserContext";

const navItems = [
  { name: "Dashboard", href: "/labs/dashboard", icon: LayoutDashboard },
  { name: "Test Requests", href: "/labs/requests", icon: FlaskConical },
  { name: "Results", href: "/labs/results", icon: FileBarChart },
  { name: "Equipment", href: "/labs/equipment", icon: Microscope },
  { name: "History", href: "/labs/history", icon: History },
  { name: "Settings", href: "/labs/settings", icon: Settings },
];

const LabsDashboard = () => {
  const { getUser } = useUser();
  const navigate = useNavigate();
  const user = getUser("labs");

  // Mock data for lab stats
  const stats = [
    {
      title: "Pending Tests",
      value: "18",
      icon: TestTube2,
      description: "Awaiting analysis",
      path: "/labs/requests"
    },
    {
      title: "Completed Today",
      value: "32",
      icon: CheckCircle2,
      description: "Reports generated",
      path: "/labs/history"
    },
    {
      title: "Critical Results",
      value: "3",
      icon: Activity,
      description: "Immediate action needed",
      path: "/labs/results"
    },
    {
      title: "Avg Turnaround",
      value: "4.5h",
      icon: Clock,
      description: "Time to report",
      path: "/labs/history"
    },
  ];

  const recentRequests = [
    {
      id: "LAB-001",
      patient: "Emily Rodriguez",
      doctor: "Dr. Sarah Johnson",
      tests: ["CBC", "Lipid Profile"],
      priority: "Routine",
      status: "In Progress",
      time: "09:15 AM",
    },
    {
      id: "LAB-002",
      patient: "David Chen",
      doctor: "Dr. Michael Chang",
      tests: ["Thyroid Function"],
      priority: "Urgent",
      status: "Pending",
      time: "10:00 AM",
    },
    {
      id: "LAB-003",
      patient: "Sarah Williams",
      doctor: "Dr. Lisa Anderson",
      tests: ["Urinalysis"],
      priority: "Routine",
      status: "Completed",
      time: "08:30 AM",
    },
  ];

  return (
    <DashboardLayout navItems={navItems} userType="labs">
      <div className="space-y-8 animate-fade-in">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold font-display text-foreground">
              Laboratory Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, {user?.name || "Lab Technician"}
            </p>
          </div>
          <Button variant="hero" className="shrink-0" onClick={() => navigate("/labs/results")}>
            <ClipboardCheck className="w-4 h-4 mr-2" />
            Enter Results
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              onClick={() => navigate(stat.path)} 
              className="cursor-pointer transition-all hover:shadow-md"
            >
              <StatCard {...stat} />
            </div>
          ))}
        </div>

        {/* Recent Requests & Equipment Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Requests */}
          <div className="lg:col-span-2 bg-card rounded-xl border border-border shadow-sm">
            <div className="p-6 border-b border-border flex justify-between items-center">
              <h2 className="font-semibold text-lg">Recent Test Requests</h2>
              <Button variant="ghost" size="sm" className="text-primary" onClick={() => navigate("/labs/requests")}>
                View All
              </Button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentRequests.map((req) => (
                  <div
                    key={req.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {req.patient.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">
                          {req.patient}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {req.tests.join(", ")}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-2 mb-1">
                        {req.priority === "Urgent" && (
                          <span className="text-xs font-bold text-destructive animate-pulse">
                            URGENT
                          </span>
                        )}
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            req.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : req.status === "In Progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {req.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-end gap-2">
                        <p className="text-xs text-muted-foreground mr-2">
                          {req.time}
                        </p>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6" 
                          onClick={() => navigate("/labs/requests")}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Equipment Status */}
          <div className="bg-card rounded-xl border border-border shadow-sm">
            <div className="p-6 border-b border-border">
              <h2 className="font-semibold text-lg">Equipment Status</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { name: "Hematology Analyzer", status: "Operational", color: "text-green-600" },
                  { name: "Centrifuge A", status: "Maintenance", color: "text-yellow-600" },
                  { name: "Microscope B", status: "Operational", color: "text-green-600" },
                  { name: "Chemistry Analyzer", status: "Calibrating", color: "text-blue-600" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Microscope className="w-5 h-5 text-muted-foreground" />
                      <span className="font-medium text-sm">{item.name}</span>
                    </div>
                    <span className={`text-xs font-medium ${item.color}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-6" onClick={() => navigate("/labs/equipment")}>
                Schedule Maintenance
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LabsDashboard;
