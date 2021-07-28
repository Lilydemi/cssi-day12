let googleUser; 

window.onload = () => {
    //retain state between html pages 
    firebase.auth().onAuthStateChanged(function (user){
        if(user) {
            console.log('Logged in as: ' + user.displayName); 
            googleUser = user; 
        } else {
            window.location = 'index.html'; //if not logged in, go back to home page
        }
    }); 
}

const handleNoteSubmit = () => {
    console.log("note submission function called");
    //capture form data
    const titleElement = document.querySelector("#noteTitle");
    const textElement = document.querySelector("#noteText");
    //format data 
    const note = {
        title: titleElement.value,
        text: textElement.value,
    };
    //clear form
    //titleElement.value = "";
    //textElement.value = ""; 
     //write to database
     console.log(note);
    const dbRef = firebase.database().ref(`users/${googleUser.uid}`);
    dbRef.push(note).then(() =>{
        titleElement.value = ""; //clear form if action succedes 
        textElement.value = ""; 
    });

}