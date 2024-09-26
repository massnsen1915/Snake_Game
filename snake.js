// board
 var blockSize =25;
 var rows =20 ;
 var cols = 20;
 var board;
 var context;
 // snake head 
 var snakex = blockSize*5;
 var snakey = blockSize*5;

 var snakex1 = blockSize*15;
 var snakey1 = blockSize*15;
 // food 
 var foodx;
 var foody;
 // Mysteryfood 
 var Mysteryfoodx;
 var Mysetryfoody;
 var Mysterypoint;


 //vitesse snake1;
  var velocityX=0;
  var velocityY=0;
 //vitesse snake2;
  var velocityX1=0;
  var velocityY1=0;
 //timer 
  var seconds;

 // bodysnake
 var snakeBody =[];

 var snakeBody1 =[];

 // score :
 var score1=0;
 var score2=0;

var gameover=false;
 window.onload = function(){

    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); // drawing on the board
    

     placeFood();

    document.addEventListener("keyup",changeDirection);

    
    setInterval(update,1000/10);

 }

 function update(){
    context.fillStyle="black";
    context.fillRect(0,0,board.width,board.height);

    context.fillStyle="red";
    context.fillRect(foodx,foody,blockSize,blockSize);
    context.fillStyle="";
    context.fillRect(foodx,foody,blockSize,blockSize);

    if(snakex==foodx && snakey==foody){
        snakeBody.push([foodx,foody]);
        score1+=1;
        placeFood();
    }
    if(snakex1==foodx && snakey1==foody){
        snakeBody1.push([foodx,foody]);
        score2+=1;
        placeFood();
    }

    if(snakex==Mysteryfoodx && snakey==Mysetryfoody){
        snakeBody.push([MysetryfoodX,Mysetryfoody]);
        score1+=1;
        placeFood();
    }
    if(snakex1==foodx && snakey1==foody){
        snakeBody1.push([foodx,foody]);
        score2+=1;
        placeFood();
    }


   drawSnakeTail1();
   drawSnakeTail2();

  

   creatSnakeHead1();
   creatSnakeHead2();



    
    if( snakex>rows*blockSize){
        snakex=0;
    }else if(snakex<0){
        snakex=rows*blockSize;
    }

    if( snakey>cols*blockSize){
        snakey=0;
    }else if(snakey<0){
        snakey=cols*blockSize;
    }


     for(let i=0;i<snakeBody.length;i++){
        if(snakex==snakeBody[i][0] &&snakey==snakeBody[i][1])
            alert("game over");
    }

    



    
    if( snakex1>rows*blockSize){
        snakex1=0;
    }else if(snakex1<0){
        snakex1=rows*blockSize;
    }

    if( snakey1>cols*blockSize){
        snakey1=0;
    }else if(snakey1<0){
        snakey1=cols*blockSize;
    }

     

     for(let i=0;i<snakeBody1.length;i++){
        if(snakex1==snakeBody1[i][0] && snakey1==snakeBody1[i][1])
            alert("game over");
    }
    document.getElementById('Score1').textContent=score1;
    document.getElementById('Score2').textContent=score2;
  

    
}



function creatSnakeHead1(){
    context.fillStyle="green";
    snakex+=velocityX*blockSize;
    snakey+=velocityY*blockSize;
    context.fillRect(snakex,snakey,blockSize,blockSize);

}

function drawSnakeTail1(){
    for(let i = snakeBody.length-1;i>0;i-- ){

        snakeBody[i] = snakeBody[i-1];
    }

    if(snakeBody.length){
        snakeBody[0]=[snakex,snakey];
    }

    for(let i=0 ; i<snakeBody.length ;i++ ){
        context.fillStyle="grey";
        context.fillRect(snakeBody[i][0],snakeBody[i][1],blockSize,blockSize);
    }
}

function creatSnakeHead2(){
    context.fillStyle="grey";
    snakex1+=velocityX1*blockSize;
    snakey1+=velocityY1*blockSize;
    context.fillRect(snakex1,snakey1,blockSize,blockSize);
}

function drawSnakeTail2(){
    for(let i = snakeBody1.length-1;i>0;i-- ){

        snakeBody1[i] = snakeBody1[i-1];
    }
    if(snakeBody1.length){
        snakeBody1[0]=[snakex1,snakey1];
    }
    for(let i=0 ; i<snakeBody1.length ;i++ ){
        context.fillStyle="grey";
        context.fillRect(snakeBody1[i][0],snakeBody1[i][1],blockSize,blockSize);
    }
}
 function placeFood(){
    foodx=Math.floor(Math.random()*cols)*blockSize;
    foody=Math.floor(Math.random()*rows)*blockSize;
 }
 function placeMyteryFood(){
    Mysetryfoodx=Math.floor(Math.random()*cols)*blockSize;
    Mysetryfoody=Math.floor(Math.random()*rows)*blockSize;
    getRandomIntInRange(1, 10)
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

