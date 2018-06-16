const express = require('express')
const {buildSchema} = require('graphql')
const graphqlHTTP = require('express-graphql')
const cors = require('cors')

const plates = require("./services/plates");
const families = require("./services/family");

const schema = buildSchema(`
  type Query {
    ping: String
    allPlates: [Plate]
    allFamilies: [Family]
    familyPlates(familyId: Int!): [Plate]
  }

  type Plate {
      name: String, 
      abbreviation: String
      familyId: Int
  }

  type Family{
      name: String, 
      _id: String
  }
`)

const rootValue = {
    ping: () => 'ponged at ' + new Date(),
    allPlates: () => plates.getAllPlates(),
    familyPlates: (req) => plates.getFamilyPlates(req.familyId),
    allFamilies: ()  => families.getFamilies()
}

const app = express()
app.use(cors())
app.use('/api', graphqlHTTP({rootValue, schema, graphiql: true}))

app.listen(4000, () => console.log('Listening on 4000')) // eslint-disable-line no-console