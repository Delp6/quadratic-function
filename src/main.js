document.getElementById("button").addEventListener("click", calcPolynomial)

function calcPolynomial() {
    let equation = document.getElementById("equation").value.toString().replace(/\s+/g, "")

    if (equation.includes("=0")) {
        equation = equation.split("=")[0];
    } else if (equation.includes("=") && isNaN(parseInt(equation.split("=")[1]))) {
        /*TODO SHOW WRONG INPUT INFO*/
        return;
    }
    console.log(equation)
   /* let array = [];
    equation = equation.split("+").join(",").split("-").join(",");
    console.log(equation);*/
}
