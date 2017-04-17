const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express')
const { compact, concat } = require('lodash')

router.use('/graphiql', graphiqlExpress({
  endpointURL: '/apollo'
}))

const schema = require(`${global.__base}/schemas/executableSchema`)

// https://github.com/apollographql/graphql-server#applicationgraphql-requests
// GraphQL OpticsAgent
const OpticsAgent = require('optics-agent')
OpticsAgent.instrumentSchema(schema)

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

router.use('/', ...helperMiddleware, graphqlExpress(req => ({
  schema,
  context: {
    opticsContext: OpticsAgent.context(req)
  }
})))

module.exports = router
