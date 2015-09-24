
/*****************************************BANNER IMAGES *********************************************/
function onFileSelect(item, bannerNo) {
   // showSpin();
   // debugger;
    var file = item.files[0];
    item.value = "";
    var fileReader = new FileReader();
    var sendingObj = {};

    fileReader.onload = function (e) {
        //uploading file image preview
        //$('#imgPreview').attr('src', e.target.result);
        var tempImg = new Image;
        tempImg.src = e.target.result;

        //debugger;
        var len = file.name.split('.').length;
        var fileExt = file.name.split('.')[len-1];

        var Rawbase64Str = this.result;
        sendingObj.base64Data = Rawbase64Str.split(';')[1].split(',')[1];
        //sendingObj.base64Data = e.target.result;
        sendingObj.size = file.size;
        sendingObj.fileName = file.name;
        sendingObj.type = file.type;
        sendingObj.bannerNo = bannerNo;
        sendingObj.fileExt = fileExt;
        sendingObj.imgPreview = e.target.result;
        sendingObj.height = tempImg.height;
        sendingObj.width = tempImg.width;
        //500000 == 0.5 MB
        if (sendingObj.fileExt == "jpg" && sendingObj.width == 730 && sendingObj.height == 300 && sendingObj.size <= 500000) {
             ajaxFileUpload(sendingObj);
        }
        else
        {
            $('#alertSuccessMsg').removeClass('show').addClass('hide');
            $('#alertErrorMsg').removeClass('hide').addClass('show').html("Please Upload Only JPG files with 730px width and 300px height and should less than 0.5 MB or 5000KB");
            hideSpin();
        }

    };
    fileReader.readAsDataURL(file);
}

function ajaxFileUpload(sendingData) {

    $.ajax({
        url: "/client/bnnerFileUpload",
        method: 'POST',
        data: JSON.stringify(sendingData),
        success: function (resp) {
          console.log("SUCCESS" , resp);
        },
        error: function (err) {
          console.log("ERROR while uploading Banner file :" , err);
        }
    });

}
/*****************************************CSV FILE*********************************************/
function clearDataBase(){
  var rtFlg = confirm("Are you sure you want to clear the database ?");
  if(rtFlg){
      $.ajax({
          url: "/client/clearDataBase",
          method: 'GET',
          success: function (resp) {
            console.log("SUCCESS" , resp);
          },
          error: function (err) {
            console.log("ERROR while clearing the database :" , err);
          }
      });
  }
  else{
    //alert('ELSE');
  }
}

function onCSVFileSelect(item) {
    console.log('Item ' , item);
    showSpin();
    var file = item.files[0];
    item.value = "";
    var fileReader = new FileReader();
    var sendingObj = {};

    fileReader.onload = function (e) {

        var len = file.name.split('.').length;
        var fileExt = file.name.split('.')[len - 1];

        var Rawbase64Str = this.result;
        sendingObj.base64Data = Rawbase64Str.split(';')[1].split(',')[1];
        sendingObj.size = file.size;
        sendingObj.fileName = file.name;
        sendingObj.type = file.type;
        sendingObj.fileExt = fileExt;

        if (sendingObj.fileExt == "csv" && sendingObj.size <= 500000) {
            ajaxCSVFileUpload(sendingObj);
        }
        else
        {
            $('#alertSuccessMsg').removeClass('show').addClass('hide');
            $('#alertErrorMsg').removeClass('hide').addClass('show').html("Please Upload Only CSV file and it should be less than 0.5 MB or 5000KB");
            hideSpin();
        }

    };
    fileReader.readAsDataURL(file);
}
//*********************************************************************************
function ajaxCSVFileUpload(sendingData) {

    //invoking expressJS controller to insert
    $.ajax({
        url: "/client/fileUpload",
        method: 'POST',
        data: JSON.stringify(sendingData),
        success: function (resp) {
          console.log("SUCCESS" , resp);
        },
        error: function (err) {
          console.log("ERROR while uploading CSV file :" , err);
        }
    });
}

/*************************************************/
function showSpin() {
    $(".overlay_loading").show();
}
/*************************************************/
function hideSpin()
{
    $(".overlay_loading").hide();
}

/*************************************************/
