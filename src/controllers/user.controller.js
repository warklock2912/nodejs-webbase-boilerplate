import session from 'express-session';
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';

const showUserPage = async (req, res) => {
  res.render('index', { title: 'User Page' })
}

const loginPage = async (req, res) => {
  res.render('login', {title: 'Login'})
}

const loginPost = async (req, res) => {
  const { email, password } = req.body;

  const userModel = await User.findOne({ email: email });
  if (!userModel){
    res.send("Email is incorrect")
    return res.redirect('/') 
  }

  // Password not bcrypt yet
  const isValidPassword = bcrypt.compareSync(password, userModel.password);
  if (!isValidPassword) {
    res.send("Password is incorrect")
    return res.redirect('/') 
  }
  
  req.session.loggedin = true;
  req.session.email = email;
  return res.redirect({user: userModel}, '/')
}

export {
  showUserPage,
  loginPage,
  loginPost
}
