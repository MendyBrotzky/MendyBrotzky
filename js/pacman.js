'use strict'

const PACMAN = '😀'
var gPacman
var gDiedGhost =[]

function createPacman(board) {
    // DONE: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }

    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function onMovePacman(ev) {
    // DONE: use getNextLocation(), nextCell
    if (!gGame.isOn) return
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return

    // DONE: hitting a ghost? call gameOver
    else if (nextCell === GHOST) {
        if (gPacman.isSuper === true) {
            for (var k = 0; k < gGhosts.length; k++) {
                if (gGhosts[k].location.i === nextLocation.i && gGhosts[k].location.j === nextLocation.j) {
                    gDiedGhost.push(...gGhosts.splice(k,1))
                }
            }
        }
        else {
            gameOver()
            return
        }


    }


    if (nextCell === FOOD) {
        updateScore(1)
    }
    if (nextCell === CHERRY) {
        updateScore(10)
    }

    if (nextCell === SUPER_FOOD) {
        if(gPacman.isSuper === true) return
        gPacman.isSuper = true
        renderGhost()
        setTimeout(changeSuper, 5000)

    }

    function changeSuper() {
        gPacman.isSuper = false
        gGhosts.push(...gDiedGhost)
        gDiedGhost = []
    }


    // DONE: moving from current location:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)
    if (!checkIfFood()) {
        victory()
    }

    // DONE: Move the pacman to new location:
    // DONE: update the model
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    gPacman.location = nextLocation
    // DONE: update the DOM
    renderCell(nextLocation, PACMAN)


}

function getNextLocation(eventKeyboard) {

    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // DONE: figure out nextLocation
    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
    }
    return nextLocation
}


function checkIfFood() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j] === FOOD) return true
        }
    }
    return false
}


function victory() {
    const elModalVic = document.querySelector('.modal-vic')
    elModalVic.style.display = 'block'
    clearInterval(gIntervalCherryId)
    clearInterval(gIntervalGhosts)
    gGame.isOn = false

}

function renderGhost(){
    for(var i =0 ; i < gGhosts.length; i++){
       var currGhost = gGhosts[i]
        renderCell(currGhost.location , getGhostHTML(currGhost))
    }

}