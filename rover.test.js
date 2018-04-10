const { runRover } = require('./rover')

describe('rover', () => {
  describe('runRover', () => {
    it('should not allow invalid instructions', () => {
      const result = runRover(['L', 'foo'], { x: 0, y: 0 }, { x: 5, y: 5 })
      expect(result.error).toEqual(`Unknown instruction 'foo'`)
    })

    it('should move east', () => {
      const result = runRover(['M'], { x: 0, y: 0, direction: 'E' }, { x: 5, y: 5 })
      expect(result).toMatchObject({ x: 1, y: 0 })
    })

    it('should move north', () => {
      const result = runRover(['M'], { x: 0, y: 0, direction: 'N' }, { x: 5, y: 5 })
      expect(result).toMatchObject({ x: 0, y: 1 })
    })

    it('should move west', () => {
      const result = runRover(['M'], { x: 1, y: 1, direction: 'W' }, { x: 5, y: 5 })
      expect(result).toMatchObject({ x: 0, y: 1 })
    })

    it('should move south', () => {
      const result = runRover(['M'], { x: 1, y: 1, direction: 'S' }, { x: 5, y: 5 })
      expect(result).toMatchObject({ x: 1, y: 0 })
    })

    it('should not allow movement out of x bounds', () => {
      const result = runRover(['M'], { x: 0, y: 0, direction: 'W' }, { x: 5, y: 5 })
      expect(result.error).toEqual(`Exceeded x coordinate boundary`)
    })

    it('should not allow movement out of y bounds', () => {
      const result = runRover(['M'], { x: 0, y: 0, direction: 'S' }, { x: 5, y: 5 })
      expect(result.error).toEqual(`Exceeded y coordinate boundary`)
    })

    it('should turn west to south', () => {
      const result = runRover(['L'], { x: 0, y: 0, direction: 'W' }, { x: 5, y: 5 }, 1)
      expect(result.direction).toEqual('S')
    })

    it('should turn and move one step', () => {
      const result = runRover(['R', 'M'], { x: 0, y: 0, direction: 'N' }, { x: 5, y: 5 })
      expect(result.x).toEqual(1)
      expect(result.y).toEqual(0)
    })
  })
})
