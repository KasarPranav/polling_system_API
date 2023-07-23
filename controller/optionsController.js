const optionsModel = require('../models/options');
const questionModel = require('../models/questions');

//Function to create an options
module.exports.createOptions = async function(req,res){
        const questionId = req.query.qId;
        const {optionText } = req.body;
        try {
            const option = await optionsModel.create({
                text: optionText,
                question: questionId,
                votes: 0
            });
            const question = await questionModel.findById(questionId);
            await question.options.push(option._id);
            await question.save();
            return res.status(200).json({
                option: option,
                message: 'Option created successfully'
            });
        } catch (error) {
            console.log("Error while creating option: ",error);
            return;
        }        
}

//Funtion to add vote to an option
module.exports.voteForOption = async function(req,res){
    try {
        const optionId = req.query.oId;
        const option = await optionsModel.findById(optionId);
        option.votes+=1;
        await option.save();
        return res.status(200).json({
            option: option,
            votes: option.votes,
            message: "Vote added successfully"
        })
    } catch (error) {
        console.log('Error while adding vote: ',error);
        return;
    }
}


//Function to delete an option
module.exports.deleteOption = async function(req,res){
    try {
        const optionId = req.query.oId;
        const option = await optionsModel.findById(optionId);
        if(option && option.votes<1){
           await optionsModel.findByIdAndDelete(optionId);
           return res.status(200).json({
            optionId: option._id,
            message: 'option deleted successfully'
           });
        }else{
            return res.status(405).json({
                message: 'Cannot remove option'
            });
        }
    } catch (error) {
        console.log('Error while deleting option: ',error);
        return;
    }
}