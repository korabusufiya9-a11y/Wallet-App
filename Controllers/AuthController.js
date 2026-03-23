    const bcryptjs = require("bcryptjs")
    const AuthController = require("../Controllers/AuthController");
    const User = require("../Models/UserModel");


    const  register = async (req, res) => {
      try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ msg: "Email already registered." });

        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP

        const salt = await bcryptjs.genSalt(10);
        ///console.log(req.body, salt);
        const HashedPassword = await bcryptjs.hash(String(password), salt);


        const newUser = new User({
          username,
          email,  
          passwordHash: HashedPassword,
          status: 'active'
        });

        await newUser.save();

        
        console.log(` Email sent to ${email} with OTP: ${otp}`);
        
        
        res.status(201).json({ 
          message: "User created. Please check your email for the OTP.",
          email: email 
        });

      } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
      }
    };

    const verifyotp= async (req, res) => {
      try {
        const { email, otpInput } = req.body;

        const user = await User.findOne({ email }).select("+otp");
        if (!user) return res.status(404).json({ msg: "User not found." });

        if (user.otp && user.otp.toString() === otpInput.toString()) {
        
          user.status = 'Active' 
          user.verification_code = null; 
          await user.save();

          res.status(200).json({ message: "Registration Successful. Account is now Active." });
        } else {
          res.status(400).json({ message: "Incorrect OTP. Please retry." });
        }
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    };


    const login = async (req, res)=>{
    try{
        const {email, password} = req.body;
        if (!email || !password){
            return res.status(400).json({message:'All fields are required'})
        }
        const user = await User.findOne({email});
        if (!user){
            return res.status(400).json({message:'Invalid credentials'})
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch){
            return res.status(400).json({message:'Invalid credentials'})
        }
        res.status(200).json({message:'Login successful'})
    }catch(error){
        res.status(500).json({message:'Server error'})
    }
    };
    
    const resendOtp = async (req, res)=>{
    try{
        const {email} = req.body;
        if (!email){
            return res.status(400).json({message:'Email is required'})
        }
        const user = await User.findOne
        if (!user){
            return res.status(400).json({message:'Invalid email'})
        }
        user.otp = Math.floor(100000 + Math.random() * 900000).toString();
        await user.save();
        res.status(200).json({message:'OTP resent successfully'})
    }
    catch(error){
        res.status(500).json({message:'Server error'})
    }
    };
        
    module.exports={
        register,
        verifyotp,
        login,
        resendOtp
    };