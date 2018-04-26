function firebaseInit() {
  var firebaseConfig = {
    apiKey: "AIzaSyDGpgkG0ibI-7kjF68RF8AgsuyH_w20EFc",
    authDomain: "triptracker-93fa9.firebaseapp.com",
    databaseURL: "https://triptracker-93fa9.firebaseio.com",
    projectId: "triptracker-93fa9",
    storageBucket: "triptracker-93fa9.appspot.com",
    messagingSenderId: "742263908016"
  };
    
  firebase.initializeApp(firebaseConfig);
}