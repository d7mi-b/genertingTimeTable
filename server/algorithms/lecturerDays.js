module.exports.lecturerDays = (timetable, lecturers) => {
  let status = true;
  // Check the day of module if it's ok with the available days of lecturer
  if (!lecturers) {
    lecturers.forEach((l) => {
      timetable
        .filter((e) => e.Lecturer_ID === l.Lecturer_ID)
        .forEach((ele) => {
          if (l.Sunday === 0 && ele.Day_ID === 1) status = false;
          else if (l.Monday === 0 && ele.Day_ID === 2) status = false;
          else if (l.Tuesday === 0 && ele.Day_ID === 3) status = false;
          else if (l.Wednesday === 0 && ele.Day_ID === 4) status = false;
          else if (l.Thursday === 0 && ele.Day_ID === 5) status = false;
        });
    });
    return status;
  }
};
