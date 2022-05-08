function toTitleCase(string) {
    var sentence = string.toLowerCase().split(" ");
    for(var i = 0; i< sentence.length; i++){
       sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }
    const new_sentence = sentence.join(" ")
 return new_sentence;
 }

export default toTitleCase;
