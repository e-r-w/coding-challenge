const { curry, equals } = require('ramda')

const East = 'E'
const West = 'W'
const North = 'N'
const South = 'S'
const All = [ North, East, South, West ]

const MoveRover = 'M'
const TurnLeft = 'L'
const TurnRight = 'R'

const changeDirection = (instruction, position) => {
  const directions = instruction === TurnRight ? All : [ ...All ].reverse()
  return Object.assign({}, position, {
    direction: directions[(directions.indexOf(position.direction) + 1) % 4]
  })
}

const _calculatePosition = curry((left, right, direction, value) => {
  if ([left, right].some(equals(direction))) {
    return left === direction ? (value - 1) : (value + 1)
  }
  return value
})

const calcuateX = _calculatePosition(West, East)
const calcuateY = _calculatePosition(South, North)

const moveRover = (maxCoordinates, instruction, position) => {
  const x = calcuateX(position.direction, position.x)
  const y = calcuateY(position.direction, position.y)
  if (x < 0 || x > maxCoordinates.x) {
    return { error: 'Exceeded x coordinate boundary' }
  }
  if (y < 0 || y > maxCoordinates.y) {
    return { error: 'Exceeded y coordinate boundary' }
  }
  return Object.assign({}, position, { x, y })
}

const _move = curry((maxCoordinates, position, instruction) => {
  if (position.error) {
    return position
  }

  if (MoveRover === instruction) {
    return moveRover(maxCoordinates, instruction, position)
  }

  if ([TurnLeft, TurnRight].some(equals(instruction))) {
    return changeDirection(instruction, position)
  }

  return { error: `Unknown instruction '${instruction}'` }
})

const runRover = (instructions, initialPosition, maxCoordinates) =>
  instructions.reduce(
    _move(maxCoordinates),
    initialPosition
  )

module.exports = {
  runRover
}


