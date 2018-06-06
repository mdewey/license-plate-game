const express = require('express')
const {buildSchema} = require('graphql')
const graphqlHTTP = require('express-graphql')
const cors = require('cors')


const Plate = require("./models/Plate");

const plates = [
    new Plate("Alabama", "AL"),
    new Plate("Alaska", "AK"),
    new Plate("Arizona", "AZ"),
    new Plate("Arkansas", "AR"),
    new Plate("California", "CA"),
    new Plate("Colorado", "CO"),
    new Plate("Connecticut", "CT"),
    new Plate("Delaware", "DE"),
    new Plate("Florida", "FL"),
    new Plate("Georgia", "GA"),
    new Plate("Idaho", "IH"),
]


const schema = buildSchema(`
  type Query {
    ping: String
    allPlates: [Plate]
  }


  type Plate {
      name: String, 
      abbreviation: String
  }
`)

const rootValue = {
    ping: () => 'ponged at ' + new Date(),
    allPlates: () => plates
}

const app = express()
app.use(cors())
app.use('/api', graphqlHTTP({rootValue, schema, graphiql: true}))


app.listen(4000, () => console.log('Listening on 4000'))// eslint-disable-line no-console