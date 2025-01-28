import React from "react";

const ClassSchedule = () => {
  const timeSlots = [
    { start: "9:00", end: "9:55" },
    { start: "10:00", end: "10:55" },
    { start: "11:00", end: "11:55" },
    { start: "12:00", end: "12:55" },
    { start: "12:55", end: "14:30" },
    { start: "14:30", end: "15:55" },
    { start: "16:00", end: "17:25" },
  ];

  const scheduleData = [
    {
      day: "Monday",
      morning: ["A", "B", "C"],
      morningLabel: "FN1",
      noon: "D",
      afternoon: ["P", "Q"],
      afternoonLabel: "AN1",
    },
    {
      day: "Tuesday",
      morning: ["D", "E", "F"],
      morningLabel: "FN2",
      noon: "G",
      afternoon: ["R", "S"],
      afternoonLabel: "AN2",
    },
    {
      day: "Wednesday",
      morning: ["B", "C", "A"],
      morningLabel: "FN3",
      noon: "G",
      afternoon: ["F", "Challenge Lectures"],
      afternoonLabel: "",
    },
    {
      day: "Thursday",
      morning: ["C", "A", "B"],
      morningLabel: "FN4",
      noon: "E",
      afternoon: ["Q", "P"],
      afternoonLabel: "AN4",
    },
    {
      day: "Friday",
      morning: ["E", "F", "D"],
      morningLabel: "FN5",
      noon: "G",
      afternoon: ["S", "R"],
      afternoonLabel: "AN5",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-5 flex items-center justify-center min-h-screen">
      <div className="overflow-x-auto">
        <table className="border-collapse border-2 border-black">
          <thead>
            <tr>
              <th className="border-2 min-w-[8rem] border-black p-2">Day</th>
              {timeSlots.map((slot, index) => (
                <th
                  key={index}
                  className="border-2 min-w-[8rem] border-black p-2 text-sm"
                >
                  {slot.start}
                  <br />
                  {slot.end}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {scheduleData.map((row, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td
                    rowSpan="2"
                    className="border-2 min-w-[8rem] border-black p-2 font-medium text-center"
                  >
                    {row.day}
                  </td>
                  {/* Morning slots */}
                  {row.morning.map((class_, idx) => (
                    <td
                      key={idx}
                      className="border-2 min-w-[8rem] border-black p-2 text-center"
                    >
                      {class_}
                    </td>
                  ))}
                  <td
                    rowSpan="2"
                    className="border-2 min-w-[8rem] border-black p-2 text-center"
                  >
                    {row.noon}
                  </td>
                  <td
                    rowSpan="2"
                    className="border-2 min-w-[8rem] border-black p-2 text-center"
                  >
                    Lunch
                  </td>
                  {/* Afternoon slots */}
                  {row.afternoon.map((class_, idx) => (
                    <td
                      key={idx}
                      className="border-2 min-w-[8rem] border-black p-2 text-center"
                    >
                      {class_}
                    </td>
                  ))}
                </tr>
                <tr>
                  {/* Morning label */}
                  <td
                    colSpan="3"
                    className="border-2 min-w-[8rem] border-black p-2 text-center"
                  >
                    {row.morningLabel}
                  </td>
                  {/* Afternoon label */}
                  <td
                    colSpan="2"
                    className="border-2 min-w-[8rem] border-black p-2 text-center"
                  >
                    {row.afternoonLabel}
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassSchedule;
