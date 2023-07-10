//this function convert the time string into seconds to help checking for overlaps
function getSeconds(timeStr) {
  if (typeof timeStr !== "string") {
    return undefined;
  }
  const [hours, minutes, seconds] = timeStr.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

module.exports = getSeconds;
