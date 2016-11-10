$(document).ready(function(){

  var config = {
    apiKey: "AIzaSyAn8dPfCC0DunH_6bqlIuC0Xhgl3SAcr3c",
    authDomain: "trainlist-9a5cf.firebaseapp.com",
    databaseURL: "https://trainlist-9a5cf.firebaseio.com",
    storageBucket: "trainlist-9a5cf.appspot.com",
    messagingSenderId: "567204470332"
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
              nextArrival: nextArrival
          })

            $("#trainName").val("");
            $("#destination").val("");
            $("#frequency").val("");
            $("#nextArrival").val("");

            return false;
    })

        
        database.ref().on("child_added", function(childSnapshot){
            // finds requency of train
        var fireFrequency = childSnapshot.val().frequency;
            // push back a year
        var firstTime = moment(childSnapshot.val().nextArrival, "hh:mm").subtract(1, "years");
        var trainTime = moment(firsTime).format("HH:mm");
        var currentTime = moment();
        
        var timeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
        var firstTimeMinutes = moment().diff(moment(timeConverted), "minutes");
        var trainRemainder = firstTimeMinutes % fireNextArrival;

        var minutesToTrain = fireFrequency - trainRemainder;

        var nextTrain = moment().add(minutesToTrain, "minutes").format("hh:mm");

        $("#trainTable > tbody").append('<tr> <td>'+ childSnapshot.trainName +'</td> <td>'+ childSnapshot.destination+'</td><td>'+ childSnapshot.frequency+'</td><td>'+ childSnapshot.nextTrain +'</td><td>'+ childSnapshot.nextArrival +'</td><td>'+'NA'+'</td></tr>');
   },function(errorObject){
    console.log("Error handle: " + errorObject.code);
   })


    //refreashes train data every minute
setInterval(function(){
    location.reload();
  }, 60000)

});
