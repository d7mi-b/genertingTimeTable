//this function convert the time string into seconds to help checking for overlaps
function getDuration(obj) {
  const startTime = +obj.Start_Time.slice(0, 2);
  const endTime = +obj.Start_Time.slice(0, 2);

  return endTime - startTime;
}

module.exports = { getDuration };
