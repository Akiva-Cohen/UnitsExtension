

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
            if (name != 'style' && name != 'scripts') {
                //if not, do it all again to the child
                handleElement(child);
            }
        }
        //checks if the child is a textnode (3), which directly contains display text
        if (child.nodeType === 3) {
            //runs our work method on it
            child.textContent = work(child.textContent);
        }
    }
}

//the function that directly handles text
function work(text) {
    //start with length, start short, cm
    replaceMeasure(text, "cm", "in", 0.394);
}
function replaceMeasure(text, name, replacement, factor) {
    while (text.includes(name)) {
        replaceMeasureNext(text, name, replacement, factor);
    }
}
function replaceMeasureNext(text, name, replacement, factor) {
    const regex = /\p{L}/gu;
    index = text.toLowerCase.indexOf("cm");
    let numberExists = false;
    let hasSpace = false;
    let num = 0;
    let outText = "";
    if (!regex.test(text[index+name.length])) {
        if (text[index-1] === ' ') {
            if (!isNaN(parseInt(text[index-2], 10))) {
                numberExists = true;
                hasSpace = true;
                num = getNumberFromEnd(text.substring(0, index - 1)) * factor;
                outText = text.substring(0, getStartNumIndex(text.substring(0, index - 1))) + num + " " + replacement + text.substring(index + name.length);
            }
        } else if (!isNaN(parseInt(text[index-1]), 10)) {
            numberExists = true;
            hasSpace = false;
            num = getNumberFromEnd(text.substring(0, index));
            outText = text.substring(0, getStartNumIndex(text.substring(0,index))) + num + replacement + text.substring(index + name.length);
        }
    }
}
function getStartNumIndex(text) {
    let index = 0;
    for (let i = text.length; i-- > 0;) {
        if (!isNaN(parseDouble(text.substring(i, text.length)))) {
            index = i;
        } else {
            i = 0;
        }
    }
    return index;
}
function getReplaceLength(text) {
    let length = text.length - getStartNumIndex(text);
    return length;
}
//takes in text where the last index is end of a number
function getNumberFromEnd(text) {
    let index = getStartNumIndex(text);
    let number = parseDouble(text.substring(index, text.length));
    if (isInteger(number)) {
        return Math.floor(number);
    } else {
        return number;
    }
}