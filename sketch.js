var dog, dogImage, happydogImage, foodS, foodStock;;
var db;

function preload(){
  dogImage = loadImage("images/Dog.png");
  happydogImage = loadImage("images/happydog.png");
}

function setup() {
	createCanvas(500, 500);
  
  db = firebase.database();

  dog = createSprite(250, 300, 10, 10);
  dog.addImage(dogImage);
  dog.scale = 0.2;

  foodStock = db.ref("Food");
  foodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happydogImage);
  }

  drawSprites();
  fill(255);
  textSize(16);
  text("Note: Press Up_Arrow key to feed Dog!", 130, 100);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(stock){
  if(stock <= 0){
    stock = 0;
  }else {
    stock -= 1;
  }

  db.ref("/").update({
      Food: stock
  });
}