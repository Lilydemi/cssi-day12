window.onload = (event) => {
    //retain user state between pages
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            googleUser = user; 
            getNotes(googleUser.uid); 
        } else {
            window.location = 'index.html'; 
        }
    }); 
}

const getNotes = (userId) => {
    console.log("logged in as user" + userId);
    //access to all current notes
    const dbRef = firebase.database().ref(`users/${userId}`);
    dbRef.on('value', (snapshot) => {
        renderData(snapshot.val());
    }); 
}

const renderData = (data) => {
    console.log(data); 
    for (let key in data) {
        const note = data[key]
        const destination = document.querySelector('#app'); 

        destination.innerHTML = note.text
    }
}

const createCard = (note) => {
    return `<div class = "column is-one-quarter">
            <div class = "card">
                <div class = "card-head">${note.text} </div>
                <div class = "card-content"> ${note.text} </div> 
            </div>
            </div>`
}