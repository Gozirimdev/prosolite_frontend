import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useEffect, useRef } from "react";
import { useRegistration } from "./RegistrationModal";

interface CoursePopupProps {
  isOpen: boolean;
  onClose: () => void;
  course?: {
    title: string;
    description: string;
    image?: string;
    duration?: string;
    category?: string;
    tool?: string[];
  } | null;
  courses?: Array<{
    title: string;
    description: string;
    image?: string;
    duration?: string;
    category?: string;
    tool?: string[];
  }>;
}

const CoursePopup: React.FC<CoursePopupProps> = ({ isOpen, onClose, course = null, courses = [] }) => {
  let reg: any = null;
  try {
    reg = useRegistration();
  } catch (e) {
    reg = null;
  }
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-9999 flex items-center justify-center sm:top-20 bg-black/50 backdrop-blur-sm px-4 py-90" style={{minHeight:"100vh",height:"100vh",overflowY:"auto",paddingBlock:"60px"}}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          ref={overlayRef}
          onClick={(e) => {
            if (e.target === overlayRef.current) onClose();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative w-full sm:mb-12 sm:mt-28  max-w-3xl rounded-2xl bg-background shadow-xl overflow-hidden"
            initial={{ scale: 0.9, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 40 }}
            transition={{ type: "spring", damping: 20 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close course details"
              className="absolute right-4 top-4 z-10 rounded-full bg-secondary/70 p-2 hover:bg-secondary transition"
            >
              <X className="w-5 h-5" />
            </button>

            {course ? (
              <>
                {/* Image */}
                <div className="h-56 md:h-72 w-full">
                  <img src={course.image ?? "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&auto=format&fit=crop&q=60"} alt={course.title} className="h-full w-full object-cover" />
                </div>
                {/* Content */}
                <div className="p-6 md:p-8">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">{course.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{course.description}</p>
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Tools & Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {(course.tool || []).map((tool) => (
                        <span key={tool} className="rounded-full bg-secondary px-4 py-1 text-sm">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">Duration: {course.duration ?? "—"}</span>
                    <span className="text-sm text-muted-foreground">Category: {course.category ?? "—"}</span>
                  </div>
                  <div className="flex gap-3">
                    <Button size="lg" className="flex-1" onClick={() => { onClose(); reg?.setOpen?.(true); }}>
                      Register
                    </Button>
                    <Button size="lg" variant="ghost" onClick={onClose}>
                      Close
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-4 md:p-6">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">All Courses</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {courses.map((c) => (
                    <div key={c.title} className="rounded-lg overflow-hidden bg-muted/5 shadow-sm">
                      <div className="h-36 w-full">
                        <img src={c.image ?? "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&auto=format&fit=crop&q=60"} alt={c.title} className="h-full w-full object-cover" />
                      </div>
                      <div className="p-3">
                        <h4 className="font-semibold mb-1">{c.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{c.description}</p>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs text-muted-foreground">{c.duration ?? "—"}</span>
                          <Button size="sm" onClick={() => { /* open single course view */ }}>
                            Enroll
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CoursePopup;
