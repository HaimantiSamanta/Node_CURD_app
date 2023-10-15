const Users = require('../models/registration');
const ObjectId = require('mongoose').Types.ObjectId

class adminServie{
  //Find a particuler account by email START
  async findAccount(email){
    try{
         const data = await Users.findOne({email:email})
         if(data){
           return data;
         }
         else{
           return false;
         }
    }catch(err){
       console.log('service error',err);
       throw err
    }
  }
  //Find a particuler account by email END
 
  // Create user account SRART
  async createAccount(data){
    try{
       return await Users.create(data)
    }catch(err){
      console.log('create service ',err);
      throw err
    }
  }
 //Create user account END

  //Find a particuler account by mobile number START
  async findByMobileNumber(mobile){
        try{
             const data = await Users.findOne({mobilenumber:mobile})
             if(data){
               return data;
             }
             else{
               return false;
             }
        }catch(err){
           console.log('service error',err);
           throw err
        }
    }
   //Find a particuler account by mobile number END


    async GetUserInformation(user_id){
        try{
            return await Users.findById(user_id)
        }catch(err){
          console.log('getprofile service err',err);
          throw new Error()
        }
    }

   //Read all user information START
    async getUserDetails(){
        try{
          return await Users.find()
    
        }catch(err){
          console.log('getprofile service err',err);
          throw new Error()
        }
    }
  //Read all user information END

   //find and delete user account START
  async findAndDeleteUserAccount(id){
    try{
      return await Users.findByIdAndDelete(id,{$set:{active:false}},{new:true})
    }catch(err){
      throw err
    }
  }
  //find and delete user account END

 //find and update a user account START
  async UpdatePorfile(user_id,data){
    try{
       let email = data.email,mobilenumber=data.mobilenumber
       let odata = await Users.findOne({email:email})
       let mdata = await Users.findOne({mobilenumber:mobilenumber})
       if(mdata && mdata._id!=user_id){
	  return {Status:false,message:'This mobilenumber already exist'}
       }
      if(odata && odata._id!=user_id){
	      console.log(odata._id,odata._id!=user_id,user_id!==new ObjectId(user_id),user_id)
         return {Status:false,message:'This email already exist'}
      }else{
           
          let result = await Users.findByIdAndUpdate(user_id,{$set:data},{new:true})
	        return {Status:true,result}
     
      }
    }
    catch(err){
      console.log('updateProfile err',err);
      throw err
    }
  }
//find and update a user account END

//update a particuler field of user account START
async updateBio(id){
    try{
      return await Users.findByIdAndUpdate(id,{$set:{active:false}},{new:true})
    }catch(err){
      throw err
    }
}
//update a particuler field of user account END

}

module.exports = new adminServie()