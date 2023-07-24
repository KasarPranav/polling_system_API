const questionModel = require('../models/questions');
const optionsModel = require('../models/options');
const mongoose = require('mongoose');

//Function to create a question
module.exports.createQuestion = async function(req,res){
    const {title} = req.body;
    try {
        const question = await questionModel.create({
            title: title
        });
        return res.status(200).json({
            message: 'Success',
            question: question
        })        
    } catch (error) {
        console.log('Error while creating student: ',error);
        return res.status(400).json({
            message: 'Error While Creating student'
        })
    } 

}

//Function to delete a question
module.exports.deleteQuestion = async function(req,res){
    try {
        const questionId = req.query.qId;
        const question = await questionModel.findById(questionId).populate('options');
        if(question){
            const options = question.options;
            const checkVote = options.find((item)=>{
                return item.votes>0;
            });
            if(!checkVote){
                await optionsModel.deleteMany({
                    question: questionId
                });
                await questionModel.findByIdAndDelete(questionId);
                return res.status(200).json({
                    message: "Question and options assigned to it were deleted successfully"
                })
            }
        }       
        return res.status(405).json({
            message: 'Cannot delete question'
        })
    } catch (error) {
        console.log('Error while deleting question: ',error);
    }
}

// Function to get a question and all its options
module.exports.getQuestionDetails = async function(req,res){
    try {
        const questionId = req.params.id;
        // const question = await questionModel.findById(questionId).populate('options');
        const question = await questionModel.aggregate([
            {
                $match:{
                    _id : new mongoose.Types.ObjectId(questionId)
                }
            },
            {
                $lookup : {
                    from: "options",
                    localField: "options",
                    foreignField: "_id",
                    as: "optionsDetails"
                }
            },
            {
                $unwind: {
                    path: "$optionsDetails"
                }
            },
            {
                $project: {
                    "title": 1,
                     "optionsDetails":  {
                        "_id": 1,
                        "text": 1,
                        "question": 1,
                        "votes": 1,
                        "linkToVote": { $concat:[`${process.env.HOSTNAME}api/v1/questions/options/add-vote?oId=`,{ $toString:'$optionsDetails._id'}]}
                        
                    }                                        
                }
            },
            {
                $group: {
                    _id: '$_id',
                    title: { $first: "$title"},
                    optionsDetails: {$push: "$optionsDetails"}
                }
            }

        ]);
        // console.log(question[0]);
        if(question[0]._id){
            return res.status(200).json({
                data: question,
                message: "Success"
            })
        }
        return res.status(404).json({
            message: "Cannot find entry"
        })
    } catch (error) {
        console.log('Error while fetching question: ',error);
    }
}