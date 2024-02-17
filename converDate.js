export function dateForGetRequest(date) {
    const currentDate = new Date(date);
    let dateNum = currentDate.getDate();
    if (dateNum < 10) { 
    dateNum = "0" + dateNum; 
    }
    let monthNum = currentDate.getMonth()+1;
    if (monthNum < 10) { 
    monthNum = "0" + monthNum; 
    }
    let yearNum = currentDate.getFullYear().toString().substring(2)
    let hour = currentDate.getHours();
    if (hour < 10) { 
    hour = "0" + hour; 
    }
    let minute = currentDate.getMinutes(); 
    if (minute < 10) { 
    minute = "0" + minute; 
    }
    return dateNum + "." + monthNum + "." + yearNum + " " + hour + ":" + minute 
}  
