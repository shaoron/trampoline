import { distance } from './helpers'

export function gravity (points, gravity) {
  points.forEach(p => {
    if (p.moveable) {
      p.acc[1] += gravity
    }
  })
}

export function bounce (chain, bounce) {
  for (let i = 1; i < chain.length - 1; i++) {
    if (chain[i].moveable) {
      for (let j = 0; j < 2; j++) {
        let dl = distance(chain[i - 1], chain[i]) - chain.unstretched
        let sin = (chain[i - 1].pos[j] - chain[i].pos[j]) / distance(chain[i - 1], chain[i])
        chain[i].acc[j] += sin * dl * bounce / chain[i].mass

        dl = distance(chain[i + 1], chain[i]) - chain.unstretched
        sin = (chain[i + 1].pos[j] - chain[i].pos[j]) / distance(chain[i + 1], chain[i])
        chain[i].acc[j] += sin * dl * bounce / chain[i].mass
      }
    }
  }
}

export function damping (chain, dampingRatio) {
  for (let i = 1; i < chain.length - 1; i++) {
    if (chain[i].moveable) {
      for (let j = 0; j < 2; j++) {
        chain[i].acc[j] -= chain[i].vel[j] * dampingRatio
      }
    }
  }
}

export function dampBall (ball, dampingRatio) {
  ball.acc[0] -= ball.vel[0] * dampingRatio
  ball.acc[1] -= ball.vel[1] * dampingRatio
}

export function velocity (points, delta) {
  points.forEach(p => {
    if (p.moveable) {
      for (let i = 0; i < 2; i++) {
        p.vel[i] += p.acc[i] * delta
      }
    }
  })
}

export function smoothFilter (chain, smoothRatio) {
  for (let i = 1; i < chain.length - 2; i++) {
    for (let j = 0; j < 2; j++) {
      chain[i].vel[j] = (chain[i].vel[j] + (chain[i - 1].vel[j] + chain[i + 1].vel[j]) * smoothRatio) / (1 + 2 * smoothRatio)
      // chain[i].pos[j] = (chain[i].pos[j] + (chain[i - 1].pos[j] + chain[i + 1].pos[j]) * smoothRatio) / (1 + 2 * smoothRatio)
    }
  }
}

export function position (points, delta) {
  points.forEach(p => {
    if (p.moveable) {
      for (let i = 0; i < 2; i++) {
        p.pos[i] += p.vel[i] * delta
      }
    }
  })
}

export function resetAcc (points) {
  points.forEach(p => { p.acc = [0, 0] })
}
