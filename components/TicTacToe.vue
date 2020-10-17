<template>
  <div class="tictactoe-board">
    <div v-for="(m, i) in 3" :key="m">
      <div v-for="(n, j) in 3" :key="n">
        <cell :value="board.cells[i][j]" @click="performMove(i, j)" />
      </div>
    </div>

    <div v-if="gameOver" class="game-over-text">
      {{ gameOverText }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Board from '../store/Board'

export default Vue.extend({
  data (): { gameOver: boolean, gameOverText: string, board: Board } {
    return {
      gameOver: false,
      gameOverText: '',
      board: new Board()
    }
  },
  methods: {
    performMove (x: number, y: number): void {
      if (this.gameOver) {
        return
      }

      if (!this.board.doMove(x, y, 'x')) {
        return
      }

      this.$forceUpdate()

      if (this.board.isGameOver()) {
        this.gameOver = true
        this.gameOverText = this.board.playerHas3InARow('x') ? 'You win!' : 'Draw'
        return
      }

      const aiMove = this.minimax(this.board.clone(), 'o')
      if (aiMove.move) {
        this.board.doMove(aiMove.move.x, aiMove.move.y, 'o')
      }

      if (this.board.isGameOver()) {
        this.gameOver = true
        this.gameOverText = this.board.playerHas3InARow('o') ? 'You lose!' : 'Draw'
      }

      this.$forceUpdate()
    },
    minimax (board: Board, player: string, depth: number = 1): { score: number, move: { x: number, y: number } | null } {
      if (board.isGameOver()) {
        return {
          score: board.getScore() + depth,
          move: null
        }
      }

      let bestScore: number = player === 'o' ? -10000 : 10000
      let bestMove = null

      for (const move of board.getPossibleMoves()) {
        const newBoard = board.clone()
        newBoard.doMove(move.x, move.y, player)

        const score = this.minimax(newBoard, player === 'x' ? 'o' : 'x', depth + 1).score

        if ((player === 'o' && score > bestScore) || (player === 'x' && score < bestScore)) {
          bestScore = score
          bestMove = move
        }
      }

      return {
        score: bestScore,
        move: bestMove
      }
    }
  }
})
</script>

<style lang="sass" scoped>
  .tictactoe-board
    display: flex
    flex-wrap: wrap
    height: 204px
    width: 204px
</style>
