
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
    text = replaceMeasure(text, "cm", "in", 0.394);
    text = replaceMeasure(text, "mm", "in", 0.0394);
    return text;
}
function replaceMeasure(text, name, replacement, factor) {
    let options = listPotential(text, name);
    for (let i = 0; i < options.length; i++) {
        text = replaceMeasureNext(text, name, replacement, factor, options[i]);
    }
    return text;
}
function listPotential(text, name) {
    let textLength = text.length;
    if (textLength === 0) {
        return [];
    }
    let out = [];
    let start = 0;
    while (text.indexOf(name, start) != -1) {
        out.push(text.indexOf(name, start));
        start = text.indexOf(name, start) + name.length;
    }
    return out;
}
function replaceMeasureNext(text, name, replacement, factor, index) {
    const regex = /\p{L}/gu;
    let num = 0;
    let outText = text;
    if (!regex.test(text[index+name.length])) {
        if (text[index-1] === ' ') {
            if (isNaN(parseInt(text[index-2], 10)) === false) {
                num = getNumberFromEnd(text.substring(0, index - 1)) * factor;
                outText = "" + text.substring(0, getStartNumIndex(text.substring(0, index - 1))) + num + " " + replacement + text.substring(index + name.length);
            }
        } else if (isNaN(parseInt(text[index-1]), 10) === false) {
            num = getNumberFromEnd(text.substring(0, index));
            outText = "" + text.substring(0, getStartNumIndex(text.substring(0,index))) + num + replacement + text.substring(index + name.length);
        }
    }
    return outText;
}
function getStartNumIndex(text) {
    let index = 0;
    for (let i = text.length; i-- > 0;) {
        if (isNaN(parseFloat(text.substring(i, text.length))) === false) {
            index = i;
        } else {
            i = 1;
        }
    }
    return index;
}
//takes in text where the last index is end of a number
function getNumberFromEnd(text) {
    let index = getStartNumIndex(text);
    let number = parseFloat(text.substring(index, text.length));
    if (isInteger(number)) {
        return Math.floor(number);
    } else {
        return number;
    }
}