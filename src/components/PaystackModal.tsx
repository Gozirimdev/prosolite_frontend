import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PaystackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  authorizationUrl: string;
  reference: string;
  email: string;
  amount: number;
  onPaymentSuccess: (reference: string) => void;
  onPaymentError: (error: string) => void;
}

const PaystackModal: React.FC<PaystackModalProps> = ({
  open,
  onOpenChange,
  authorizationUrl,
  reference,
  email,
  amount,
  onPaymentSuccess,
  onPaymentError,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [paystackLoaded, setPaystackLoaded] = useState(false);

  // Initialize Paystack and open iframe when dialog opens
  useEffect(() => {
    if (!open) {
      setPaystackLoaded(false);
      return;
    }

    let scriptEl: HTMLScriptElement | null = null;
    const timer = setTimeout(() => {
      const initializePaystack = () => {
        if (window.PaystackPop && email && amount) {
          try {
            const handler = window.PaystackPop.setup({
              key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || "",
              email,
              amount: amount * 100,
              ref: reference,
              onClose: () => {
                setPaystackLoaded(false);
                onOpenChange(false);
              },
                onSuccess: (response: any) => {
                  verifyPayment(response.reference);
                },
            });

            setPaystackLoaded(true);
            handler.openIframe();
          } catch (err) {
            console.error("Error initializing Paystack:", err);
            onPaymentError("Failed to initialize payment form");
          }
        }
      };

      if (!window.PaystackPop) {
        scriptEl = document.createElement("script");
        scriptEl.src = "https://js.paystack.co/v1/inline.js";
        scriptEl.onload = initializePaystack;
        document.body.appendChild(scriptEl);
      } else {
        initializePaystack();
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (scriptEl && scriptEl.parentNode) scriptEl.parentNode.removeChild(scriptEl);
    };
  }, [open, email, amount, reference, onOpenChange, onPaymentError]);

  const verifyPayment = async (paymentRef: string) => {
    setIsLoading(true);
    try {
      const verifyRes = await fetch("https://prosolite-main.onrender.com/api/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference: paymentRef }),
      });

      const verifyData = await verifyRes.json();

      if (verifyData.status) {
        onPaymentSuccess(paymentRef);
        onOpenChange(false);
        // Refresh page after successful payment verification
        window.location.reload();
      } else {
        onPaymentError("Payment verification failed");
      }
    } catch (error) {
      console.error("Verification error:", error);
      onPaymentError("Error verifying payment");
    } finally {
      setIsLoading(false);
    }
  };

  // While Paystack iframe is loaded we hide the wrapper dialog
  if (paystackLoaded) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border border-primary/20 shadow-2xl max-w-md z-[9999] pointer-events-auto">
        <DialogHeader className="pointer-events-auto">
          <DialogTitle className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent pointer-events-auto">
            Processing Payment
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-6 pointer-events-auto">
          <div className="text-center pointer-events-auto">
            {isLoading ? (
              <div className="flex justify-center pointer-events-auto">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary pointer-events-auto"></div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground pointer-events-auto">
                Completing your payment securely with Paystack...
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-2 pointer-events-auto">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="flex-1 h-10 text-sm pointer-events-auto"
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Extend window to include PaystackPop
declare global {
  interface Window {
    PaystackPop?: {
      setup: (config: any) => {
        openIframe: () => void;
        close: () => void;
      };
    };
  }
}

export default PaystackModal;
// (export already declared above)
