//this function calculate the duration of a module in seconds
function getDuration(module) {
  if (!module) {
    return 0;
  }
  const [starHours, startMinutes, startSeconds] =
    module.Start_Time.split(":").map(Number);

  const [endHours, endMinutes, endSeconds] =
    module.End_Time.split(":").map(Number);

  const startInSecond = starHours * 3600 + startMinutes * 60 + startSeconds;
  const endInsSecond = endHours * 3600 + endMinutes * 60 + endSeconds;
  return endInsSecond - startInSecond;
}

module.exports = { getDuration };
