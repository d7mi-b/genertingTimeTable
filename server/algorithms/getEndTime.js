module.exports.getEndTime = (startTime, modules) => {

    if (!modules.Credit_Theoretical)
        console.log(modules)

    if (modules.Subject_Type_ID === 1 && modules.Credit_Theoretical) {
        
        if (startTime + modules.Credit_Theoretical < 10)
            return `0${startTime + modules.Credit_Theoretical}:00:00`;

        return `${startTime + modules.Credit_Theoretical}:00:00`;

    } 
    
    if (modules.Subject_Type_ID === 2 && modules.Credit_Practical) {

        if (startTime + modules.Credit_Practical < 10)
            return `0${startTime + modules.Credit_Practical}:00:00`;

        return `${startTime + modules.Credit_Practical}:00:00`;

    } 
    
    if (modules.Subject_Type_ID === 3 && modules.Credit_Tutorial) {

        if (startTime + modules.Credit_Tutorial < 10)
            return `0${startTime + modules.Credit_Tutorial}:00:00`;
        
        return `${startTime + modules.Credit_Tutorial}:00:00`;

    }
}