//firebase initialize
firebaseInit();
//-----------------------------------------------------


//---------New Trip
document.getElementById("newTripTile").addEventListener("click", newTrip);

function newTrip(){

  document.getElementById("newTripTile").style.backgroundColor = "rgba(0, 0, 0, 0.5";

  window.location.href="newTrip.html";
}


//---------View Trips
document.getElementById("viewTripsTile").addEventListener("click", viewTrips);

function viewTrips(){

  //document.getElementById("viewTripsTile").style.backgroundColor = "rgba(0, 0, 0, 0.5";

  window.location.href="listTrips.html";
} 


//---------Settings
document.getElementById("settingsTile").addEventListener("click", settingsTile);

function settingsTile() {

  document.getElementById("overlay").style.display = "block";
  document.getElementById("settingsIcon").style.display = "none";

  setTimeout(revertOverlay, 4000);

  function revertOverlay() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("settingsIcon").style.display = "block";
    
  }

  //window.location.href="";
}


//---------Logout
document.getElementById("logoutTile").addEventListener("click", logout);

function logout() {

document.getElementById("logoutTile").style.backgroundColor = "rgba(0, 0, 0, 0.5";


  firebase.auth().signOut().then(function() {
    window.location.href="login.html";
  });
}

