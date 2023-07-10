const getSeconds = require("./getSeconds");
//This function check is to time sets are overlapping
function isOverLapping(element1, element2) {
  let StartA = getSeconds(element1.Start_Time);
  let EndA = getSeconds(element1.End_Time);
  let StartB = getSeconds(element2.Start_Time);
  let EndB = getSeconds(element1.End_Time);

  return !(EndA <= StartB || StartA >= EndB);
}

module.exports = isOverLapping;
