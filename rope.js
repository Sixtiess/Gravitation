function updateRopes() {
  for (let i = 0; i < ropes.length; i++){
    ropes[i].update()
    ropes[i].display()
  }
}

class rope {
  constructor(object1, object2, maxTension, maxLength) {
    this.parent1 = system[object1]
    this.parent2 = system[object2]
    this.maxTension = maxTension
    this.pos1 = this.parent1.position.copy()
    this.pos2 = this.parent2.position.copy()
    this.maxLength = maxLength
    this.length = maxLength
    this.angle = 0
    this.tension = createVector(0, 0)
  }
  update() {
    this.pos1 = this.parent1.position.copy()
    this.pos2 = this.parent2.position.copy()
    this.length = this.pos1.dist(this.pos2)
    let k1 = this.parent1.kineticEnergy.copy()
    let k2 = this.parent2.kineticEnergy.copy()
    this.angle = atan2(this.pos2.y - this.pos1.y, this.pos2.x - this.pos1.x)
    let gravityMag = (this.parent1.mass * this.parent2.mass) / this.parent1.position.dist(this.parent2.position) ^ 2
    let acceleration = this.parent1.netForce.copy()
    acceleration.div(this.parent1.mass)
    let gravityVec = createVector(gravityMag, 0)
    gravityVec.rotate(this.angle)
    if (this.length >= this.maxLength) {
      this.tension.set(0, 0)
      this.tension.rotate(this.angle)
      this.parent1.applyForce(this.tension.x, this.tension.y)
      this.parent2.applyForce(-this.tension.x, -this.tension.y)
      this.tension.set(0, 0)
      this.angle = atan2(this.pos1.y - this.pos2.y, this.pos1.x - this.pos2.x)
      this.tension.rotate(this.angle)
      this.parent2.applyForce(this.tension.x, this.tension.y)
      this.parent1.applyForce(-this.tension.x, -this.tension.y)
    } 
  }
  display() {
    line(this.pos1.x, this.pos1.y, this.pos2.x, this.pos2.y)
  }
}