firebaseInit();

document.getElementById("swapRegister").addEventListener("click", swapToRegister);
document.getElementById("swapLogin").addEventListener("click", swapToLogin);
document.getElementById("loginBtn").addEventListener("click", userLogin);
document.getElementById("registerBtn").addEventListener("click", userRegister);

//displays the "register new account" div
function swapToRegister() {
    document.getElementById("userPassword").value = "";
    document.getElementById("userLogin").value = "";
    document.getElementById("registerPassword").value = "";
    document.getElementById("registerLogin").value = "";
    document.getElementById("errorMessage").textContent = "";

    document.getElementById("login").style.display = "none";
    document.getElementById("register").style.display = "block";
}

//displays the "login" div
function swapToLogin() {
    document.getElementById("userPassword").value = "";
    document.getElementById("userLogin").value = "";
    document.getElementById("registerPassword").value = "";
    document.getElementById("registerLogin").value = "";
    document.getElementById("errorMessage").textContent = "";

    document.getElementById("register").style.display = "none";
    document.getElementById("login").style.display = "block";
}

//log in to firebase with user-supplied account info
function userLogin() {

    document.getElementById("loginBtn").style.backgroundColor = "#fff78a";

    document.getElementById("errorMessage").textContent = "";

    var user = document.getElementById("userLogin").value;
    var password = document.getElementById("userPassword").value;

    firebase.auth().signInWithEmailAndPassword(user, password).catch(function (error) {
        var errorMessage = error.message;
        document.getElementById("errorMessage").textContent = errorMessage;
    }).then(function (data) {
        if (data) {
            window.location.href = "home.html";
        }
    });
}

//register new firebase user account
function userRegister() {

    document.getElementById("registerBtn").style.backgroundColor = "#fff78a";

    document.getElementById("errorMessage").textContent = "";

    var user = document.getElementById("registerLogin").value;
    var password = document.getElementById("registerPassword").value;

    firebase.auth().createUserWithEmailAndPassword(user, password).catch(function (error) {
        var errorMessage = error.message;
        document.getElementById("errorMessage").textContent = errorMessage;

    }).then(function (data) {
        if (data) {
            var uid = data.uid

            firebase.database().ref("Group 20/Team Data/" + uid).set({ "trips": "empty" }).catch(function (error) {
                var errorMessage = error.message;
                document.getElementById("errorMessage").textContent = errorMessage;
            }).then(function (data) {
                window.location.href = "home.html";
            });
        }
    });
}
