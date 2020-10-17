<template>
  <div class="cell">
    <span v-if="'' !== value">{{ value }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    value: String,
  },
});
</script>

<style lang="sass" scoped>
  $size: 64px

  .cell
    align-items: center
    border: 2px solid rgb(75, 75, 75)
    display: flex
    font-size: 42px
    height: $size
    justify-content: center
    width: $size
</style>
