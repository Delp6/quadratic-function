document.getElementById("button").addEventListener("click", calcEquation)

/*document.getElementById("equation").onkeypress = function(e) {
/\+|x|-|=|\^|,|\.|[0-9]/.test(this.value)
}*/

function calcEquation() {
    let equation = document.getElementById("equation").value.toString().replace(/\s+/g, "")

    if (validateData(equation)) {
        equation = equation.replace("=", ",+").replace(/-/g, ",-").replace(/\+/g, ",+").replace(",,+", ",")
        let array = addSameElements(equation.split(",").filter(item => item !== ""))

        let a = array[0].replace("x^2", "")
        let b = array[1].replace("x", "")
        let c = array[2]
        let delta = calcDelta(a, b, c)
        let results = []
        let p
        let q
        if (Math.sign(delta) === -1) {
            showDeltaNegative(true)
        } else if (Math.sign(delta) === 0 || -0) {
            results.push(-b / (2 * a))
            p = -b / (2 * a)
            q = -delta / (4 * a)
            createChart(results, p, q, a)
        } else {
            let deltaSquareRoot = Math.sqrt(delta)
            results.push((-b + deltaSquareRoot) / (2 * a))
            results.push((-b - deltaSquareRoot) / (2 * a))
            p = -b / (2 * a)
            q = -delta / (4 * a)
            createChart(results, p, q, a)
        }
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
    let tempArray = [0, 0, 0]
    let returnValue = []

    array.forEach(item => {
        if (item.includes("x^2") && !/\d/.test(item.replace("x^2", "").replace("+", "").replace("-", ""))) {
            item = item.replace("x^2", "").concat("1".concat(item))
        } else if (!/\d/.test(item.replace("x", "").replace("+", "").replace("-", ""))) {
            item = item.replace("x", "").concat("1".concat(item))
        }
        if (item.includes("x^2")) {
            tempArray[0] += parseFloat(item.replace("x^2", ""))
        } else if (item.includes("x")) {
            tempArray[1] += parseFloat(item.replace("x^2", ""))
        } else {
            tempArray[2] += parseFloat(item)
        }
    })
    returnValue.push(tempArray[0].toString().concat("x^2"))
    returnValue.push(tempArray[1].toString().concat("x"))
    returnValue.push(tempArray[2].toString())
    console.log(returnValue[2])
    return returnValue
}

function calcDelta(a, b, c) {
    return Math.pow(b, 2) - (4 * a * c)
}

function showDeltaNegative(boolean) {
    console.log("delta negative")
    /*TODO SHOW DELTA NEGATIVE ALERT*/
}

function createChart(results, p, q, a) {
    let scale = calcChartScale(results)
    let board = JXG.JSXGraph.initBoard('box', {
        boundingbox: [-scale, scale, scale, -scale], axis: true, grid: true,
    })
    board.create("point", [results[0], 0], {
        fixed: true,
        name: results.length === 1 ? "x" : results[0] > results[1] ? "x2" : "x1",
        label: {autoPosition: true}
    })
    if (results.length > 1) {
        board.create("point", [results[1], 0], {
            fixed: true,
            name: results[0] > results[1] ? "x1" : "x2",
            label: {autoPosition: true}
        })
    }
    let theFct = function (x) {
        return a * (x - p) * (x - p) + q
    }
    board.create("functiongraph", [theFct])
}

function calcChartScale(results) {
    let value = Math.abs(results[0])
    if (results.length > 1 && Math.abs(results[1]) > results[0]) {
        value = Math.abs(results[1])
    }
    value = Math.ceil(value / 5) * 5;
    if (value % 5 === 0 && value !== 5) {
        value = 2 * value + 5;
    }
    if (value === 5) {
        value -= 2;
    }
    return value === 0 || value === -0 ? 5 : value
}

