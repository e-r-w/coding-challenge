
const parseBody = lines =>
  lines
    .reduce((acc, line, index, array) =>
      index % 2 === 0 ? [ ...acc, array.slice(index, index + 2) ] : acc
    , [])
    .map(pair => {
      const [xStr, yStr, direction] = pair[0].split(' ')
      const x = parseInt(xStr)
      const y = parseInt(yStr)
      const instructions = pair[1].split('').map(s => s.toUpperCase())
      return { x, y, direction, instructions }
    })

const parseHeader = line => {
  const [ maxX, maxY ] = line.split(' ')
  return {
    x: parseInt(maxX),
    y: parseInt(maxY)
  }
}

module.exports = { parseBody, parseHeader }
