const cells= document.querySelectorAll(".cell");
const txt=document.querySelector("#txt");
const rbtn=document.querySelector("#rbtn");
const winConditions=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let options=["","","","","","","","",""];
let currentPlayer='X';
let running=false;
function initializegame() {
    running=true;
    cells.forEach(cell => cell.addEventListener("click", cellclicked));
    rbtn.addEventListener("click", restart);
    txt.textContent = `${currentPlayer}'s turn`;
}

function cellclicked(){
    const cindex=this.getAttribute("cindex");
        if(options[cindex]!=""||!running){
            return;
        }
    updatecell(this,cindex);
    checkwinner();
}
function updatecell(cell,index){
    options[index]=currentPlayer;
    cell.textContent=currentPlayer;
}
function changeplayer(){
    currentPlayer=(currentPlayer=="X")?"O":"X";
    txt.textContent=`${currentPlayer}'s turn`;
}
function checkwinner(){
    let roundWon =false;
    for(let i=0;i<winConditions.length;i++){
        const condition=winConditions[i];
        const cellA=options[condition[0]];
        const cellB=options[condition[1]];
        const cellC=options[condition[2]];

        if(cellA==""|| cellB=="" ||cellC==""){
            continue;
        }
        if(cellA==cellB && cellB==cellC){
            roundWon=true;
            break;
        }
    }
    if(roundWon){
        txt.textContent=`${currentPlayer} wins!`;
        running=false;
    }
    else if(options.every((cell)=>cell!="")){
        txt.textContent="Draw!";
        running=false;
    }
    else{
        changeplayer();
    }
}
function restart(){
    currentPlayer="X";
    options=["","","","","","","","",""];
    txt.textContent=`${currentPlayer}'s turn!`;
    cells.forEach(cell=>cell.textContent="");
    running=true;
}
initializegame();