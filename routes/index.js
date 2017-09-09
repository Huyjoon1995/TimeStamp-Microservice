var express = require('express');
var moment = require('moment');
var router = express.Router();

/* GET home page. */
/* / is home directory*/
router.get('/', function(req, res) {
  res.render('index');
});
/*: time any time a router has a colon with a variable it calls parameter*/
router.get('/:time',function(req,res){
  /*if this is a number*/
  function unixToNatureTime(unix){
    var date = new Date(unix * 1000);
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    /*due to getMonth() will start from 0 to 11 just like an array so when getMonth() executes it will return a number and we have a perpfect match
    with the position in the array*/
    var month = months[date.getMonth()];
    var day = date.getDate();
    var year = date.getFullYear();
    var natureDate = month + " " + day + ", " + year;
    return natureDate;
  }

  /*if the request is a number(means unix)*/
  if(!isNaN(req.params.time)){
    /* convert uinx time to nature time*/
    var result = unixToNatureTime(req.params.time);
    var data = { unix: req.params.time, natural: result};
    res.json(data);
  }
  else{
    var natural = new Date(req.params.time);
    if(!isNaN(natural)){
      var unix = natural / 1000;
      var data = { unix: unix, natural: req.params.time};
      res.json(data);
    }
    else{
      var data = { unix: null, natural: null};
      res.json(data);
    }
  }
});
module.exports = router;
