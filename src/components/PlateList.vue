<template>
  <div>
    <div> 
      Welcome {{currentFamily.name}}!
    </div>   
    <div>
      
  Select your family:<select v-model="currentFamily">
  <option v-for="fam in families" v-bind:key="fam._id" v-bind:value="fam">{{fam.name}}</option>
</select>
    </div>
    <ul>
      <li v-for="plate in plates" v-bind:key="plate.name" @click="markAsDone(plate)" class="plate">
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
      plates: [],
      families: [],
      selected: "",
      currentFamily: {}
    };
  },
  created: async function() {
    log("getting plates, load");
    const platesRequest = await axios.post("http://localhost:4000/api", {
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
    this.plates = platesRequest.data.data.familyPlates;
    const fams = await axios.post("http://localhost:4000/api", {
      query: `{
          allFamilies{
            name
            _id
        }}`
    });
    console.log({ fams });
    this.families = fams.data.data.allFamilies;
  },
  methods: {
    async getPlates() {
      log("getting plates, click");
    },
    async markAsDone(plate) {
      log({ msg: "marking plate as done", plate, name: plate.name });
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
  height: 10em;
  border: 1px solid green;
}
</style>
