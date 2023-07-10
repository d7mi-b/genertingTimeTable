const isOverlapping = require("./isOverLapping");
const getSeconds = require("./getSeconds");

// Check if a subject is passed the end time limit
function hasInvalidEndTime(schedule) {
  const endTimeLimit = getSeconds("17:00:00");
  return schedule.some((slot) => getSeconds(slot.End_Time) > endTimeLimit);
}
//Check if the lecturer is teaching more than one subject a the same time
function hasLecturerConflict(schedule) {
  const slotsByLecturer = {};

  for (const slot of schedule) {
    const { Lecturer_ID, Day_ID } = slot;
    if (!slotsByLecturer[Lecturer_ID]) {
      slotsByLecturer[Lecturer_ID] = {};
    }

    if (!slotsByLecturer[Lecturer_ID][Day_ID]) {
      slotsByLecturer[Lecturer_ID][Day_ID] = [];
    }

    slotsByLecturer[Lecturer_ID][Day_ID].push(slot);
  }

  for (const [lecturer, slotsByDay] of Object.entries(slotsByLecturer)) {
    for (const [day, slots] of Object.entries(slotsByDay)) {
      for (let i = 0; i < slots.length; i++) {
        for (let j = i + 1; j < slots.length; j++) {
          if (isOverlapping(slots[i], slots[j])) {
            return true;
          }
        }
      }
    }
  }

  return false;
}
// Check if the group has more than one subject scheduled at the same time
function hasGroupConflict(schedule) {
  const slotsByGroup = {};

  for (const slot of schedule) {
    const { Day_ID } = slot;
    const Group_ID = parseInt(slot.Group_ID); // convert Group_ID to an integer
    if (!slotsByGroup[Group_ID]) {
      slotsByGroup[Group_ID] = {};
    }

    if (!slotsByGroup[Group_ID][Day_ID]) {
      slotsByGroup[Group_ID][Day_ID] = [];
    }

    slotsByGroup[Group_ID][Day_ID].push(slot);
  }
  for (const [group, slotsByDay] of Object.entries(slotsByGroup)) {
    for (const [day, slots] of Object.entries(slotsByDay)) {
      for (let i = 0; i < slots.length; i++) {
        for (let j = i + 1; j < slots.length; j++) {
          if (
            !(slots[i].Subject_Type_ID === 2 && slots[j].Subject_Type_ID === 2)
          ) {
            if (isOverlapping(slots[i], slots[j])) {
              return true;
            }
          }
        }
      }
    }
  }

  return false;
}

function hasHallConflict(schedule) {
  const slotsByHall = {};

  for (const slot of schedule) {
    const { Hall_ID, Day_ID } = slot;
    if (!slotsByHall[Hall_ID]) {
      slotsByHall[Hall_ID] = {};
    }

    if (!slotsByHall[Hall_ID][Day_ID]) {
      slotsByHall[Hall_ID][Day_ID] = [];
    }

    slotsByHall[Hall_ID][Day_ID].push(slot);
  }

  for (const [hall, slotsByDay] of Object.entries(slotsByHall)) {
    for (const [day, slots] of Object.entries(slotsByDay)) {
      for (let i = 0; i < slots.length; i++) {
        for (let j = i + 1; j < slots.length; j++) {
          if (isOverlapping(slots[i], slots[j])) {
            return true;
          }
        }
      }
    }
  }

  return false;
}

module.exports.feasible = (schedule) => {
  if (!schedule || schedule.length === 0) {
    return false;
  }

  if (hasInvalidEndTime(schedule)) {
    return false;
  }

  if (hasLecturerConflict(schedule)) {
    return false;
  }

  if (hasGroupConflict(schedule)) {
    return false;
  }

  if (hasHallConflict(schedule)) {
    return false;
  }

  return true;
};
