import React, { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { ImSpoonKnife } from "react-icons/im";

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
    { slot: "A", color: "#FF5733" }, // Vivid Red-Orange
    { slot: "B", color: "#33FF57" }, // Bright Green
    { slot: "C", color: "#3357FF" }, // Bright Blue
    { slot: "D", color: "#FFC300" }, // Golden Yellow
    { slot: "E", color: "#FF33A6" }, // Vivid Pink
    { slot: "F", color: "#33FFF6" }, // Cyan
    { slot: "G", color: "#8D33FF" }, // Purple
    { slot: "P", color: "#FF6F33" }, // Deep Orange
    { slot: "Q", color: "#33FFB2" }, // Aquamarine
    { slot: "R", color: "#FF573D" }, // Coral
    { slot: "S", color: "#33D4FF" }, // Sky Blue
  ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const timetableRef = useRef(null);
  const [showCourseCode, setShowCourseCode] = useState(false);
  const [showVenue, setShowVenue] = useState(false);

  const getCourseDetails = (slot) => {
    const course = courses.find((course) => course.slot === slot);
    return course ? (
      <div className="flex flex-col">
        {showCourseCode && (
          <span className="border-b border-gray-400 pb-1">
            {course.code} - {slot}
          </span>
        )}
        <span className="py-1">{course.alias}</span>
        {showVenue && (
          <span className="border-t border-gray-400 pt-1">{course.venue}</span>
        )}
      </div>
    ) : (
      <span>{slot}</span>
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
        width: timetableElement.scrollWidth,
        height: timetableElement.scrollHeight,
      });

      const link = document.createElement("a");
      link.download = "timetable.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Failed to export timetable as image:", error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 w-full">
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
            <span className="block w-full h-full bg-slate-300 rounded-full peer-checked:bg-green-500 transition-colors duration-300"></span>
            <span className="absolute left-1 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow transform translate-x-0 peer-checked:translate-x-4 transition-transform duration-300"></span>
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
            <span className="block w-full h-full bg-slate-300 rounded-full peer-checked:bg-green-500 transition-colors duration-300"></span>
            <span className="absolute left-1 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow transform translate-x-0 peer-checked:translate-x-4 transition-transform duration-300"></span>
          </div>
        </label>
      </div>

      <div className="bg-white p-4 shadow-md rounded-lg">
        <div id="timetable" ref={timetableRef} className="overflow-auto">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr>
                <th className="min-w-[3.5rem] border text-xs sm:text-sm bg-slate-200 border-gray-400 p-2">
                  Day
                </th>
                {slots.map((time, index) => (
                  <th
                    key={index}
                    scope="col"
                    className="min-w-[7.5rem] border text-xs sm:text-sm bg-slate-200 border-gray-400 p-2 text-center"
                  >
                    {time}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map((day, dayIndex) => (
                <tr key={dayIndex} className="odd:bg-white even:bg-slate-200">
                  <td className="min-w-[3.5rem] border text-xs sm:text-sm bg-slate-200 border-gray-400 p-2 font-semibold text-center">
                    {day}
                  </td>
                  {timetable[dayIndex].map((slot, slotIndex) => {
                    if (slot === " " && slotIndex === 4) {
                      return dayIndex === 0 ? (
                        <td
                          key={slotIndex}
                          className="min-w-[7.5rem] border border-gray-400 p-2 bg-slate-200"
                          rowSpan={5}
                        >
                          <div className="flex justify-center items-center">
                            <ImSpoonKnife className="text-4xl" />
                          </div>
                        </td>
                      ) : null;
                    }
                    return (
                      <td
                        key={slotIndex}
                        className="min-w-[7.5rem] border text-xs sm:text-sm border-gray-400 p-2 text-center"
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
        <button
          onClick={handlePrint}
          className="bg-blue-500 text-white font-semibold px-6 py-3 rounded hover:bg-blue-600"
        >
          Print Timetable
        </button>
      </div>
      <style>
        {`
          @media print {
            @page {
              size: landscape;
              margin: 1cm;
            }
            body * {
              visibility: hidden;
            }
            #timetable, #timetable * {
              visibility: visible;
            }
            #timetable {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ViewTimetable;
