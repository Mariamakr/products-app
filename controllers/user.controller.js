const User = require('../models/user.model');

const logger = require('../logger/logger');

//edo ftiaxno thn diadikasia pou tha xrisimopoiiso sto user.model
exports.findAll = async(req, res) => {
    console.log("Find all users");

    try{
        const result = await User.find();
        res.status(200).json({status:true, data:result});
        console.log("Success in reading all users");
        logger.info("Log Info success in reading all users");
        logger.log("Logger Succes in reading all users");
        logger.error(">>> Problem in reading all users")
    }catch(err){
        res.status(400).json({status:false, data: "problem in showing data"})
        //err.getMessage();
        console.log("Problem of accessing all users");

    }

}

//entheto gia thn allagh tou mongoose explanation sto video --
//esto oti exoume ena findall
//ME XRISI CALLBACK SINARTISIS KAI OXI ASYNC AWAIT

// exports.findAll = function(req, res){
//     console.log("Find all users");
//     User.find((err, results) => {
//         if(err){
//             res.status(400).json({status:false, data: err})
//             console.log("problem in reading all users");
//         }else{
//             res.status(200).json({status:true, data: results});
//             console.log("everything is working excellent!")
//         }
//     })
// }

exports.findOne = async(req,res) => {

    const username =req.params.username
    console.log('Find user with username', username)

    try{
        const result = await User.findOne({username:username});
        res.status(200).json({status:true, data:result});
        console.log("find user with usernam", username)

    }catch(err){
        res.status(400).json({status:false, data:err})
        console.log("problem in finding user with username", username);
    }
}

exports.create = async(req, res) => {

    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.products
    })


    console.log("Insert user with username", req.body.username);

    try{
        const result = await newUser.save();
        res.status(200).json({status:true, data:result});
        console.log("Insert user with usernam", req.body.username)
    }catch(err){
        res.status(400).json({status:false, data:err})
        console.log("problem in inserting user with username", req.body.username);
    }
}
exports.update = async(req,res) =>{
    const username = req.body.username;
    console.log("Update user with username", username);

    const updateUser ={
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.products
    }
    try{
        const result = await User.findOneAndUpdate({username:username}, updateUser, {new:true})
        res.status(200).json({status:true, data:result});
        console.log("Success in updating user with username", username);

    }catch(err){
        res.status(400).json({status:false, data: err})
        console.log("Problem in updating user with the username", username);

    }
}

exports.delete = async(req, res)=>{
    const username = req.params.username;

    console.log("Delete user with username", username);
     try{
        const result = await User.findOneAndRemove({username:username});
        res.status(200).json({status:true, data:result});

     }catch(err){
        res.status(400).json({status:false, data: err})
        console.log("Problem in deleting user with the username", username);
     }
}
    

// iii an den evaza to exports pano mazi me to findall me ton klasiko tropo
// module.exports = {findAll} kai pano tha itan findall= async...