const Users = require('../models/registration');
var validator = require("email-validator");
const userService = require('../services/user-service');
const jwtTokenService = require('../services/jwt-service');

//Registration User Account START
exports.registration = async (req, res) => {
    try{  
        const {email,mobilenumber,name,state,bio} = req.body         
        if(!req.body.email || !req.body.mobilenumber || !req.body.name || !req.body.state || !req.body.bio){
            return res.status(406).send({Status:false,message:'email,mobilenumber,name,state,bio are required fields'})
        }
        if(validator.validate(email)===true) {  
           const result = await userService.findAccount(email)
           const mresult = await userService.findByMobileNumber(mobilenumber)
            if(result){
                return res.status(400).json({Status:false,message:'This Email Already Exist'})
            }
            if(mresult){
                return res.status(400).json({Status:false,message:'This Mobilenumber Already Exist'})
            }
            else{
              var data = {
                    email:email,
                    name,
                    state,
                    bio,
                    mobilenumber
                }
                const response = await userService.createAccount(data)
                const Authorization  = jwtTokenService.generateJwtToken({user_id:response._id,LoggedIn:true})
                await jwtTokenService.storeRefreshToken(Authorization,response._id)

                 console.log("registaration Data ",response,Authorization)
                 return res.status(200).json({Status:true,response,Authorization})
            }
        }
        else{
            return res.status(400).json({Status:false,message:'Email is not valid'})
        }              
    }catch(err){
        console.log(err);
        res.status(400).json({Status:false,message:'somthing went wrong'})
    }
};
//Registration User Account END

//Read All User Account START
exports.getAllUserDetails=async(req,res)=>{
    try{
        let data = await userService.getUserDetails()
        return res.status(200).json({Status:true,data})
    }catch(err){
        console.log(err);
        return res.status(400).json({Status:false,message:err.message})
    }
}
//Read All User Account End


//Read a User Account START
exports.getUserDetails=async(req,res)=>{
    try{
        const {user_id} = req.userData
        const data = await userService.GetUserInformation(user_id)
        return res.status(200).json({Status:true,data})
    }catch(err){
        console.log(err);
        return res.status(400).json({Status:false,message:err.message})
    }
}
//Read a User Account End


//Delete User Account START
exports.deleteAccount = async(req,res)=>{
    try{
        let {account_id} = req.params
        let data = await userService.findAndDeleteUserAccount(account_id)
        if(data){
            return res.status(200).json({Status:true,message:'Account delete successfully',data})
        }else{
            return res.status(404).send({Status:false,message:'Not Found User Account'})
        }
    }catch(err){
        console.log("deleteAccount error",err);
        return res.status(400).json({Status:false,message:'sorry! somthing went wrong'})
    }
}
//Delete User Account END

//Update All user data  START
exports.updateUserPorfile = async (req,res) => {
    try{
        const {email,mobilenumber,name,state,bio} = req.body
        console.log(email,mobilenumber,name,state,bio)
        const {user_id} = req.userData;
        let data ={};    
        const data1 = {
           name:name||'',
           state:state||'',
           bio:bio||'',
           mobilenumber:mobilenumber||'',
           email:email||'',
           mobilenumber,
           }
       data = data1
            const result = await userService.UpdatePorfile(user_id,data)
            if(result.Status===true){
            let updateData = result.result
                return res.status(200).json({Status:true,message:'Update Profile Successfully',updateData})
            }
            else{
                return res.status(200).json(result)
            }
       
    }catch(err){
        console.log(err);
        return res.status(400).json({Status:false,message:'somthing went wrong'})
    }
}
//Update All user data  end


//Update particuler user data  START
exports.updateUserBio=async(req,res)=>{
    try{
        const {_id} = req.params
        const data = {
                bio:req.body.bio               
            }
            const result = await Users.findOneAndUpdate({_id:_id},{$set:data},{new:true})
            return res.status(200).json({Status:true,result})
        }catch(err){
                console.log("Update StandardAndBoard error",err);
                return res.status(400).json({Status:false,message:'Sorry! somthing went wrong'})
        }
}
//Update particuler user data  START
