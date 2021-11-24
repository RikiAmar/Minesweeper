'use strict'
const MINE = '💣'
const SUSPECT = '🚩'
const EMPTY_CELL = ''
const NUM = 'NUM'

// console.log('hi js');

var gBoard;
var gCells = []

var gCurrCellObj;

var gLevel = {
    SIZE: 4,
    MINES: 2
};

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
};

// DOM:
// function putMine() /*putMineInRanDomCell()*/ {
//     console.log(gLevel.MINES);
//     for (var i = 0; i < gLevel.MINES; i++{

//     }
// }

function initGame() {
    var gBoard = buildBoardMat(gLevel.SIZE)
    console.log('gBoard- array with obj =  ', gBoard);
}

function buildBoardMat(sizeLength) {
    // DONE: Create a 4x4 gBoard Matrix containing Objects.
    // debuggerbj );
    var boardMat = [];
    console.log(boardMat);
    for (var i = 0; i < sizeLength; i++) {
        boardMat.push([])
        console.log(boardMat);
        for (var j = 0; j < sizeLength; j++) {
            // // TODO: Place 2 mines manually when each cell’s isShown set to true.
           var newObj = creatNewObjForCurrCell();
           boardMat[i][j] = newObj;
           console.log(boardMat);
           if (i === 3 && j === 3 || i === 1 && j === 1){
            boardMat[i][j].isMine = true;
                }
        }
    }
    return boardMat
}

// TODO: Present the mines using renderBoard() function.
function renderBoard(){
    // var 
}

function creatNewObjForCurrCell(){
    // var gCells = [];
    gCurrCellObj = {
        minesAroundCount: 4,
        isShown: true,
        isMine: false,
        isMarked: true
    };
   return gCurrCellObj;
}


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}


    //     var newBoardMat = copyMat(boardMat)
    // console.log('newBoardMat',newBoardMat);
    //     if (i === 3 && j === 3 || i === 1 && j === 1){

    //     }
    // putMine()
    // putMineInRanDomCell()

// console.log('newBoardMat',newBoardMat);
//     // setMinesNegsCount(board)
//     return newBoardMat;