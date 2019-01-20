import { app, initGraphics, drawBall, drawChain } from './draw'
import { createChain, createBall } from './init'
import { resetAcc, gravity, bounce, velocity, position, damping, smoothFilter, dampBall } from './forces'
import { badCollision } from './collision'

const SIMULATION_SPEED = 0.01
const FPS = 120
const GRAVITY = 0.5
const BOUNCE = 0.5
const DAMPING_RATIO = 0.04
const DAMPING_BALL_RATIO = 0.0001

const BALL_RADIUS = 40
const POINT_RADIUS = 5

const CHAIN_START = [100, 500]
const CHAIN_END = [900, 500]
const CHAIN_MASS = 5
const CHAIN_POINTS = 30
const SMOOTH_RATIO = 0.0005

const BALL_MASS = 2000
const BALL_START = [500, 150]

const COLLISION_POINTS = 40
const COLLISION_SMOOTH = 1

const chain = createChain(CHAIN_START, CHAIN_END, CHAIN_POINTS, CHAIN_MASS)
const ball = createBall(BALL_START, BALL_RADIUS, BALL_MASS)
const points = [...chain, ball]

initGraphics(chain)

const physics = (delta) => {
  resetAcc(points)
  gravity(points, GRAVITY)
  bounce(chain, BOUNCE)
  damping(chain, DAMPING_RATIO)
  dampBall(ball, DAMPING_BALL_RATIO)
  velocity(points, delta * SIMULATION_SPEED)
  badCollision(chain, ball, COLLISION_POINTS, COLLISION_SMOOTH)
  position(points, delta * SIMULATION_SPEED)
  smoothFilter(chain, SMOOTH_RATIO)
}

app.ticker.add(function (delta) {
  drawBall(ball)
  drawChain(chain, POINT_RADIUS)
  for (let i = 0; i < FPS; i++) {
    physics(delta)
  }
})
