import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card } from "./ui.jsx";
import { COURSES } from "../data/courses.js";

export default function CourseCards({ guest = false, query = "" }) {
  const courses = COURSES.filter((course) =>
    `${course.name} ${course.description} ${course.level}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {courses.map((course) => (
        <Card key={course.id} className="flex flex-col overflow-hidden !p-0">
          <div className="relative h-36 overflow-hidden bg-[#dfe9ff]">
            <img
              src={course.image}
              alt={course.name}
              className="h-full w-full object-cover"
            />
            <span className="absolute bottom-3 left-3 rounded-xl bg-white/90 px-3 py-2 text-2xl shadow">
              {course.icon}
            </span>
          </div>
          <div className="flex flex-1 flex-col p-5">
            <h3 className="text-lg font-bold">{course.name}</h3>
            <p className="muted mt-2 flex-1">{course.description}</p>
            <p className="mb-4 mt-4 text-xs font-medium text-[#667eb1]">
              Ã¢â€“Â£ {course.modules} modulesÃ£â‚¬â‚¬Ã‚Â·Ã£â‚¬â‚¬{course.level}Ã£â‚¬â‚¬Ã‚Â·Ã£â‚¬â‚¬Ã¢Ëœâ€¦ {course.rating}
            </p>
            {guest ? (
              <Link to={`/register?course=${course.id}`} className="btn w-full">
                Enroll Now <ArrowRight size={15} />
              </Link>
            ) : (
              <Link
                to={`/student/courses/${course.id}`}
                className="btn-light w-full"
              >
                View course <ArrowRight size={15} />
              </Link>
            )}
          </div>
        </Card>
      ))}
      {!courses.length && <p className="muted">No matching courses found.</p>}
    </div>
  );
}
