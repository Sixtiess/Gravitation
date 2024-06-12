//red lines are forces, black lines are components of net force (red lines do not add when forces are in the exact same direction)
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)
  frameRate(fps)
  if (type == 'binary') {
    system.push(new object(-75, 0, 50, 100000, 0, 28.9, 1000, 30))
    system.push(new object(75, 0, 50, 100000, 0, -28.9, 1000, 30))
    for (let i = 0; i < system.length; i++) {
      trails.push(new trail(i, trailLength))
    }
  } else if (type == 'random') {
    system.push(new object(0, 0, 75, 10000, 0, 0, 10000, 30))
    for (let i = 0; i < 5; i++) {
      system.push(new object(random(300, -300), random(300, -300), random(25, 50), random(8000, 12000), random(-3, 3), random(-3, 3), 1000, 30))
    }
    system.push(new object(-75, 0, 25, 10000, 0, 0, 1000, 30))
    for (let i = 0; i < system.length; i++) {
      //trails.push(new trail(i, trailLength))
    }
  } else if (type == 'manual') {
    // system.push(new object(-80, 0, 50, 1000, 0, 100, 1000, 30))
    // system.push(new object(0, 0, 100, 100000, 0, 0, 1000, 30))
    // ropes.push(new rope(0, 1, 10000000, 200))
    system.push(new object(-75, 0, 50, 100000, 0, 28.9, 1000, 30))
    system.push(new object(75, 0, 50, 100000, 0, -28.9, 1000, 30))
    system.push(new object(0, 0, 10, 10000, 10, 10, 1000, 30))
    trailLength = 15
    for (let i = 0; i < system.length; i++) {
      trails.push(new trail(i, trailLength))
    }
  }
  fundamentalForces = new fundForces()
  angleMode(DEGREES)
  startPauseButton = createButton('start/pause')
  startPauseButton.position(200, 200)
  screenSaverButton = createButton('screensaver mode')
  screenSaverButton.position(470, 200)
  forceLineButton = createButton('force lines shown on/off')
  forceLineButton.position(300, 200)
  mainCamera = createCamera()
  centerOfMass = createVector(0, 0)
  
}

function draw() {
  totalMass = 0
  for (let i = 0; i < system.length; i++) {
    totalMass += system[i].mass
  }
  centerOfMass.set(0, 0)
  
  if (screenSaver == true && running == true) {
    if (frameCount % 15 == 0) {
      system.push(new object(random(300, -300), random(100, -100), random(25, 50), random(1, 12000), random(-30, 30), random(-30, 30), 1000, 30))
    }
  }
  clear()
  background('lavender')
  //orbitControl()
  //mainCamera.camera(system[0].position.x, system[0].position.y, -750, system[0].position.x, system[0].position.y, 0)
  startPauseButton.mousePressed(startPause)
  forceLineButton.mousePressed(forceLines)
  screenSaverButton.mousePressed(screenSaverMode)
  for (let i = 0; i < system.length; i++) {
    system[i].checkCollision()
  }
  for (let i = 0; i < system.length; i++) {
    for (let j = 0; j < system.length; j++) {
      if (j != i) {
        fundamentalForces.gravity(i, j)
        fundamentalForces.normal(i, j)
      }
    }
  }
  updateRopes()
  for (let i = 0; i < system.length; i++) {
    if (screenSaver == true) {
      if (system[i].position.x > width / 2 + system[i].size / 2 || system[i].position.x < -width / 2 - system[i].size / 2) {
        system.splice(i, 1)
      } else if (system[i].position.y > height / 2 + system[i].size / 2 || system[i].position.y < -height / 2 - system[i].size / 2) {
        system.splice(i, 1)
      }
      else {
        system[i].updateForces()
        if (running == true) {
          system[i].updatePosition()
        }
        system[i].display()
      }
    } else {
      system[i].updateForces()
      if (running == true) {
        system[i].updatePosition()
      }
      system[i].display()
    }
    centerOfMass.add(system[i].position.x * (system[i].mass / totalMass), system[i].position.y * (system[i].mass / totalMass))
  }
  //trails
  for (let i = 0; i < trails.length; i++) {
    if (frameCount % trailUpdateSpeed == 0) {
      trails[i].update()
    }
    trails[i].display()
  }
  fill('red')
  circle(centerOfMass.x, centerOfMass.y, 10)
}



