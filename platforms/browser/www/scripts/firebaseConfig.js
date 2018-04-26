function firebaseInit() {
  // var firebaseConfig = {
  //   apiKey: "AIzaSyDGpgkG0ibI-7kjF68RF8AgsuyH_w20EFc",
  //   authDomain: "triptracker-93fa9.firebaseapp.com",
  //   databaseURL: "https://triptracker-93fa9.firebaseio.com",
  //   projectId: "triptracker-93fa9",
  //   storageBucket: "triptracker-93fa9.appspot.com",
  //   messagingSenderId: "742263908016"
  // };

  var firebaseConfig = {
    apiKey: "AIzaSyD6uonrdf1rL8nC3aiRfUa14zUqYra2es8",
    authDomain: "roadtrip-1d5b1.firebaseapp.com",
    databaseURL: "https://roadtrip-1d5b1.firebaseio.com",
    storageBucket: "roadtrip-1d5b1.appspot.com",
    messagingSenderId: "461431680534"
  };
  
  firebase.initializeApp(firebaseConfig);
}