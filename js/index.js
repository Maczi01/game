addEventListener("DOMContentLoaded", () => {

    const gridDisplay = document.querySelector('.grid');
    const scoreDisplay = document.querySelector("#score")
    const result = document.querySelector("result");
    const width = 4;
    let squares = []
    let score = 0
    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            square = document.createElement('div');
            square.className = "zero"
            square.innerHTML = 0;
            gridDisplay.appendChild(square);
            squares.push(square)
        }
        generateRandomNumber();
        generateRandomNumber();
    }

    createBoard();

    function generateRandomNumber() {
        let randomNumber = Math.floor(Math.random() * squares.length)
        if (squares[randomNumber].innerHTML == 0) {
            //TODO add function to generate 2 or 4
            squares[randomNumber].innerHTML = 2;;
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
                squares[i + 1].innerHTML = newRow[1]
                squares[i + 2].innerHTML = newRow[2]
                squares[i + 3].innerHTML = newRow[3]
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
                squares[i + 1].innerHTML = newRow[1]
                squares[i + 2].innerHTML = newRow[2]
                squares[i + 3].innerHTML = newRow[3]
            }
        }
    }
    
    function moveDown(){
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i+(width)].innerHTML
            let totalThree = squares[i+(width*2)].innerHTML
            let totalFour = squares[i+(width*3)].innerHTML
            let columns = [parseInt(totalOne),parseInt(totalTwo ),parseInt(totalThree),parseInt(totalFour)]
            let filteredColumns = columns.filter(num => num)
            let missingSquares = 4 - filteredColumns.length;
            let zeros = Array(missingSquares).fill(0);
            let newColumn = [ ...zeros,...filteredColumns]
            squares[i].innerHTML = newColumn[0]
            squares[i + (width)].innerHTML = newColumn[1]
            squares[i + (width*2)].innerHTML = newColumn[2]
            squares[i + (width*3)].innerHTML = newColumn[3]
        }
    }

    function moveUp(){
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i+(width)].innerHTML
            let totalThree = squares[i+(width*2)].innerHTML
            let totalFour = squares[i+(width*3)].innerHTML
            let columns = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]
            let filteredColumns = columns.filter(num => num)
            let missingSquares = 4 - filteredColumns.length;
            let zeros = Array(missingSquares).fill(0);
            let newColumn = [ ...filteredColumns,...zeros]
            squares[i].innerHTML = newColumn[0]
            squares[i + (width)].innerHTML = newColumn[1]
            squares[i + (width*2)].innerHTML = newColumn[2]
            squares[i + (width*3)].innerHTML = newColumn[3]
        }
    }


    function combineRow() {
        for (let i = 0; i < 15; i++) {
            if (squares[i].innerHTML === squares[i + 1].innerHTML) {
                let totals = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML)
                squares[i].innerHTML = totals;
                squares[i].className = "two";
                squares[i + 1].innerHTML = 0
                score += totals
                scoreDisplay.innerHTML = score
            }
        }
        checkIfWin()
    }


    function combineColumn() {
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML === squares[i + width].innerHTML) {
                let totals = parseInt(squares[i].innerHTML) + parseInt(squares[i+width].innerHTML)
                squares[i].innerHTML = totals;
                squares[i].className = "two";
                squares[i + width].innerHTML = 0
                score += totals
                scoreDisplay.innerHTML = score
            }
        }
        checkIfWin()
    }

    function control(e) {
        if (e.keyCode === 39) {
            keyRight()
        }
        else if (e.keyCode === 37) {
            keyLeft()
        }
        else if (e.keyCode === 40) {
            keyDown()
        }
        else if (e.keyCode === 38) {
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
    function checkIfWin(){
        for (let i = 0; i < squares.length; i++) {
            if(squares[i].innerHTML == 16){
                scoreDisplay.innerHTML = "You Win!"
                document.removeEventListener('keyup', control)
            }
        }
    }

    function checkForGameOver() {
        let zeros = 0;
        for (let i = 0; i < squares.length; i++) {
            if(squares[i].innerHTML == 0){
                zeros++;
            }
        }
        if(zeros === 0){
            scoreDisplay.innerHTML = " Game over!"
            document.removeEventListener('keyup', control)
        }
    }
})