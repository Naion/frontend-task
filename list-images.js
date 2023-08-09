// Created new XMLHttpRequest.
var xhttp = new XMLHttpRequest();

onInit()

function getImageList() {
    // API's endpoint and method that is going to be used.
    xhttp.open("GET", "http://172.17.0.2:5000/list_images", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = onReadyStateChange;
    xhttp.send();
}

// This function will start once the API call has ended.
function onReadyStateChange() {
    // Check if state is "Done" and status is "OK".
    if (this.readyState == 4 && this.status == 200) {
        var jsonResponse = JSON.parse(xhttp.response);
        printImages(jsonResponse);
    }
}

// This function will print in DOM all imagen recieved from the API's endpoint.
function printImages(jsonResponse) {
    for (var i in jsonResponse) {
        document.getElementById("list").innerHTML += `
        <div class="card">
            <img class ="card" src="data:image/png;base64,${jsonResponse[i]['base64']}" alt="Avatar" style="width:100%;height:100%;margin-top:0;">
            <div class="container">
                <h4><b>ID: ${jsonResponse[i]['uuid']}</b></h4>
            </div>
        </div>
        `;
    }
}

// Method to handle any additional initialization tasks.
function onInit() {
    getImageList();
}