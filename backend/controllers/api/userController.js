
const jwt = require('jsonwebtoken')

const User = require('./../../models/userModel')


// function to create a user
exports.createUser = async (req, res) => {
  try{
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    newUser.password = undefined;

    // Create token
    const token = jwt.sign(

      { id: newUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRATION_DATE,
      }
    )

    // Send a JSON res object
    res.status(201).json({
      status: 'success',
      data: {
        newUser,
        token,
      }
    })
  }
  catch(error){
    res.status(500).json({
      status: 'error',
      error: error,
    })
  }
  finally{
    console.log('new user created')
  }
}

// function to find a user
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      throw new Error('User ID Invalid')
    }

    //Response
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    })
  }catch(error){
    res.status(404).json({
      status: 'error',
      error: error.message,
    })
  }
}

//function to log in
exports.login = async (req, res) => {
  try { // try to retrieve email and password
    const { email, password } = req.body

    // make sure both email and password were provided
    if (!email || !password ) {
      throw new Error('Email and password required')
    }
    // find the user by email & store in a variable
    const currentUser = await User.findOne({ email }).select('+password')

    // compare passwords
    if (
      !currentUser || 
      !(await currentUser.comparePassword(password, currentUser.password))
    ) {
      throw new Error ('Invalid email or password')
    }

    const token = jwt.sign(
      { id: currentUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRATION_DATE }
    )
    // remove password data
    currentUser.password = undefined;

    // send response json
    res.status(200).json({
      status: 'success',
      data: {
        currentUser,
        token,
      },
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    })
  }
  finally {
    console.log('Log in successful!')
  }
}