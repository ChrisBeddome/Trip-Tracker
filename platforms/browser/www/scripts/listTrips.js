firebaseInit();

//Button functionality
document.getElementById("homeBtn").addEventListener("click", homeBtn);

function homeBtn(){
    document.getElementById("homeBtn").style.backgroundColor = "#fff78a";
    window.location.href="home.html"; 
}

//page initialize
//use setTimeout to ensure firebase is initialized before trying to use its methods
setTimeout(init, 1000);

function init() { 

    var ref = firebase.database().ref("Group 20/Team Data/" + firebase.auth().currentUser.uid + "/trips");
    ref.once("value").catch(function (error) {
        generateError(error.message);
    }).then(function (data) {
        if (!data.exists()) {
            generateError("Database Error");
            return;
        }

        //data.val() contains object containing all user trips
        var trips = data.val();

        if (trips === "empty") {
            generateError("No trips to display");
            return
        }

        //loop over trips object and generate an html li element
        for (prop in trips) {
            if (trips.hasOwnProperty(prop)) {

                (function() {
                    var name = prop;
                    list = document.getElementById("tripList");
                    var li = document.createElement("li");
                    // li.setAttribute("id", "li_" + prop);
                    li.textContent = name;
                    li.addEventListener("click", function () {
                    window.location.href = "viewTrip.html?name=" + name;
                    });
    
                    list.appendChild(li);
    
                })();
            }
        }

    });

}

//Error Message
function generateError(message) {
    document.getElementById("errorMessage").textContent = message;
}