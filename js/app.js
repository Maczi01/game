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
    }
    createBoard();

    function generateRandomNumber() {
        randomNumber = Math.floor(Math.random() * squares.length)
        if(squares[randomNumber] == 0){
            squares[randomNumber].innerHTML = 2;
        }else {
            generateRandomNumber();
        }
    }

})