import React from "react";

const ViewTimetable = ({ courses }) => {
  const slots = {
    A: "9:00-9:55",
    B: "10:00-10:55",
    C: "11:00-11:55",
    D: "12:00-12:55",
    E: "12:55-1:55",
    F: "2:00-2:55",
    G: "3:00-3:55",
    P: "4:30-5:55",
    Q: "5:00-5:55",
    R: "4:30-5:55",
    S: "5:00-5:55",
  };

  const timetable = [
    ["A", "B", "C", "D", "P", "Q"],
    ["D", "E", "F", "G", "R", "S"],
    ["B", "C", "A", "G", "F", "Challenge Lectures"],
    ["C", "A", "B", "E", "Q", "P"],
    ["E", "F", "D", "G", "S", "R"],
  ];

  const getCourseDetails = (slot) => {
    const course = courses.find((course) => course.slot === slot);
    return course ? `${course.code} - ${course.name}` : slot;
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">View Timetable</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Time</th>
              <th className="border border-gray-300 px-4 py-2">Monday</th>
              <th className="border border-gray-300 px-4 py-2">Tuesday</th>
              <th className="border border-gray-300 px-4 py-2">Wednesday</th>
              <th className="border border-gray-300 px-4 py-2">Thursday</th>
              <th className="border border-gray-300 px-4 py-2">Friday</th>
            </tr>
          </thead>
          <tbody>
            {/* Morning slots */}
            {["A", "B", "C"].map((slot, rowIndex) => (
              <tr key={rowIndex}>
                <td className="border border-gray-300 px-4 py-2">
                  {slots[slot]}
                </td>
                {timetable.map((day, colIndex) => (
                  <td
                    key={colIndex}
                    className="border border-gray-300 px-4 py-2 text-center"
                  >
                    {getCourseDetails(day[rowIndex])}
                  </td>
                ))}
              </tr>
            ))}
            {/* Lunch break */}
            <tr>
              <td className="border border-gray-300 px-4 py-2">Lunch</td>
              <td
                colSpan={5}
                className="border border-gray-300 px-4 py-2 text-center"
              >
                Lunch Break
              </td>
            </tr>
            {/* Afternoon slots */}
            {["D", "P", "Q"].map((slot, rowIndex) => (
              <tr key={rowIndex + 3}>
                <td className="border border-gray-300 px-4 py-2">
                  {slots[slot]}
                </td>
                {timetable.map((day, colIndex) => (
                  <td
                    key={colIndex}
                    className="border border-gray-300 px-4 py-2 text-center"
                  >
                    {getCourseDetails(day[rowIndex + 3])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewTimetable;
