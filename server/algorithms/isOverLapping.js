//This function check is to time sets are overlapping
function isOverLapping (element1, element2) {
    
    let StartA = new Date(`2023-03-17 ${element1.Start_Time}`).getHours();
    let EndA = new Date(`2023-03-17 ${element1.End_Time}`).getHours();
    let StartB = new Date(`2023-03-17 ${element2.Start_Time}`).getHours();
    let EndB = new Date(`2023-03-17 ${element2.End_Time}`).getHours();

    //console.log(`module: ${element1.Module_ID}, module: ${element2.Module_ID}`)
    //console.log(`!((${EndA} <= ${StartB}) || (${StartA} >= ${EndB}))`, !((EndA <= StartB) || (StartA >= EndB)) )
    
    if (!((EndA <= StartB) || (StartA >= EndB)))
        return true;
    return false;
    // return ( ( +StartA <= +StartB && +StartB < +EndA ) 
    //     || ( +StartA <= +EndB && +EndB < +EndA ) )
    // if(!(+EndA <= +StartB || +StartA >= +endB))
    //     return true;
    // return false;
    // !((EndA <= StartB) || (StartA >= EndB))
    // (StartA <= StartB && StartB < EndA) || (StartB <= StartA && StartA < StartB)
}

module.exports = isOverLapping;