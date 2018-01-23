<template>
  <div>

    <img v-bind:src="coin.avatar" style="z-index:999; width: 50px; height: 50px">

    <info-card
      :frontType="'text'"
      :frontTitle="createTitle()"
      :frontData="calculate()"
      :backType="'graph'"
      :backTitle="back.title"
      :backData="coin.graphData" />
      <div style="z-index:999; position:relative; top: 100px" v-on:click='openWindow()'>
        <a> {{ coin.homepage}}'s Home Page </a>
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

      return  '<div>' + this.coin.description + '</div>' +
      '<div>Open Issues: <b>' + this.coin.openIssues + '</b></div>' +
      '<div>Forks: <b>' + this.coin.forks + '</b></div>' +
      '<div>Created on: <b>' + this.coin.createdAt + '</b></div>' +
      '<div>Last Updated: <b>' + this.coin.lastUpdate + '</b></div>' + 
      '<div>Written in: <b>' + this.coin.language + '</b></div>' +
      '<div>Number of stars: <b>' + this.coin.stars + '</b></div>' +
      "<a :xlink:special="+ this.coin.homepage + "></a>" +
      '<div><a text="Homepage" v-bind:href=' + this.coin.homepage + '></a></div';
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

