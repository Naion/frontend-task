// Created new XMLHttpRequest.
var xhttp = new XMLHttpRequest();

// Declaring shared variables.
var image, extension, isExtensionTypeSuccess;

// Assign functionalities to the HTML button.
const submitBtn = document.getElementById("submit-btn");

submitBtn.onclick = submitJSON;

file = document.getElementById('file-input').addEventListener('change', handleFileSelect, false);

// This function will handle the file type.
function handleFileSelect(event) {
    // Accepted image file types.
    var fileTypes = ['jpg', 'jpeg', 'png'];
    // Obtaining the extension of the selected file.
    extension = event.target.files[0].name.split('.').pop().toLowerCase();
    // Checking if the extension is within the accepted ones.
    isExtensionTypeSuccess = fileTypes.indexOf(extension) > -1;
    if (isExtensionTypeSuccess) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = handleFileLoad;
    }
    else {
        alert("Unsuported type");
    }
}

function handleFileLoad(event) {
    // Saved image's base64 string in a variable.
    image = event.target.result;
}

function submitJSON() {
    // Only call API if the extension is supported.
    if (isExtensionTypeSuccess) {
        // API's endpoint and method that is going to be used.
        xhttp.open("POST", "localhost:5000/upload_image", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        // Use JSON.stringify() to convert the JavaScript object into a JSON string and send those
        // paremeters to the API.
        xhttp.onreadystatechange = onReadyStateChange;
        xhttp.send(JSON.stringify({ "base64": image, "extension": extension }));
    }
}

// This function will start once the API call has ended.
function onReadyStateChange() {
    // Check if state is "Done"
    if (this.readyState == 4) {
        // Check if status is "OK"
        if (this.status == 200) {
            var imgID = JSON.parse(xhttp.response);
            alert(`YOUR IMAGE HAS BEEN UPLOADED SUCCESSFULLY! (ID: ${imgID['uuid']}.${imgID['extension']})`);
        }
        // Check if status is "UNSUPPORTED MEDIA TYPE" and handle the error.
        else if (this.status == 415) {
            alert("UNSUPPORTED MEDIA TYPE");
        }
        // Show if something has gone wrong and it has not been possible to handle.
        else {
            alert("Unexpected error");
        }
    }
}