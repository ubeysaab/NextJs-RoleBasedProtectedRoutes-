require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');
const app = express();

var cors = require('cors');
const user = require('./models/user');


app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());

app.get('/getUsers',async function (req,res){
   const result = await user.find()


   res.json(result)
})


app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);


const  MONGO_URI= `mongodb+srv://user1:${process.env.PASS}@cluster0.6bztjn3.mongodb.net/nextjs`


mongoose.connect(MONGO_URI)
  .then(() => 
    
    { 
      // listen to port just when data base is connected
      
      console.log('MongoDB connected to :' , mongoose.connection.name)
    
      app.listen(process.env.PORT || 5000, () => console.log('Server running'));
    
    })
  .catch(console.error);

