import { Clock, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CourseCardProps {
  title: string;
  description: string;
  category: string;
  duration: string;
  students: string;
  rating: number;
  image: string;
  tool?: string[];
  delay?: number;
  onView?: (course: {
    title: string;
    description: string;
    category: string;
    duration: string;
    students: string;
    rating: number;
    image: string;
    tool?: string[];
  }) => void;
}

const CourseCard = ({
  title,
  description,
  category,
  duration,
  students,
  rating,
  image,
  tool,
  delay = 0,
  onView,
}: CourseCardProps) => {
  return (
    <div
      className="group glass-card overflow-hidden hover:border-primary/30 transition-all duration-500 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/90 text-primary-foreground">
            {category}
          </span>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm">
          <Star className="w-3 h-3 text-accent fill-accent" />
          <span className="text-xs font-medium">{rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {duration}
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {students}
          </div>
        </div>

        {/* CTA */}
        <Button
          variant="glass"
          size="sm"
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
          onClick={() => onView?.({ title, description, category, duration, students, rating, image, tool })}
        >
          View Course
        </Button>
      </div>
    </div>
  );
};

export default CourseCard;
