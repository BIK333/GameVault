const middleware = require('./middleware');
const controllers = require('./controllers');

const router = (app) => {
  // Login routes - only available when logged out
  app.get('/login', middleware.requiresLogout, controllers.Account.loginPage);
  app.post('/login', middleware.requiresLogout, controllers.Account.login);

  // Signup routes - only available when logged out
  app.post('/signup', middleware.requiresLogout, controllers.Account.signup);

  // Logout route - only available when logged in
  app.get('/logout', middleware.requiresLogin, controllers.Account.logout);

  // Existing maker routes - temporary until GameVault replaces them
  app.get('/maker', middleware.requiresLogin, controllers.Domo.makerPage);
  app.post('/maker', middleware.requiresLogin, controllers.Domo.makeDomo);
  app.get('/getDomos', middleware.requiresLogin, controllers.Domo.getDomos);
  app.post('/deleteDomo', middleware.requiresLogin, controllers.Domo.deleteDomo);

  // GameVault routes - only available when logged in
  app.get('/getGames', middleware.requiresLogin, controllers.Game.getGames);
  app.post('/addGame', middleware.requiresLogin, controllers.Game.addGame);

  // Home page - only available when logged out
  app.get('/', middleware.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
