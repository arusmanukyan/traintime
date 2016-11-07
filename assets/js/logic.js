    var database= firebase.database();

    $("#submit").on("click",function(){
            
        
        var train= {
            name: $("#trainName").val().trim(),
            destination: $("#destination").val().trim(),
            frequency: $("#frequency").val().trim(),
            nextArrival: $("#nextArrival").val().trim()
        };
        
            database.ref().on("child_added", function(childSnapshot){
// debugger;

            $("#trainList").append('<tr> <td>'+childSnapshot.val().name+'</td> <td>'+childSnapshot.val().destination+'</td><td>'+childSnapshot.val().frequency+'</td><td>'+'NA'+'</td><td>'+childSnapshot.val().nextArrival+'</td><td>'+'NA'+'</td></tr>');

            $("#trainName").val();
            $("#destination").val();
            $("#frequency").val();
            $("#nextArrival").val();

        console.log(name);
        console.log(destination);
        console.log(frequency);
        console.log(nextArrival);

        database.ref().push(train);
    
    });return false;

            


    });