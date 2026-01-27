import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AppointmentCard from "@/components/dashboard/AppointmentCard";
import RescheduleModal from "@/components/patient/RescheduleModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Stethoscope, Calendar, Settings, Check, X, CalendarDays } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Doctors", href: "/admin/doctors", icon: Stethoscope },
  { name: "Appointments", href: "/admin/appointments", icon: Calendar },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

interface RescheduleRequest {
  id: string;
  doctorName: string;
  patientName: string;
  currentDate: string;
  currentTime: string;
  requestedDate?: string;
  requestedTime?: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
}

const AdminAppointments = () => {
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [manageModalOpen, setManageModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<RescheduleRequest | null>(null);

  const [rescheduleRequests, setRescheduleRequests] = useState<RescheduleRequest[]>([
    {
      id: "1",
      doctorName: "Dr. Sarah Johnson",
      patientName: "Emily Rodriguez",
      currentDate: "Jan 25, 2026",
      currentTime: "10:00 AM",
      reason: "Emergency surgery scheduled",
      status: "pending",
    },
    {
      id: "2",
      doctorName: "Dr. Michael Chen",
      patientName: "James Wilson",
      currentDate: "Jan 26, 2026",
      currentTime: "2:30 PM",
      reason: "Personal emergency",
      status: "pending",
    },
  ]);

  const upcomingAppointments = [
    { doctorName: "Sarah Johnson", patientName: "Emily Rodriguez", date: "Jan 25, 2026", time: "10:00 AM", type: "video" as const, status: "upcoming" as const },
    { doctorName: "Michael Chen", patientName: "James Wilson", date: "Jan 26, 2026", time: "2:30 PM", type: "in-person" as const, status: "upcoming" as const },
  ];
  const completedAppointments = [
    { doctorName: "Sarah Johnson", patientName: "Alex Thompson", date: "Jan 20, 2026", time: "10:00 AM", type: "video" as const, status: "completed" as const },
    { doctorName: "Lisa Anderson", patientName: "Maria Garcia", date: "Jan 19, 2026", time: "3:00 PM", type: "in-person" as const, status: "completed" as const },
  ];
  const cancelledAppointments = [
    { doctorName: "James Wilson", patientName: "Robert Lee", date: "Jan 22, 2026", time: "1:00 PM", type: "video" as const, status: "cancelled" as const },
  ];

  const pendingRequests = rescheduleRequests.filter((r) => r.status === "pending");

  const handleAcceptRequest = (requestId: string) => {
    setRescheduleRequests(
      rescheduleRequests.map((r) =>
        r.id === requestId ? { ...r, status: "approved" as const } : r
      )
    );
  };

  const handleRejectRequest = (requestId: string) => {
    setRescheduleRequests(
      rescheduleRequests.map((r) =>
        r.id === requestId ? { ...r, status: "rejected" as const } : r
      )
    );
  };

  const handleManageClick = (request: RescheduleRequest) => {
    setSelectedRequest(request);
    setManageModalOpen(true);
  };

  const handleManageConfirm = (newDate: Date, newTime: string) => {
    if (selectedRequest) {
      setRescheduleRequests(
        rescheduleRequests.map((r) =>
          r.id === selectedRequest.id
            ? {
                ...r,
                requestedDate: format(newDate, "MMM d, yyyy"),
                requestedTime: newTime,
                status: "approved" as const,
              }
            : r
        )
      );
    }
    setManageModalOpen(false);
    setSelectedRequest(null);
  };

  return (
    <DashboardLayout navItems={navItems} userType="admin" userName="Admin User">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">All Appointments</h1>
          <p className="text-muted-foreground mt-1">View and manage all platform appointments</p>
        </div>

        {/* Reschedule Requests Section */}
        {pendingRequests.length > 0 && (
          <div className="space-y-4">
            <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-warning" />
              Reschedule Requests ({pendingRequests.length})
            </h2>
            <div className="space-y-4">
              {pendingRequests.map((request) => (
                <div key={request.id} className="dashboard-card p-5 border-l-4 border-l-warning">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{request.doctorName}</span>
                        <span className="text-muted-foreground">→</span>
                        <span className="text-foreground">{request.patientName}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Current: {request.currentDate} at {request.currentTime}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Reason: {request.reason}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleManageClick(request)}
                      >
                        Manage
                      </Button>
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => handleAcceptRequest(request.id)}
                        className="bg-success hover:bg-success/90"
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleRejectRequest(request.id)}
                      >
                        <X className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="upcoming">Upcoming ({upcomingAppointments.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedAppointments.length})</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled ({cancelledAppointments.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="mt-6">
            <div className="space-y-4">
              {upcomingAppointments.map((a, i) => (
                <AppointmentCard key={i} {...a} userType="doctor" />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="completed" className="mt-6">
            <div className="space-y-4">
              {completedAppointments.map((a, i) => (
                <AppointmentCard key={i} {...a} userType="doctor" showActions={false} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="cancelled" className="mt-6">
            <div className="space-y-4">
              {cancelledAppointments.map((a, i) => (
                <AppointmentCard key={i} {...a} userType="doctor" showActions={false} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Manage Reschedule Modal */}
      <RescheduleModal
        open={manageModalOpen}
        onOpenChange={setManageModalOpen}
        appointmentDetails={selectedRequest ? {
          doctorName: selectedRequest.doctorName,
          patientName: selectedRequest.patientName,
          currentDate: selectedRequest.currentDate,
          currentTime: selectedRequest.currentTime,
        } : undefined}
        onConfirm={handleManageConfirm}
      />
    </DashboardLayout>
  );
};

export default AdminAppointments;
