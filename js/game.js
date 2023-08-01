'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPER_FOOD = '🍟'
const CHERRY = '🍒'
var gIntervalCherryId

const gGame = {
    score: 0,
    isOn: false
}
var gBoard

function onInit() {
    const elModal = document.querySelector('.modal')
    elModal.style.display = 'none'

    const elModalVic = document.querySelector('.modal-vic')
    elModalVic.style.display = 'none'
    console.log('hello')

    clearInterval(gIntervalGhosts)


    gGame.score = 0
    updateScore(0)

    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard)
    gIntervalCherryId = setInterval(addCherry, 3000)

    gGame.isOn = true
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
        }

    }
    board[1][1] = SUPER_FOOD
    board[1][size - 2] = SUPER_FOOD
    board[size - 2][1] = SUPER_FOOD
    board[size - 2][size - 2] = SUPER_FOOD
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function renderCell(location, value) {
	const cellSelector = '.' + getClassName(location)
	const elCell = document.querySelector(cellSelector)
	elCell.innerHTML = value
}

function updateScore(diff) {
    // DONE: update model and dom

    // update model
    gGame.score += diff
    // update dom
    document.querySelector('.score').innerText = gGame.score

}

function gameOver() {
    clearInterval(gIntervalCherryId)
    console.log('Game Over')
    // TODO
    clearInterval(gIntervalGhosts)
    renderCell(gPacman.location, '⛏')
    gGame.isOn = false
    const elModal = document.querySelector('.modal')
    elModal.style.display = 'block'
}
var gEmptyCeils = []
function findEmptyCeils() {

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if (gBoard[i][j] === CHERRY) {
                gBoard[i][j] === EMPTY
                renderCell({ i, j }, EMPTY)
            }
            if (gBoard[i][j] === EMPTY) {
                gEmptyCeils.push({ i, j })
            }
        }
    }
    var ranCeilIdx = getRandomInt(0, gEmptyCeils.length - 1)
    console.log(gEmptyCeils[ranCeilIdx]);
    return gEmptyCeils[ranCeilIdx]

}

function addCherry() {
    const location = findEmptyCeils()
    gBoard[location.i][location.j] = CHERRY
    renderCell(location, CHERRY)
}

function playSound() {
    const sound = new Audio()
    sound.play()
}


