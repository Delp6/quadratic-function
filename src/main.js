document.getElementById("button").addEventListener("click", calcFunction)


function calcFunction() {
    let equation = document.getElementById("equation").value.toString().replace(/\s+/g, "")

    if(validateInput(equation)) {
        let array = equation.split("+").join(",").split("-").join(",");

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
