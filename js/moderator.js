
var imageId;

function thumbnails () {
    fetch(buildUrl(""))
        .then(function (response) {
            if (response.status !== 200) {
                throw new Error('Request return status code !== 200: ' + response.status + ' - ')
            }
            return response.json();
        })
        .then(function(json) {
            console.log('Request to /images succeeded: ');
            console.log(json);

            $('#table-body').empty();

            for (var i = 0; i < json.length; i++) {
                $('#table-body').append(`
                    <tr>
                        <td>
                            <div class="container">
                                <img src="data:image/png;base64, ${json[i].thumbnail}"/>
                                <button class="btn" onclick="deleteImage(${json[i].id})">Delete</button>
                             </div>

                        </td>
                        <td>${json[i].name}</td>
                        <td>${json[i].author}</td>
                    </tr>
                `);
            }
        })
        .catch(function (err) {
            console.error('Request to /image failed: ', err);
        });
}

function deleteImage(id){
    var login = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    fetch(buildUrl("/id/" + id), {method:"delete",
        headers: new Headers({"Authorization": `Basic ${btoa(`${login}:${password}`)}`})})

        .then(function(response){
            if (response.status === 401) {
                alert("You are not authorised! Please check credentials and try again!")
                return;
            }
            if (response.status !== 204) {
                alert("Please refresh and try again!")
                throw new Error ('Request returned status code !== 204: ' + response.status + '-')
            }
            thumbnails();
        })
}

$(function() {
    thumbnails();
})
