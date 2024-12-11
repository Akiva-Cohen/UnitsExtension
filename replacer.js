
handleElement(document.querySelector('html'));
//a function to handle one html element (including <html>)
function handleElement(element) {
    //loops through all of the children of the element backwards
    for (let i = element.childNodes.length; i-- > 0;) {
        //creates the childelement for us to work with
        let child = element.childNodes.item(i);
        //check if it is an elementNode(1): a type of node that contains content, but doesnt hold the text directly
        if (child.nodeType === 1) {
            //gets name of node: the name coresponds to the type of element
            let name = child.nodeName.toLowerCase();
            //checks if child is a style or script element, neither of which contain usefull text and need to not be messed with
            if (name != 'style' && name != 'script') {
                //if not, do it all again to the child
                handleElement(child);
            }
        } else if (child.nodeType === 3) {
            //runs our work method on it
            if (typeof(child) === "string") {
            } else {
                child.textContent = work(child.textContent);
            }
        }
    }
}

//the function that directly handles text
function work(text) {
    let startArr = ["cm", "CM", "Cm", "centimeter", "Centimeter", "centimeters", "Centimeters", 'mm','MM','Mm','millimeter',"Millimeter","millimeters","Millimeters",'g','G',"gram","Gram","grams","Grams","kg","KG","Kg","kilogram","Kilogram","kilograms","Kilograms","m","M","meter","meters","Meter","Meters","km","KM","Kilometer","kilometer","Kilometers","kilometers"]
    let toArr = ["in",'IN',"In","inch","Inch",'inches',"Inches","in","IN","In","inch","Inch","inches","Inches","oz","Oz","ounce","Ounce","ounces",'Ounces','lbs','lbs','lbs',"pound","Pound","pounds","Pounds","ft","ft","foot","feet","Foot","Feet","mi","MI","Mile","mile","Miles","miles"]
    let factorArr = [0.394,0.394,0.394,0.394,0.394,0.394,0.394,0.0394, 0.0394,0.0394,0.0394,0.0394,0.0394,0.0394,0.353,0.353,0.353,0.353,0.353,2.205,2.205,2.205,2.205,2.205,2.205,2.205,3.281,3.281,3.281,3.281,3.281,3.281,0.621,0.621,0.621,0.621,0.621,0.621]
    for(let i = 0; i < startArr.length; i++) {
        text = replaceMeasure(text, startArr[i], toArr[i], factorArr[i]);
    }
    return text;
}
function replaceMeasure(text, name, replacement, factor) {
    let options = listPotential(text, name);
    for (let i = options.length; i-- > 0;) {
        console.log(text);
        text = replaceMeasureNext(text, name, replacement, factor, options[i]);
        console.log("after" + text);
    }
    return text;
}
function listPotential(text, name) {
    let out = [];
    let start = 0;
    while (text.indexOf(name, start) != -1) {
        out.push(text.indexOf(name, start));
        start = out[out.length - 1] + name.length;
    }
    return out;
}
function replaceMeasureNext(text, name, replacement, factor, index) {
    const regex = /\p{L}/gu;
    let num = 0;
    let outText = text;
    if (index + name.length === text.length || regex.test(text[index+name.length]) === false) {
        if (text[index-1] === ' ') {
            if (isNaN(parseInt(text[index-2], 10)) === false) {
                num = getNumberFromEnd(text.substring(0, index - 1));
                num = num * factor;
                num = num.toFixed(2);
                outText = "" + text.substring(0, getStartNumIndex(text.substring(0, index - 1))) + " " + num + " " + replacement + text.substring(index + name.length);
            }
        } else if (isNaN(parseInt(text[index-1]), 10) === false) {
            num = getNumberFromEnd(text.substring(0, index));
            num = num * factor;
            num = num.toFixed(2);
            outText = "" + text.substring(0, getStartNumIndex(text.substring(0,index))) + " " + num + replacement + text.substring(index + name.length);
        }
    }
    return outText;
}
function getStartNumIndex(text) {
    let index = text.length - 1;
    for (let i = text.length; i-- > 0;) {
        if (isNaN(parseFloat(text.substring(i, text.length)))) {
            return index;
        } else {
            index = i;
        }
    }
    return index;
}
//takes in text where the last index is end of a number
function getNumberFromEnd(text) {
    let index = getStartNumIndex(text);
    let number = parseFloat(text.substring(index, text.length));
    return number;
}