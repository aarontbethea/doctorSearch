//handle boolean display for json objects
const checkVal = (value) =>{
    let new_value;
    if (typeof value === 'boolean'){
        if (value === true) {
            new_value = "YES";
        } else {
            new_value = "NO";
        }
    } else {
        
        new_value = value;
    };
    return new_value
};
export default checkVal;