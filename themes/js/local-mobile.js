var db;
var dbCreated = false;
var id;
var uuid;
var value;
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
// alert('ready');
    // navigator.geolocation.getCurrentPosition(onSuccess, onError);
    navigator.geolocation.getCurrentPosition(onSuccess, onError);

    db = window.openDatabase("TotalConnections", "1.0", "TotalConnections", 200000);
    var firstrun = window.localStorage.getItem("runned");
    if ( firstrun == null ) {
      //  setTimeout(function(){ $('.lnklogin').click(); }, 2000);
        populateDB();
    }
    else {
      //  setTimeout(function(){$('.lnkdashboard').click(); }, 2000);
        GetUserDetails();

    }

    uuid=device.uuid;






}
// onSuccess Callback
// This method accepts a Position object, which contains the
// current GPS coordinates
//
var onSuccess = function(position) {
 //   $('#HFLatitude').val(position.coords.latitude);
  //  $('#HFLongitude').val(position.coords.longitude);

  //  RemoveLocationNotification();
};

// onError Callback receives a PositionError object
//
function onError(error) {
 //   setTimeout(function() {
 //       alert('Please Enable Location Access for better service.');
 //   }, 4000);
   // SetLocationNotification();
}




// onSuccess Callback
//   This method accepts a `Position` object, which contains
//   the current GPS coordinates
//
function onSuccess2(position) {

    // alert('Latitude: '  + position.coords.latitude);
  //  $('#HFLatitude').val(position.coords.latitude);
  //  $('#HFLongitude').val(position.coords.longitude);
 //   RemoveLocationNotification();
}

// onError Callback receives a PositionError object
//
function onError2(error) {
 //   SetLocationNotification();
}
// Options: throw an error if no update is received every 30 seconds.
//
// var watchID = navigator.geolocation.watchPosition(onSuccess2, onError2, { timeout: 30000 });


function populateDB(data){
    db.transaction(
        function(tx) {
            var sql = "DROP TABLE IF EXISTS tt_connections";
            tx.executeSql(sql);
            sql = " CREATE TABLE IF NOT EXISTS tt_connections ( "+
                "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                "username VARCHAR(200), " +
                "user_id INTEGER(20)" +
                "station_url VARCHAR(200)" +
                "role VARCHAR(200)" +
                ")";
            tx.executeSql(sql);


        },
        function(error)
        {
            console.log(error);
            alert('An error has occured. Please try again and check your internet connection');
        }
    );
}



function GetUserDetails(){
    db.transaction(function(transaction) {
        transaction.executeSql("select * from tt_connections", [],
            function(tx, result) { // On Success
                var len = result.rows.length;
                for (var i=0; i<len; i++)
                {
                    var row = result.rows.item(i);
                    $('#s_user_name').val(row.username);
                    $('#s_user_id').val(row.user_id);
                    $('#s_station_url').val(row.station_url);
                    $('#s_role').val(row.role);
                }
            },
            function(error)
            {

            });

    });	//transaction

} // GetUserDetails

function transaction_error(tx, error) {
    console.log('Error Message');
    console.log(error);
    alert("Database Error: " + error);
}

function SaveUserDetails(username,user_id,station_url,role){

    var sql = "insert into tt_connections(username,user_id,station_url,role) values('"+username+"','"+user_id+"','"+station_url+"','"+role+"')";
    db.transaction(
        function(tx) {
            tx.executeSql(sql);
            window.localStorage.setItem("runned", "1");
        },
        function(error)
        {
            console.log(error);
            alert('An error has occured. Please try again and check your internet connection');
        }
    );
}
