import React, { useState } from "react";
import axios from "axios";

const SHEET_ID = import.meta.env.VITE_SHEET_ID;
const API_KEY = import.meta.env.VITE_API_KEY;
const RANGE = import.meta.env.VITE_RANGE;

const ManageCourses = ({ courses, addCourse, removeCourse, updateCourse }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseToAdd, setCourseToAdd] = useState(null);
  const [courseToUpdate, setCourseToUpdate] = useState(null);
  const [aliasCourseName, setAliasCourseName] = useState("");
  const [venue, setVenue] = useState("");
  const [addOrDrop, setAddOrDrop] = useState("");
  const [showResults, setShowResults] = useState(false);

  // Search for courses
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      alert("Please enter a search query.");
      return;
    }

    const trimmedSearchQuery = searchQuery.trim();
    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`
      );

      const rows = response.data.values || [];
      const searchTerm = trimmedSearchQuery.toLowerCase();

      const headers = rows[0] || []; // First row contains the headers
      const courseCodeIndex = headers.findIndex((header) =>
        header.toLowerCase().includes("course code")
      );
      const courseNameIndex = headers.findIndex((header) =>
        header.toLowerCase().includes("course name")
      );
      const courseSlotIndex = headers.findIndex((header) =>
        header.toLowerCase().includes("slot")
      );

      const filteredResults = rows.slice(1).filter((row) => {
        const courseCode = row[courseCodeIndex]?.toString().toLowerCase() || "";
        const courseName = row[courseNameIndex]?.toString().toLowerCase() || "";
        return (
          courseCode.includes(searchTerm) || courseName.includes(searchTerm)
        );
      });

      const formattedResults = filteredResults.map((row) => ({
        code: row[courseCodeIndex] || "N/A",
        name: row[courseNameIndex] || "N/A",
        slot: row[courseSlotIndex] || "N/A",
      }));

      setFilteredCourses(formattedResults);
    } catch (error) {
      console.error(
        "Error fetching data from Google Sheets:",
        error.response?.data || error.message
      );
      alert("Failed to fetch courses. Please try again.");
    } finally {
      setShowResults(true);
      setIsLoading(false);
    }
  };

  // Open modal for updating a course
  const handleUpdateCourse = (course) => {
    setAddOrDrop("update");
    setCourseToUpdate(course);
    setAliasCourseName(course.alias || course.name);
    setVenue(course.venue || "");
    setIsModalOpen(true);
  };

  // Confirm course update
  const handleConfirmUpdateCourse = () => {
    const trimmedAliasCourseName = aliasCourseName.trim();
    const trimmedVenue = venue.trim().toUpperCase();

    if (!trimmedAliasCourseName || !trimmedVenue) {
      alert("Please fill in all the fields.");
      return;
    }

    const isAliasExist = courses.some(
      (c) => c.alias === trimmedAliasCourseName && c !== courseToUpdate
    );

    if (isAliasExist) {
      alert("This alias is already taken by another course.");
      return;
    }

    // if (!trimmedAliasCourseName || !trimmedVenue) {
    //   alert("Please fill in all the fields.");
    //   return;
    // }

    const updatedCourse = {
      ...courseToUpdate,
      alias: trimmedAliasCourseName,
      venue: trimmedVenue,
    };

    removeCourse(courseToUpdate);
    addCourse(updatedCourse);

    setIsModalOpen(false);
    setCourseToUpdate(null);
    setAliasCourseName("");
    setVenue("");
  };

  // Confirm course removal
  const handleConfirmRemoveCourse = () => {
    removeCourse(courseToUpdate);
    setIsModalOpen(false);
  };

  // Open modal for adding a course
  const handleAddCourse = (course) => {
    setAddOrDrop("add");
    setCourseToAdd(course);
    setAliasCourseName(course.name);
    setVenue("");
    setIsModalOpen(true);
  };

  // Confirm adding a course
  const handleConfirmAddCourse = () => {
    const trimmedAliasCourseName = aliasCourseName.trim();
    const trimmedVenue = venue.trim().toUpperCase();

    // if (!trimmedAliasCourseName || !trimmedVenue) {
    //   alert("Please fill in all the fields.");
    //   return;
    // }

    const updatedCourse = {
      ...courseToAdd,
      alias: trimmedAliasCourseName,
      venue: trimmedVenue,
    };

    const isCourseExist = courses.some((c) => c.code === updatedCourse.code);
    const isAliasExist = courses.some((c) => c.alias === updatedCourse.alias);
    const isSlotTaken = courses.some((c) => c.slot === updatedCourse.slot);

    if (isCourseExist) {
      alert("This course is already registered.");
      return;
    }

    if (isAliasExist) {
      alert("This alias is already taken by another course.");
      return;
    }

    if (isSlotTaken) {
      alert("This slot is already taken by another course.");
      return;
    }

    addCourse(updatedCourse);
    setIsModalOpen(false);
    setCourseToAdd(null);
    setAliasCourseName("");
    setVenue("");
  };

  const QuerySearcher = (query) => {
    setShowResults(false);
    setSearchQuery(query.target.value);
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
    setCourseToAdd(null);
    setCourseToUpdate(null);
    setAliasCourseName("");
    setVenue("");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center">
      {/* Registered Courses */}
      <div className="w-full">
        <h3 className="text-base sm:text-lg font-medium mb-4">
          Registered Courses
        </h3>
        {courses.length > 0 ? (
          <div className="shadow-md rounded-lg">
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr className="bg-slate-300">
                    <th className="min-w-[3.5rem] p-2 text-xs sm:text-sm border-2 border-slate-200">
                      Course Code
                    </th>
                    <th className="min-w-[7.5rem] p-2 text-xs sm:text-sm border-2 border-slate-200">
                      Course Name
                    </th>
                    <th className="min-w-[5.5rem] p-2 text-xs sm:text-sm border-2 border-slate-200">
                      Alias Name
                    </th>
                    <th className="min-w-[3.5rem] p-2 text-xs sm:text-sm border-2 border-slate-200">
                      Course Slot
                    </th>
                    <th className="min-w-[3.5rem] p-2 text-xs sm:text-sm border-2 border-slate-200">
                      Venue
                    </th>
                    <th className="min-w-[3.5rem] p-2 text-xs sm:text-sm border-2 border-slate-200">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course, index) => (
                    <tr key={index} className="odd:bg-slate-50 even:bg-slate-300">
                      <td className="min-w-[3.5rem] p-2 text-xs sm:text-sm border-2 border-slate-200">
                        {course.code}
                      </td>
                      <td className="min-w-[7.5rem] p-2 text-xs sm:text-sm border-2 border-slate-200">
                        {course.name}
                      </td>
                      <td className="min-w-[5.5rem] p-2 text-xs sm:text-sm border-2 border-slate-200">
                        {course.alias}
                      </td>
                      <td className="min-w-[3.5rem] p-2 text-xs sm:text-sm border-2 border-slate-200">
                        {course.slot}
                      </td>
                      <td className="min-w-[3.5rem] p-2 text-xs sm:text-sm border-2 border-slate-200">
                        {course.venue}
                      </td>
                      <td className="min-w-[3.5rem] p-2 text-xs sm:text-sm border-2 border-slate-200">
                        <button
                          onClick={() => handleUpdateCourse(course)}
                          className="bg-red-500 text-white text-xs px-4 py-2 rounded-md hover:bg-red-600"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No courses registered yet.</p>
        )}
      </div>

      <hr className="w-3/4 border-t border-slate-400" />

      {/* Search Bar */}
      <div className="w-full">
        <h3 className="text-base sm:text-lg font-medium mb-4">Add a Course</h3>
        <div className="flex flex-col sm:flex-row items-center gap-4 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Enter Course Code or Name"
            value={searchQuery}
            onChange={QuerySearcher}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            className="p-2 rounded-md w-full text-sm sm:text-left bg-slate-50 border-2 border-slate-200 focus:border-2 focus:border-slate-400 focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white text-xs sm:text-sm px-4 py-2 rounded-md hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                Searching
                <svg
                  className="animate-spin h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
              </div>
            ) : (
              "Search"
            )}
          </button>
        </div>
      </div>

      {showResults && <hr className="w-3/4 border-t border-slate-400" />}

      {/* Search Results */}
      {showResults && (
        <div className="w-full">
          <h3 className="text-base sm:text-lg font-medium mb-4">
            Search Results
          </h3>
          {filteredCourses.length > 0 ? (
            <div className="shadow-md rounded-lg">
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead>
                    <tr className="bg-slate-300">
                      <th className="min-w-[3.5rem] p-2 text-xs sm:text-sm border-2 border-slate-200">
                        Course Code
                      </th>
                      <th className="min-w-[7.5rem] p-2 text-xs sm:text-sm border-2 border-slate-200">
                        Course Name
                      </th>
                      <th className="min-w-[3.5rem] p-2 text-xs sm:text-sm border-2 border-slate-200">
                        Course Slot
                      </th>
                      <th className="min-w-[4rem] p-2 text-xs sm:text-sm border-2 border-slate-200">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCourses.map((course, index) => (
                      <tr
                        key={index}
                        className="odd:bg-slate-50 even:bg-slate-300"
                      >
                        <td className="min-w-[3.5rem] p-2 text-xs sm:text-sm border-2 border-slate-200">
                          {course.code}
                        </td>
                        <td className="min-w-[7.5rem] p-2 text-xs sm:text-sm border-2 border-slate-200">
                          {course.name}
                        </td>
                        <td className="min-w-[3.5rem] p-2 text-xs sm:text-sm border-2 border-slate-200">
                          {course.slot}
                        </td>
                        <td className="min-w-[4rem] p-2 text-xs sm:text-sm border-2 border-slate-200">
                          <button
                            onClick={() => handleAddCourse(course)}
                            className="bg-green-500 text-white text-xs px-4 py-2 rounded-md hover:bg-green-600"
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
          ) : (
            <p className="text-gray-500 text-sm">
              No courses found for your search query.
            </p>
          )}
        </div>
      )}

      {/* Modal to Edit Course Name and Add Venue */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-slate-100 p-6 rounded-md w-[93%] max-w-sm">
            <h3 className="text-lg font-medium mb-6">
              {addOrDrop === "add" ? "Add Course" : "Update Course"}
            </h3>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-left">
                Alias for Course Name:
              </label>
              <input
                type="text"
                value={aliasCourseName}
                onChange={(e) => setAliasCourseName(e.target.value)}
                className="p-2 border rounded-md w-full text-sm"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-left">
                Course Venue:
              </label>
              <input
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="p-2 border rounded-md w-full text-sm"
              />
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleCancelModal}
                className="bg-gray-500 text-white text-xs sm:text-sm px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>

              <button
                onClick={
                  addOrDrop === "add"
                    ? handleConfirmAddCourse
                    : handleConfirmUpdateCourse
                }
                className="bg-green-500 text-white text-xs sm:text-sm px-4 py-2 rounded-md hover:bg-green-600"
              >
                {addOrDrop === "add" ? "Add" : "Update"}
              </button>

              {addOrDrop === "update" && (
                <button
                  onClick={handleConfirmRemoveCourse}
                  className="bg-red-500 text-white text-xs sm:text-sm px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Drop
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCourses;
