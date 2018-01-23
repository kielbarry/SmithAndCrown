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
      return '<div>Created on: <b>' + this.coin.createdAt + '</b></div>' +
      '<div>Last Updated: <b>' + this.coin.lastUpdate + '</b></div>' + 
      '<div>Written in: <b>' + this.coin.language + '</b></div>' +
      '<div>Number of stars: <b>' + this.coin.stars + '</b></div>';
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

