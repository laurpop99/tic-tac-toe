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
    const start = document.querySelector(".start");
    const restart = document.querySelector(".restart");
    const checkbox = document.querySelector(".checkbox");
    
    checkbox.addEventListener("click", function(){
        checkGame();
        removeBoard();

        

    })

    const computerStart = () => {
        playerOne = playerFactory("Player 1", "X");
        playerTwo = playerFactory("Player 2", "0");
        playerOne.name = prompt("Player X Name: ");
        if(playerOne.name === null) playerOne.name = "Player 1";
        if(typeof(playerOne) !== "undefined"){
            restart.addEventListener("click", function(){
                removeBoard();
                displayController.displayBoardComputer();
            })
        }
        removeBoard();
        displayController.displayBoardComputer();
    }

    const playerStart = () => {
        
            playerOne = playerFactory("Player 1", "X");
            playerTwo = playerFactory("Player 2", "0");
            playerOne.name = prompt("Player X Name: ");
            playerTwo.name = prompt("Player 0 Name: ");
            if(playerOne.name === null) playerOne.name = "Player 1";
            if(playerTwo.name === null) playerTwo.name = "Player 2";
            if(typeof(playerOne) !== "undefined"){
                restart.addEventListener("click", function(){
                    removeBoard();
                    displayController.displayBoard();
                })
            }
            removeBoard();
            displayController.displayBoard();
  
    }
    
     const checkGame = () => {
        if(checkbox.checked){
            // console.log("CHECKED"); 
            start.addEventListener("click", computerStart);
            start.removeEventListener("click", playerStart);

        }
            
         else{
            // console.log("UNCHECKED");
            start.addEventListener("click", playerStart);
            start.removeEventListener("click", computerStart);
            
         }
     }  

     checkbox.checked = false;
    checkGame();
    
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
        gameBoard.header.textContent = "";
        }
        
        
    }
    const displayBoardComputer = () => {
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
                    if (gameBoard.content[tileIndex] === "") {
                        gameBoard.content[tileIndex] = playerOne.sign;
                        tilesArr[tileIndex].textContent = playerOne.sign;
                        computerTurn();
                        checkWinner(playerTwo);
                        checkWinner(playerOne);
                        
                    }
                    
                    
                    
                    
                    
                })
            })
    }

    const computerTurn = () => {
        let randomSpot = Math.floor(Math.random() * gameBoard.content.length);
        while (gameBoard.content[randomSpot] !== "" && gameBoard.content.includes("")){
            randomSpot = Math.floor(Math.random() * gameBoard.content.length);
        }
        const answer = randomSpot;
        gameBoard.content[answer] = playerTwo.sign;
        tilesArr[answer].textContent = playerTwo.sign;
        // if (gameBoard.content[answer] === ""){
        // gameBoard.content[answer] = playerTwo.sign;
        // tilesArr[answer].textContent = playerTwo.sign;
        // }
        
        
    }
    const displayBoard = () => {
        
        
        for(let i = 0; i < gameBoard.length; i++){
            const tiles = document.createElement("div");
            tiles.classList.add("tiles");
            tiles.textContent = gameBoard.content[i];
            gameBoard.board.appendChild(tiles);
            tilesArr.push(tiles);
            
            }

            if(isMyTurn){
                gameBoard.header.textContent = `${playerOne.name}'s turn`;
                }
                else {
                    gameBoard.header.textContent = `${playerTwo.name}'s turn`;
                }
            
            tilesArr.forEach(function(tile){
                
                tile.addEventListener("click", function(){
                    const tileIndex = tilesArr.indexOf(this);
                   
                    if (isMyTurn && gameBoard.content[tileIndex] === "") {
                        gameBoard.content[tileIndex] = playerOne.sign;
                        tilesArr[tileIndex].textContent = playerOne.sign;
                        isMyTurn = !isMyTurn; 
                        checkWinner(playerOne);
                        if(isMyTurn){
                            gameBoard.header.textContent = `${playerOne.name}'s turn`;
                            }
                            else {
                                gameBoard.header.textContent = `${playerTwo.name}'s turn`;
                            }
                        
                    }
                    
                    else if(!isMyTurn && gameBoard.content[tileIndex] === "") {
                        gameBoard.content[tileIndex] = playerTwo.sign;
                        tilesArr[tileIndex].textContent = playerTwo.sign;
                        isMyTurn = !isMyTurn;
                        checkWinner(playerTwo);
                        if(isMyTurn){
                            gameBoard.header.textContent = `${playerOne.name}'s turn`;
                            }
                            else {
                                gameBoard.header.textContent =`${playerTwo.name}'s turn`;
                            }
                        
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
            if(checkbox.checked){
            displayBoardComputer();
            }
            else{
                displayBoard();
            }
            
        }
        

        let playerAnswers = 0;
        for(let i = 0; i < gameBoard.content.length; i++){
            if(gameBoard.content[i] !== "") playerAnswers++;
        }
        if(playerAnswers === 9 && player.hasWon === false) {
            
            alert("It's a tie!");
            removeBoard();
            if(checkbox.checked){
            displayBoardComputer();
            }
            else{
                displayBoard();
            }
        }
    }
        

    


    
    return {tilesArr, displayBoard, isMyTurn, checkbox, start, displayBoardComputer, computerTurn};
})();




//player Factory Function
const playerFactory = (name, sign) => {
    const sayName = () => console.log(`Hey, my name is ${name} and I chose ${sign}`);
    const hasWon = false;
    
    return {name, sayName, sign, hasWon};
}




