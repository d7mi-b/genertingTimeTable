module.exports.labsOnSameDay = (timetable, modules, groups) => {

    let score = 0;
    
    if(timetable){
        // check each group timetable
        groups.forEach(group => {
            let groupModule = [];
            modules.forEach(module =>{
                
                timetable.filter(
                    table => table.Group_ID === group.Group_ID &&   // check if table is for specific group
                    table.Module_ID === module.Module_ID &&         // check if it's same module
                    module.Subject_Type_ID === 2                    // check if it's a lab subject
                    ).forEach(one => {
                    groupModule.push(one);
            })
            });
    

            // Check if two lab subjects in the same day And give score if true
            if(groupModule.length > 1){
                for (let i=0; i < groupModule.length; i++){
                    for(let j = i + 1; j< groupModule.length; j++){
                        if(groupModule[i].Day_ID === groupModule[j].Day_ID){
                        score+=1;
                    }
                }
                }
            }
    
        });
    }
    
    return score;
    }
    
    