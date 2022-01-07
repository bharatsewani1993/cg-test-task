//Importing Github Controller
const GithubController = require('../controllers/githubController');

//Exporting all routes and their respective functions
module.exports = (router) => {
  const githubController = new GithubController();

  //Get all repositories of a user
  router.get('/repositories/', [], function(req, res) {
    return githubController.getRepoList(req, res);
  });

  //Get repository details of a user using repository name and owner name
  router.get('/repodetails/', [], function(req, res) {
    return githubController.getRepoDetails(req, res);
  });
};
