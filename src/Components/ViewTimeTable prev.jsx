import React, { useRef, useState } from "react";
import { ImSpoonKnife } from "react-icons/im";
import { toPng } from "html-to-image";
import { useTheme } from "./ThemeContext";

const ViewTimeTable = ({ courses = [] }) => {
  const { theme } = useTheme();

  const timeSlots = [
    "9:00 - 9:55",
    "10:00 - 10:55",
    "11:00 - 11:55",
    "12:00 - 12:55",
    "12:55 - 14:30",
    "14:30 - 16:00",
    "16:00 - 17:25",
  ];

  const timeTable = [
    ["A", "B", "C", "D", " ", "P", "Q"],
    ["D", "E", "F", "G", " ", "R", "S"],
    ["B", "C", "A", "G", " ", "F", "Challenge Lectures"],
    ["C", "A", "B", "E", " ", "Q", "P"],
    ["E", "F", "D", "G", " ", "S", "R"],
  ];

  const darkSlotColors = [
    { slot: "A", color: "#be123c" }, // Tailwind: rose-700
    { slot: "B", color: "#ca8a04" }, // Tailwind: yellow-700
    { slot: "C", color: "#0f766e" }, // Tailwind: teal-700
    { slot: "D", color: "#92400e" }, // Tailwind: amber-800
    { slot: "E", color: "#a21caf" }, // Tailwind: fuchsia-700
    { slot: "F", color: "#c2410c" }, // Tailwind: orange-700
    { slot: "G", color: "#1d4ed8" }, // Tailwind: blue-700
    { slot: "P", color: "#6d28d9" }, // Tailwind: purple-700
    { slot: "Q", color: "#b91c1c" }, // Tailwind: red-700
    { slot: "R", color: "#4d7c0f" }, // Tailwind: lime-700
    { slot: "S", color: "#0e7490" }, // Tailwind: cyan-700
  ];

  const lightSlotColors = [
    { slot: "A", color: "#e11d48" }, // Tailwind: rose-600
    { slot: "B", color: "#ca8a04" }, // Tailwind: yellow-700
    { slot: "C", color: "#0d9488" }, // Tailwind: teal-600
    { slot: "D", color: "#b45309" }, // Tailwind: amber-700
    { slot: "E", color: "#c026d3" }, // Tailwind: fuchsia-600
    { slot: "F", color: "#ea580c" }, // Tailwind: orange-600
    { slot: "G", color: "#2563eb" }, // Tailwind: blue-600
    { slot: "P", color: "#7c3aed" }, // Tailwind: purple-600
    { slot: "Q", color: "#dc2626" }, // Tailwind: red-600
    { slot: "R", color: "#65a30d" }, // Tailwind: lime-600
    { slot: "S", color: "#0891b2" }, // Tailwind: cyan-600
  ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const [showCourseCode, setShowCourseCode] = useState(false);
  const [showVenue, setShowVenue] = useState(false);

  const timeTableRef = useRef(null);

  const getCourseDetails = (slot) => {
    const course = courses.find((course) => course.slot === slot);
    return course ? (
      <div className="flex flex-col font-medium">
        {showCourseCode && (
          <div className="flex flex-col items-center gap-1">
            <span>
              {course.code} - {slot}
            </span>
            <hr className="w-14 border-t" />
          </div>
        )}
        <span className="py-1">{course.alias}</span>
        {showVenue && (
          <div className="flex flex-col items-center gap-1">
            <hr className="w-14 border-t" />
            <span>{course.venue}</span>
          </div>
        )}
      </div>
    ) : (
      <span className="font-medium">{slot}</span>
    );
  };

  const handleExportAsImage = async () => {
    const timeTableElement = timeTableRef.current;

    if (!timeTableElement) {
      console.error("TimeTable element not found!");
      return;
    }

    try {
      const dataUrl = await toPng(timeTableElement, {
        backgroundColor: "white",
        cacheBust: true,
        pixelRatio: 2,
        width: timeTableElement.scrollWidth + 32,
        height: timeTableElement.scrollHeight + 32,
        style: {
          padding: "16px",
        },
      });

      const link = document.createElement("a");
      link.download = "timeTable.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error exporting timeTable as image:", error);
    }
  };

  const slotColors = theme === "dark" ? darkSlotColors : lightSlotColors;

  const toggle =
    theme === "dark"
      ? {
          bg: "bg-[#121212]",
          circle: "bg-neutral-300",
        }
      : {
          bg: "bg-slate-300",
          circle: "bg-slate-50",
        };

  const themeClasses =
    theme === "dark"
      ? {
          container: "bg-neutral-800",
          background: "bg-[#1E1E1E]",
          alternatebackground: "bg-[#121212]",
          border: "border border-neutral-300",
          textColor: "text-neutral-300",
          courseTextColor: "text-neutral-300",
        }
      : {
          container: "bg-slate-100",
          background: "bg-slate-300",
          alternateBackground: "bg-slate-50",
          border: "border-2 border-slate-200",
          textColor: "text-black",
          courseTextColor: "text-slate-50",
        };

  return (
    <div className="flex flex-col gap-6 text-center">
      {courses.length > 0 && (
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 w-full ${themeClasses.textColor}`}
        >
          {/* Toggle for Course Code */}
          <label
            htmlFor="toggleCourseCode"
            className="flex items-center justify-between min-w-52 sm:min-w-44 space-x-3 scale-90 sm:scale-100"
          >
            <span className="text-sm">Show Course Code</span>
            <div className="relative w-10 h-6">
              <input
                id="toggleCourseCode"
                type="checkbox"
                checked={showCourseCode}
                onChange={(e) => setShowCourseCode(e.target.checked)}
                className="absolute opacity-0 w-0 h-0 peer"
                aria-label="Toggle Course Code"
              />
              <span
                className={`block w-full h-full ${toggle.bg} rounded-full peer-checked:bg-green-500 transition-colors duration-300`}
              ></span>
              <span
                className={`absolute left-1 top-1/2 -translate-y-1/2 w-4 h-4 ${toggle.circle} rounded-full shadow transform translate-x-0 peer-checked:translate-x-4 transition-transform duration-300`}
              ></span>
            </div>
          </label>

          {/* Toggle for Venue */}
          <label
            htmlFor="toggleVenue"
            className="flex items-center justify-between min-w-52 sm:min-w-44 space-x-3 scale-90 sm:scale-100"
          >
            <span className="text-sm">Show Course Venue</span>
            <div className="relative w-10 h-6">
              <input
                id="toggleVenue"
                type="checkbox"
                checked={showVenue}
                onChange={(e) => setShowVenue(e.target.checked)}
                className="absolute opacity-0 w-0 h-0 peer"
                aria-label="Toggle Course Venue"
              />
              <span
                className={`block w-full h-full ${toggle.bg} rounded-full peer-checked:bg-green-500 transition-colors duration-300`}
              ></span>
              <span
                className={`absolute left-1 top-1/2 -translate-y-1/2 w-4 h-4 ${toggle.circle} rounded-full shadow transform translate-x-0 peer-checked:translate-x-4 transition-transform duration-300`}
              ></span>
            </div>
          </label>
        </div>
      )}

      <div className={`shadow-md rounded-lg ${themeClasses.textColor}`}>
        <div ref={timeTableRef} className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th
                  className={`min-w-[4rem] text-xs sm:text-sm ${themeClasses.background} ${themeClasses.border} p-2`}
                >
                  Day
                </th>
                {timeSlots.map((time, index) => (
                  <th
                    key={index}
                    scope="col"
                    className={`min-w-[7.5rem] text-xs sm:text-sm ${themeClasses.background} ${themeClasses.border} p-2`}
                  >
                    {time}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map((day, dayIndex) => (
                <tr key={dayIndex} className={themeClasses.alternatebackground}>
                  <td
                    className={`min-w-[4rem] text-xs sm:text-sm ${themeClasses.background} ${themeClasses.border} p-2 font-semibold`}
                  >
                    {day}
                  </td>
                  {timeTable[dayIndex].map((slot, slotIndex) => {
                    if (slot === " " && slotIndex === 4) {
                      return dayIndex === 0 ? (
                        <td
                          key={slotIndex}
                          className={`min-w-[7.5rem] ${themeClasses.background} ${themeClasses.border} p-2`}
                          rowSpan={5}
                        >
                          <div className="flex justify-center items-center">
                            <ImSpoonKnife className="text-4xl" />
                          </div>
                        </td>
                      ) : null;
                    }

                    const courseExists = courses.some(
                      (course) => course.slot === slot
                    );

                    const color = courseExists
                      ? slotColors.find((color) => color.slot === slot)?.color
                      : "";

                    return (
                      <td
                        key={slotIndex}
                        className={`min-w-[7.5rem] text-xs sm:text-sm ${
                          themeClasses.border
                        } p-2 ${
                          courseExists ? themeClasses.courseTextColor : ""
                        }`}
                        style={{ backgroundColor: color }}
                      >
                        {getCourseDetails(slot)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-center space-x-6 text-xs sm:text-sm">
        <button
          onClick={handleExportAsImage}
          className="bg-green-500 text-white font-semibold px-6 py-3 rounded hover:bg-green-600"
        >
          Export as Image
        </button>
      </div>
    </div>
  );
};

export default ViewTimeTable;
