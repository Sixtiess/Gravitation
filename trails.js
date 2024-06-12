class trail {
  constructor(parent, length) {
    this.trailsX = []
    this.trailsY = []
    this.trailsLife = []
    this.parent = parent
    this.length = length
  }
  update() {
    this.trailsX.push(system[this.parent].position.x)
    this.trailsY.push(system[this.parent].position.y)
    this.trailsLife.push(255)
    if (this.trailsX.length > this.length) {
      this.trailsX.splice(0, 1)
      this.trailsY.splice(0, 1)
      this.trailsLife.splice(0, 1)
    }

  }
  display() {
    if (this.trailsX.length != 0) {
      line(system[this.parent].position.x, system[this.parent].position.y, this.trailsX[this.trailsX.length - 1], this.trailsY[this.trailsY.length - 1])
    }
    
    for (let i = 0; i < this.trailsX.length; i++) {
      if (running == true) {
        this.trailsLife[i] = this.trailsLife[i] - (255 / (trailUpdateSpeed * this.length))
      }
      if (i != this.trailsX.length - 1) {
        stroke(0, int(this.trailsLife[i]))
        line(this.trailsX[i], this.trailsY[i], this.trailsX[i + 1], this.trailsY[i + 1])
      } 
    }
  }
}