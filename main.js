//gameBoard Module
const gameBoard = (function(){
    const board = document.querySelector(".board");
    let content = ["", "", "", "", "", "", "", "", ""];
    const length = content.length;
    const header = document.querySelector(".header");

    
    return {board, content, length, header};
})();

//displayController Module
const displayController = (function(){
    let tilesArr = [];
    let isMyTurn = true;
    const removeBoard = () => {
        for(let i = tilesArr.length - 1; i >= 0; i--){
            gameBoard.board.removeChild(gameBoard.board.childNodes[i]);
        }
        tilesArr = [];
        isMyTurn = true;
        for(let i = 0; i < 9; i++){
        gameBoard.content[i] = "";
        }
        
        
    }
    const displayBoard = () => {
        
        
        for(let i = 0; i < gameBoard.length; i++){
            const tiles = document.createElement("div");
            tiles.classList.add("tiles");
            tiles.textContent = gameBoard.content[i];
            gameBoard.board.appendChild(tiles);
            tilesArr.push(tiles);
            
            
            }
            
            tilesArr.forEach(function(tile){
                
                tile.addEventListener("click", function(){
                    const tileIndex = tilesArr.indexOf(this);
                   
                    if (isMyTurn && gameBoard.content[tileIndex] === "") {
                        gameBoard.content[tileIndex] = playerOne.sign;
                        tilesArr[tileIndex].textContent = playerOne.sign;
                        isMyTurn = !isMyTurn; 
                        checkWinner(playerOne);
                    }
                    
                    else if(!isMyTurn && gameBoard.content[tileIndex] === "") {
                        gameBoard.content[tileIndex] = playerTwo.sign;
                        tilesArr[tileIndex].textContent = playerTwo.sign;
                        isMyTurn = !isMyTurn;
                        checkWinner(playerTwo);
                    }
                })
            })
            
            

            
    }
    

    const checkWinner = (player) => {
             if(gameBoard.content[0] === player.sign &&
                gameBoard.content[3] === player.sign &&
                gameBoard.content[6] === player.sign){
                player.hasWon = true;
                    
                }

        else if(gameBoard.content[1] === player.sign &&
                gameBoard.content[4] === player.sign &&
                gameBoard.content[7] === player.sign){
                player.hasWon = true;
            }
        
        else if(gameBoard.content[2] === player.sign &&
                gameBoard.content[5] === player.sign &&
                gameBoard.content[8] === player.sign){
                player.hasWon = true;
            }
        else if(gameBoard.content[0] === player.sign &&
                gameBoard.content[4] === player.sign &&
                gameBoard.content[8] === player.sign){
                player.hasWon = true;
            }

        else if(gameBoard.content[2] === player.sign &&
                gameBoard.content[4] === player.sign &&
                gameBoard.content[6] === player.sign){
                player.hasWon = true;
            }

        else if(gameBoard.content[0] === player.sign &&
                gameBoard.content[1] === player.sign &&
                gameBoard.content[2] === player.sign){
                player.hasWon = true;
            }

        else if(gameBoard.content[3] === player.sign &&
                gameBoard.content[4] === player.sign &&
                gameBoard.content[5] === player.sign){
                player.hasWon = true;
            }

        else if(gameBoard.content[6] === player.sign &&
                gameBoard.content[7] === player.sign &&
                gameBoard.content[8] === player.sign){
                player.hasWon = true;
            }

        if(player.hasWon){
            alert(`${player.name} won the game!`);
            player.hasWon = false;
            removeBoard();
            displayBoard();
            
        }
        

        let playerAnswers = 0;
        for(let i = 0; i < gameBoard.content.length; i++){
            if(gameBoard.content[i] !== "") playerAnswers++;
        }
        if(playerAnswers === 9 && player.hasWon === false) {
            
            alert("It's a tie!");
            removeBoard();
            displayBoard();
        }
    }
        

    


    
    return {tilesArr, displayBoard, isMyTurn};
})();




//player Factory Function
const playerFactory = (name, sign) => {
    const sayName = () => console.log(`Hey, my name is ${name} and I chose ${sign}`);
    const hasWon = false;
    return {name, sayName, sign, hasWon};
}

displayController.displayBoard();
const playerOne = playerFactory("Larry", "X");
const playerTwo = playerFactory("Geani", "0");
