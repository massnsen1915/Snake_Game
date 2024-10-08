// board
const blockSize = 25;
const rows =20 ;
const cols = 20;
let board;
let context;

// snake head
let snakeX = blockSize * 15;
let snakeY = blockSize * 15;

let snakeX1 = blockSize*5;
let snakeY1 = blockSize*5;

 // food
let foodX;
let foodY;
 // Mystery food
 let mysteryFoodX;
 let mysteryFoodY;
 let mysteryValue;


 //vitesse snake1;
  let velocityX=0;
  let velocityY=0;
 //vitesse snake2;
  let velocityX1=0;
  let velocityY1=0;
 //timer
  let seconds=0;;

 // body snake
 const snakeBody =[];

 const snakeBody1 =[];

 // score :
 let score1=0;
 let score2=0;
 function restartGame() {

    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    snakeX1 = blockSize * 15;
    snakeY1 = blockSize * 15;

    velocityX = 0;
    velocityY = 0;
    velocityX1 = 0;
    velocityY1 = 0;

    snakeBody.length = 0;
    snakeBody1.length = 0;

    score1 = 0;
    score2 = 0;

    placeFood();
    placeMysteryFood();

    document.getElementById('score1').textContent = score1;
    document.getElementById('score2').textContent = score2;
}
let gameOver=false;
 window.onload = function(){

    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); // drawing on the board


     placeFood();
     placeMysteryFood();

    document.addEventListener("keyup",changeDirection);

   
    setInterval(update,1000/10);

 }

 function update(){
    while(gameOver) return;
    seconds++;
    context.fillStyle="black";
    context.fillRect(0,0,board.width,board.height);
    context.fillStyle="purple";
    context.fillRect(mysteryFoodX,mysteryFoodY,blockSize,blockSize);
    context.fillStyle="red";
    context.fillRect(foodX,foodY,blockSize,blockSize);
   

    if(snakeX === foodX && snakeY === foodY){
        snakeBody.push([foodX,foodY]);
        score1+=1;
        placeFood();
       
    }else if (snakeX === mysteryFoodX && snakeY === mysteryFoodY){
        score1+=mysteryValue;
        mysteryFoodX=rows*2*blockSize;
        mysteryFoodX=cols*2*blockSize;
    }
    if(snakeX1 === foodX && snakeY1 === foodY){
        snakeBody1.push([foodX,foodY]);
        score2+=1;
        placeFood();
    }else if (snakeX1 === mysteryFoodX && snakeY1 === mysteryFoodY){
        score2+=mysteryValue;
        mysteryFoodX=rows*2*blockSize;
        mysteryFoodX=cols*2*blockSize;
        
    }

    

   drawSnakeTail1();
   drawSnakeTail2();



   creatSnakeHead1();
   creatSnakeHead2();




    if( snakeX>rows*blockSize){
        snakeX=0;
    }else if(snakeX<0){
        snakeX=(rows-1)*blockSize;
    }

    if( snakeY>cols*blockSize){
        snakeY=0;
    }else if(snakeY<0){
        snakeY=(cols-1)*blockSize;
    }


     






    if( snakeX1>rows*blockSize){
        snakeX1=0;
    }else if(snakeX1<0){
        snakeX1=(rows-1)*blockSize;
    }

    if( snakeY1>cols*blockSize){
        snakeY1=0;
    }else if(snakeY1<0){
        snakeY1=(cols-1)*blockSize;
    }

    for(let i=0;i<snakeBody.length;i++){
        if(snakeX === snakeBody[i][0] &&snakeY === snakeBody[i][1])
         {
            window.location.href = 'endGame1.html';
        }
    }

     for(let i=0;i<snakeBody1.length;i++){
         if(snakeX1 === snakeBody1[i][0] && snakeY1 === snakeBody1[i][1]){
             window.location.href = 'endGame2.html';
         }
     }



    
    document.getElementById('score1').textContent=score1;
    document.getElementById('score2').textContent=score2;
    if (score1 >= 1) {
        gameOver = true;
        window.location='endGame2.html'
    } else if (score2 >= 1) {
        gameOver = true;
        window.location='endGame1.html'
        
    }
    updateMysteryFoodPlace();



}



function creatSnakeHead1(){
    context.fillStyle="blue";
    snakeX += velocityX*blockSize;
    snakeY += velocityY*blockSize;
    context.fillRect(snakeX,snakeY,blockSize,blockSize);

}

function drawSnakeTail1(){
    for(let i = snakeBody.length-1;i>0;i-- ){

        snakeBody[i] = snakeBody[i-1];
    }

    if(snakeBody.length){
        snakeBody[0]=[snakeX,snakeY];
    }

    for(let i=0 ; i<snakeBody.length ;i++ ){
        context.fillStyle="grey";
        context.fillRect(snakeBody[i][0],snakeBody[i][1],blockSize,blockSize);
    }
}

function creatSnakeHead2(){
    context.fillStyle="green";
    snakeX1+=velocityX1*blockSize;
    snakeY1+=velocityY1*blockSize;
    context.fillRect(snakeX1,snakeY1,blockSize,blockSize);
}

function drawSnakeTail2(){
    for(let i = snakeBody1.length-1;i>0;i-- ){

        snakeBody1[i] = snakeBody1[i-1];
    }
    if(snakeBody1.length){
        snakeBody1[0]=[snakeX1,snakeY1];
    }
    for(let i=0 ; i<snakeBody1.length ;i++ ){
        context.fillStyle="grey";
        context.fillRect(snakeBody1[i][0],snakeBody1[i][1],blockSize,blockSize);
    }
}
 function placeFood(){
    foodX=Math.floor(Math.random()*cols)*blockSize;
    foodY=Math.floor(Math.random()*rows)*blockSize;
 }
 function placeMysteryFood(){
    mysteryFoodX=Math.floor(Math.random()*cols)*blockSize;
    mysteryFoodY=Math.floor(Math.random()*rows)*blockSize;
    mysteryValue=getRandomIntInRange(-1,3);
    
 }
 function getRandomIntInRange(min, max) {
    return Math.floor(Math.random() * (3- min + 1)) + min;
}
 function displayWinner(message) {
    context.fillStyle = "white";
    context.font = "40px Arial";
    context.textAlign = "center";
    context.fillText(message, board.width / 2, board.height / 2);
}
function updateMysteryFoodPlace(){
    if(seconds%80===0){
        placeMysteryFood();
    }
}


function changeDirection(e) {
    e.preventDefault();
    switch (e.code) {
        case "KeyW":
            if (velocityY1 !== 1) {
                velocityX1= 0;
                velocityY1 = -1;
            }
            break;
        case "ArrowUp":
            if (velocityY !== 1) {
                velocityX = 0;
                velocityY = -1;
            }
            break;
        case "KeyS":
            if (velocityY1 !== -1) {
                velocityX1 = 0;
                velocityY1 = 1;
            }
        break;
        case "ArrowDown":
            if (velocityY !== -1) {
                velocityX = 0;
                velocityY = 1;
            }
            break;
        case "KeyA":
            if (velocityX1 !== 1) {
                velocityX1 = -1;
                velocityY1 = 0;
            }
        break;
        case "ArrowLeft":
            if (velocityX !== 1) {
                velocityX = -1;
                velocityY = 0;
            }
            break;
        case "KeyD":
            if (velocityX1 !== -1) {
                velocityX1 = 1;
                velocityY1 = 0;
            }
            break;
        case "ArrowRight":
            if (velocityX !== -1) {
                velocityX = 1;
                velocityY = 0;
            }
            break;


    }
    e.preventDefault();
}

