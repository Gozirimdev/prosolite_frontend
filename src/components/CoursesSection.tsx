import CourseCard from "./CourseCard";
import CoursePopup from "./Coursepopup";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRegistration } from "./RegistrationModal";

const courses = [
  {
    title: "Video Editing",
    description: "Create stunning videos with Adobe Premiere Pro, After Effects, and DaVinci Resolve.",
    category: "Creative",
    duration: "12 weeks",
    students: "1.2K",
    rating: 4.9,
    image: "/image/video-edit.jpeg",
    tool:["adobe premiere pro","after effects","davinci resolve","capcut","filmora","final cut pro"]
  },
  {
    title: "Mobile App Development",
    description: "Build native and cross-platform mobile apps using React Native, Flutter, and modern tooling.",
    category: "Development",
    duration: "12 weeks",
    students: "1.6K",
    rating: 4.8,
    image: "/image/mobile.jpeg",
    tool:["javascript","react native","jsx","react native paper"]
  },
  {
    title: "Frontend Development",
    description: "Master HTML, CSS, and modern JavaScript frameworks like React to build responsive UIs.",
    category: "Development",
    duration: "12 weeks",
    students: "2.0K",
    rating: 4.9,
    image: "/image/frontend .jpeg",
    tool:["html","css","javascript","react","tailwind css"]
  },
  {
    title: "Backend Development",
    description: "Learn server-side development with Node.js, databases, authentication, and API design.",
    category: "Development",
    duration: "12 weeks",
    students: "1.4K",
    rating: 4.7,
    image: "/image/backend dev.jpeg",
    tool:["javascript","nodejs","expressjs","mongodb","sql","postgresql"]
  },
  {
    title: "Data Analytics",
    description: "Learn Python, SQL, and data visualization tools to extract insights from complex datasets.",
    category: "Data",
    duration: "8 weeks",
    students: "1.8K",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
  },
  {
    title: "Graphics Design",
    description: "Design striking visuals and brand assets using Adobe Illustrator, Photoshop, and Figma.",
    category: "Design",
    duration: "12 weeks",
    students: "1.1K",
    rating: 4.6,
    image: "/image/graphics design.jpeg",
    tool:["adobe illustrator","photoshop","figma","canva","corel draw","gimp"]
  },
  {
    title: "Cyber Security",
    description: "Understand cybersecurity fundamentals, network security, and practical defensive techniques.",
    category: "Security",
    duration: "12 weeks",
    students: "980",
    rating: 4.7,
    image: "/image/cyber-security.jpeg",
    tool:["network security","ethical hacking","penetration testing","cybersecurity fundamentals"]
  },
];

const CoursesSection = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const { paystackOpen } = useRegistration();

  useEffect(() => {
    console.log("CoursesSection paystackOpen:", paystackOpen, "open:", open, "isOpen prop:", open && !paystackOpen);
  }, [paystackOpen, open]);

  // Close course popup when paystack modal opens
  useEffect(() => {
    if (paystackOpen && open) {
      console.log("Closing course popup because Paystack opened");
      setOpen(false);
    }
  }, [paystackOpen]);

  const handleView = (course: any) => {
    setSelectedCourse(course);
    setOpen(true);
  };

  return (
    <section id="courses" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            Our Courses
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="text-gradient">Programs</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Industry-relevant courses designed to accelerate your career and unlock new opportunities.
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {courses.map((course, index) => (
            <CourseCard key={course.title} {...course} delay={index * 100} onView={handleView} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button variant="glass" size="lg" className="group" onClick={() => navigate("/all-courses")}>
            View All Courses
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        <CoursePopup isOpen={open && !paystackOpen} onClose={() => setOpen(false)} course={selectedCourse} courses={courses} />
      </div>
    </section>
  );
};

export default CoursesSection;
