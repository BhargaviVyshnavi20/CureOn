import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { paymentsService } from "@/services/paymentsService";
import { toast } from "sonner";

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png"];
const MAX_SIZE = 5 * 1024 * 1024;

const PaymentForm = ({ appointmentId, paymentStatus, initialTransactionId = "", onSuccess, onCancel }) => {
  const [transactionId, setTransactionId] = useState(initialTransactionId);
  const [screenshot, setScreenshot] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    if (!transactionId.trim()) {
      toast.error("Transaction ID is required.");
      return false;
    }
    if (!screenshot) {
      toast.error("Payment screenshot is required.");
      return false;
    }
    if (!ALLOWED_TYPES.includes((screenshot.type || "").toLowerCase())) {
      toast.error("Screenshot must be jpg, jpeg, or png.");
      return false;
    }
    if (screenshot.size > MAX_SIZE) {
      toast.error("Screenshot size must be 5MB or less.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await paymentsService.submit({
        appointment_id: appointmentId,
        transaction_id: transactionId.trim(),
        screenshot,
      });
      toast.success(res?.message || "Payment submitted successfully.");
      onSuccess && onSuccess(res);
    } catch (e2) {
      const d = e2?.response?.data;
      if (d?.transaction_id?.[0]) {
        toast.error(d.transaction_id[0]);
      } else if (d?.screenshot?.[0]) {
        toast.error(d.screenshot[0]);
      } else if (d?.appointment_id?.[0]) {
        toast.error(d.appointment_id[0]);
      } else if (d?.detail) {
        toast.error(d.detail);
      } else {
        toast.error("Unable to submit payment.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {String(paymentStatus || "").toUpperCase() === "PENDING" && (
        <div className="rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-700">
          A payment is already pending for this appointment. You may resubmit with a new transaction if needed.
        </div>
      )}
      {String(paymentStatus || "").toUpperCase() === "REJECTED" && (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
          Your previous payment was rejected. Please submit a fresh payment proof.
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="transaction_id">Transaction ID</Label>
        <Input
          id="transaction_id"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          placeholder="Enter transaction ID"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="payment_screenshot">Screenshot (jpg, jpeg, png, max 5MB)</Label>
        <Input
          id="payment_screenshot"
          type="file"
          accept=".jpg,.jpeg,.png,image/jpeg,image/png"
          onChange={(e) => setScreenshot(e.target.files?.[0] || null)}
          required
        />
      </div>

      <div className="flex gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default PaymentForm;
