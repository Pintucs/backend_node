const dotenv = require("dotenv")
dotenv.config()
const express=require("express");
const app=express();
const User=require('./models/dataModel')
const path=require("path")
const PORT=process.env.PORT || 4000


require("./connection/bdConnection.js")


// connections print
const mongoose=require("mongoose");
const connection=mongoose.connection;
connection.once('open',(req,resp)=>{
    console.log("connection seccessfull ")
})




// insert html file (insert.ejs) in browser
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use("/css",express.static(path.join(__dirname,'node_modules/bootstrap/dist/css')))
app.use("/js",express.static(path.join(__dirname,'node_modules/bootstrap/dist/js')))






//show data page
app.get("/",(res,resp)=>{
    User.find({},(error,result)=>{
    resp.render('show',{user:result})
    })
});





// show insert page
app.get("/insert",(req,res)=>{
    res.render("insert")
})





// post data
app.post("/addData",async(req,res)=>{
    const newData= new User({
        name:req.body.name,
        gmail:req.body.gmail,
        password:req.body.password
    })
   newData.save(()=>{
    res.redirect("/")
   })
})




// //show data using id in edit.ejs
app.get('/edit/:id', (req,res)=>{
    User.findById(req.params.id,(error,result)=>{
        res.render("edit",{user:result})
    })
})






//update data
app.post('/update/:id',async (req,res)=>{
    await User.findByIdAndUpdate(req.params.id,req.body)
    res.redirect('/')
})






//delete data
app.get('/delete/:id',async (req,res)=>{
    await User.findByIdAndDelete(req.params.id)
    res.redirect('/')
})




app.listen(PORT); 