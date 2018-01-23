<template>
  <div>
    <div id="header" >
        <div id="headerContent" v-bind='headerinfo'> {{ headerinfo.title }}</div>
    </div>
    <div class='hello'>
      <ul >
        <li v-for='coin in responseArray'>
          <div class="coinContainer">
            <info-card class='infocard' v-bind:coin='coin'></info-card>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import InfoCard from './InfoCard';

export default {
  name: 'CryptoCards',
  components: {
    InfoCard,
  },
  data() {
    return {
      urlObject: {
        'bitcoin' : 'https://api.github.com/repos/bitcoin/bitcoin',
        'ethereum': 'https://api.github.com/repos/ethereum/go-ethereum',
        'ripple' : 'https://api.github.com/repos/ripple/rippled',
        'bcash' : 'https://api.github.com/repos/bitpay/copay',
        'cardano' : 'https://api.github.com/repos/input-output-hk/cardano-sl',
        'litecoin' : 'https://api.github.com/repos/pooler/cpuminer',
      },
      responseArray: [],
       headerinfo: {
        title: "A submission to S+C by Kiel Barry"
      }
    }
  },
  created() {
    this.fetchGithub();
  },
  methods: {
    fetchGithub() {
      Object.keys(this.urlObject).map((key) => {
        this.$http.get(this.urlObject[key])
        .then((response) => {
          var d = response.data
          var cd = new Date(d.created_at);
          var lu = new Date(d.updated_at);

         

          if(key === "litecoin") {
            d.organization = {
              avatar_url : "http://bit.ly/2E66s2l"
            }
          }

           console.log(d.organization)

          var newObj = {
            name: d.name,
            crypto: key,
            description: d.description,
            avatar: d.organization.avatar_url,
            openIssues: d.open_issues,
            forks: d.forks,
            homepage: d.homepage,
            baseUrl: this.urlObject[key],
            lastUpdate: (lu.getMonth() + 1) + "/" + (lu.getDay() + 1)  + "/" + lu.getFullYear(),
            createdAt: (cd.getMonth() + 1) + "/" + (cd.getDay() + 1) + "/" + cd.getFullYear(),
            fork: d.fork,
            stars: d.stargazers_count,
            language: d.language,
            graphData: []
          };

          // console.log(newObj)

          this.$http.get(newObj.baseUrl + '/stats/code_frequency').then((resp) => {
            resp.data.splice(0,12).reverse().map(arr => {
              newObj.graphData.push(arr[1] + arr[2]);
            })
            this.responseArray.push(newObj);
          })
        });
      })
    }
  }
};
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.coinContainer {
  width: 30vw;
  border-color: black;
  margin-top: 100px;
  margin-bottom: 20px;
  z-index: 999;
  position: relative;
}
#header {
  z-index: 999;
  height: 5vw;
  background-color: black;
}
#headerContent {
  padding-top: 2vw;
  height: 3vw;
  color: white;
}
</style>
