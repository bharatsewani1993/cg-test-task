const NodeCache = require('node-cache');
const GithubService = require('../services/githubService');

class GithubController {

  constructor() {
    console.log('[INFO] RepositoriesController init');
    this.githubService = new GithubService();
    this.cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });
  }

  //Validate if username is available in the request
  validateUsernameParams(req, res) {
    const username = req.query.username;
    if (!username || !username.trim()) {
      return res
        .status(400)
        .json({ status: 'ERROR', message: 'invalid_parameters' });
    }
  }

  //validate if username and repoName are available in the request
  validateParams(req, res) {
    const username = req.query.username;
    const repoName = req.query.reponame;
    if (!username || !username.trim() || !repoName || !repoName.trim()) {
      return res
        .status(400)
        .json({ status: 'ERROR', message: 'invalid_parameters' });
    }
  }

  //get data from cache if available
  async retrieveCachedData(cacheKey, serviceFn, userName, repoName ) {
    console.log("cacheKey", cacheKey);
    const dataCached = this.cache.get(cacheKey);
    if (dataCached === undefined || dataCached === null) {
      console.log('[INFO] Cache Miss :: Retrieving data from Github API');
      if(serviceFn === 'getRepositoryDetails') {
        var data = await this.githubService.getRepositoryDetails(userName, repoName );
      } else{
        var data = await this.githubService[serviceFn](userName);
      }
      this.cache.set(cacheKey, JSON.stringify(data), 60 * 1000);
      return data
    } else {
      console.log('[INFO] Cache Hit');
      return JSON.parse(dataCached)
    }
  }

 //get list of user repositories
 //first searching in cache and if not available then calling github graphQL api
  async getRepoList(req, res) {
    try {
      this.validateUsernameParams(req, res);
      const username = req.query.username;
      const cacheKey = `/repositories/${username}`;
      console.log('[INFO] Cache Key', cacheKey);
      const data = await this.retrieveCachedData(cacheKey, 'getRepositories', username);
      return res
        .status(200)
        .json({ status: 'OK', data });

    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ status: 'ERROR', message: 'internal_server_error' });
    }
  }

  //get details of a repository
  //first searching in cache and if not available then calling github graphQL api
  async getRepoDetails(req, res) {
    try {
      this.validateParams(req, res);
      const username = req.query.username;
      const repoName = req.query.reponame;
      const cacheKey = `/repositories/${username}/${repoName}`;
      console.log('[INFO] Cache Key', cacheKey);
      const data = await this.retrieveCachedData(cacheKey, 'getRepositoryDetails', username, repoName);
      return res
        .status(200)
        .json({ status: 'OK', data });

    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ status: 'ERROR', message: 'internal_server_error' });
    }
  }
}

module.exports = GithubController;