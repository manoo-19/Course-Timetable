import React, { useState } from "react";

const ManageCourses = ({ courses, addCourse, removeCourse }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://script.google.com/macros/s/AKfycbwyl2f67XNgQAUJejU3GO-6tnLF818k8AHku5XyGdeQgD9ysP8CtUFkUudKSOoJxfA/exec?query=${encodeURIComponent(searchQuery)}`
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
    addCourse(course);
  };

  return (
    <div className="p-6">
      {/* Search Bar */}
      <div className="flex items-center space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search by Course Code or Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded-md w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Search Results */}
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
