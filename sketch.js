//Create variables here
var dog, happyDog;
var database;
var foodS, foodStock;
var fedTime, lastFed;
var feed, addFoodCount;
var foodObj;
var bedroomimg, gardenimg, washroomimg;
var readGameState;
var bedroom, garden, washroom;
var hungry, playing, bathing, sleeping;
var gameState;
var state;

function preload(){
  //load images here
  dogimg = loadImage("dogImg.png");
  happyDogimg = loadImage("dogImg1.png");
  bedroomimg = loadImage("Bed Room.png");
  gardenimg = loadImage("Garden.png");
  washroomimg = loadImage("Wash Room.png");
  lazydogimg = loadImage("Lazy.png");
}

function setup() {
  //createCanvas(800, 500);
  createCanvas(380, 500);
  database=firebase.database();
    foodStock=database.ref('foodStock');
    foodStock.on("value",readStock);

  readState=database.ref('gameState');
  readState.on("value", function(data){
    gameState=data.val();
  })

  foodObj= new Food();

  dog=createSprite(200, 290, 10,10);
  dog.addImage(dogimg);
  dog.scale=0.2;

  feed=createButton("Feed the dog");
  feed.position(100,500);
  feed.mousePressed(feedDog);

  addFoodCount=createButton("Add Food")
  addFoodCount.position(300,500);
  addFoodCount.mousePressed(addFood);
}

function draw() {  
  background(46, 139, 87);
   foodObj.display();
    
    textSize(14);
    fill("white");
    text("Food remaining:"+foodS,130,50);
   
    //To get the last feed time
    if(lastFed>=12){
      text("Last Feed :" + lastFed%12+ "PM",135,30);
    }
    else if(lastFed==0){
      text("Last Fed : 12 AM", 135,30);
    }
    else{
      text("Last Feed :"+lastFed, 135,30)
    }

    //What must be done if the gameState is not hungry
    /*if(gameState!="hungry"){
      feed.hide();
      addFoodCount.hide();
      dog.remove();
    }
    else{
      feed.show();
      addFoodCount.show();
      dog.addImage(lazydogimg);
    }*/
    if(gameState!=hungry){
       feed.show();
       addFoodCount.show();
       //dog.show();
    }
    //To change the gameState if the current time is 1,2,3/4 hors greater than the last feed time
    currentTime=hour();
    if(currentTime==(lastFed+1)){
      update("playing");
      foodObj.garden();
    }
    else if(currentTime==(lastFed+2)){
      update("sleeping");
      foodObj.bedroom();
    }
    else if(currentTime>(lastFed+2)&& currentTime<=(lastFed+4)){
      update("bathing");
      foodObj.washroom();
    }
    else{
      update("hungry")
      foodObj.display();
    }

   drawSprites();  
}


//funtion to updatefood stock and last fedtime
  function feedDog(){
    dog.addImage(happyDogimg);
    lastFed=hour()
    foodObj.updateFoodStock(foodS);
    database.ref('/').update({
      //Food:foodObj.getFoodStock(),
      lastFed:lastFed
    })
  }
  //function to add food in stock
function addFood(){
  foodS++;
  console.log(foodS)
  database.ref('/').update({
  foodStock:foodS
  })
}

function readStock(data){
  foodS=data.val();
}

function update(state){
  database.ref('/').update({
    gameState:state
  });
}
