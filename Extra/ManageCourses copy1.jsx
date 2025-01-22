import React, { useState } from "react";

const ManageCourses = ({ courses, addCourse, removeCourse }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://script.google.com/macros/s/AKfycbwyl2f67XNgQAUJejU3GO-6tnLF818k8AHku5XyGdeQgD9ysP8CtUFkUudKSOoJxfA/exec?query=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data = await response.json();
      setFilteredCourses(data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCourse = (course) => {
    if (courses.some((c) => c.code === course.code)) {
      alert("This course is already registered.");
      return;
    }
    addCourse(course);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* Registered Courses */}
      <div className="w-full border border-gray-200 bg-white py-4 px-3">
        <h3 className="text-base sm:text-lg font-medium mb-4">
          Registered Courses
        </h3>
        <div className="overflow-x-auto">
          {courses.length > 0 ? (
            <table className="table-auto w-full border border-gray-500">
              <thead>
                <tr className="bg-slate-200">
                  <th className="min-w-[3.5rem] p-2 text-xs sm:text-sm border border-gray-400">
                    Course Code
                  </th>
                  <th className="min-w-[7.5rem] p-2 text-xs sm:text-sm border border-gray-400">
                    Course Name
                  </th>
                  <th className="min-w-[3.5rem] p-2 text-xs sm:text-sm border border-gray-400">
                    Course Slot
                  </th>
                  <th className="min-w-[3.5rem] p-2 text-xs sm:text-sm border border-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={index} className="odd:bg-white even:bg-slate-200">
                    <td className="min-w-[3.5rem] p-2 text-xs sm:text-sm border border-gray-400 text-center">
                      {course.code}
                    </td>
                    <td className="min-w-[7.5rem] p-2 text-xs sm:text-sm border border-gray-400 text-center">
                      {course.name}
                    </td>
                    <td className="min-w-[3.5rem] p-2 text-xs sm:text-sm border border-gray-400 text-center">
                      {course.slot}
                    </td>
                    <td className="min-w-[3.5rem] p-2 text-xs sm:text-sm border border-gray-400 text-center">
                      <button
                        onClick={() => removeCourse(course.code)}
                        className="bg-red-500 text-white text-xs px-3 py-2 rounded-md hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500 text-sm">No courses registered yet.</p>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="w-full overflow-x-auto border border-gray-200 bg-white py-4 px-3">
        <h3 className="text-base sm:text-lg font-medium mb-4">Add a Course</h3>
        <div className="flex flex-col sm:flex-row items-center gap-4 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Enter Course Code or Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border rounded-md w-full text-sm text-center sm:text-left"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white text-xs sm:text-sm px-5 py-2 rounded-md hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>

      {/* Search Results */}
      {filteredCourses.length > 0 && (
        <div className="w-full border border-gray-200 bg-white py-4 px-3">
          <h3 className="text-base sm:text-lg font-medium mb-4">
            Search Results
          </h3>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border border-gray-500">
              <thead>
                <tr className="bg-slate-200">
                  <th className="min-w-[3.5rem] p-2 text-xs sm:text-sm border border-gray-400">
                    Course Code
                  </th>
                  <th className="min-w-[7.5rem] p-2 text-xs sm:text-sm border border-gray-400">
                    Course Name
                  </th>
                  <th className="min-w-[3.5rem] p-2 text-xs sm:text-sm border border-gray-400">
                    Course Slot
                  </th>
                  <th className="min-w-[3.5rem] p-2 text-xs sm:text-sm border border-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((course, index) => (
                  <tr key={index} className="odd:bg-white even:bg-slate-200">
                    <td className="min-w-[3.5rem] p-2 text-xs sm:text-sm border border-gray-400 text-center">
                      {course.code}
                    </td>
                    <td className="min-w-[7.5rem] p-2 text-xs sm:text-sm border border-gray-400 text-center">
                      {course.name}
                    </td>
                    <td className="min-w-[3.5rem] p-2 text-xs sm:text-sm border border-gray-400 text-center">
                      {course.slot}
                    </td>
                    <td className="min-w-[3.5rem] p-2 text-xs sm:text-sm border border-gray-400 text-center">
                      <button
                        onClick={() => handleAddCourse(course)}
                        className="bg-green-500 text-white text-xs px-3 py-2 rounded-md hover:bg-green-600"
                      >
                        Add
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCourses;
