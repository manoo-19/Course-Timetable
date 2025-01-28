import React, { useState, useRef } from "react";
import { ImSpoonKnife } from "react-icons/im";
import { toPng } from "html-to-image";
import { useTheme } from "./ThemeContext";

const ViewTimeTable = ({ courses = [] }) => {
  const { theme } = useTheme();

  const timeSlots = [
    { start: "9:00", end: "9:55" },
    { start: "10:00", end: "10:55" },
    { start: "11:00", end: "11:55" },
    { start: "12:00", end: "12:55" },
    { start: "12:55", end: "14:30" },
    { start: "14:30", end: "15:55" },
    { start: "16:00", end: "17:25" },
  ];

  const timeTable = [
    {
      day: "Monday",
      morningSlots: ["A", "B", "C"],
      morningLab: "FN1",
      noon: "D",
      afternoonSlots: ["P", "Q"],
      afternoonLab: "AN1",
    },
    {
      day: "Tuesday",
      morningSlots: ["D", "E", "F"],
      morningLab: "FN2",
      noon: "G",
      afternoonSlots: ["R", "S"],
      afternoonLab: "AN2",
    },
    {
      day: "Wednesday",
      morningSlots: ["B", "C", "A"],
      morningLab: "FN3",
      noon: "G",
      afternoonSlots: ["F", "Challenge Lectures"],
      afternoonLab: "AN3",
    },
    {
      day: "Thursday",
      morningSlots: ["C", "A", "B"],
      morningLab: "FN4",
      noon: "E",
      afternoonSlots: ["Q", "P"],
      afternoonLab: "AN4",
    },
    {
      day: "Friday",
      morningSlots: ["E", "F", "D"],
      morningLab: "FN5",
      noon: "G",
      afternoonSlots: ["S", "R"],
      afternoonLab: "AN5",
    },
  ];

  const darkSlotColors = [
    { slot: "A", color: "#b91c1c" }, // Tailwind: red-700
    { slot: "B", color: "#ca8a04" }, // Tailwind: yellow-700
    { slot: "C", color: "#0f766e" }, // Tailwind: teal-700
    { slot: "D", color: "#92400e" }, // Tailwind: amber-800
    { slot: "E", color: "#a21caf" }, // Tailwind: fuchsia-700
    { slot: "F", color: "#c2410c" }, // Tailwind: orange-700
    { slot: "G", color: "#1d4ed8" }, // Tailwind: blue-700
    { slot: "P", color: "#6d28d9" }, // Tailwind: purple-700
    { slot: "Q", color: "#be123c" }, // Tailwind: rose-700
    { slot: "R", color: "#4d7c0f" }, // Tailwind: lime-700
    { slot: "S", color: "#0e7490" }, // Tailwind: cyan-700
    { slot: "FN1", color: "#b91c1c" }, // A
    { slot: "AN1", color: "#6d28d9" }, // P
    { slot: "FN2", color: "#a21caf" }, // E
    { slot: "AN2", color: "#4d7c0f" }, // R
    { slot: "FN3", color: "#0f766e" }, // C
    { slot: "AN3", color: "#c2410c" }, // F
    { slot: "FN4", color: "#ca8a04" }, // B
    { slot: "AN4", color: "#be123c" }, // Q
    { slot: "FN5", color: "#92400e" }, // D
    { slot: "AN5", color: "#0e7490" }, // S
  ];

  const lightSlotColors = [
    { slot: "A", color: "#dc2626" }, // Tailwind: red-600
    { slot: "B", color: "#ca8a04" }, // Tailwind: yellow-700
    { slot: "C", color: "#0d9488" }, // Tailwind: teal-600
    { slot: "D", color: "#b45309" }, // Tailwind: amber-700
    { slot: "E", color: "#c026d3" }, // Tailwind: fuchsia-600
    { slot: "F", color: "#ea580c" }, // Tailwind: orange-600
    { slot: "G", color: "#2563eb" }, // Tailwind: blue-600
    { slot: "P", color: "#7c3aed" }, // Tailwind: purple-600
    { slot: "Q", color: "#e11d48" }, // Tailwind: rose-600
    { slot: "R", color: "#65a30d" }, // Tailwind: lime-600
    { slot: "S", color: "#0891b2" }, // Tailwind: cyan-600
    { slot: "FN1", color: "#dc2626" }, // A
    { slot: "AN1", color: "#7c3aed" }, // P
    { slot: "FN2", color: "#c026d3" }, // E
    { slot: "AN2", color: "#65a30d" }, // R
    { slot: "FN3", color: "#0d9488" }, // C
    { slot: "AN3", color: "#ea580c" }, // F
    { slot: "FN4", color: "#ca8a04" }, // B
    { slot: "AN4", color: "#e11d48" }, // Q
    { slot: "FN5", color: "#b45309" }, // D
    { slot: "AN5", color: "#0891b2" }, // S
  ];

  const [showCourseCode, setShowCourseCode] = useState(false);
  const [showVenue, setShowVenue] = useState(false);

  const timeTableRef = useRef(null);

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
          alternateBackground: "bg-[#121212]",
          border: "border-2 border-neutral-400",
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

  const slotToCourseMap = courses.reduce((map, course) => {
    map[course.slot] = course;
    return map;
  }, {});

  const getCourseDetails = (slot) => {
    const course = courses.find((course) => course.slot === slot);
    return course ? (
      <div
        className={`flex flex-col font-medium ${themeClasses.courseTextColor}`}
      >
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
                {timeSlots.map((slot, timeIndex) => (
                  <th
                    key={timeIndex}
                    scope="col"
                    className={`min-w-[7.5rem] text-xs sm:text-sm ${themeClasses.background} ${themeClasses.border} p-2`}
                  >
                    {slot.start}
                    <br />
                    {slot.end}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeTable.map((row, dayIndex) => {
                const isCourseInMorningSlots = courses.some((course) =>
                  row.morningSlots.includes(course.slot)
                );

                const isCourseInAfternoonSlots = courses.some((course) =>
                  row.afternoonSlots.includes(course.slot)
                );

                const isCourseInMorningLab = courses.some(
                  (course) => course.slot === row.morningLab
                );

                const isCourseInAfternoonLab = courses.some(
                  (course) => course.slot === row.afternoonLab
                );

                let rowSpanDay = null;
                let rowSpanMorning = null;
                let rowSpanAfternoon = null;
                let displayMorningSlots = null;
                let displayMorningLab = null;
                let displayAfternoonSlots = null;
                let displayAfternoonLab = null;

                if (isCourseInMorningSlots) {
                  displayMorningSlots = null;
                  displayMorningLab = "hidden";
                } else if (isCourseInMorningLab) {
                  displayMorningSlots = "hidden";
                  displayMorningLab = null;
                }

                if (isCourseInAfternoonSlots) {
                  displayAfternoonSlots = null;
                  displayAfternoonLab = "hidden";
                } else if (isCourseInAfternoonLab) {
                  displayAfternoonSlots = "hidden";
                  displayAfternoonLab = null;
                }

                const isCourseInMorning =
                  isCourseInMorningSlots || isCourseInMorningLab;
                const isCourseInAfternoon =
                  isCourseInAfternoonSlots || isCourseInAfternoonLab;

                if (isCourseInMorning && isCourseInAfternoon) {
                  rowSpanDay = 1;
                  rowSpanMorning = 1;
                  rowSpanAfternoon = 1;
                } else {
                  if (isCourseInMorning) {
                    rowSpanDay = 2;
                    rowSpanMorning = 2;
                    rowSpanAfternoon = 1;
                  } else if (isCourseInAfternoon) {
                    rowSpanDay = 2;
                    rowSpanMorning = 1;
                    rowSpanAfternoon = 2;
                  } else {
                    rowSpanDay = 2;
                    rowSpanMorning = 1;
                    rowSpanAfternoon = 1;
                  }
                }

                let courseBoxClasses = `min-w-[7.5rem] text-xs sm:text-sm ${themeClasses.border} p-2`;

                return (
                  <React.Fragment key={dayIndex}>
                    <tr
                      key={dayIndex}
                      className={`${themeClasses.alternateBackground}`}
                    >
                      <td
                        rowSpan={rowSpanDay}
                        className={`min-w-[4rem] text-xs sm:text-sm ${themeClasses.background} ${themeClasses.border} p-2 font-semibold`}
                      >
                        {row.day}
                      </td>
                      {/* Morning slots */}
                      {row.morningSlots.map((slot, slotIndex) => {
                        const courseExists = courses.some(
                          (course) => course.slot === slot
                        );

                        const color = courseExists
                          ? slotColors.find((color) => color.slot === slot)
                              ?.color
                          : "";

                        return (
                          <td
                            key={slotIndex}
                            rowSpan={rowSpanMorning}
                            className={`${courseBoxClasses} ${displayMorningSlots}`}
                            style={{ backgroundColor: color }}
                          >
                            {getCourseDetails(slot)}
                          </td>
                        );
                      })}

                      {displayMorningSlots === "hidden" && (
                        <td
                          rowSpan={rowSpanMorning}
                          colSpan="3"
                          className={`${courseBoxClasses} ${displayMorningLab}`}
                          style={{
                            backgroundColor: courses.some(
                              (course) => course.slot === row.morningLab
                            )
                              ? slotColors.find(
                                  (color) => color.slot === row.morningLab
                                )?.color
                              : "",
                          }}
                        >
                          {getCourseDetails(row.morningLab)}
                        </td>
                      )}

                      <td
                        rowSpan={rowSpanDay}
                        className={`${courseBoxClasses}`}
                        style={{
                          backgroundColor: courses.some(
                            (course) => course.slot === row.noon
                          )
                            ? slotColors.find(
                                (color) => color.slot === row.noon
                              )?.color
                            : "",
                        }}
                      >
                        {getCourseDetails(row.noon)}
                      </td>

                      {dayIndex === 0 && (
                        <td
                          rowSpan={10}
                          className={`min-w-[7.5rem] ${themeClasses.background} ${themeClasses.border} p-2`}
                        >
                          <div className="flex justify-center items-center">
                            <ImSpoonKnife className="text-4xl" />
                          </div>
                        </td>
                      )}

                      {/* Afternoon slots */}
                      {row.afternoonSlots.map((slot, slotIndex) => {
                        const courseExists = courses.some(
                          (course) => course.slot === slot
                        );

                        const color = courseExists
                          ? slotColors.find((color) => color.slot === slot)
                              ?.color
                          : "";

                        return (
                          <td
                            key={slotIndex}
                            rowSpan={rowSpanAfternoon}
                            className={`${courseBoxClasses} ${displayAfternoonSlots}`}
                            style={{ backgroundColor: color }}
                          >
                            {getCourseDetails(slot)}
                          </td>
                        );
                      })}

                      {displayAfternoonSlots === "hidden" && (
                        <td
                          rowSpan={rowSpanAfternoon}
                          colSpan="2"
                          className={`${courseBoxClasses} ${displayAfternoonLab}`}
                          style={{
                            backgroundColor: courses.some(
                              (course) => course.slot === row.afternoonLab
                            )
                              ? slotColors.find(
                                  (color) => color.slot === row.afternoonLab
                                )?.color
                              : "",
                          }}
                        >
                          {getCourseDetails(row.afternoonLab)}
                        </td>
                      )}
                    </tr>
                    <tr className={`${themeClasses.alternateBackground}`}>
                      {/* Morning label */}
                      {displayMorningSlots === null && (
                        <td
                          rowSpan={rowSpanMorning}
                          colSpan="3"
                          className={`${courseBoxClasses} ${displayMorningLab}`}
                          style={{
                            backgroundColor: courses.some(
                              (course) => course.slot === row.morningLab
                            )
                              ? slotColors.find(
                                  (color) => color.slot === row.morningLab
                                )?.color
                              : "",
                          }}
                        >
                          {getCourseDetails(row.morningLab)}
                        </td>
                      )}

                      {/* Afternoon label */}
                      {displayAfternoonSlots === null && (
                        <td
                          rowSpan={rowSpanAfternoon}
                          colSpan="2"
                          className={`${courseBoxClasses} ${displayAfternoonLab}`}
                          style={{
                            backgroundColor: courses.some(
                              (course) => course.slot === row.afternoonLab
                            )
                              ? slotColors.find(
                                  (color) => color.slot === row.afternoonLab
                                )?.color
                              : "",
                          }}
                        >
                          {getCourseDetails(row.afternoonLab)}
                        </td>
                      )}
                    </tr>
                  </React.Fragment>
                );
              })}
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
