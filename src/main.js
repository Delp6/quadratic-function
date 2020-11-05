document.getElementById("button").addEventListener("click", calcEquation)

function calcEquation() {
    let equation = document.getElementById("equation").value.toString().replace(/\s+/g, "")

    if (validateInput(equation)) {
        equation = equation.replace(/-/g, ",-").replace(/\+/g, ",+")
        let array = addSameElements(equation.split(",").filter(item => item !== ""));

        let a = array[0].replace("x^2", "");
        let b = array[1].replace("x", "");
        let c = array[2];
        let delta = calcDelta(a,b,c);
        console.log(delta);
    }
}

function validateInput(input) {
    if (input.includes("=0")) {
        input = input.split("=")[0];
    } else if (input.includes("=") && isNaN(parseInt(input.split("=")[1]))) {
        showWrongInput();
        return false;
    }
    if (!(input.includes("^") && input.charAt(input.indexOf("^") - 1) === "x"
        && input.charAt(input.indexOf("^") + 1).match(/^[1-9][0-9]*$/))) {
        showWrongInput();
        return false;
    }
    return true;
}

function showWrongInput() {
    console.log("wrong input")
    /*TODO SHOW WRONG INPUT ALERT*/
}

function addSameElements(array) {
   let tempArray = [0,0,0];
   let returnValue = [];

    array.forEach(item => {
        if(item.includes("x^2") ) {
            tempArray[0] += parseFloat(item.replace("x^2", ""));
        }else if(item.includes("x") ) {
            tempArray[1] += parseFloat(item.replace("x^2", ""));
        } else {
            tempArray[2] += parseFloat(item);
        }
    })
    returnValue.push(tempArray[0].toString().concat("x^2"));
    returnValue.push(tempArray[1].toString().concat("x"));
    returnValue.push(tempArray[2].toString());
    return returnValue;
}

function calcDelta(a,b,c) {
    return Math.pow(b,2) - (4 * a * c);
}

