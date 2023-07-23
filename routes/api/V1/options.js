const routers = require('express').Router();
const optionsController = require('../../../controller/optionsController');

routers.post('/create',optionsController.createOptions);
routers.patch('/add-vote',optionsController.voteForOption);
routers.delete('/delete',optionsController.deleteOption);

module.exports = routers;