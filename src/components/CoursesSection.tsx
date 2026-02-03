import CourseCard from "./CourseCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const courses = [
  {
    title: "Full-Stack Web Development",
    description: "Master React, Node.js, and modern web technologies to build professional applications.",
    category: "Development",
    duration: "12 weeks",
    students: "2.5K",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60",
  },
  {
    title: "Data Analysis & Visualization",
    description: "Learn Python, SQL, and data visualization tools to extract insights from complex datasets.",
    category: "Data",
    duration: "8 weeks",
    students: "1.8K",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
  },
  {
    title: "Professional Video Editing",
    description: "Create stunning videos with Adobe Premiere Pro, After Effects, and DaVinci Resolve.",
    category: "Creative",
    duration: "10 weeks",
    students: "1.2K",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=60",
  },
  {
    title: "UI/UX Design Mastery",
    description: "Design beautiful, user-centered interfaces with Figma, prototyping, and design systems.",
    category: "Design",
    duration: "8 weeks",
    students: "2.1K",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=60",
  },
  {
    title: "Motion Graphics & Animation",
    description: "Bring designs to life with advanced animation techniques and motion design principles.",
    category: "Creative",
    duration: "6 weeks",
    students: "890",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=60",
  },
  {
    title: "Advanced Excel & Analytics",
    description: "Master Excel formulas, pivot tables, VBA macros, and business analytics techniques.",
    category: "Data",
    duration: "4 weeks",
    students: "3.2K",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
  },
];

const CoursesSection = () => {
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
            <CourseCard key={course.title} {...course} delay={index * 100} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button variant="glass" size="lg" className="group">
            View All Courses
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
