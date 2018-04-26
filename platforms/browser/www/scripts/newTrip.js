firebaseInit();

document.getElementById("homeBtn").addEventListener("click", homeBtn);
document.getElementById("newTripBtn").addEventListener("click", newTripInit);

function homeBtn(){
    document.getElementById("homeBtn").style.backgroundColor = "#fff78a";
    window.location.href="home.html";
}

//initialzie new trip from user-entered trip name
//generate record in database for trip
function newTripInit(){

    document.getElementById("newTripBtn").style.backgroundColor = "#fff78a";

    var tripName = document.getElementById("newTripName").value;

    if (tripName.length < 1){
        generateError("Must enter trip name.");
        return;
    }

    var uid = firebase.auth().currentUser.uid;
    var ref = firebase.database().ref("Group 20/Team Data/" + uid +"/trips");

    //get the value of ref (returns trips object)
    ref.once("value").catch(function(error) {
        generateError(error.message);
    }).then(function(data) { 
        if (!data.exists()) {
            generateError("Database Error");
            return;
        }
        // if this is first trip added, user/trips set to a string containing "empty" instead of an object
        //we must rewrite the trip field to contain an object full of trips
        if (data.val() === "empty") {

            //trip current has no points, so set to the string "empty"
            var trip = {};
            trip[tripName] = "empty"

            firebase.database().ref("Group 20/Team Data/" + uid + "/trips").set(trip).catch(function(error) {
                generateError(error.message);
            }).then(function(data) {
                window.location.href = "viewTrip.html?name=" + tripName; 
            });

        //if this is not first trip, we can simply push a new trip object into user/trips
        } else {
            ref.child(tripName).set("empty").catch(function(error) {
                generateError(error.message);
            }).then(function(data) {
                window.location.href = "viewTrip.html?name=" + tripName; 
            });
        }
    });
}

function generateError(message){
    document.getElementById("errorMessage").textContent = message;
}



