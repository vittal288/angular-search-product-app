//load dependcies
var express          = require('express');
var mysql            = require('mysql');
var fs               = require('fs');
var readCSVandInsert = require('../../client/readCSVandInsert/readCSVandInsert');
var looger           = require('../../logs/logger');
var configs          = require('../../configs/config');
var router           = express.Router();
//******************************************************************************
var sHost     = configs.params.db.host,
    sUser     = configs.params.db.user,
    sPassword = configs.params.db.password,
    sDatabase = configs.params.db.database;

var connection = mysql.createConnection({
    host: sHost,
    user: sUser,
    password: sPassword,
    database: sDatabase,
    multipleStatements: true
});
//if(!connection)
connection.connect();
//******************************************************************************
//REST API
router.get('/', function (req,res) {
    res.send('INDEX PAGE');
});
//definging router
//************************************************************************
router.get('/rest-api/fetchDistinctCities', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    //res.send('REST API is running', req.params.id);
    var query = "SELECT tbl_seller.city,tbl_seller.id,tbl_seller.name as retailerName,tbl_product.name,tbl_product.brandName FROM tbl_seller\
                 INNER JOIN tbl_product ON tbl_seller.id=tbl_product.id";

    logger.info('\n MYSQL @@@@@@ fetchDistinctCities \n', query);
    connection.query(query, function (err,rows, fields) {
        if (err) {
            console.error(err);
            res.statusCode = 500;
            res.send({
                result: 'error',
                err: err.code
            });
        }
        res.send({
            result: 'success',
            err: '',
            fields: fields,
            json: rows,
            length: rows.length
        });
        //connection.end();
    });
});

//************************************************************************
//router.get('/rest-api/fetchHomeBrandTilesInfo/cityName/:cityName', function (req, res) {
router.get('/rest-api/fetchHomeBrandTilesInfo/:cityName', function (req, res) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    var cityName = req.params.cityName;
    var vCityName = "'" + cityName.toUpperCase() + "'";

    var query = "select t1.*,t2.*,t2.name as sellerName from tbl_product t1, tbl_seller t2, tbl_seller_product t3 where t1.id = t3.product_id and t2.id = t3.seller_id and t2.city ="+ vCityName +"";
    logger.info('\n MYSQL @@@@@@ fetchHomeBrandTilesInfo \n', query);
    connection.query(query, function (err, rows, fields) {
        if (err) {
            console.error(err);
            res.statusCode = 500;
            res.send({
                result: 'error',
                err: err.code
            });
        }
        res.send({
            result: 'success',
            err: '',
            fields: fields,
            json: rows,
            length: rows.length
        });
        //connection.end();
    });
});

//************************************************************************
//router.get('/rest-api/fetchProductInfoByCity/cityName/:cityName/srchItem/:srchItem', function (req, res) {
router.get('/rest-api/fetchProductInfoByCity/:cityName/:srchItem', function (req, res) {

    //http://localhost:9090/rest-api/fetchProductInfoByCity/cityName/ALL/srchItem/iphone%206
    //logger.log('info', req.path);
    //searchProd?PlaceName/:placeName/srchItem/:srchItem'
    var cityName = req.params.cityName;
    var srchItem = req.params.srchItem

    var vCityName = "'" + cityName.toUpperCase() + "'";
    var vSrchItem = "'" + srchItem.toUpperCase() + "'";
    //res.send(cityName + "----" + srchItem);

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    //res.send('REST API is running', req.params.id);
    //res.send(cityName + "----" + srchItem);
    var query = "";
    if(cityName ==='ALL' || cityName === "")
    {
        query = 'SELECT t.name AS prodName, t.id, t.category, t.desc AS prodDesc, t.brandName, t.price AS originalPrice, t.thumbnail_path, t.city, t.offerPrice from (SELECT t1.name, t1.id, t1.category, t1.desc, t1.brandName, t1.price, t1.thumbnail_path, t2.name as retailerName, t2.city, t3.offerPrice \
                from tbl_product t1, tbl_seller t2, tbl_offer t3, tbl_seller_product t4, tbl_product_offer t5 where t1.id = t4.product_id and t2.id = t4.seller_id and t1.id = t5.product_id and t3.id = t5.offer_id) \
                t where	(t.name = ' + vSrchItem + '	or t.category = ' + vSrchItem + ' or t.retailerName = ' + vSrchItem + ' or t.brandName = ' + vSrchItem + ')';
    }
    else
    {
        query = 'SELECT t.name AS prodName, t.id, t.category, t.desc AS prodDesc, t.brandName, t.price AS originalPrice, t.thumbnail_path, t.city, t.offerPrice from (SELECT t1.name, t1.id, t1.category, t1.desc, t1.brandName, t1.price, t1.thumbnail_path, t2.name as retailerName, t2.city, t3.offerPrice \
                 from tbl_product t1, tbl_seller t2, tbl_offer t3, tbl_seller_product t4, tbl_product_offer t5 where t1.id = t4.product_id and t2.id = t4.seller_id and t1.id = t5.product_id and t3.id = t5.offer_id) t\
                 where	t.city =' + vCityName + ' and (t.name = ' + vSrchItem + ' or t.category = ' + vSrchItem +' or t.retailerName = ' + vSrchItem + ' or t.brandName = ' + vSrchItem + ')';

    }

    logger.info('\n MYSQL @@@@@@ fetchProductInfoByCity \n', query);
    connection.query(query, function (err, rows, fields) {
        if (err) {
            console.error(err);
            res.statusCode = 500;
            res.send({
                result: 'error',
                err: err.code
            });
        }
        res.send({
            result: 'success',
            err: '',
            fields: fields,
            json: rows,
            length: rows.length
        });
    });
});
//************************************************************************
//router.get('/rest-api/fetchDetailedProductInfo/prodId/:prodId', function (req, res) {
router.get('/rest-api/fetchDetailedProductInfo/:prodId', function (req, res) {

    var prodId = req.params.prodId;
    var vProdId = "'" + prodId.toUpperCase() + "'";

    //allow headers for Cross Domain
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    var query = "SELECT tbl_seller.name AS sellerName,tbl_seller.city,tbl_seller.addr,tbl_seller.contactNo, tbl_product.name AS prodName,tbl_product.image_path,tbl_product.thumbnail_path,tbl_product.desc,tbl_product.brandName,tbl_product.price,tbl_offer.name AS offerName,tbl_offer.type,tbl_offer.desc AS offerDesc,tbl_offer.offerPrice\
                 FROM tbl_seller LEFT JOIN tbl_product ON tbl_seller.id=tbl_product.id LEFT JOIN tbl_offer ON tbl_product.id = tbl_offer.id WHERE tbl_product.id =" + vProdId + " ";

    logger.info('\n MYSQL @@@@@@ fetchDetailedProductInfo \n', query);
    connection.query(query, function (err, rows, fields) {
        if (err) {
            console.error(err);
            res.statusCode = 500;
            res.send({
                result: 'error',
                err: err.code
            });
        }
        res.send({
            result: 'success',
            err: '',
            fields: fields,
            json: rows,
            length: rows.length
        });
    });
});

//************************************************************************
router.get('/rest-api/fetchProductDetailsBySearchKeyWord/searchKeyWord/:searchKeyWord', function (req, res) {

    //http://localhost:9090/rest-api/fetchProductDetailsBySearchKeyWord/searchKeyWord/electronics
    var searchKeyWord = req.params.searchKeyWord;
    var vSearchKeyWord = "'" + searchKeyWord.toUpperCase() + "'";

    //allow headers for Cross Domain
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    var query = "select distinct brandName from tbl_product WHERE category =" + vSearchKeyWord +"";

    logger.info('\n MYSQL @@@@@@ fetchProductDetailsBySearchKeyWord \n', query);
    connection.query(query, function (err, rows, fields) {
        if (err) {
            console.error(err);
            res.statusCode = 500;
            res.send({
                result: 'error',
                err: err.code
            });
        }
        res.send({
            result: 'success',
            err: '',
            fields: fields,
            json: rows,
            length: rows.length
        });
    });
});
//************************************************************************
router.get('/rest-api/filterSearchedProducts/brandName/:brandName/cityName/:cityName', function (req, res) {
//router.get('/rest-api/filterSearchedProducts', function (req, res) {
  //console.log(req.params.brandName , req.params.cityName  , req.params.srchItem);
    /*var brandName = req.query.brandName;
    var cityName = req.query.cityName;
    var vCityName = "'" + cityName.toUpperCase()+ "'";*/


    var brandName = req.params.brandName;
    var cityName = req.params.cityName;
    var vCityName = "'" + cityName.toUpperCase()+ "'";



    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    var query = "";
    if (cityName === 'ALL' || cityName === "") {
        query = "SELECT t.name AS prodName, t.id, t.category, t.desc AS prodDesc, t.brandName, t.price AS originalPrice, t.thumbnail_path, t.city, t.offerPrice \
                 from (SELECT t1.name, t1.id, t1.category,t1.desc, t1.brandName, t1.price, t1.thumbnail_path, t2.city, t3.offerPrice from tbl_product t1, tbl_seller t2, tbl_offer t3, tbl_seller_product t4, tbl_product_offer t5\
                 where t1.id = t4.product_id and t2.id = t4.seller_id and t1.id = t5.product_id and t3.id = t5.offer_id) t where	t.brandName in (" + brandName + ")";
    }
    else {
        query = "SELECT t.name AS prodName, t.id, t.category,t.desc AS prodDesc, t.brandName, t.price AS originalPrice, t.thumbnail_path, t.city, t.offerPrice \
                from (SELECT t1.name, t1.id, t1.category,t1.desc, t1.brandName, t1.price, t1.thumbnail_path, t2.city, t3.offerPrice from tbl_product t1, tbl_seller t2, tbl_offer t3, tbl_seller_product t4, tbl_product_offer t5\
                where t1.id = t4.product_id and t2.id = t4.seller_id and t1.id = t5.product_id and t3.id = t5.offer_id) t where	t.city =" + vCityName + " and t.brandName in (" + brandName + ")"

    }

    logger.info('\n MYSQL @@@@@@ filterSearchedProducts \n', query);
    connection.query(query, function (err, rows, fields) {
        if (err) {
            console.error(err);
            res.statusCode = 500;
            res.send({
                result: 'error',
                err: err.code
            });
        }
        res.send({
            result: 'success',
            err: '',
            fields: fields,
            json: rows,
            length: rows.length
        });
    });
});

/***************************ADMIN PANEL OPERATIONS ********************************/
router.get('/admin',function(req,res) {
    var adminPage = process.cwd()+"/client/ui/admin/admin.html";
    //console.log(adminPage);
    res.sendFile(adminPage)
});

//Banner file Upload
router.post('/client/bnnerFileUpload',function(req,res){
   //receieve AJAX query parameter data
    var sData="",oData;
    req.on("data",function(chunk){
      sData+=chunk.toString("utf-8");
    });

  req.on("end",function(chunk){
      oData=JSON.parse(sData);
      var _bannerNo = oData.bannerNo;
      //var fileName  = oData.fileName;
      var _fileName = _bannerNo + ".jpg";

      var _dirPath =process.cwd()+"/client/ui/img/carousel-images/"+_fileName;
      fs.writeFile(_dirPath, new Buffer(oData.base64Data,'base64'), function(err) {
        if(err) {
            return console.log(err);
        }
        else{
          //console.log('file has been uploaded successfully !!!');
          logger.info('\n Banner File Upload :' ,_fileName);
        }
    });
  });
});

//CSV file upload
router.post('/client/fileUpload',function(req,res){
  console.log('I am in client/fileUpload');
  var _fileName = "csv_data.csv";
  var _dirPath =process.cwd()+"/client/csv_file/"+_fileName;
  //receieve AJAX query parameter data
    var sData="",oData;
    req.on("data",function(chunk){
      sData+=chunk.toString("utf-8");
    });

  req.on("end",function(chunk){
      oData=JSON.parse(sData);
      fs.writeFile(_dirPath, new Buffer(oData.base64Data,'base64').toString("utf-8"), function(err) {
        if(err) {
            return console.log(err);
        }
        else {
          logger.info('\n CSV File Upload :' ,_fileName);
          //var readCSV = new readCSVandInsert();
          //readCSV.init();
        }
    });
  });
});

//undefined methods
//************************************************************************
router.get('*', function (req, res) {
    res.status(405).send('Method is not allowed')
});

//export the router module
module.exports = router;
