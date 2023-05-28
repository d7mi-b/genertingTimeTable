module.exports.lecturerDays = (lecturerDays, day) => {
    
    // Check the day of module if it's ok with the available days of lecturer
    if (lecturerDays[0].Sunday === 1 && day === 1) {
        return true;
    }
    else if (lecturerDays[0].Monday === 1 && day === 2) {
        return true;
    }
    else if (lecturerDays[0].Tuesday === 1 && day === 3) {
        return true;
    }
    else if (lecturerDays[0].Wednesday === 1 && day === 4) {
        return true;
    }
    else if (lecturerDays[0].Thursday === 1 && day === 5) {
        return true;
    }
    
    return false;
}
