import React, { useState } from "react";
import ManageCourses from "./Components/ManageCourses";
import ViewTimetable from "./Components/ViewTimetable";

const App = () => {
  const [courses, setCourses] = useState([]);
  const [view, setView] = useState("manage");

  const addCourse = (courseToAdd) => {
    setCourses((prevCourses) => [...prevCourses, courseToAdd]);
  };

  const removeCourse = (courseToRemove) => {
    setCourses((prevCourses) =>
      prevCourses.filter((course) => course.code !== courseToRemove.code)
    );
  };

  const updateCourse = (oldCourse, updatedCourse) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.code === oldCourse.code ? updatedCourse : course
      )
    );
  };

  return (
    <div className="my-10 w-[93%] max-w-6xl mx-auto">
      <div className="bg-neutral-800 text-neutral-300 p-5 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 underline">
          Course Timetable
        </h1>
        <div className="flex justify-center mb-6 space-x-6 text-center">
          <button
            onClick={() => setView("manage")}
            className={`px-6 py-3 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
              view === "manage"
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-[#121212] hover:bg-neutral-950"
            }`}
          >
            Manage Courses
          </button>
          <button
            onClick={() => setView("timetable")}
            className={`px-6 py-3 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
              view === "timetable"
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-[#121212] hover:bg-neutral-950"
            }`}
          >
            View Timetable
          </button>
        </div>
        <div className="w-full">
          {view === "manage" ? (
            <ManageCourses
              courses={courses}
              addCourse={addCourse}
              removeCourse={removeCourse}
              updateCourse={updateCourse}
            />
          ) : (
            <ViewTimetable courses={courses} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
