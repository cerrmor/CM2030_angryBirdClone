////////////////////////////////////////////////////////////////
function setupGround(){
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true, angle: 0
  });
  World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
function drawGround(){
  push();
  fill(128);
  drawVertices(ground.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupPropeller(){
  // your code here
  propeller = Bodies.rectangle(150,480,200,15,{isStatic: true, angle: angle});
  World.add(engine.world,[propeller]);
}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller(){
  push();
  // your code here
  
  drawVertices(propeller.vertices);
  Body.setAngle(propeller, angle);
  Body.setAngularVelocity(propeller, angleSpeed);
  angle += angleSpeed;
  pop();
}
////////////////////////////////////////////////////////////////
function setupBird(){
  var bird = Bodies.circle(mouseX, mouseY, 20, {friction: 0,
      restitution: 0.95 });
  Matter.Body.setMass(bird, bird.mass*10);
  World.add(engine.world, [bird]);
  birds.push(bird);
}
////////////////////////////////////////////////////////////////
function drawBirds(){
  push();
  //your code here
  for(var i = 0; i < birds.length; ++i)
  {
    //draws the birds 
    drawVertices(birds[i].vertices);
    //removes birds that have fallen off the edge of the screen
    if(isOffScreen(birds[i]))
    {
      removeFromWorld(birds[i]);
      birds.splice(i,1);
      i--
    }
  }
  pop();
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower(){
  //you code here
  var d = 0;
  var h = 0;
  
  //draws a 3x6 tower to screen 
  for(var i = 0; i < 6; ++i)
  {
    for(var j = 0; j < 3; ++j)
    {
      //adds rectangular bodies to the boxes array
      var b = Bodies.rectangle(600 + d,540 - h,80,80);
      boxes.push(b);
      //adds a random color number to fill the boxes to the color array
      var r = random(20,255)
      colors.push(r);
      //adds all the bodies to the physics world 
      World.add(engine.world,[b]);
      //increments the step size for correctly drawing rectangles
      d += 80;
    }
    //resets the stepsize for drawing the bodies at different heights
    d = 0;
    //increments the height the bodies are drawn at
    h += 80;
  }
}
////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower(){
  push();
  //your code here
  for(var i = 0; i < boxes.length; i++)
  {
    noStroke();
    fill(0,colors[i],0);
    drawVertices(boxes[i].vertices);
    //removes the boxes from the world if they go off screen
    if(isOffScreen(boxes[i]))
    {
      removeFromWorld(boxes[i]);
      boxes.splice(i,1);
      colors.splice(i,1);
      i--
    }
  }
  pop();
}
////////////////////////////////////////////////////////////////
function setupSlingshot(){
//your code here
  //creates a slingshot bird object with 0 friction and a bounce back of 95% of origional force
  slingshotBird = Bodies.polygon(200, 160, 20, 20, {friction: 0,
  restitution: 0.95 });
  //multiplys the bodies mass by 10
  Matter.Body.setMass(slingshotBird, slingshotBird.mass*10);
  //creates a fixed constraint point to luanch the bodie from
  slingshotConstraint = Constraint.create ({
    pointA:{x:200,y:160},
    bodyB: slingshotBird,
    stiffness: 0.01,
    damping: 0.0001
  });
  //adds the bodie and constrain to the world
  World.add(engine.world, [slingshotBird, slingshotConstraint]);
}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot(){
  push();
  // your code here
  fill(255,0,0);
  drawVertices(slingshotBird.vertices);
  drawConstraint(slingshotConstraint);
  pop();
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction(){
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}
