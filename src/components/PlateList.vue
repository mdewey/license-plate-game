<template>
  <div>
    <div> 
      Welcome {{currentFamily.name}}!
    </div>   
    <div>
      
  Select your family:<select v-model="currentFamily" @change="getPlates()">
  <option v-for="fam in families" v-bind:key="fam._id" v-bind:value="fam">{{fam.name}}</option>
</select>
    </div>
    <ul>
      <li 
        v-for="plate in plates" 
        v-bind:key="plate.name"
        @click="markAsDone(plate)" 
        v-bind:class="{ found: plate.found }"
        class="plate" >
        <div ></div>
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
    log("compotnent created");

    const fams = await axios.post("/api", {
      query: `{
          allFamilies{
            name
            _id
        }}`
    });
    this.families = fams.data.data.allFamilies;
  },
  methods: {
    async getPlates(evt) {
      log({ msg: "getting plates, on change", evt });
      const platesRequest = await axios.post("/api", {
        query: `
       query GetPlatesForFamily($familyId: String!) {   
          familyPlates (familyId: $familyId){
            name
            abbreviation
            familyId
            _id
            found
        }}`,
        variables: {
          familyId: this.currentFamily._id
        }
      });
      this.plates = platesRequest.data.data.familyPlates;
    },
    async markAsDone(plate) {
      log({ msg: "marking plate as done", plate, name: plate.name });
     await axios.post("/api", {
        query: `
       mutation MarkPlateForFamily($familyId: String!, $plateId: String!) {   
          markPlateSelected(familyId: $familyId, plateId: $plateId){
          familyId
          plateId
        }}`,
        variables: {
          familyId: this.currentFamily._id, 
          plateId: plate._id
        }
      });
      plate.found = new Date();
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
.found{
  border: 3px solid pink;
}
</style>
