class force {
  constructor(xComp, yComp) {
    this.force = createVector(xComp, yComp)
  }
}

class fundForces {
  constructor() {
    this.gravityForce = createVector(0, 0)
    this.normalForce = createVector(0, 0)
    this.frictionForce = createVector(0, 0)
  }
  gravity(object1, object2) {
    let angle = atan2(system[object2].position.y - system[object1].position.y, system[object2].position.x - system[object1].position.x)
    this.gravityForce.set((system[object1].mass * system[object2].mass) / (system[object1].position.dist(system[object2].position) ^ 2), 0)
    this.gravityForce.rotate(angle)
    system[object1].applyForce(this.gravityForce.x, this.gravityForce.y)
  }
  normal(object1, object2) {
    let angle = atan2(system[object2].position.y - system[object1].position.y, system[object2].position.x - system[object1].position.x)
    this.gravityForce.set((system[object1].mass * system[object2].mass) / system[object1].position.dist(system[object2].position) ^ 2, 0)
    this.gravityForce.rotate(angle)

    for (let i = 0; i < system[object1].collisions.length; i++) {
      if (object2 == system[object1].collisions[i]) {
        if (system[object1].position.dist(system[object2].position) - ((system[object1].size) / 2 + (system[object2].size) / 2) < -1) {
          let forceMag = createVector((((this.gravityForce.mag() + system[object2].kineticEnergy.mag()) + (this.gravityForce.mag() + system[object1].kineticEnergy.mag())) / -1) * (totalMass / (system[object1].mass + system[object2].mass)), 0)
          //let forceMag = createVector((((this.gravityForce.mag() + system[object2].momentum.mag()) + (this.gravityForce.mag() + system[object1].momentum.mag())) / -1) * (totalMass / (system[object1].mass + system[object2].mass)), 0)
          //let forceMag = createVector(system[object1].mass *  * -1, 0)
          forceMag.rotate(angle)
          let collideForce = createVector(forceMag.x, forceMag.y)
          //collideForce.rotate(angle)
          //print(collideForce + ' ' + object1)
          system[object1].applyForce(collideForce.x * fps, collideForce.y * fps)
        } else {
          
          let collideForce = createVector(-1 * this.gravityForce.x, -1 * this.gravityForce.y)
          
          system[object1].applyForce(collideForce.x, collideForce.y)
        }
      }
    }
  }
}