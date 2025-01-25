import React, { useRef, useState } from "react";
import { ImSpoonKnife } from "react-icons/im";
import { toPng } from "html-to-image";

const ViewTimetable = ({ courses = [] }) => {
  const slots = [
    "9:00 - 9:55",
    "10:00 - 10:55",
    "11:00 - 11:55",
    "12:00 - 12:55",
    "12:55 - 14:30",
    "14:30 - 16:00",
    "16:00 - 17:25",
  ];

  const timetable = [
    ["A", "B", "C", "D", " ", "P", "Q"],
    ["D", "E", "F", "G", " ", "R", "S"],
    ["B", "C", "A", "G", " ", "F", "Challenge Lectures"],
    ["C", "A", "B", "E", " ", "Q", "P"],
    ["E", "F", "D", "G", " ", "S", "R"],
  ];

  const slotColors = [
    { slot: "A", color: "#AF3029" }, // Red-600
    { slot: "B", color: "#BC5215" }, // Orange-600
    { slot: "C", color: "#AD8301" }, // Yellow-600
    { slot: "D", color: "#66800B" }, // Green-600
    { slot: "E", color: "#24837B" }, // Cyan-600
    { slot: "F", color: "#205EA6" }, // Blue-600
    { slot: "G", color: "#5E409D" }, // Purple-600
    { slot: "P", color: "#A02F6F" }, // Magenta-600
    { slot: "Q", color: "#ec1f5b" }, // Hot-Pink-600
    { slot: "R", color: "#0C7B93" }, // Teal-600
    { slot: "S", color: "#94776d" }, // Wood-600
  ];

  const lslotColors = [
    { slot: "A", color: "#D14D41" }, // Red-400
    { slot: "B", color: "#DA702C" }, // Orange-400
    { slot: "C", color: "#D0A215" }, // Yellow-400
    { slot: "D", color: "#879A39" }, // Green-400
    { slot: "E", color: "#3AA99F" }, // Cyan-400
    { slot: "F", color: "#4385BE" }, // Blue-400
    { slot: "G", color: "#8B7EC8" }, // Purple-400
    { slot: "P", color: "#CE5D97" }, // Magenta-400
    { slot: "Q", color: "#ff204e" }, // Hot-Pink-400
    { slot: "R", color: "#00A8CC" }, // Teal-400
    { slot: "S", color: "#9c763e" }, // Wood-400
  ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const [showCourseCode, setShowCourseCode] = useState(false);
  const [showVenue, setShowVenue] = useState(false);

  const timetableRef = useRef(null);

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
    const timetableElement = timetableRef.current;

    if (!timetableElement) {
      console.error("Timetable element not found!");
      return;
    }

    try {
      const dataUrl = await toPng(timetableElement, {
        backgroundColor: "white",
        cacheBust: true,
        pixelRatio: 2,
        width: timetableElement.scrollWidth + 32,
        height: timetableElement.scrollHeight + 32,
        style: {
          padding: "16px",
        },
      });

      const link = document.createElement("a");
      link.download = "timetable.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error exporting timetable as image:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6 text-center">
      {courses.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 w-full text-neutral-300">
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
              <span className="block w-full h-full bg-[#121212] rounded-full peer-checked:bg-green-500 transition-colors duration-300"></span>
              <span className="absolute left-1 top-1/2 -translate-y-1/2 w-4 h-4 bg-neutral-300 rounded-full shadow transform translate-x-0 peer-checked:translate-x-4 transition-transform duration-300"></span>
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
              <span className="block w-full h-full bg-[#121212] rounded-full peer-checked:bg-green-500 transition-colors duration-300"></span>
              <span className="absolute left-1 top-1/2 -translate-y-1/2 w-4 h-4 bg-neutral-300 rounded-full shadow transform translate-x-0 peer-checked:translate-x-4 transition-transform duration-300"></span>
            </div>
          </label>
        </div>
      )}

      <div className="shadow-md rounded-lg text-neutral-300">
        <div ref={timetableRef} className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="min-w-[4rem] text-xs sm:text-sm bg-[#1E1E1E] border border-neutral-300 p-2">
                  Day
                </th>
                {slots.map((time, index) => (
                  <th
                    key={index}
                    scope="col"
                    className="min-w-[7.5rem] text-xs sm:text-sm bg-[#1E1E1E] border border-neutral-300 p-2"
                  >
                    {time}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map((day, dayIndex) => (
                <tr key={dayIndex} className="bg-[#121212]">
                  <td className="min-w-[4rem] text-xs sm:text-sm bg-[#1E1E1E] border border-neutral-300 p-2 font-semibold">
                    {day}
                  </td>
                  {timetable[dayIndex].map((slot, slotIndex) => {
                    if (slot === " " && slotIndex === 4) {
                      return dayIndex === 0 ? (
                        <td
                          key={slotIndex}
                          className="min-w-[7.5rem] bg-[#1E1E1E] border border-neutral-300 p-2"
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
                        className={`min-w-[7.5rem] text-xs sm:text-sm border border-neutral-300 p-2 ${
                          courseExists ? "text-neutral-300" : ""
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

export default ViewTimetable;
