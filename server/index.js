const express = require('express')
const {buildSchema} = require('graphql')
const graphqlHTTP = require('express-graphql')
const cors = require('cors')

const data = require("./services/plates");

const schema = buildSchema(`
  type Query {
    ping: String
    allPlates: [Plate]
    familyPlates(familyId: Int!): [Plate]
  }


  type Plate {
      name: String, 
      abbreviation: String
      familyId: Int
  }
`)

const log = (item) => console.log(item);

let promiseData = (req) => {
    return new Promise((resolve, reject) => {
        log("here")
        data.getFamilyPlates(req.familyId, (err, plates) => {
            log({err, plates})
            resolve(plates);
        })
    });
};

const rootValue = {
ping: () => 'ponged at ' + new Date(),
allPlates: () => data.getAllPlates(),
familyPlates: (req) => promiseData(req)

}

const app = express()
app
.use(cors())
app
.use('/api', graphqlHTTP({rootValue, schema, graphiql: true}))

app
.listen(4000, () => console.log('Listening on 4000')) // eslint-disable-line no-console