'use strict'
const MINE = '💣';
const SUSPECT = '🚩';
const EMPTY_CELL = '';


// console.log('hi js');

var gBoard;

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



function initGame() {
    gBoard = buildBoardMat();
    console.log('gBoard- array with obj =  ', gBoard);
    var mineCount = calculateNeighbors(gBoard, 2, 2);
    // upCountObj(mineCount)
    var newMat = copyMat(gBoard);
    renderBoard()
}




// העתק של מטריצה כדי להכניס לתוכה בכך פעם ערך חדש של מספר בהתאם למסביב
function copyMat(mat) {
    var newMat = [];
    for (var i = 0; i < mat.length; i++) {
        newMat[i] = [];
        for (var j = 0; j < mat[0].length; j++) {
            newMat[i][j] = mat[i][j];
        }
    }
    return newMat;
}

function buildBoardMat() {
    // DONE: Create a 4x4 gBoard Matrix containing Objects.
    // debugger;
    var currNum;
    var boardMat = [];
    console.log(boardMat);
    for (var i = 0; i < gLevel.SIZE; i++) {
        boardMat.push([])
        // console.log(boardMat);
        for (var j = 0; j < gLevel.SIZE; j++) {
            // // TODO: Place 2 mines manually when each cell’s isShown set to true.

            boardMat[i][j] = creatNewObjForCurrCell(i, j);//obj
            console.log(boardMat[i][j]);
            console.log('#new obj index i,j#', i, ',', j);
            if (i === 3 && j === 3 || i === 1 && j === 1) {
                boardMat[i][j].isMine = true;
            }
        }
    }
    return boardMat
}



// בודק כמה תאים עם מוקש יש סביבי
function calculateNeighbors(boardMat, cellI, cellJ) {
    var mainCount = 0;
    var negbIndexs = []

    // debugger
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i > boardMat.length - 1) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j > boardMat.length - 1) continue;
            if (i === cellI && j === cellJ) continue;
            if (boardMat[i][j].isMine) {
                console.log(boardMat[i][j].isMine);
                mainCount++;
            }
        }
    }
    boardMat[cellI][cellJ].minesAroundCount = mainCount
    console.log(gBoard);
    console.log('negsCount', mainCount);
    return mainCount;
}

// TODO: Present the mines using renderBoard() function.
function renderBoard() {
    var strHTML = '';
    var cellName;
    var elCell;
    // console.log(gBoard.length);
    for (var i = 0; i < gBoard.length; i++) {
        strHTML += `<tr class = "cellRow">`
        for (var j = 0; j < gBoard[0].length; j++) {
            elCell = gBoard[i][j];
            elCell.isMine
            if (elCell.isMine === true) {
                cellName = '💣'
            } else {
                cellName = elCell.minesAroundCount;
            }

            // console.log(elCell);
            //    var elcurrcell.classList.add('cell')
            strHTML += `<td ${cellName} onclick="cellClicked(this, ${i}, ${j})" > ${cellName}</td>`
            // var elcurrcell = document.querySelector('.cellName')
        }
        strHTML += `</tr>`
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML
}

function creatNewObjForCurrCell() {
    gCurrCellObj = {
        minesAroundCount: 0,
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


// DOM:
// function putMine() /*putMineInRanDomCell()*/ {
//     console.log(gLevel.MINES);
//     for (var i = 0; i < gLevel.MINES; i++{

//     }
// }




