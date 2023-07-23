const routers = require('express').Router();
const questionController = require('../../../controller/questionsController');
routers.post('/create',questionController.createQuestion);

routers.use('/options',require('./options'));
routers.delete('/delete',questionController.deleteQuestion);
routers.get('/view/:id',questionController.getQuestionDetails);

module.exports  = routers;