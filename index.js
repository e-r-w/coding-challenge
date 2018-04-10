const { readFileSync } = require('fs')
const program = require('commander')
const { runRover } = require('./rover')
const { parseBody, parseHeader } = require('./parser')

const { fileInput } = program
  .option('-f, --file-input [file location]', 'The file input')
  .parse(process.argv)

const [ header, ...body ] = readFileSync(fileInput).toString().split('\n')

const maxCoordinates = parseHeader(header)

parseBody(body)
  .forEach(({ x, y, direction, instructions }) => {
    const result = runRover(instructions, { x, y, direction }, maxCoordinates)
    if (result.error) {
      console.log(result.error)
    } else {
      console.log(`${result.x} ${result.y} ${result.direction}`)
    }
  })
