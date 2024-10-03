const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const UserModel = require('../../model/Auth_Model/AuthModel'); // Import User model



const handelsignup = async (req, res) => {
  try {
    const {name,email,password}=req.body;
    const user=await UserModel.findOne({email})
    if(user){
      return res.status(409).json({message:"User is already exist, you can login",success:false});
    }
    const userModel=new UserModel({name,email,password});
    userModel.password=await bcrypt.hash(password,10);
    await userModel.save();
    res.status(201).json({
      message:"Signup successfully",
      success:true
    })
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ 
      message:"Internal server error",
      success:false
     });
  }
};


const handelsignin = async (req, res) => {
  try {
    const {email,password}=req.body;
    const user=await UserModel.findOne({email})
    const errorMsg="Auth failed email or password is wrong"
    if(!user){
      return res.status(403).json({message:errorMsg,success:false});
    }
    const ispassequal=await bcrypt.compare(password,user.password)

    if(!ispassequal){
      return res.status(403).json({message:errorMsg,success:false});
    }

    const jwtToken=jwt.sign(
      {email:user.email,_id:user._id},
      process.env.JWT_SECRET,
      {expiresIn:'24h'}
    )

    res.status(201).json({
      message:"Signin successfully",
      success:true,
      jwtToken,
      email,
      name:user.name
    })
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ 
      message:"Internal server error",
      success:false
     });
  }
};




module.exports = {
  handelsignup,
  handelsignin
};

