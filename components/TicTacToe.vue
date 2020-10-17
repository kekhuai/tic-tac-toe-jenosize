<template>
  <div class="tictactoe-board">
    <div v-for="(m, i) in 3" :key="m">
      <div v-for="(n, j) in 3" :key="n">
        <cell :value="board[i][j]" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data(): {} {
    return {
      board: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ],
    };
  },
});
</script>

<style lang="sass" scoped>
  .tictactoe-board
    display: flex
    flex-wrap: wrap
    height: 204px
    width: 204px
</style>
