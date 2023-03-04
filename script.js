let opList = ['/', 'x', '+', '-'];
let equation = "";

// anonymous function called only once to make all the eventListeners
(function (){
    let buttons = document.getElementsByClassName("button");
    for(let i = 0; i<buttons.length; i++) {
        buttons[i].addEventListener('click', () => {buttonPressed(buttons[i].id)});
    }
    document.addEventListener('keydown', KeyBoardPress);
    document.getElementById('clear').addEventListener('dblclick', ClearScreen)
})();

function KeyBoardPress(e) {
    let key = e.key;

    if(key == '*') key = 'x';

    console.log(key);
    if(key == "Delete") ClearScreen();
    else if(key == "Backspace") key = "clear";
    else if(key == "Enter") key = "answer";
    if(!isNaN(key) || IsOp(key) || key == '.' || key == 'answer' || key == 'clear') buttonPressed(key);
    UpdateScreen();
}

function buttonPressed(id) {
    if(id == "clear") Clear();
    else if(id == "answer") Solve();
    else AddToScreen(id);
    UpdateScreen();

    if( ((el) => el.scrollWidth > el.clientWidth)(document.getElementById('equation') )) {
        document.getElementById('equation').scrollTo({
        top: 100,
        left: 10000000000,
        behavior: "auto"
        });
    }
}

function UpdateScreen() {
    document.getElementById("equation").innerHTML = equation;
}

function AddToScreen(char) {
    if(isNaN(char)) {
        let topChar = equation[equation.length-1];
        if(topChar == '.') return;
        if(char != '.' && isNaN(topChar)) Clear();
    }
    
    equation+=char;
}

function Clear() {
    equation = equation.slice(0, -1);
}

function ClearScreen() {
    console.log(4);
    equation = "";
}

function IsOp(char) {
    for(let i=0; i<opList.length; i++) {
        if(char == opList[i]) return true;
    }
    return false;
}
function SolveOp(a, b, char) {
    switch(char) {
        case '+': return (a-'0')+(b-'0');
        case '-': return a-b;
        case '/': return a/b;
        case 'x': return a*b;
        default: return false;
    }
}

function Solve() {
    
    
    let num = equation.split( /\+|\-|\x|\// );
    let oper = equation.replace(/[0-9]|\./g, '').split('')
    
    console.log('\n', equation,'\n', num,'\n', oper);

    function SolveFor(char) {
        let idx = oper.indexOf(char);
        while(idx != -1) {
            num.splice(idx, 2, SolveOp(num[idx], num[idx+1], char));
            oper.splice(idx, 1);
            idx = oper.indexOf(char);
        }
    }

    for(let i=0; i<opList.length; i++) {
        SolveFor(opList[i]);
    }

    equation = (num[0]).toString();
    UpdateScreen();
}