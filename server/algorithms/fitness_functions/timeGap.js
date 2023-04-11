module.exports.timeGap = (timeTable, groups, days) => {

    let times = []
    var timeGap = 1;

    if(timeTable){
        groups.map(g => {
            days.map(d => {
                timeTable.filter(t => t.Group_ID === g.Group_ID && t.Day_ID === d.Day_ID).map(t => {
                    let start = t.Start_Time.split(':')[0]
                    let end = t.End_Time.split(':')[0]
                    times.push(Number(start))
                    times.push(Number(end))
                })

                times.sort((a,b) => a-b)
                
                if(times.length > 0)
                { 
                    timeGap += (times[0]-8)
                    
                    let j=1;
                    while(j<times.length-2){
                        timeGap = timeGap + (times[j+1]-times[j]) 
                        j+=2
                    }
                }

                times = []
            })
            
        })

        //console.log(1/timeGap)
        return +(1/timeGap).toFixed(6);
    }
    else return 0

}