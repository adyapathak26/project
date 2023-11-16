const express=require('express')
const cors=require('cors');
const bodyParser=require('body-parser');
const app=express();//instance 
const path=require('path');
const jwt=require('jsonwebtoken');
const multer=require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
const mongoose = require('mongoose');



const methodOverride=require('method-override');
mongoose.connect('mongodb://127.0.0.1:27017/olx')
.then(()=>{console.log("db connected")})
.catch((err)=>{console.log("connection error",err)})


const Users=mongoose.model('Users',{username:String,password:String});

app.get('/',(req,res)=>{
    res.send('hello')
})




app.post('/signup',(req,res)=>{
  const username=req.body.username;
  const password=req.body.password;
  const user= new Users({username:username,password:password});
  user.save().then(()=>{
    res.send({message:'saved'})

  })

.catch(()=>{

   res.send({message:'error'})
   

})
})

app.post('/login',(req,res)=>{

const username=req.body.username;
const password=req.body.password;
//const user= new Users({username:username,password:password});
Users.findOne({username:username})
.then((result)=>{
  console.log(result,"user data");//frontend se araha h 
  if(!result){
    res.send({message:"user not found"});
  }else{
   if(result.password==password){
    const token=jwt.sign({
      data:result
    },'MYKEY',{expiresIn:'1h'});
    res.send({message:'user found',token: token});
   }
   if(result.password!=password)
   {
    res.send({message:'password not matched'});
   }
  
  
  }

})

.catch(()=>{

 res.send({message:'error'})

})
});


app.post('/add-product',upload.single('productImage'),(req,res)=>{
  console.log(req.body);
  console.log(req.file);
  return;
})








const PORT=8080;
app.listen(PORT,()=>{
    console.log(`app listening on port ${PORT}`);
})
