class object {
  constructor(x, y, size, mass, iniVelX, iniVelY, breakForce, bounciness) {
    this.momentum = createVector(0, 0)
    this.position = createVector(x, y)
    this.velocity = createVector(iniVelX, iniVelY)
    this.size = size
    this.mass = mass
    this.acceleration = createVector(0, 0)
    this.forces = []
    this.netForce = createVector(0, 0)
    this.index = system.length
    this.collisions = []
    this.breakForce = breakForce
    this.kineticEnergy = createVector(0, 0)
    this.forceLineVector = createVector(0, 0)
    this.bounciness = bounciness
    //BOUNCINESS AND BREAKFORCE NOT YET IMPLEMENTED
  }

  updateForces() {
    angleMode(DEGREES)
    this.netForce.set(0, 0)
    for (let i = 0; i < this.forces.length; i++) {
      let angle = atan2(this.forces[i].force.x - this.position.x, this.forces[i].force.y - this.position.y)
      let forceMag = abs(this.forces[i].force.x) + abs(this.forces[i].force.y)
      this.netForce.add(this.forces[i].force.x / fps, this.forces[i].force.y / fps)

      if (forcesShown == true) {
        //multiply by lineScale (a fraction) to be easier to see
        //down and left lines, aka negative lines

        this.forceLineVector.add((sin(angle)) * forceMag, (cos(angle)) * forceMag)
        stroke('red')
        line(this.position.x, this.position.y, this.position.x + (this.forces[i].force.x * lineScale), this.position.y + (this.forces[i].force.y) * lineScale)
        stroke(0)
      }
    }
    stroke(0)
    this.forceLineVector.mult(lineScale)
    line(this.position.x, this.position.y, this.position.x, (this.forceLineVector.y) + this.position.y)
    line(this.position.x, this.position.y, (this.forceLineVector.x) + this.position.x, this.position.y)
    this.forces.splice(0, this.forces.length)
  }
  updatePosition() {
    //divide by fps for amount of frames per second
    this.acceleration.set(this.netForce.x / this.mass, this.netForce.y / this.mass)
    this.velocity.add(this.acceleration.x / fps, this.acceleration.y / fps)
    this.position.add(this.velocity.x / fps, this.velocity.y / fps)
    this.kineticEnergy.set((1 / 2) * this.mass * (this.velocity.x ^ 2), (1 / 2) * this.mass * (this.velocity.y ^ 2))
    this.momentum.set(this.mass * this.velocity.x, this.mass * this.velocity.y)
  }
  display() {
    fill('green')
    circle(this.position.x, this.position.y, this.size)
    fill('black')
    circle(this.position.x, this.position.y, this.size / 20)
  }
  applyForce(forceX, forceY) {
    this.forces.push(new force(forceX, forceY))
  }
  checkCollision() {
    this.collisions.splice(0, this.collisions.length)
    for (let i = 0; i < system.length; i++) {
      if (i != this.index) {
        if (this.position.dist(system[i].position) - ((this.size / 2) + (system[i].size / 2)) <= 0) {
          this.collisions.push(i)
        }
      }
    }
  }
}