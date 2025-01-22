import React, { useRef } from "react";
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

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const timetableRef = useRef(null);

  const getCourseDetails = (slot) => {
    const course = courses.find((course) => course.slot === slot);
    return course ? (
      <div className="flex flex-col">
        <span className="border-b border-gray-400 py-1">
          {course.code} - {slot}
        </span>
        <span className="border-b border-gray-400 py-1">{course.alias}</span>
        <span className="py-1">{course.venue}</span>
      </div>
    ) : (
      <span>{slot}</span>
    );
  };

  const handleExportAsImage = async () => {
    try {
      const dataUrl = await toPng(timetableRef.current, {
        backgroundColor: "white",
        cacheBust: true,
        width: timetableRef.current.scrollWidth,
        height: timetableRef.current.scrollHeight,
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
        className="overflow-x-auto border border-gray-200 bg-white p-4 print:overflow-visible print:w-full print:p-0"
      >
        <table className="w-full border-collapse table-fixed print:table-auto">
          <thead>
            <tr>
              <th className="w-24 border text-xs sm:text-sm bg-slate-200 border-gray-400 p-2 print:text-sm">
                Day
              </th>
              {slots.map((time, index) => (
                <th
                  key={index}
                  className="w-32 border text-xs sm:text-sm bg-slate-200 border-gray-400 p-2 text-center print:text-sm"
                >
                  {time}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day, dayIndex) => (
              <tr key={dayIndex} className="odd:bg-white even:bg-slate-200">
                <td className="border text-xs sm:text-sm bg-slate-200 border-gray-400 p-2 font-semibold text-center print:text-sm">
                  {day}
                </td>
                {timetable[dayIndex].map((slot, slotIndex) => {
                  if (slot === " " && slotIndex === 4) {
                    return dayIndex === 0 ? (
                      <td
                        key={slotIndex}
                        className="border border-gray-400 p-2 bg-slate-200"
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
                      className="border text-xs sm:text-sm border-gray-400 p-2 text-center print:text-sm"
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
      <div className="flex justify-center space-x-6 text-xs sm:text-sm print:hidden">
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
