                            //Monkey Go Happy!!!
//Creating space
var monkey , monkey_running
var banana ,bananaImage, obstacles, obstacleImage
var FoodGroup, obstacleGroup
var score=0;
var bg,bgImage;
var survivalTime=0;
var eatenbananas=0;
var burp
var reset,resetImage
gameState="play";
function preload(){
  
  //loadinf the imgs
   monkey_running =                     loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bgImage=loadImage("46af74fb76c795f87c706e197670d186.jpg")
  burp=loadSound("Burp-A2-www.fesliyanstudios.com-1.mp3")
  
  resetImage=loadImage("arrow-sign-reset-icon-circle-button-vector-13928452-removebg-preview.png")
}


//setting up
function setup() {
    
  ground=createSprite(400,300,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.shapeColor="black";
  bg=createSprite(200,200,400,400)
  bg.addImage("white",bgImage)
  bg.scale=0.5;
  bg.velocityX=-4;
  monkey=createSprite(80,280,20,20);
  monkey.addAnimation("sahasra",monkey_running);
  monkey.scale=0.15;
  bananaGroup=new Group();
  obstaclesGroup=new Group();
  reset=createSprite(200,200,20,20);
  reset.addImage("sxs",resetImage);
  reset.visible=false;
  reset.scale=0.2;
}


function draw() {
  
background("white");
  //infinite ground
  if(ground.x<100){
    ground.x=ground.width/2;
  }
  //if "space" is pressed
  if(keyDown("space")&&monkey.y>100&&gameState==="play") {
    monkey.velocityY = -12;
   
  }
  //infinite bg
  if(bg.x<100){
    bg.x=200
  }
  //adding gravity
  monkey.velocityY=monkey.velocityY+0.8;
  //colliding the monkey off the ground
  monkey.collide(ground)
  //calling the functions to repeat again and again
  spawnbananas();
  spawnObstacles();
   //incrementation of score,no.of bananas eaten  
  if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    score=score+100;
    eatenbananas=eatenbananas+1;
  }
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  if(monkey.isTouching(obstaclesGroup)){
    gameState="end";
  }
  if(gameState==="end"){
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstaclesGroup.destroyEach();
    bananaGroup.destroyEach();
    bg.velocityX=0;
    if(gameState==="end"&&keyDown("space")){
      monkey.y=280;
    }
  }
  if(gameState==="end"){
    reset.visible=true;
  }
  if(gameState==="end"&&mousePressedOver(reset)){
    gameState="play";
    reset.visible=false;
    bg.velocityX=-4;
  }
  if(monkey.y>280){
    monkey.y=280;
  }
 
  drawSprites();
  //displaying score,survival time and eaten bananas
  fill("black");
  text("your score:"+score,300,30);
  survivalTime=Math.ceil(frameCount/frameRate());
  text("survivalTime:"+survivalTime,300,50);
  text("No.of bananas eaten:"+eatenbananas,270,70);
}
//making the bananas appear at random Y positions
function spawnbananas(){
  if(World.frameCount%80===0){ 
    banana=createSprite(400,200,20,20);
    banana.scale=0.1;
   
    r=Math.round(random(1,4)); 

    if(r == 1) {
      banana.addImage(bananaImage);
    } 
    else if (r == 2){
      banana.addImage(bananaImage)
    } 
    else if (r == 3){
      banana.addImage(bananaImage)
    } 
    else if (r == 4){
      banana.addImage(bananaImage)
    }

    banana.y=Math.round(random(150,200))
    bananaGroup.add(banana); 
    banana.velocityX=-(5+score/100);
    banana.lifetime=200;
}

}
//doing the same for the obstacles
function spawnObstacles()
{
  if(World.frameCount%200===0){ 
    obstacles=createSprite(400,200,20,20);
    obstacles.scale=0.2;
    obstacles.addImage(obstacleImage);
   

    obstacles.y=Math.round(random(280,300))
    obstaclesGroup.add(obstacles); 
    obstacles.velocityX=-(5+score/100);
    obstacles.lifetime=200;
  }

}
                    //The end!!!