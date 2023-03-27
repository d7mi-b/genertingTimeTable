//This function check is to time sets are overlapping
function isOverLapping (element1, element2) {
    
    let StartA = new Date(`2023-03-17 ${element1.Start_Time}`).getHours();
    let EndA = new Date(`2023-03-17 ${element1.End_Time}`).getHours();
    let StartB = new Date(`2023-03-17 ${element2.Start_Time}`).getHours();
    let EndB = new Date(`2023-03-17 ${element2.End_Time}`).getHours();
    
    if (!((EndA <= StartB) || (StartA >= EndB)))
        return true;
    return false;
}

module.exports = isOverLapping;