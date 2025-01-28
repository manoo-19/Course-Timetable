import React, { useState } from "react";

const ClassSchedule = () => {
  const [showCourseCode, setShowCourseCode] = useState(true);
  const [showVenue, setShowVenue] = useState(false);

  const timeSlots = [
    { start: "9:00", end: "9:55" },
    { start: "10:00", end: "10:55" },
    { start: "11:00", end: "11:55" },
    { start: "12:00", end: "12:55" },
    { start: "12:55", end: "14:30" },
    { start: "14:30", end: "15:55" },
    { start: "16:00", end: "17:25" },
  ];

  const courses = [
    {
      code: "BM5043",
      name: "Magnetic Resonance Imaging Principles",
      slot: "P",
      alias: "Magnetic Resonance",
      venue: "Room 101",
    },
    {
      code: "CH5450",
      name: "Optimization of Chemical Process Networks",
      slot: "F",
      alias: "Chemical Process Networks",
      venue: "Lab A",
    },
    {
      code: "CS5113",
      name: "Network Engineering",
      slot: "R",
      alias: "Network Engineering",
      venue: "Room 202",
    },
    {
      code: "CS5070",
      name: "Networked Wireless Systems",
      slot: "Q",
      alias: "Networked Wireless Systems",
      venue: "Room 303",
    },
    {
      code: "CS6890",
      name: "Fraud Analytics Using Predictive and Social Network Techniques",
      slot: "A",
      alias: "Fraud Analytics",
      venue: "Room 404",
    },
    {
      code: "CS6903",
      name: "Network Security",
      slot: "D",
      alias: "Network Security",
      venue: "Room 505",
    },
    {
      code: "EE1204",
      name: "Engineering Electromagnetics",
      slot: "C",
      alias: "Electromagnetics",
      venue: "Room 606",
    },
    {
      code: "EM6040",
      name: "Operational Entrepreneurship",
      slot: "E",
      alias: "Operational Entrepreneurship",
      venue: "Room 707",
    },
    {
      code: "IC2080",
      name: "Transport Properties",
      slot: "B",
      alias: "Transport Properties",
      venue: "Room 808",
    },
    {
      code: "IP5021",
      name: "Experimental Stress Analysis Lab",
      slot: "FN2",
      alias: "Experimental Stress",
      venue: "Lab B",
    },
    {
      code: "LA1077",
      name: "Psychology of Interpersonal Relationships",
      slot: "G",
      alias: "Psychology of Interpersonal Relationships",
      venue: "Room 909",
    },
    {
      code: "LA6780",
      name: "Infrastructure Studies",
      slot: "S",
      alias: "Infrastructure Studies",
      venue: "Room 1010",
    },
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
      afternoonLabel: "AN3",
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
                  {row.morning.map((slot, idx) => (
                    <td
                      key={idx}
                      className="border-2 min-w-[8rem] border-black p-2 text-center"
                    >
                      {getCourseDetails(slot)}
                    </td>
                  ))}
                  <td
                    rowSpan="2"
                    className="border-2 min-w-[8rem] border-black p-2 text-center"
                  >
                    {getCourseDetails(row.noon)}
                  </td>
                  <td
                    rowSpan="2"
                    className="border-2 min-w-[8rem] border-black p-2 text-center"
                  >
                    Lunch
                  </td>
                  {/* Afternoon slots */}
                  {row.afternoon.map((slot, idx) => (
                    <td
                      key={idx}
                      className="border-2 min-w-[8rem] border-black p-2 text-center"
                    >
                      {getCourseDetails(slot)}
                    </td>
                  ))}
                </tr>
                <tr>
                  {/* Morning label */}
                  <td
                    colSpan="3"
                    className="border-2 min-w-[8rem] border-black p-2 text-center"
                  >
                    {getCourseDetails(row.morningLabel)}
                  </td>
                  {/* Afternoon label */}
                  <td
                    colSpan="2"
                    className="border-2 min-w-[8rem] border-black p-2 text-center"
                  >
                    {getCourseDetails(row.afternoonLabel)}
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
