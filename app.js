var fs = require('fs');
var async = require('async');
var exec = require('sync-exec');

fs.readFile('coinlist.json', 'utf8', function (err, data) {
    if (err) throw err; 
    
    //Parse response from json file 
    var obj = JSON.parse(data);

    //Save BaseImageUrl for later use  
    var baseUrlImage = obj.BaseImageUrl;

    //Var used to store all the coin's info
    var dataCoins = obj.Data;

    //Prepare array for all the cryptocurrency
    var arrayCurrencies = [];

    //Loop throught all currencies
    Object.keys(dataCoins).forEach(function(key) {
        
        var thisObj = dataCoins[key];
        //Replace the * char in the currency's symbol (I don't know why some currency has got the * char in the symbol)
        var symbol = (thisObj.Symbol).replace(/\*/g,'');
        var coinName = thisObj.CoinName;
        var fullName = thisObj.FullName;

        if(thisObj.hasOwnProperty('ImageUrl')){  		
        
          //Save extension of the image file for later use
	        var extArray = thisObj.ImageUrl.split(".");
	        var ext = extArray[extArray.length-1];

	        var coinImgeUrl = baseUrlImage+thisObj.ImageUrl;

          //Create custom object to insert in the arrayCurrencies array
	        var objThisValuta = {};
        		objThisValuta.symbol = symbol;
        		objThisValuta.ext = ext;
        		objThisValuta.url = coinImgeUrl;
            objThisValuta.coin_name = coinName;
            objThisValuta.full_name = fullName;
	        arrayCurrencies.push(objThisValuta);

       	}
    });

    //This is the string that I want to save as json for later use
    var jsonObjectToSave = '{"currencies":[';
    async.each(arrayCurrencies,
      function(item, callback){
        
        console.log("Download " + item.url);
        //Save the cryptocurrency's image in the images dir
        exec('/usr/bin/wget -c '+item.url +' -O ./images/'+item.symbol+'.'+item.ext);
        
        jsonObjectToSave += '{"coin_name": "' + item.coin_name + '",'+
                            '"full_name":"' + item.full_name+ '",'+
                            '"path":"images/' + item.symbol+ '.'+ item.ext + '",'+
                            '"symbol":"' + item.symbol + '"},';    

        callback();
      },
      function(err){

        jsonObjectToSave = jsonObjectToSave.substring(0,jsonObjectToSave.length-1);
        jsonObjectToSave += ']}';

        fs.writeFile("organized-cryptocurrency.json",jsonObjectToSave,function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("File Saved - Done!");
        });

      }
    );

});