<template>
  <div>
    <div> 
      Welcome Dewishes!
    </div>   
    <ul>
      <li v-for="plate in plates" v-bind:key="plate.name">
        {{plate.name}}
      </li>
    </ul>
    </div>
</template>


<script>
import axios from "axios";
// eslint-disable-next-line
const log = msg => console.log(msg);

export default {
  name: "PlateList",
  props: {},
  data() {
    return {
      plates: []
    };
  },
  created: async function() {
    log("getting plates, load");
    const res = await axios.post("http://localhost:4000/api", {
      query: `
       query GetPlatesForFamily($familyId: Int!) {   
          familyPlates (familyId: $familyId){
            name
            abbreviation
            familyId
        }}`,
      variables: {
        familyId: 12
      }
    });
    this.plates = res.data.data.allPlates;
  },
  methods: {
    async getPlates() {
      log("getting plates, click");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
li {
  flex-basis: 25%;
  display: inline-block;
  margin: 0 10px;
  color: #42b983;
}
</style>
