var PLAY = 1;
var END = 0;
var gameState = PLAY;

var skybg, waterbg, shipimg, helicopterimg, bombimg, gameoverimg;
var water, ship, helicopter, bomb;
var helicopterGroup, bombGroup;
var score = 0;



function preload(){
  skybg = loadImage("skybg.jpg");
  waterbg = loadImage("waterbg.png");
  shipimg = loadImage("ship.png");
  helicopterimg = loadImage("helicopter.png");
  bombimg = loadImage("bomb.png");
  gameoverimg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(800, 450);
  
  //creating water ground
 
  water = createSprite(0,300);
  water.addImage(waterbg);
  water.velocityX = 4;
  
  
  //creating ship

  ship = createSprite(20,300,20,20);
  ship.addAnimation("ship",shipimg);
  ship.scale = 0.4;
  
   
  
  
  //creating helicopter group
  
  helicopterGroup = new Group();
  
  //creating bomb group
  
   bombGroup = new Group(); 

  //ship.debug = "true";
  ship.setCollider('rectangle',0,0,40,80);

}

function draw() {
  background(skybg);
  fill("yellow")
  textSize(15);
  text("SURVIVAL TIME: "+ score, 600,30);
  
  if(keyIsPressed){
    if(keyCode == LEFT_ARROW){
      ship.x = ship.x-2;
    }
    else if(keyCode == RIGHT_ARROW){
      ship.x = ship.x+2;
    }
  }
  
  
  edges = createEdgeSprites();
  ship.collide(edges);

  if(water.x > 500){
    water.x = width/2;
  }
    
  //gameState play
  if(gameState === PLAY){
    //increase score
    score = score + Math.round(frameCount/300);
       
    
    //Call user defined function
    spawnHelicopter();
    spawnBomb();

    
    if(bombGroup.isTouching(ship)){
        gameState = END;
    }
    
  }
  
  //gameState end
  else if(gameState === END){
    ship.addImage("ship",gameoverimg);
    ship.scale = 0.5;
    ship.x = 300;
    ship.y = 200;
   //water velocity becomes zero
    
   water.velocityX = 0;
   
   //destroy Helicopter group
   
   helicopterGroup.destroy();

   //destroy bomb group
    
   bombGroup.destroy();
    
  }
  
 
  

 //for infinite background 
 if(water.position.x < 300){
    water.position.x = 400;
    }
    
  
  drawSprites();
}


function spawnHelicopter(){
  if(frameCount%200 === 0){
    helicopter = createSprite(800,80,200,50);
    helicopter.addImage("helicopter",helicopterimg);
    helicopter.setVelocity(-5,0); 
    helicopter.scale = 0.5;
    helicopterGroup.add(helicopter);
    helicopter.lifetime = 200;
  }
}

function spawnBomb(){
 // create bombs at random position
 //use Math.random

 if(frameCount%200 === 0){
   bomb = createSprite(Math.round(random(10,650),20,10,10));
   bomb.addImage("bomb",bombimg);
   bomb.setVelocity(0,5);
   bomb.scale = 0.1;
   bombGroup.add(bomb);
   bomb.lifetime = 200;
 }

}




