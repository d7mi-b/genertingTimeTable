// this function calculate the end time for a module
module.exports.calculateEndTime = (startTime, credit) => {
  let endTime;
  const endHour = parseInt(startTime.slice(0, 2)) + credit;
  endTime = `${endHour}${startTime.slice(2)}`;
  return endTime;
};
