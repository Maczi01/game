addEventListener("DOMContentLoaded", () => {
    const gridDisplay = document.querySelector('.grid');
    const scoreDisplay = document.querySelector("score")
    const result = document.querySelector("result")
    const width = 4;
    let squares = []
    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            square = document.createElement('div');
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
        if(squares[randomNumber].innerHTML == 0){
            squares[randomNumber].innerHTML = 2;
        }else {
            generateRandomNumber();
        }
    }

    function moveRight(){
        for (let i = 0; i < 16; i++) {
            if(i%4 === 0){
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i+1].innerHTML
                let totalThree = squares[i+2].innerHTML
                let totalFour = squares[i+3].innerHTML
                let row =[parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
                console.log(row)
                let filteredRow = row.filter(num => num)
                console.log(filteredRow)
                let missingSquares = 4 - filteredRow.length;
                let zeros = Array(missingSquares).fill(0);
                console.log(zeros)
                console.log("===")
                let newRow = [...zeros,...filteredRow]
                console.log({newRow})


                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]
            }
        }
    }

    function moveLeft(){
        for (let i = 0; i < 16; i++) {
            if(i%4 === 0){
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i+1].innerHTML
                let totalThree = squares[i+2].innerHTML
                let totalFour = squares[i+3].innerHTML
                let row =[parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
                console.log(row)
                let filteredRow = row.filter(num => num)
                console.log(filteredRow)
                let missingSquares = 4 - filteredRow.length;
                let zeros = Array(missingSquares).fill(0);
                console.log(zeros)
                console.log("===")
                let newRow = [...filteredRow,...zeros]
                console.log({newRow})


                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]
            }
        }
    }

    moveLeft()

})