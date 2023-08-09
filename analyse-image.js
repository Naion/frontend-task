// Created new XMLHttpRequest.
var xhttp = new XMLHttpRequest();

onInit();

// This function will get both height and width data from the given image.
function getImageHeightWidth() {
    // API's endpoint and method that is going to be used.
    xhttp.open("POST", "http://172.17.0.2:5000/analyse_image", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    // Get the ID and pass it to the API
    var innerText = document.getElementById("uuid-input").value;
    xhttp.onreadystatechange = onReadyStateChange;
    xhttp.send(JSON.stringify({ "uuid": innerText }));
}

// This function will start once the API call has ended.
function onReadyStateChange() {
    // Check if state is "Done" and status is "OK".
    if (this.readyState == 4 && this.status == 200) {
        // Retrieving information from the API and posting in DOM.
        var jsonResponse = JSON.parse(xhttp.response);
        document.getElementById("found-image").src = `data:image/png;base64,${jsonResponse['base64']}`;
        document.getElementById("image-info").innerHTML = `Height: ${jsonResponse['height']}px - Width: ${jsonResponse['width']}px`;
    }
}

// Method to handle any additional initialization tasks.
function onInit() {
    const analyseBtn = document.getElementById("analyse-btn");
    analyseBtn.onclick = getImageHeightWidth;
}