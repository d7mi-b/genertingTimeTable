// this function get the suitable time credit for each module
module.exports.getCredit = (module) => {
  if (module.Subject_Type_ID === 1) {
    const credit = module.Credit_Theoretical;
    return credit;
  } else if (module.Subject_Type_ID === 2) {
    const credit = module.Credit_Practical;
    return credit;
  } else if (module.Subject_Type_ID === 3) {
    const credit = module.Credit_Tutorial;
    return credit;
  }
};
