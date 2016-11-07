    var database = firebase.database();

    $("#submit").on("click",function(){
                    
        var train = {
            name: $("#trainName").val().trim(),
            destination: $("#destination").val().trim(),
            frequency: $("#frequency").val().trim(),
            nextArrival: $("#nextArrival").val().trim()
        };
        
            database.ref().push(train);

        
            database.ref().on("child_added", function(childSnapshot){
// debugger;
            $('#myTable').find("tbody").append('<tr> <td>'+childSnapshot.val().name+'</td> <td>'+childSnapshot.val().destination+'</td><td>'+childSnapshot.val().frequency+'</td><td>'+'NA'+'</td><td>'+childSnapshot.val().nextArrival+'</td><td>'+'NA'+'</td></tr>');
            
            // $("#trainName").val();
      //       $("#destination").val();
      //       $("#frequency").val();
      //       $("#nextArrival").val();

        console.log(name);
        console.log(destination);
        console.log(frequency);
        console.log(nextArrival);


    }); return false;

        var tFrequency = 3;
        var firstTime = "03:30"; // Time is 3:30 AM

        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTime,"hh:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % tFrequency;
        console.log(tRemainder);

        // Minute Until Train
        var tMinutesTillTrain = tFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes")
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"))
            

    });

            


    });