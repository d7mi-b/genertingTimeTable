const { getRandomItem } = require('./getRandomItem');

module.exports.getHall = (halls, groupCount, hallTypeID) => {
    const hallsAvailable = halls.filter((h) => {
        return (
            h.Hall_Capacity >= groupCount &&
            h.Hall_Type_ID === hallTypeID
        );
    });

    const hall = getRandomItem(hallsAvailable);

    return hall.Hall_ID;
}