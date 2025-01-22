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
        {courses.length > 0 ? (
          <table className="table-auto w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Course Code</th>
                <th className="px-4 py-2 border">Course Name</th>
                <th className="px-4 py-2 border">Course Slot</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-50">
                  <td className="px-4 py-2 border text-center">
                    {course.code}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {course.name}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {course.slot}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No courses added yet.</p>
        )}
      </div>
      <div className="flex items-center space-x-4 mb-4">
        <label className="flex flex-col">
          <span className="font-medium mb-1">Course Code</span>
          <input
            type="text"
            placeholder="Code"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            className="px-4 py-2 border rounded-md"
          />
        </label>
        <label className="flex flex-col">
          <span className="font-medium mb-1">Course Name</span>
          <input
            type="text"
            placeholder="Name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="px-4 py-2 border rounded-md"
          />
        </label>
        <label className="flex flex-col">
          <span className="font-medium mb-1">Course Slot</span>
          <input
            type="text"
            placeholder="Slot"
            value={courseSlot}
            onChange={(e) => setCourseSlot(e.target.value)}
            className="px-4 py-2 border rounded-md"
          />
        </label>
      </div>
      <button
        onClick={handleAddCourse}
        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
      >
        Add Course
      </button>
    </div>
  );
};

export default ManageCourses;
