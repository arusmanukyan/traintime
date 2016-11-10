$(document).ready(function(){

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCbhKJpmqH5vCZ_WEutSNsgMsZRSRIpn1g",
    authDomain: "emplyeedatabase.firebaseapp.com",
    databaseURL: "https://emplyeedatabase.firebaseio.com",
    storageBucket: "emplyeedatabase.appspot.com",
    messagingSenderId: "501638414505"
  };
  firebase.initializeApp(config);

      var database = firebase.database();

    $("#submit").on("click",function(){
                    
            var trainName = $("#trainName").val().trim();
            var destination = $("#destination").val().trim();
            var frequency = $("#frequency").val().trim();
            var nextArrival = $("#nextArrival").val().trim();

            database.ref().push({
              trainName: trainName,
              destination: destination,
              frequency: frequency,
              nextArrival: nextArrival,
          })

            $("#trainName").val("");
            $("#destination").val("");
            $("#frequency").val("");
            $("#nextArrival").val("");

            return false;
    });

        
        database.ref().on("child_added", function(childSnapshot){
            // finds requency of train
        var fireFrequency = childSnapshot.val().frequency;
            // push back a year
        var firstTime = moment(childSnapshot.val().nextArrival, "hh:mm").subtract(1, "years");
        var trainTime = moment(firstTime).format("HH:mm");
        var currentTime = moment();
        
        var timeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
        var firstTimeMinutes = moment().diff(moment(timeConverted), "minutes");
        var trainRemainder = firstTimeMinutes % nextArrival;
        
        var minutesToTrain = fireFrequency - firstTimeMinutes;
        var nextTrain = moment().add(minutesToTrain, "minutes").format("hh:mm");
        

        $("#trainTable").append("<tr><td>"+ childSnapshot.val().trainName + "</td><td>"+ childSnapshot.val().destination + "</td><td>" + childSnapshot.val().frequency + "</td><td>" + trainTime + "</td><td>" + nextTrain + "</td></tr>");

        console.log(trainName)

   },function(errorObject){
    console.log(errorObject.code);
   })


    //refreashes train data every minute
setInterval(function(){
    location.reload();
  }, 60000);

});
