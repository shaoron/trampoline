import { distance } from './helpers'

export function badCollision (chain, ball, num, smoothRatio) {
  let middle = Math.round(chain.length / 2)

  if ((ball.pos[1] + ball.rad + ball.vel[1] > chain[middle].pos[1])) {
    let n = 2 * ball.rad / (distance(chain[0], chain[chain.length - 1])) * chain.length
    let averageVel = 0
    averageVel = averageVel / n

    let massSum = ball.mass + n * chain[middle].mass
    let massDiff = ball.mass - n * chain[middle].mass
    ball.vel[1] = -(massDiff * ball.vel[1] + (2 * n * chain[middle].mass * averageVel)) / massSum
    chain[middle].vel[1] = -(massDiff * averageVel + (2 * ball.mass * ball.vel[1])) / massSum
    let totalV = chain[middle].vel[1] * n
    for (let i = 0; i < n; i++) {
      chain[middle - Math.round(n / 2) + i].vel[1] = chain[middle].vel[1] / Math.abs(Math.round(n / 2) + i)
    }
    // smoothCollision(chain, middle, n, smoothRatio)
  }
}

function smoothCollision (chain, middle, num, smoothRatio) {
  for (let i = Math.round(-num / 2); i < num / 2; i++) {
    chain[middle + i].vel[1] = (chain[middle + i].vel[1] + (chain[middle + i - 1].vel[1] + chain[middle + i + 1].vel[1]) * smoothRatio) / (1 + 2 * smoothRatio)
  }
}
