function uploadImage() {
    var formData = new FormData();

    var fileField = document.getElementById("filepath");
    var author = document.getElementById("author");
    var name = document.getElementById("imgname");
    var licence = document.getElementById("license");

    if (author.checkValidity() === false){
        alert("Please enter an author");
        return;
    }
    if (fileField.checkValidity() === false) {
        alert("Please select a file")
        return;
    }
    if (name.checkValidity() === false){
        alert("Please enter a image name")
        return;
    }

    if (licence.checkValidity() === false){
        alert("Please enter a license name")
        return;
    }

    formData.append('metadata', new Blob([JSON.stringify({
        author: author.value,
        name: name.value,
        license: licence.value
    })], {type: 'application/json'}));

    formData.append('rawdata', fileField.files[0]);

    fetch(buildUrl(''), {
      method: 'POST',
      body: formData
    })
    .then(function (response) {
        if (response.status == 413) {
            alert("Image too large! - Please try a different Photo!")
            throw new Error("Image too large")
        }
        else if (response.status !== 200) {
            throw new Error('Request return status code !== 200: ' + response.status + ' - ')
        }
        alert("Upload of: " + name.value + " by " + author.value + " - Succesful")
        return response.json();
    })
    .catch(function (error) {
        console.error('Upload image failed!', error);
    })
}
function reloadPage() {
    location.reload();
}
