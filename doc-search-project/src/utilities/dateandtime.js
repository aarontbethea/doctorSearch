function convertToWrittenDate(dateVal) {
    console.log("Date value received")
    let convertedDate = "";
    if (typeof dateVal === 'number'){
        // convert epoch date
        console.log("num")
        convertedDate = new Date(dateVal * 1000).toLocaleDateString("en-US");
    }
    if (typeof dateVal === 'string'){
        console.log("string")
        const [year,month,day] = dateVal.split('-');
        convertedDate = [month,day,year].join('/');
    }
    return convertedDate;
}

export default convertToWrittenDate;