const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express')

router.use('/graphiql', graphiqlExpress({
  endpointURL: '/apollo'
}))

const schema = require(`${global.__base}/schemas/executableSchema`)

// GraphQL OpticsAgent
const OpticsAgent = require('optics-agent')
OpticsAgent.instrumentSchema(schema)

// https://github.com/apollographql/graphql-server#applicationgraphql-requests
const helperMiddleware = [
  OpticsAgent.middleware(),
  bodyParser.json(),
  (req, res, next) => {
    if (req.is('application/graphql')) {
      req.body = { query: req.body }
    }
    next()
  }
]

router.use('/', ...helperMiddleware, graphqlExpress({
  schema,
  context: OpticsAgent.context
}))

module.exports = router
