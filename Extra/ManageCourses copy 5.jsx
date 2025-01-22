import React, { useState } from "react";

const dummyCourses = [
  { code: "CS101", name: "Introduction to Computer Science", slot: "A" },
  { code: "CS102", name: "Data Structures", slot: "B" },
  { code: "CS103", name: "Algorithms", slot: "C" },
  { code: "CS104", name: "Operating Systems", slot: "D" },
  { code: "CS204", name: "Advanced Operating Systems", slot: "F" },
  { code: "CS105", name: "Database Management", slot: "E" },
  { code: "CS205", name: "Advanced Database Management", slot: "F" },
];

const ManageCourses = ({ courses, addCourse }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);

  const handleSearch = () => {
    const results = dummyCourses.filter(
      (course) =>
        course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCourses(results);
  };

  const handleAddCourse = (course) => {
    addCourse(course);
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
        <label className="flex flex-col w-full">
          <span className="font-medium mb-1">Search Course</span>
          <input
            type="text"
            placeholder="Search by code or name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border rounded-md"
          />
        </label>
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {filteredCourses.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Search Results</h3>
          <table className="table-auto w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Course Code</th>
                <th className="px-4 py-2 border">Course Name</th>
                <th className="px-4 py-2 border">Course Slot</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course, index) => (
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
                  <td className="px-4 py-2 border text-center">
                    <button
                      onClick={() => handleAddCourse(course)}
                      className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600"
                    >
                      Add
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageCourses;
