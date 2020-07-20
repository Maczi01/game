addEventListener("DOMContentLoaded", () => {

    const gridDisplay = document.querySelector('.grid');
    const scoreDisplay = document.querySelector("#score")
    const result = document.querySelector("result");
    const refresh = document.querySelector(".btn-menu")
    const width = 4;
    let squares = [];
    let score = 0;

    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            square = document.createElement('div');
            square.innerHTML = 0;
            square.className = generateColor(0)
            gridDisplay.appendChild(square);
            squares.push(square)
        }
        generateRandomNumber();
        generateRandomNumber();
    }

    createBoard();

    refresh.addEventListener('click', function () {
        // gridDisplay.removeChild(square)
        let nodeListOf = gridDisplay.querySelectorAll('div');
        for (let i = 0; i < nodeListOf.length; i++) {
            nodeListOf[i].remove()
        }
        console.log(nodeListOf)
        // gridDisplay.removeChild('div')
        // gridDisplay.innerHTML = ""
        createBoard()
    })


    function generateTwoOrFour() {
        const number = Math.floor(Math.random() * 11);
        if (number > 8) {
            return 4;
        } else
            return 2
    }

    function generateRandomNumber() {
        let randomSquare = Math.floor(Math.random() * squares.length)

        if (squares[randomSquare].innerHTML == 0) {
            let randomNumber = generateTwoOrFour();
            squares[randomSquare].innerHTML = randomNumber;
            squares[randomSquare].className = generateColor(randomNumber)
            squares[randomSquare].classList.add("appear")
            checkForGameOver()
        } else {
            generateRandomNumber();
        }
    }

    function moveRight() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i + 1].innerHTML
                let totalThree = squares[i + 2].innerHTML
                let totalFour = squares[i + 3].innerHTML
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
                let filteredRow = row.filter(num => num)
                let missingSquares = 4 - filteredRow.length;
                let zeros = Array(missingSquares).fill(0);
                let newRow = [...zeros, ...filteredRow]

                squares[i].innerHTML = newRow[0]
                squares[i].className = generateColor(newRow[0])

                squares[i + 1].innerHTML = newRow[1]
                squares[i + 1].className = generateColor(newRow[1])

                squares[i + 2].innerHTML = newRow[2]
                squares[i + 2].className = generateColor(newRow[2])

                squares[i + 3].innerHTML = newRow[3]
                squares[i + 3].className = generateColor(newRow[3])
            }
        }
    }

    function moveLeft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i + 1].innerHTML
                let totalThree = squares[i + 2].innerHTML
                let totalFour = squares[i + 3].innerHTML
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
                let filteredRow = row.filter(num => num)
                let missingSquares = 4 - filteredRow.length;
                let zeros = Array(missingSquares).fill(0);
                let newRow = [...filteredRow, ...zeros]


                squares[i].innerHTML = newRow[0]
                squares[i].className = generateColor(newRow[0])

                squares[i + 1].innerHTML = newRow[1]
                squares[i + 1].className = generateColor(newRow[1])

                squares[i + 2].innerHTML = newRow[2]
                squares[i + 2].className = generateColor(newRow[2])

                squares[i + 3].innerHTML = newRow[3]
                squares[i + 3].className = generateColor(newRow[3])
            }
        }
    }

    function moveDown() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i + (width)].innerHTML
            let totalThree = squares[i + (width * 2)].innerHTML
            let totalFour = squares[i + (width * 3)].innerHTML
            let columns = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
            let filteredColumns = columns.filter(num => num)
            let missingSquares = 4 - filteredColumns.length;
            let zeros = Array(missingSquares).fill(0);
            let newColumn = [...zeros, ...filteredColumns]

            squares[i].innerHTML = newColumn[0]
            squares[i].className = generateColor(newColumn[0])

            squares[i + (width)].innerHTML = newColumn[1]
            squares[i + (width)].className = generateColor(newColumn[1])

            squares[i + (width * 2)].innerHTML = newColumn[2]
            squares[i + (width * 2)].className = generateColor(newColumn[2])

            squares[i + (width * 3)].innerHTML = newColumn[3]
            squares[i + (width * 3)].className = generateColor(newColumn[3])
        }
    }

    function moveUp() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i + (width)].innerHTML
            let totalThree = squares[i + (width * 2)].innerHTML
            let totalFour = squares[i + (width * 3)].innerHTML
            let columns = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
            let filteredColumns = columns.filter(num => num)
            let missingSquares = 4 - filteredColumns.length;
            let zeros = Array(missingSquares).fill(0);
            let newColumn = [...filteredColumns, ...zeros]

            squares[i].innerHTML = newColumn[0]
            squares[i].className = generateColor(newColumn[0])

            squares[i + (width)].innerHTML = newColumn[1]
            squares[i + (width)].className = generateColor(newColumn[1])

            squares[i + (width * 2)].innerHTML = newColumn[2]
            squares[i + (width * 2)].className = generateColor(newColumn[2])

            squares[i + (width * 3)].innerHTML = newColumn[3]
            squares[i + (width * 3)].className = generateColor(newColumn[3])
        }
    }

    function combineRow() {
        for (let i = 0; i < 15; i++) {
            if (squares[i].innerHTML === squares[i + 1].innerHTML) {
                let totals = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML)
                squares[i].innerHTML = totals;
                squares[i].className = generateColor(totals);
                squares[i + 1].className = generateColor(totals);
                squares[i + 1].classList.add("score-addition")

                squares[i + 1].innerHTML = 0;
                // squares[i + 1].classList.add("missing");
                score += totals;
                scoreDisplay.innerHTML = score;
            }
        }
        ;
        checkIfWin()
    }

    function generateColor(number) {
        switch (number) {
            case 2:
                return "_2"
            case 4:
                return "_4"
            case 8:
                return "_8"
            case 16:
                return "_16"
            case 32:
                return "_32"
            case 64:
                return "_64"
            case 128:
                return "_128"
            default:
                return "zero"
        }
    }

    function combineColumn() {
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML === squares[i + width].innerHTML) {
                let totals = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML)
                squares[i].innerHTML = totals;
                squares[i].className = generateColor(totals);
                squares[i].classList.add("score-addition")
                squares[i + width].innerHTML = 0
                squares[i + width].className = generateColor(0);
                score += totals
                scoreDisplay.innerHTML = score
            }
        }
        checkIfWin()
    }

    function control(e) {
        if (e.keyCode === 39) {
            keyRight()
        } else if (e.keyCode === 37) {
            keyLeft()
        } else if (e.keyCode === 40) {
            keyDown()
        } else if (e.keyCode === 38) {
            keyUp()
        }
    }

    document.addEventListener('keyup', control)

    function keyRight() {
        moveRight()
        combineRow()
        moveRight()
        generateRandomNumber()
    }

    function keyLeft() {
        moveLeft()
        combineRow()
        moveLeft()
        generateRandomNumber()
    }

    function keyDown() {
        moveDown()
        combineColumn()
        moveDown()
        generateRandomNumber()
    }

    function keyUp() {
        moveUp()
        combineColumn()
        moveUp()
        generateRandomNumber()
    }

    function checkIfWin() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 64) {
                scoreDisplay.innerHTML = "You Win!"
                document.removeEventListener('keyup', control)
            }
        }
    }

    function checkForGameOver() {
        let zeros = 0;
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0) {
                zeros++;
            }
        }
        if (zeros === 0) {
            scoreDisplay.innerHTML = " Game over!"
            document.removeEventListener('keyup', control)
        }
    }
})