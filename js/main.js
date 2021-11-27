'use strict'
const MINE = '💣';
const SUSPECT = '🚩';
const EMPTY_CELL = '';

var gNewBoard;
var gBoard
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
var gMineCount;
var gIndexMin1 = {};
var gIndexMin2 = {};
var gNewBoard;
var gIntervalID;
var gStartTime;
var gCount;

function initGame() {
    // if (gIntervalID) clearInterval(gIntervalID)
    // clearInterval(gIntervalID)
    getRandIndexForMine();
    gBoard = buildBoardMat();
    gNewBoard = copyMat(gBoard);
    gCount = 0;
    renderBoard();
}

function getRandIndexForMine() {
    gIndexMin1 = {}
    gIndexMin2 = {}
    console.log(gIndexMin1);
    console.log(gIndexMin2);
    var length = gLevel.MINES * 2
    console.log(length);
    for (var i = 0; i < (gLevel.MINES * 2); i++) {
        var key1 = 'i'
        var key2 = 'j'
        var num = getRandomIntInclusive(0, (gLevel.SIZE - 1));
        if (i === 0) {
            gIndexMin1[key1] = num;
        } if (i === 1) {
            gIndexMin1[key2] = num;
        } if (i === 2) {
            gIndexMin2[key1] = num;
        } if (i === 2) {
            if (gIndexMin1.i === gIndexMin2.i && gIndexMin1.j === gIndexMin2.j) {
                return length++
            } else {
                gIndexMin2[key2] = num;
            }
        }
    }
}

function buildBoardMat() {
    // debugger;
    var boardMat = [];
    console.log(boardMat);
    for (var i = 0; i < gLevel.SIZE; i++) {
        boardMat.push([])
        // console.log(boardMat);
        for (var j = 0; j < gLevel.SIZE; j++) {
            // // TODO: Place 2 mines manually when each cell’s isShown set to true.
            boardMat[i][j] = creatNewObjForCurrCell(i, j);//obj
            // console.log('#new obj index i,j#', i, ',', j);
            if (i === gIndexMin1.i && j === gIndexMin1.j || i === gIndexMin2.i && j === gIndexMin2.j) {
                boardMat[i][j].isMine = true;
            }
        }
    }
    return boardMat
}

function copyMat(mat) {
    console.log(mat);
    var newMat = [];
    for (var i = 0; i < mat.length; i++) {
        newMat[i] = [];
        for (var j = 0; j < mat[0].length; j++) {
            newMat[i][j] = mat[i][j];
            var mineCount = calculateNeighbors(gBoard, i, j)
            // console.log(gBoard, mat[i][j]);
            newMat[i][j].minesAroundCount = mineCount
        }
    }
    gNewBoard = newMat
    // return newMat ;
}

function calculateNeighbors(gBoard, cellI, cellJ) {
    var mainCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i > gBoard.length - 1) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j > gBoard.length - 1) continue;
            if (i === cellI && j === cellJ) continue;
            if (gBoard[i][j].isMine) {
                // console.log(gBoard[i][j].isMine);
                gBoard[cellI][cellJ].minesAroundCount = mainCount
                mainCount++;
            }
        }
    }
    return mainCount;
}

function renderBoard() {
    var strHTML = '';
    var cellName;
    var elCell;
    for (var i = 0; i < gBoard.length; i++) {
        strHTML += `<tr class = "cellRow">`
        for (var j = 0; j < gBoard[0].length; j++) {
            elCell = gBoard[i][j];
            cellName = elCell.minesAroundCount;
            strHTML += `<td class = "${cellName}" data-i="${i}" data-j="${j}"  oncontextmenu= "placeFlag(this,${i}, ${j})" onclick="cellClicked(this, ${i}, ${j}, ${cellName})" ></td>`
        }
        strHTML += `</tr>`
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML
}

function placeFlag(elFlag, i, j) {
    elFlag.addEventListener('contextmenu', function (ev) {
        ev.preventDefault();

        if (gBoard[i][j].isShown) {
            ev.preventDefault();
            return false;
        } else if (elFlag.innerText === SUSPECT) {
            ev.preventDefault();
            elFlag.innerText = ''
            return false;
        } else {
            ev.preventDefault();
            elFlag.innerText = SUSPECT
            return false;
        }

    }, false);

}

function cellClicked(elCell, i, j, cellName) {
    console.log(' hello to function cellClicked');
    var cell = gBoard[i][j]
    console.log(cell.isShown);
    console.log(cell.isMine);

    if (gCount === 0) {
        // gIntervalID = startTimeInterval()
        gCount++
    }

    if (cell.isShown === false && cell.isMine === false) {
        cell.isShown = true;
        console.log(cell.isShown);
        elCell.innerText = cellName
    }

    if (cell.isMine === true) {
        cellName = '💣'
        elCell.innerText = MINE
        // openMinesCell()
        setTimeout(() => {
            resetGame()
        }, 1500);

        console.log('Game over');

    } if (cell === (gLevel.SIZE - gLevel.MINES)) {
        console.log('winnnnnnnn!!!!');
        initGame()
    }
}

function startTimeInterval() {
    gStartTime = Date.now()
    console.log('gStartTime', gStartTime) / 10

    gIntervalID = setInterval(function () {
        console.log('gIntervalID', gIntervalID);
        var elTimer = document.querySelector('.timer')
        var miliSecs = Date.now() - gStartTime

        elTimer.innerText = 'Time: ' + ((miliSecs) / 1000).toFixed(3);
    }, 10)
}

function resetGame() {
    clearInterval(gIntervalID)
    var elTimer = document.querySelector('.timer')
    initGame()
    elTimer.innerText = 'Time:00'
}

function creatNewObjForCurrCell() {
    var currCellObj = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: true
    };
    return currCellObj;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function setLevel(lvl) {
    console.log('chang level');
    gLevel.SIZE = lvl
    console.log('gLevel.SIZE:', gLevel.SIZE);
    if (lvl === 4) {
        gLevel.MINES = 2
        console.log('gLevel.MINES= 2', gLevel.MINES);
    } else if (lvl === 8) {
        gLevel.MINES = 12
        console.log('gLevel.MINES= 12', gLevel.MINES);
    } else {
        (lvl === 12)
        gLevel.MINES = 30
        console.log('gLevel.MINES=30', gLevel.MINES);
    }
    initGame()
    resetGame()
}





