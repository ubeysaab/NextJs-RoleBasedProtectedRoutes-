const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');



async function login (req,res) {

  console.log(req.body)
const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const valid =(password === user.password);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  res.json({ token });
}


module.exports={login}
