//this function convert the time string into seconds to help checking for overlaps
function getDuration(obj) {
  const [startHours, StartMinutes, startSeconds] =
    obj.Start_Time.split(":").map(Number);
  const [endHours, endMinutes, endSeconds] =
    obj.End_Time.split(":").map(Number);
  const startTimeSeconds = startHours * 3600 + StartMinutes * 60 + startSeconds;
  const endTimeSeconds = endHours * 3600 + endMinutes * 60 + endSeconds;

  return endTimeSeconds - startTimeSeconds;
}
module.exports = { getDuration };
