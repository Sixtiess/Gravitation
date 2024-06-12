let system = []
let ropes = []
let fps = 60 //fps affects physics, need to fix
let fundamentalForces
let startPauseButton
let running = true
let mainCamera
let kineticTemp
let forcesShown = false
let forceLineButton
let lineScale = 1 / 15000
let screenSaver = false
let screenSaverButton
let trails = []
let trailUpdateSpeed = 15
let trailLength = 100
let centerOfMass
let totalMass
let type = 'random' //binary, random, and manual are the only options right now
//higher trailUpdateSpeed = longer trails but lower framerate