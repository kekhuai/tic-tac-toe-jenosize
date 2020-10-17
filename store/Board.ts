import isEmpty from 'lodash/isEmpty'

export default class Board {
  cells: Array<Array<string>>

  constructor () {
    this.cells = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]
  }

  doMove (x: number, y: number, player: string): boolean {
    if (this.cells[x][y]) {
      return false
    }

    this.cells[x][y] = player
    return true
  }

  getScore () {
    let score: number = 0
    if (this.playerHas3InARow('x')) {
      score -= 100
    }
    if (this.playerHas3InARow('o')) {
      score += 100
    }
    return score
  }

  playerHas3InARow (player: string): boolean {
    for (let i: number = 0; i < 3; ++i) {
      if (this.cells[0][i] === player && this.cells[1][i] === player && this.cells[2][i] === player) {
        return true
      }
    }

    for (let i: number = 0; i < 3; ++i) {
      if (this.cells[i][0] === player && this.cells[i][1] === player && this.cells[i][2] === player) {
        return true
      }
    }

    if (this.cells[0][0] === player && this.cells[1][1] === player && this.cells[2][2] === player) {
      return true
    }
    if (this.cells[0][2] === player && this.cells[1][1] === player && this.cells[2][0] === player) {
      return true
    }

    return false
  }

  isGameOver (): boolean {
    return isEmpty(this.getPossibleMoves()) || this.playerHas3InARow('x') || this.playerHas3InARow('o')
  }

  clone (): Board {
    const clone = new Board()

    for (let i: number = 0; i < 3; ++i) {
      for (let j: number = 0; j < 3; ++j) {
        clone.cells[i][j] = this.cells[i][j]
      }
    }

    return clone
  }

  getPossibleMoves (): Array<{ x: number, y: number }> {
    const moves: Array<{ x: number, y: number }> = []
    for (let i: number = 0; i < 3; ++i) {
      for (let j: number = 0; j < 3; ++j) {
        if (!this.cells[i][j]) {
          moves.push({ x: i, y: j })
        }
      }
    }
    return moves
  }
}
