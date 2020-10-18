var express=require('express');
var app=express();
var port=process.env.PORT || 5000;
var bodParser=require('body-parser');
var mongo=require('mongodb');
var MongoClient=mongo.MongoClient;
var morgan=require('morgan')
var mongourl="mongodb+srv://M-Swathi-31:M-Swathi-21@cluster0.tu5bc.mongodb.net/edurekaintern?retryWrites=true&w=majority";
var cors=require('cors');
var db;
app.use(cors());
app.use(bodParser.urlencoded({extended:true}));
app.use(bodParser.json())
app.use(morgan('tiny'))
app.get('/api',(req,res)=>{
    res.send("Api is working")
})
app.get('/',(req,res)=>{
    res.send(`<a href="http://localhost:5000/restaurant" target="_blank">Restaurant</a><br/> <a href="http://localhost:5000/location" target="_blank">Location</a><br/> <a href="http://localhost:5000/cuisine" target="_blank">Cuisine</a><br/> <a href="http://localhost:5000/mealtype" target="_blank">Mealtype</a><br/><a href="http://localhost:5000/orders" target="_blank">Orders</a>`)
})
//city
app.get('/location',(req,res)=>{
    db.collection('city').find({}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})
//mealtype
app.get('/mealtype',(req,res)=>{
    db.collection('mealtype').find({}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})
//cuisine
app.get('/cuisine',(req,res)=>{
    db.collection('cuisine').find({}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})
//restaurants
app.get('/restaurant',(req,res)=>{
    var query={};
    if(req.query.city && req.query.mealtype){
        query={city:req.query.city,"type.mealtype":req.query.mealtype}
    }
    else if(req.query.city){
        query={city:req.query.city}
    }else if(req.query.mealtype){
        query={"type.mealtype":req.query.mealtype}
    }
    else{
        query={}
    }
    db.collection('restaurants').find(query).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})
//place order
app.post('/placeorder',(req,res)=>{
    console.log(req.body)
    db.collection('orders').insert(req.body,(err,result)=>{
        if(err) throw err;
        res.send('Order placed')
    })
})
//orders
app.get('/orders',(req,res)=>{
    db.collection('orders').find({}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

// restaurant details
app.get('/restaurantdetails/:id',(req,res)=>{
    var query={_id:req.params.id}
    db.collection('restaurants').find(query).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})
//restaurants on meal type
app.get('/restaurant/:mealtype',(req,res)=>{
    var query={};
    if(req.query.cuisine){
        query={"type.mealtype":req.params.mealtype,"Cuisine.cuisine":req.query.cuisine}
    }else if(req.query.city){
        query={"type.mealtype":req.params.mealtype,city:req.query.city}
    }else if(req.query.lcost && req.query.hcost){
        query={"type.mealtype":req.params.mealtype,cost:{$lt:Number(req.query.hcost),$gt:Number(req.query.lcost)}}
        console.log(query)
    }
    else{
        query={"type.mealtype":req.params.mealtype}
    }
    db.collection('restaurants').find(query).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})
MongoClient.connect(mongourl,(err,connection)=>{
    if(err) throw err;
    db=connection.db("edurekaintern") 
    app.listen(port,(err)=>{
        if(err) throw err;
        console.log(`Server is running on port ${port}`)
    })
})