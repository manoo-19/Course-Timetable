import React, { useState } from "react";

const ManageCourses = ({ courses, addCourse }) => {
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseSlot, setCourseSlot] = useState("");

  const handleAddCourse = () => {
    if (courseCode && courseName && courseSlot) {
      addCourse({ code: courseCode, name: courseName, slot: courseSlot });
      setCourseCode("");
      setCourseName("");
      setCourseSlot("");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Manage Courses</h2>
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Added Courses</h3>
        <ul className="list-disc pl-6">
          {courses.map((course, index) => (
            <li key={index}>
              <span className="font-bold">{course.code}:</span> {course.name}{" "}
              (Slot: {course.slot})
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Course Code"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="text"
          placeholder="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="text"
          placeholder="Course Slot"
          value={courseSlot}
          onChange={(e) => setCourseSlot(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />
        <button
          onClick={handleAddCourse}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Course
        </button>
      </div>
    </div>
  );
};

export default ManageCourses;
