module.exports.getEndTime = (startTime, module) => {
    if (module.Subject_Type_ID === 1) {

        const endTime = `${
            +startTime.slice(0, 2) + module.Credit_Theoretical < 10
            ? `0${+startTime.slice(0, 2) + module.Credit_Theoretical}`
            : +startTime.slice(0, 2) + module.Credit_Theoretical
        }:00:00`;
    
        return endTime;

    } else if (module.Subject_Type_ID === 2) {

        const endTime = `${
            +startTime.slice(0, 2) + module.Credit_Practical < 10
            ? `0${+startTime.slice(0, 2) + module.Credit_Practical}`
            : +startTime.slice(0, 2) + module.Credit_Practical
        }:00:00`;
    
        return endTime;

    } else if (module.Subject_Type_ID === 3) {

        const endTime = `${
            +startTime.slice(0, 2) + module.Credit_Tutorial < 10
            ? `0${+startTime.slice(0, 2) + module.Credit_Tutorial}`
            : +startTime.slice(0, 2) + module.Credit_Tutorial
        }:00:00`;
    
        return endTime;

    }
}