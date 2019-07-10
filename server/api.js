// server/api.js
/*
 |--------------------------------------
 | Dependencies
 |--------------------------------------
 */

const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const mlbGame = require('./../models/mlbGame');
const PropBetsController = require('./../controllers/propBets.controller');
const golfersController = require('./../controllers/golfers.controller');



/*
 |--------------------------------------
 | Authentication Middleware
 |--------------------------------------
 */

module.exports = function(app, config) {
  // Authentication middleware
  const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${config.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: config.AUTH0_API_AUDIENCE,
    issuer: `https://${config.AUTH0_DOMAIN}/`,
    algorithm: 'RS256'
  });
  
  // Check for an authenticated admin user
  const adminCheck = (req, res, next) => {
    const roles = req.user[config.NAMESPACE] || [];
    if (roles.indexOf('admin') > -1) {
      next();
    } else {
      res.status(401).send({message: 'Not authorized for admin access'});
    }
  }

/*
 |--------------------------------------
 | API Routes
 |--------------------------------------
 */
  
    
  app.get("/api/mlbGames", (req, res) => {
    mlbGame.find({}, (err, games) => {
      let gamesArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (games) {
        games.forEach(game => {
          gamesArr.push(game);
        });
      }
      res.send(gamesArr);
    });
  })
    
  app.get('/api/betSummary',PropBetsController._get);
  
  
  
    
  var api = require('../routes/api.route');
  app.use('/api', api);
  
//   app.get('/api/golfers', golfersController._get);  
//   app.post('/api/golfers/new', golfersController._post);
//   app.put('/api/golfers/:id', golfersController._put);
  
  

  // GET API root
  app.get('/api/', (req, res) => {
    res.send('API works');
  });

};