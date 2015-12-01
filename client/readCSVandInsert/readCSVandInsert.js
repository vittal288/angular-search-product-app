//******************************************************************************************
var csv       = require('ya-csv');
var mysql     = require('mysql');
var looger    = require('../../logs/logger');
var fs        = require('fs');
var configs   = require('../../configs/config');
//******************************************************************************************
var sHost     = configs.params.db.host,
    sUser     = configs.params.db.user,
    sPassword = configs.params.db.password,
    sDatabase = configs.params.db.database;

var readCSVandInsertToDB = function () {
    var connection = mysql.createPool({
      host: sHost,
      user: sUser,
      password: sPassword,
      database: sDatabase,
      multipleStatements: true
    });

    this.clearDataBase = function(){
         //delQuery1 = "SET SQL_SAFE_UPDATES = 0";
         delQuery5 = "delete from tbl_offer";
         delQuery4 = "delete from tbl_seller";
         delQuery3 = "delete from tbl_product";

         delQuery2 = "delete from tbl_product_offer";
         delQuery1 = "delete from tbl_seller_product";
         connection.query(delQuery1 + ";" + delQuery2 + ";" + delQuery3 + ";"+ delQuery4 + ";"+ delQuery5, function (err, results) {
             if (err) throw err;
             //console.log('successfully deleted all tables data');
         });

         resetQuery3 = "alter table tbl_offer AUTO_INCREMENT = 1";
         resetQuery2 = "alter table tbl_seller AUTO_INCREMENT = 1";
         resetQuery1 = "alter table tbl_product AUTO_INCREMENT = 1";
         connection.query(resetQuery1 + ";" + resetQuery2 + ";" + resetQuery3, function (err, results) {
             if (err) throw err;
             console.log('successfully deleted all tables data');
         });
    },
    //public method
    this.init = function () {
        /*var _self = this;
        reader = csv.createCsvFileReader('./csv_file/csv_data.csv', {
            'separator': '',
            'quote': '',
            'escape': '',
            'comment': '#',
        });

        var writer = new csv.CsvWriter(process.stdout);
        reader.addListener('data', function (CSVdata) {
          insertIntoDB(CSVdata);

          console.log(CSVdata);
        });*/

        var fs = require('fs');
        var array = fs.readFileSync('client/csv_file/csv_data.csv').toString().split("\n");
        var i =1;
        iLoopLen = array.length-1;
        for(var i=1;i<iLoopLen;i++){
          var sRow = array[i];
          insertIntoDB([sRow]);
        }
    };

    //private methods
    var insertIntoDB = function (readCSVObj) {
       //console.log('DATA-->' , readCSVObj);
        var _databasetable_product = "tbl_product",
            _databasetable_seller = "tbl_seller",
            _databasetable_offer = "tbl_offer",
            _databasetable_product_offer = "tbl_product_offer",
            _databasetable_seller_product = "tbl_seller_product";


        //str.replace(/\'/g, '####') replacing sinlge quote charactor with #### to avoid error in SQL syntax
            var arrCSVData = readCSVObj.toString().replace(/\'/g, '####').split(','),
            //A to I
            tbl_product_info = arrCSVData.slice(0, 9).join(),
            //J to N
            tbl_seller_info = arrCSVData.slice(9, 14),
            //O to R
            tbl_offer_info = arrCSVData.slice(14, 18);

        //connection.connect();

        //PRODUCT TABLE
        var tbl_product_str = addSingleQuotes(tbl_product_info.toString());
        var query1 = "insert into " + _databasetable_product + " values(''," + tbl_product_str + ")";
        //logger.info('\n READ CSV and INSERT tbl_product_str  \n', query1);

        //SELLER TABLE
        var tbl_seller_str = addSingleQuotes(tbl_seller_info.toString());
        var query2 = "insert into " + _databasetable_seller + " values(''," + tbl_seller_str + ")";
        //logger.info('\n READ CSV and INSERT tbl_seller_str  \n', query2);

        //OFFER TABLE
        var tbl_offer_str = addSingleQuotes(tbl_offer_info.toString());
        var query3 = "insert into " + _databasetable_offer + " values(''," + tbl_offer_str + ")";
        //logger.info('\n READ CSV and INSERT tbl_offer_str  \n', query3);

        //executeing multiple queries in single shot by enabling multipleStatements=true in  MYSQL create connection config
      /*  connection.query(query1 + ";" + query2 + ";" + query3 + ";", function (err, results) {
            if (err) throw err;
            console.log(results[0].insertId, results[1].insertId, results[2].insertId);
            //insertRowIds(results[0].insertId, results[1].insertId, results[2].insertId);
        });*/

        //ultering asynchronus flow of nodejs MYSQL component...
        var arrRowIds = {};
        connection.query(query1, function (err, results) {
            if (err) throw err;
            arrRowIds.prodID=results.insertId;
            //it is not possible to find out the length of an object , so using object.keys JS's method to calculate lenght of an object
            if(Object.keys(arrRowIds).length===3)
              insertRowIds(arrRowIds);
        });

        connection.query(query2, function (err, results) {
            if (err) throw err;
            arrRowIds.sellerID=results.insertId;
            if(Object.keys(arrRowIds).length===3)
              insertRowIds(arrRowIds);
        });

        connection.query(query3, function (err, results) {
            if (err) throw err;
            arrRowIds.offerID=results.insertId;
            if(Object.keys(arrRowIds).length===3)
              insertRowIds(arrRowIds);
        });




        //private methods
        var insertRowIds = function (oData) {
            console.log('IDs ', oData.prodID + "---" + oData.sellerID + "-----" + oData.offerID);
            var query4 = "insert into " + _databasetable_product_offer + " values(" + oData.prodID + "," + oData.offerID + ")";
            var query5 = "insert into " + _databasetable_seller_product + " values(" + oData.sellerID + "," + oData.prodID + ")";

            connection.query(query4 + ";" + query5, function (err, results) {
                if (err) throw err;

            });
            //logger.info('\n READ CSV and INSERT _databasetable_product_offer  \n', query4);
            //logger.info('\n READ CSV and INSERT _databasetable_seller_product \n', query5);
        };

        //connection.end();
    };

    //private methods
    var addSingleQuotes = function (str) {
        var tempArr = str.split(",");
        var retStr = "";
        for (var i = 0; i < tempArr.length; i++) {
            retStr = retStr + "'" + tempArr[i] + "',";
        }
        return retStr.substr(0, retStr.length - 1);
    }
};
//******************************************************************************************
module.exports = readCSVandInsertToDB;
