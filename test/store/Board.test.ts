import Board from '../../store/Board'

describe('test Board methods', () => {
  let board: Board

  beforeEach(() => {
    board = new Board()
  })

  describe('doMove', () => {
    it('should fill cell 1, 1 with x when choose that cell', () => {
      const expectedPlayer = 'x'
      board.doMove(1, 1, 'x')
      const actualPlayer = board.cells[1][1]
      expect(actualPlayer).toEqual(expectedPlayer)
    })

    it('should fill cell 1, 1 with o when choose that cell', () => {
      const expectedPlayer = 'o'
      board.doMove(1, 1, 'o')
      const actualPlayer = board.cells[1][1]
      expect(actualPlayer).toEqual(expectedPlayer)
    })
  })

  describe('getScore', () => {
    it('should return -100 when player got 3 in a row', () => {
      const expectedScore = -100
      board.cells = [
        ['x', 'o', 'x'],
        ['o', 'x', 'o'],
        ['x', 'o', 'o']
      ]
      const actualScore = board.getScore()
      expect(actualScore).toEqual(expectedScore)
    })
    it('should return 100 when AI got 3 in a row', () => {
      const expectedScore = 100
      board.cells = [
        ['x', 'o', 'x'],
        ['o', 'x', 'o'],
        ['o', 'o', 'o']
      ]
      const actualScore = board.getScore()
      expect(actualScore).toEqual(expectedScore)
    })
  })
})
