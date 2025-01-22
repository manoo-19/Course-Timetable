import React, { useRef } from "react";
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

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const timetableRef = useRef(null);

  const getCourseDetails = (slot) => {
    const course = courses.find((course) => course.slot === slot);
    return course ? (
      <div className="flex flex-col">
        <span className="border-b-2 py-2">{course.code}</span>
        <span className="border-b-2 py-2">{course.name}</span>
        <span className="py-2">{slot}</span>
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
      <div
        id="timetable"
        ref={timetableRef}
        className="overflow-x-auto border border-gray-200 bg-white p-4"
      >
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
                {timetable[dayIndex].map((slot, slotIndex) => (
                  <td
                    key={slotIndex}
                    className={`min-w-[7.5rem] border text-xs sm:text-sm border-gray-400 p-2 text-center
                      ${
                        slot === " "
                          ? dayIndex === 0
                            ? "row-span-4 bg-blue-500"
                            : ""
                          : ""
                      }
                      `}
                  >
                    {getCourseDetails(slot)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
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
