const express = require("express");
const app = express();
const cors = require("cors");
// const fetch = require("node-fetch");
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: true })

app.use(express.static("dist"));
app.use(cors());   


var collectionModel = require('./mongoose');

app.get("/", (req, res) => {
  res.send("testing the server for the course MERN essentials ...");
  res.end();
});

app.get("/getuserDetails", async (req, res) => {

  var findRecord = collectionModel.find({uname:"test1@gmail.com"});
    
  findRecord.exec(async function(err,data){
    if(err) throw err;
    if(data.length == 0 )
      res.send("bye")
    else{

      res.send(data[0]);
    }
  });
});


app.post("/addNewBucket", urlencodedParser,async (req, res) => {
  // let bucket_name = JSON.parse(req.body.data);
  let bucketName = req.body.bucketName;
  console.log(bucketName);  
  let currentBucketList = [];


  var findRecord = collectionModel.find({uname:"test1@gmail.com"});
    
  findRecord.exec(async function(err,data){
    if(err) throw err;
    if(data.length == 0 )
      res.send("no data")
    else{
      currentBucketList = data[0].buckets
      // console.log("1");
      // console.log(currentBucketList)
      let newObject = {name:bucketName, cards:[]}
      // console.log("2");
      currentBucketList.push(newObject);

      var addBucket = collectionModel.updateOne({uname:"test1@gmail.com"},{buckets:currentBucketList})
        addBucket.exec(function(err,data){
          if(err) throw err;
          res.send("bucket added successfully");
        });

      // console.log(currentBucketList)
    }
  });
});


app.post("/addNewCard", urlencodedParser,async (req, res) => {
  // let bucket_name = JSON.parse(req.body.data);
  let bucketName = req.body.bucketName
  let cardName = req.body.cardName;
  let cardLink = req.body.cardLink;
  let index;

  // console.log(req.body);  
  let currentBucketList = [];
  let newCardArray = [];


  var findRecord = collectionModel.find({uname:"test1@gmail.com"});
    
  findRecord.exec(async function(err,data){
    if(err) throw err;
    if(data.length == 0 )
      res.send("no data")
    else{
      currentBucketList = data[0].buckets


      currentBucketList.forEach((buckets, ind)=>{
        if(buckets.name == bucketName)
        {
          index = ind
          newCardArray = buckets.cards
          let newObj = {name:cardName, link:cardLink}
          newCardArray.push(newObj);
        }
      })
      // console.log(newCardArray);
      currentBucketList[index].cards = newCardArray
      // console.log(currentBucketList);
      // currentBucketList.push(newObject);

      var addBucket = collectionModel.updateOne({uname:"test1@gmail.com"},{buckets:currentBucketList})
        addBucket.exec(function(err,data){
          if(err) throw err;
          res.send("bucket added successfully");
        });

      // console.log(currentBucketList)
    }
  });
  
});

app.post("/moveCard", urlencodedParser,async (req, res) => {
  // let bucket_name = JSON.parse(req.body.data);
  let fromBucket = req.body.fromBucketName
  let toBucket = req.body.toBucketName
  let cardName = req.body.cardName
  let cardLink = req.body.cardLink

  // console.log(fromBucket);
  // console.log(toBucket);  
  // console.log(cardName);
  // console.log(cardLink);


  let fromindex, toindex;

  // console.log(req.body);  
  let currentBucketList = [];



  var findRecord = collectionModel.find({uname:"test1@gmail.com"});
    
  findRecord.exec(async function(err,data){
    if(err) throw err;
    if(data.length == 0 )
      res.send("no data")
    else{
      currentBucketList = data[0].buckets


      currentBucketList.forEach((buckets, ind)=>{
        if(buckets.name == fromBucket)
        {
          fromindex = ind
          fromBucketCardsArray = buckets.cards
          
          // delete the card object with card name == cardName and cardLink == cardLink
          fromBucketCardsArray.forEach((card,indd)=>{
            if(card.name == cardName && card.link == cardLink)
            {
                fromBucketCardsArray.splice(indd,1);
            }
          })
        }

        if(buckets.name == toBucket)
        {
          toindex = ind
          toBucketCardsArray = buckets.cards
          let newObj = {name:cardName, link:cardLink}
          toBucketCardsArray.push(newObj);
        }
      })
  
      currentBucketList[toindex].cards = toBucketCardsArray;
      currentBucketList[fromindex].cards = fromBucketCardsArray


      var addBucket = collectionModel.updateOne({uname:"test1@gmail.com"},{buckets:currentBucketList})
        addBucket.exec(function(err,data){
          if(err) throw err;
          res.send("bucket added successfully");
        });

      // console.log(currentBucketList)
    }
  });
  
});



app.post("/updateHistory", urlencodedParser,async (req, res) => {

  let card_name = req.body.cardName
  let cardLink = req.body.cardLink
  let timee  = req.body.time
  let datee = req.body.date



  let updatedHistory = [ ]

  var findRecord = collectionModel.find({uname:"test1@gmail.com"});
    
  findRecord.exec(async function(err,data){
    if(err) throw err;
    if(data.length == 0 )
      res.send("no data")
    else{
      updatedHistory = data[0].history
      let newObj = {link:cardLink, cardName:card_name, time:timee, date:datee}
      updatedHistory.push(newObj);

      var addBucket = collectionModel.updateOne({uname:"test1@gmail.com"},{history:updatedHistory})
        addBucket.exec(function(err,data){
          if(err) throw err;
          res.send("bucket added successfully");
        });

      // console.log(currentBucketList)
    }
  });
  
});

app.post("/editCard", urlencodedParser,async (req, res) => {

  let bucketName  = req.body.bucket_name
  let oldCardName = req.body.card_name
  let newCardName = req.body.new_card_name
  let oldCardLink  = req.body.card_link
  let newCardLink = req.body.new_card_link

  // console.log(oldCardName)
  // console.log(oldCardLink)
  // console.log(newCardName)
  // console.log(newCardLink)



  let updatedHistory = [ ]
  let cardsArray = []

  let index1, index2
  var findRecord = collectionModel.find({uname:"test1@gmail.com"});
    
  findRecord.exec(async function(err,data){
    if(err) throw err;
    if(data.length == 0 )
      res.send("no data")
    else{
      currentBucketList = data[0].buckets
      currentBucketList.forEach((bucket, ind)=>{
        if(bucket.name == bucketName)
        {
          index1 = ind;
          cardsArray = bucket.cards
          cardsArray.forEach((card, ind2)=>{
            if(card.name == oldCardName && card.link==oldCardLink)
            {
              // console.log(cardsArray)
              cardsArray[ind2].name = newCardName
              cardsArray[ind2].link = newCardLink
              currentBucketList[ind].cards = cardsArray
              // console.log(cardsArray)
            }
          })
        }
      })
      // console.log(currentBucketList[0])
      var updateBucket = collectionModel.updateOne({uname:"test1@gmail.com"},{buckets:currentBucketList})
        updateBucket.exec(function(err,data){
          if(err) throw err;
          res.send("card updated successfully");
        });

      // console.log(currentBucketList)
    }
  });
  
});


app.post("/deleteCard", urlencodedParser,async (req, res) => {
  // let bucket_name = JSON.parse(req.body.data);
  let BucketName =  req.body.bucket_name
  let cardName = req.body.card_name
  let cardLink = req.body.card_link

  // console.log(fromBucket);
  // console.log(toBucket);  
  console.log(cardName);
  console.log(cardLink);
  console.log(BucketName);


 
  let currentBucketList = [];
  let cardsArray= [ ]



  var findRecord = collectionModel.find({uname:"test1@gmail.com"});
    
  findRecord.exec(async function(err,data){
    if(err) throw err;
    if(data.length == 0 )
      res.send("no data")
    else{
      currentBucketList = data[0].buckets


      currentBucketList.forEach((buckets, ind)=>{
        if(buckets.name == BucketName)
        {
          cardsArray = buckets.cards;
          
          // delete the card object with card name == cardName and cardLink == cardLink
          cardsArray.forEach((card,indd)=>{
            if(card.name == cardName && card.link == cardLink)
            {
                cardsArray.splice(indd,1);
                currentBucketList[ind].cards = cardsArray
            }
          })
        }
      })
      var updateBucket = collectionModel.updateOne({uname:"test1@gmail.com"},{buckets:currentBucketList})
        updateBucket.exec(function(err,data){
          if(err) throw err;
          res.send("bucket added successfully");
        });

      // console.log(currentBucketList)
    }
  });
  
});

app.listen(4000, () => {
  console.log("server is running at on port 4000");
});
