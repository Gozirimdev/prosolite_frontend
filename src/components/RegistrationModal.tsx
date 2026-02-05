import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PaystackModal from "./PaystackModal";
import { log } from "console";

type RegContextType = {
  open: boolean;
  setOpen: (v: boolean) => void;
  paystackOpen: boolean;
  setPaystackOpen: (v: boolean) => void;
};

const RegContext = createContext<RegContextType | null>(null);

export const RegistrationProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [paystackOpen, setPaystackOpen] = useState(false);
  return <RegContext.Provider value={{ open, setOpen, paystackOpen, setPaystackOpen }}>{children}</RegContext.Provider>;
};

export const useRegistration = () => {
  const ctx = useContext(RegContext);
  if (!ctx) throw new Error("useRegistration must be used within RegistrationProvider");
  return ctx;
};

const courses = ["Video Editing", "Mobile App Development", "Frontend Development", "Backend Development", "Data Analytics", "Graphics Design", "Cyber Security"];

const RegistrationModal: React.FC = () => {
  const { open, setOpen, paystackOpen, setPaystackOpen } = useRegistration();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countries, setCountries] = useState<Array<{ name: string; code: string; dialCode: string }>>([]);
  const [selectedDialCode, setSelectedDialCode] = useState<string>("+234");
  const [course, setCourse] = useState(courses[0]);
  const [currency, setCurrency] = useState<"NGN" | "USD">("NGN");
  const [authUrl, setAuthUrl] = useState("");
  const [paymentRef, setPaymentRef] = useState("");

  const amount = currency === "NGN" ? 5200 : 5;

  // Close registration modal when paystack modal opens
  useEffect(() => {
    if (paystackOpen) {
      setOpen(false);
    }
  }, [paystackOpen, setOpen]);

  // Load country dialing codes (one-time)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all?fields=name,idd,cca2");
        if (!res.ok) return;
        const data = await res.json();

        const list = (data as any[])
          .map((c) => {
            const name = c?.name?.common || "";
            const code = c?.cca2 || "";
            const idd = c?.idd || {};
            const root = idd?.root || "";
            const suffixes = Array.isArray(idd?.suffixes) && idd.suffixes.length ? idd.suffixes : [""];
            const dialCode = root ? `${root}${suffixes[0]}` : "";
            return { name, code, dialCode };
          })
          .filter((c) => c.dialCode)
          .sort((a, b) => a.name.localeCompare(b.name));

        if (mounted) {
          setCountries(list);
          const ng = list.find((c) => c.code === "NG");
          setSelectedDialCode(ng ? ng.dialCode : list[0]?.dialCode || "+234");
        }
      } catch (err) {
        console.warn("Failed to fetch country dialing codes", err);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const startPayment = async () => {
    if (!firstName || !lastName || !email || !phone) {
      alert("Please fill in all required fields.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      // Combine selected dial code with entered phone, normalize spaces
      const fullPhone = `${selectedDialCode}${phone.replace(/\s+/g, "")}`;

      // Call backend to initialize payment
      const response = await fetch("https://prosolite-main.onrender.com/api/initialize-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          amount,
          fullName: `${firstName} ${lastName}`,
          phone: fullPhone,
          courseId: "1",
          courseName: course,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.details || "Failed to initialize payment");
      }

      const data = await response.json();
      const { authorization_url, reference } = data.data;

      // Show Paystack modal instead of opening new window
      if (authorization_url && reference) {
        setAuthUrl(authorization_url);
        setPaymentRef(reference);
        setPaystackOpen(true);
      }
    } catch (error) {
      console.error("Payment error:", error);
      const errorMessage = error instanceof Error ? error.message : "Error initializing payment";
      alert(errorMessage + ". Please try again.");
    }
  };;

  const handlePaymentSuccess = (reference: string) => {
    toast.success(`Payment successful! Reference: ${reference}`);
    setPaystackOpen(false);
    setOpen(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setCourse(courses[0]);
    setCurrency("NGN");
    console.log("hello");
    
    // Refresh the page after successful registration
    // window.location.href="/";
  };

  const handlePaymentError = (error: string) => {
    alert(`Payment error: ${error}`);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={paystackOpen ? undefined : setOpen}>
        <DialogContent className={`glass-card border border-primary/20 shadow-2xl transition-all duration-200 ${paystackOpen ? 'pointer-events-none opacity-40' : ''}`}>
          <DialogHeader className="space-y-2 sm:space-y-3">
            <DialogTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Secure Your Spot
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
              Complete registration and pay to enroll in your chosen course.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 sm:space-y-5 py-4 sm:py-6 max-h-96 overflow-y-auto">
            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <div className="space-y-1.5 sm:space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">First Name</label>
                <Input 
                  placeholder="John" 
                  value={firstName} 
                  onChange={(e) => setFirstName(e.target.value)}
                  className="bg-background/50 border-border/50 focus:border-primary/50 h-10 text-sm"
                />
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Last Name</label>
                <Input 
                  placeholder="Doe" 
                  value={lastName} 
                  onChange={(e) => setLastName(e.target.value)}
                  className="bg-background/50 border-border/50 focus:border-primary/50 h-10 text-sm"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email Address</label>
              <Input 
                type="email"
                placeholder="john.doe@example.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/50 border-border/50 focus:border-primary/50 h-10 text-sm"
              />
            </div>

            {/* Phone Field */}
            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Phone Number</label>
              <div className="flex items-center gap-2">
                <div style={{ minWidth: 140 }}>
                  <Select value={selectedDialCode} onValueChange={(v) => setSelectedDialCode(v)}>
                    <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary/50 h-10 text-sm w-full">
                      <SelectValue placeholder={selectedDialCode} />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((c) => (
                        <SelectItem key={`${c.code}-${c.dialCode}`} value={c.dialCode}>
                          {`${c.dialCode} — ${c.name}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Input
                  type="tel"
                  placeholder="800 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-background/50 border-border/50 focus:border-primary/50 h-10 text-sm flex-1"
                />
              </div>
            </div>

            {/* Course Selection */}
            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Select Course</label>
              <Select onValueChange={(v) => setCourse(v)} defaultValue={course}>
                <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary/50 h-10 text-sm">
                  <SelectValue placeholder="Choose your course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Currency & Price */}
            <div className="space-y-2 sm:space-y-3 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 p-3 sm:p-4 rounded-lg border border-primary/20">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <div className="flex-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1 sm:mb-2">Currency</label>
                  <Select value={currency} onValueChange={(v) => setCurrency(v as any)}>
                    <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary/50 h-10 text-sm">
                      <SelectValue placeholder="Choose currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NGN">₦ Naira</SelectItem>
                      <SelectItem value="USD">$ Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:pt-6">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Amount</p>
                  <p className="text-xl sm:text-2xl font-bold text-gradient">
                    {currency === "NGN" ? `₦${amount.toLocaleString()}` : `$${amount}`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-2 pt-2">
            <Button 
              variant="ghost" 
              onClick={() => setOpen(false)}
              className="h-10 text-sm"
            >
              Cancel
            </Button>
            <Button 
              onClick={startPayment}
              className="h-10 text-sm bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/30 text-white font-semibold"
            >
              Proceed to Payment
            </Button>
          </DialogFooter>

          <DialogClose />
        </DialogContent>
      </Dialog>

      <PaystackModal
        open={paystackOpen}
        onOpenChange={setPaystackOpen}
        authorizationUrl={authUrl}
        reference={paymentRef}
        email={email}
        amount={amount}
        onPaymentSuccess={handlePaymentSuccess}
        onPaymentError={handlePaymentError}
      />
    </>
  );
};

export default RegistrationModal;
