
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var tower;
var plane;
var bgImage;
var runway;
var playerBase

function preload(){
  bgImage = loadImage("dark-night.jpeg");
  tower = loadImage ("tower.png");
  plane = loadImage ("Airplane.png");
  runway = loadImage ("runway.png");
  playerBase = loadImage ("./assets/airport.png");
}


function setup() {
  createCanvas(1200,700);

  engine = Engine.create();
  world = engine.world;
  frameRate(60);
  loadImage("./assets/dark-night.jpeg");
  loadImage("./assets/tower.png");
  loadImage("./assets/Airplane.png");
  loadImage ("./assets/runway.png");
  loadImage ("./assets/airport.png");
  
  playerBase = new PlayerBase(300, 500, 180, 150);
  runway = new runway(285, playerBase.body.position.y - 153, 50, 180);
 runway = new runway(
    340,
    playerBase.body.position.y - 180,
    120,
    120
  );

  tower = new tower(width - 300, 330, 50, 200);
}


function draw(){
{
  background(51);
  image(bgImage,0,0,1200,700)
  Engine.update(engine);

  for (var i = 0; i < plane.length; i++) {
    if (plane[i] !== undefined) {
      plane[i].display();

       var towerCollision = Matter.SAT.collides(
        plane.body,
        plane[i].body
      ); 
       }

      if (towerCollision.collided){
        console.log("Collided");
      }
        
     

      var posX = plane[i].body.position.x;
      var posY = plane[i].body.position.y;

      if (posX > width || posY > height) {
        if (!plane[i].isRemoved) {
          plane[i].remove(i);
        }
      }
    }
  }
}

  // Title
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  text("PLANE CRASH", width / 2, 100);

  // plane Count
  fill("#FFFF");
  textAlign("center");
  textSize(30);
  text("Remaining planes : " + numberOfplanes, 200, 100);


function keyPressed() {
  if (keyCode === 32) {
    if (numberOfplanes > 0) {
      var posX = runway.body.position.x;
      var posY = runway.body.position.y;
      var angle = runway.body.angle;

      var plane = new plane(posX, posY, 100, 10, angle);

      Matter.Body.setAngle(plane.body, angle);
      plane.push(plane);
      numberOfplanes -= 1;
    }
  }
}

function keyReleased() {
  if (keyCode === 32) {
    if (plane.length) {
      var angle = runway.body.angle;
      runway[runway.length - 1].shoot(angle);
    }
  }
}
