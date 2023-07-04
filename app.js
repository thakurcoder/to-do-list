const express = require("express");
const bodyparser = require("body-parser");
const { urlencoded } = require("body-parser");


const app = express();
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.static("public"));
app.set('view engine','ejs');

let items = [];
let works = []

app.get("/",(req,res)=>{
    let today = new Date();
    let option = {
        weekday:'long',
        day:'numeric',
        month:'long'
    };
    let day = today.toLocaleDateString("en-US",option);
    res.render("list",{listtitle:day,newitems:items});
    
    
})

app.get("/work",(req,res)=>{
    res.render("list",{listtitle:"work list",newitems:works})
})

app.post("/work",(req,res)=>{
    let item = req.body.nexttask;
    // works.push(item)
    res.redirect("/work")
})
app.post("/",(req,res)=>{
    // console.log(req.body)
    let item = req.body.nexttask;
    if(req.body.list=="work"){
        works.push(item)
        res.redirect("/work")
    }else{
    

    items.push(item);

    res.redirect("/")
    }

})



app.listen(5000,()=>{
    console.log("server is running");
})