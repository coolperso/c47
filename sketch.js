var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obstacle1,obstacle2,obstacle3
var top1,top2
var obstaclegroup,topobstaclegroup,gameover,gameoverImg
var restart,restartImg
var PLAY=1
var END=0
var gameState= PLAY
var score=0

function preload(){
bgImg = loadImage("assets/bg.png")

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
obstacle1= loadImage("assets/obsBottom1.png")
obstacle2= loadImage("assets/obsBottom2.png")
obstacle3= loadImage("assets/obsBottom3.png")
top1=loadImage("assets/obsTop1.png")
top2=loadImage("assets/obsTop2.png")
gameoverImg=loadImage("assets/gameOver.png")
restartImg=loadImage("assets/restart.png")
}

function setup(){

//background image

bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3

//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;
balloon.debug=true

obstaclegroup=new Group()
topobstaclegroup=new Group()
barGroup= new Group()

gameover=createSprite(220,200)
restart=createSprite(220,240)
gameover.addImage(gameoverImg)
gameover.scale=0.5
restart.addImage(restartImg)
restart.scale=0.5
gameover.visible=false
restart.visible = false



}

function draw() {
  
  background("black");


  if(gameState === PLAY){
        
          //making the hot air balloon jump
          if(keyDown("space")) {
            balloon.velocityY = -6 ;
            
          }

          //adding gravity
           balloon.velocityY = balloon.velocityY + 2;

           Bar()

           spawnObstacles()
           topObstacles()
           if(obstaclegroup.isTouching(balloon)|| topobstaclegroup.isTouching(balloon)){
             
             
             gameState = END


             
           }
          }
          if(gameState === END){
            gameover.visible=true
            gameover.depth= gameover.depth+1
            restart.visible= true
            restart.depth = restart.depth+1


            balloon.velocityX=0
            balloon.velocityY=0
             obstaclegroup.destroyEach()
             topobstaclegroup.destroyEach()
             obstaclegroup.setVelocityXEach(0)
             topobstaclegroup.setVelocityXEach(0)
             barGroup.setVelocityXEach(0)
             
             obstaclegroup.setLifetimeEach(-1)
             topobstaclegroup.setLifetimeEach(-1)

             balloon.y=200

             if(mousePressedOver(restart)){
               reset()
             }
          }
   
        drawSprites();
        Score()
        
}
function reset(){
  gameState= PLAY
  gameover.visible= false
  restart.visible= false
  obstaclegroup.destroyEach()
  topobstaclegroup.destroyEach()

  score=0
}

function spawnObstacles(){
  if(frameCount%100==0){
    var obstacle=createSprite(400,350,40,50)
    obstacle.velocityX=-2
    obstacle.y=Math.round(random(300,350))
    var number=Math.round(random(1,3))
    switch(number){
      case 1:obstacle.addImage("moving",obstacle1)
      break;
      case 2:obstacle.addImage("tower",obstacle2)
      break;
      case 3:obstacle.addImage("bird",obstacle3)
      break;
      default:break;
    }
    obstacle.scale=0.1
    obstacle.lifetime=250
    obstaclegroup.add(obstacle)
    

  }
}

function topObstacles(){
  if(frameCount%150==0){
    var top=createSprite(400,50,40,50)
    top.velocityX=-2
    var rd= Math.round(random(1,2))
    top.y=Math.round(random(10,100))
    switch(rd){
      case 1: top.addImage(top1)
      break;
      case 2: top.addImage(top2)
      break;
      default:break;
    }
    top.scale=0.1
    top.lifetime=250
    topobstaclegroup.add(top)
    
  }
}
function Bar(){
  if(World.frameCount%60 === 0){
    var bar=createSprite(400,200,10,800)
    bar.velocityX= -6

    bar.VelocityX= -6
    bar.depth= balloon.depth
    bar.lifetime= 70
    bar.visible= false

    barGroup.add(bar)
  }
}
function Score(){
  if(balloon.isTouching(barGroup)){
    score= score+1
  }
  textFont("algerian")
  textSize(20)
  fill("red")
  text("Score:"+ score,250,50)
}

