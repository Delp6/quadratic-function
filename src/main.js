document.getElementById("button").addEventListener("click", calcEquation)

/*document.getElementById("equation").onkeypress = function(e) {
/\+|x|-|=|\^|,|\.|[0-9]/.test(this.value);
};*/

function calcEquation() {
    let equation = document.getElementById("equation").value.toString().replace(/\s+/g, "")

    if (validateData(equation)) {
        equation = equation.replace(/-/g, ",-").replace(/\+/g, ",+")
        let array = addSameElements(equation.split(",").filter(item => item !== ""));

        let a = array[0].replace("x^2", "")
        let b = array[1].replace("x", "")
        let c = array[2]
        let delta = calcDelta(a, b, c)
        let results = []
        if (Math.sign(delta) === -1) {
            showDeltaNegative(true)
        } else if (Math.sign(delta) === 0 || -0) {
            results.push(-b / (2 * a))
        } else {
            let deltaSquareRoot = Math.sqrt(delta)
            results.push((-b + deltaSquareRoot) / (2 * a))
            results.push((-b - deltaSquareRoot) / (2 * a))
        }
        /*TODO SHOW RESULTS*/
    }
}

function validateData(input) {
    if (input.includes("=0")) {
        input = input.split("=")[0]
    } else if (input.includes("=") && isNaN(parseInt(input.split("=")[1]))) {
        showWrongInput(true)
        return false
    }
    if (!(input.includes("^") && input.charAt(input.indexOf("^") - 1) === "x"
        && input.charAt(input.indexOf("^") + 1).match(/^[1-9][0-9]*$/))) {
        showWrongInput(true)
        return false
    }
    return true
}

function showWrongInput(boolean) {
    console.log("wrong input")
    /*TODO SHOW WRONG INPUT ALERT*/
}

function addSameElements(array) {
    let tempArray = [0, 0, 0];
    let returnValue = []

    array.forEach(item => {
        if (!/\d/.test(item)) {
            item = "1".concat(item)
        }
        if (item.includes("x^2")) {
            tempArray[0] += parseFloat(item.replace("x^2", ""));
        } else if (item.includes("x")) {
            tempArray[1] += parseFloat(item.replace("x^2", ""));
        } else {
            tempArray[2] += parseFloat(item)
        }
    })
    returnValue.push(tempArray[0].toString().concat("x^2"))
    returnValue.push(tempArray[1].toString().concat("x"))
    returnValue.push(tempArray[2].toString())
    return returnValue
}

function calcDelta(a, b, c) {
    return Math.pow(b, 2) - (4 * a * c)
}

function showDeltaNegative(boolean) {
    console.log("delta negative")
    /*TODO SHOW DELTA NEGATIVE ALERT*/
}
