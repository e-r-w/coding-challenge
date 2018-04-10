const { parseHeader, parseBody } = require('./parser')

describe('parser', () => {
  describe('parseHeader', () => {
    it('should parse header lines', () => {
      const result = parseHeader('5 5')
      expect(result).toMatchObject({ x: 5, y: 5 })
    })
  })

  describe('parseBody', () => {
    it('should parse a single rover instruction', () => {
      const [ result ] = parseBody([
        '1 2 N',
        'LMLMLMLMM'
      ])
      expect(result.direction).toEqual('N')
      expect(result.x).toEqual(1)
      expect(result.y).toEqual(2)
      expect(result.instructions).toEqual([
        'L',
        'M',
        'L',
        'M',
        'L',
        'M',
        'L',
        'M',
        'M'
      ])
    })
  })
})