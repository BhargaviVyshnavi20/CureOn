import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PaymentForm from "@/components/payments/PaymentForm";

const DEFAULT_QR_PATH = "/payment-qr.jpg";

const PaymentModal = ({
  open,
  onOpenChange,
  appointmentId,
  paymentStatus,
  qrImagePath = DEFAULT_QR_PATH,
  onSubmitted,
}) => {
  const [showForm, setShowForm] = useState(false);
  const normalizedPaymentStatus = String(paymentStatus || "").toUpperCase();

  const handleClose = () => {
    setShowForm(false);
    onOpenChange?.(false);
  };

  const handleSubmitted = (payload) => {
    setShowForm(false);
    onOpenChange?.(false);
    onSubmitted && onSubmitted(payload);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Manual Payment</DialogTitle>
        </DialogHeader>

        {!showForm ? (
          <div className="space-y-4">
            <img
              src={qrImagePath}
              alt="Payment QR"
              className="mx-auto max-h-[360px] w-full rounded-md border object-contain"
            />
            <p className="text-center text-sm text-muted-foreground">
              Scan this QR and complete your payment using any UPI app.
            </p>
            <div className="rounded-md border bg-muted/50 p-3 text-xs text-muted-foreground">
              <p>1. Pay the exact consultation amount shown in your appointment.</p>
              <p>2. Save a screenshot after payment succeeds.</p>
              <p>3. Click "I Have Completed Payment" and submit transaction details.</p>
              {normalizedPaymentStatus === "PENDING" && (
                <p className="mt-2 text-amber-600">
                  Your previous payment is pending admin review. You can resubmit if needed.
                </p>
              )}
              {normalizedPaymentStatus === "REJECTED" && (
                <p className="mt-2 text-destructive">
                  Your previous payment was rejected. Please pay again and resubmit.
                </p>
              )}
            </div>
            <Button className="w-full" onClick={() => setShowForm(true)}>
              I Have Completed Payment
            </Button>
          </div>
        ) : (
          <PaymentForm
            appointmentId={appointmentId}
            paymentStatus={normalizedPaymentStatus}
            onSuccess={handleSubmitted}
            onCancel={() => setShowForm(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
