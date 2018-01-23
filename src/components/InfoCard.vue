<template>
  <div>
    <info-card 
      :frontType="'text'"
      :frontTitle="createTitle()"
      :frontData="calculate()"
      :backType="'graph'"
      :backTitle="back.title"
      :backData="coin.graphData" />

      <div style="z-index:999; position:relative; top: 20px" v-on:click='openWindow()'>
        <a> {{ coin.name}}'s Github </a>
      </div>

  </div>
</template>

<script>

import InfoCard from 'vue-info-card';

export default {
  components: {
    InfoCard,
  },
  props: ['coin'],
  data() {
    return {
      back: {
        title: "Net contributions past 3 months"
      },
    };
  },
  methods: {
    calculate() {
      var count = this.coin.stargazers_count
      return '<div>Created on: ' + this.coin.createdAt + '</div>' +
      '<div>Last Updated: ' + this.coin.lastUpdate + '</div>' + 
      '<div>Written in: ' + this.coin.language + '</div>' +
      '<div>Number of stars: ' + this.coin.stars + '</div>';
    },
    createTitle() {
      return "coin: " + this.coin.crypto + "; program: " + this.coin.name;
    },
    openWindow(){
      window.open(this.coin.baseUrl.replace('/api.', '/').replace('/repos/', '/'), '_blank')
    }
  }
};
</script>
