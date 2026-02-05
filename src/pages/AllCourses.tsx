import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import CoursePopup from "@/components/Coursepopup";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRegistration } from "@/components/RegistrationModal";

const courses = [
  {
    title: "Video Editing",
    description: "Create stunning videos with Adobe Premiere Pro, After Effects, and DaVinci Resolve.",
    category: "Creative",
    duration: "10 weeks",
    students: "1.2K",
    rating: 4.9,
    image: "/image/video-edit.jpeg",
    tool: ["adobe premiere pro", "after effects", "davinci resolve", "capcut", "filmora", "final cut pro"]
  },
  {
    title: "Mobile App Development",
    description: "Build native and cross-platform mobile apps using React Native, Flutter, and modern tooling.",
    category: "Development",
    duration: "10 weeks",
    students: "1.6K",
    rating: 4.8,
    image: "/image/mobile.jpeg",
    tool: ["javascript", "react native", "jsx", "react native paper"]
  },
  {
    title: "Frontend Development",
    description: "Master HTML, CSS, and modern JavaScript frameworks like React to build responsive UIs.",
    category: "Development",
    duration: "8 weeks",
    students: "2.0K",
    rating: 4.9,
    image: "/image/frontend .jpeg",
    tool: ["html", "css", "javascript", "react", "tailwind css"]
  },
  {
    title: "Backend Development",
    description: "Learn server-side development with Node.js, databases, authentication, and API design.",
    category: "Development",
    duration: "10 weeks",
    students: "1.4K",
    rating: 4.7,
    image: "/image/backend dev.jpeg",
    tool: ["javascript", "nodejs", "expressjs", "mongodb", "sql", "postgresql"]
  },
  {
    title: "Data Analytics",
    description: "Learn Python, SQL, and data visualization tools to extract insights from complex datasets.",
    category: "Data",
    duration: "8 weeks",
    students: "1.8K",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
    tool: ["python", "sql", "tableau", "power bi", "pandas", "matplotlib"]
  },
  {
    title: "Graphics Design",
    description: "Design striking visuals and brand assets using Adobe Illustrator, Photoshop, and Figma.",
    category: "Design",
    duration: "6 weeks",
    students: "1.1K",
    rating: 4.6,
    image: "/image/graphics design.jpeg",
    tool: ["adobe illustrator", "photoshop", "figma", "canva", "corel draw", "gimp"]
  },
  {
    title: "Cyber Security",
    description: "Understand cybersecurity fundamentals, network security, and practical defensive techniques.",
    category: "Security",
    duration: "8 weeks",
    students: "980",
    rating: 4.7,
    image: "/image/cyber-security.jpeg",
    tool: ["network security", "ethical hacking", "penetration testing", "cybersecurity fundamentals"]
  },
];

const AllCourses = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const { paystackOpen } = useRegistration();

  const handleView = (course: any) => {
    setSelectedCourse(course);
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-32 relative">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />

        <div className="container mx-auto px-6 relative z-10">
          {/* Header with Back Button */}
          <div className="flex items-center gap-4 mb-12">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="w-full">
              <h1 className="text-4xl text-center md:text-5xl font-bold">
                All <span className="text-gradient">Courses</span>
              </h1>
              <p className="text-muted-foreground text-center text-lg mt-2">
                Explore our complete catalog of industry-relevant courses
              </p>
            </div>
          </div>

          {/* Course Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <CourseCard
                key={course.title}
                {...course}
                delay={index * 50}
                onView={handleView}
              />
            ))}
          </div>
        </div>
      </section>

      <CoursePopup
        isOpen={open && !paystackOpen}
        onClose={() => setOpen(false)}
        course={selectedCourse}
        courses={courses}
      />

      <Footer />
    </div>
  );
};

export default AllCourses;
