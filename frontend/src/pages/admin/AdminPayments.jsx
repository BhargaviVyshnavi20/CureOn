import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Stethoscope, Calendar, Settings, Users, Pill, FlaskConical } from "lucide-react";
import { paymentsService } from "@/services/paymentsService";
import { toast } from "sonner";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Doctors", href: "/admin/doctors", icon: Stethoscope },
  { name: "Patients", href: "/admin/patients", icon: Users },
  { name: "Pharmacy", href: "/admin/pharmacy", icon: Pill },
  { name: "Labs", href: "/admin/labs", icon: FlaskConical },
  { name: "Payments", href: "/admin/payments", icon: Calendar },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

const buildMediaUrl = (path) => {
  if (!path) return "";
  const p = String(path);
  if (p.startsWith("http")) return p;
  if (p.startsWith("/media/")) return `http://127.0.0.1:8000${p}`;
  return `http://127.0.0.1:8000/media/${p}`;
};

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  const loadPayments = async () => {
    setLoading(true);
    try {
      const data = await paymentsService.adminList();
      setPayments(data || []);
    } catch {
      setPayments([]);
      toast.error("Failed to load payments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayments();
  }, []);

  const handleApprove = async (id) => {
    setUpdatingId(id);
    try {
      await paymentsService.approve(id);
      toast.success("Payment approved.");
      loadPayments();
    } catch {
      toast.error("Unable to approve payment.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleReject = async (id) => {
    setUpdatingId(id);
    try {
      await paymentsService.reject(id);
      toast.success("Payment rejected.");
      loadPayments();
    } catch {
      toast.error("Unable to reject payment.");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <DashboardLayout navItems={navItems} userType="admin">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">Payments</h1>
          <p className="text-muted-foreground mt-1">Review and approve manual payment submissions</p>
        </div>

        <div className="dashboard-card p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/40">
              <tr>
                <th className="px-4 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">Appointment</th>
                <th className="px-4 py-3 text-left">Transaction ID</th>
                <th className="px-4 py-3 text-left">Screenshot</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {!loading && payments.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-muted-foreground">
                    No payments found.
                  </td>
                </tr>
              )}
              {payments.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="px-4 py-3">{p.user_name || p.user}</td>
                  <td className="px-4 py-3">{p.appointment_display || p.appointment}</td>
                  <td className="px-4 py-3">{p.transaction_id}</td>
                  <td className="px-4 py-3">
                    {p.screenshot ? (
                      <a
                        href={buildMediaUrl(p.screenshot)}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary underline"
                      >
                        View Screenshot
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-4 py-3">{p.status}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleApprove(p.id)}
                        disabled={updatingId === p.id || p.status === "APPROVED"}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleReject(p.id)}
                        disabled={updatingId === p.id || p.status === "REJECTED"}
                      >
                        Reject
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminPayments;



