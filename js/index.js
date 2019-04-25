'use strict';
// JavaScript for use with the index page.
var imageId;

function loadRandomImage() {
    fetch(buildUrl('/random'))
        .then(function (response) {
            if (response.status !== 200) {
                throw new Error('Request return status code !== 200: ' + response.status + ' - ')
            }
            return response.json();
        })
        .then(function (json) {
            console.log('Request to /random succeeded: ');
            console.log(json);

            var mainImage = $('#main-image');
            var infoAuthor = $('#info-author');
            var infoImage = $('#info-image');
            var infoLicence = $('#info-license');
            mainImage.attr('src', json.url);
            mainImage.attr('alt', 'Photo Competition image, ' + json.name);
            infoAuthor.text(json.author);
            infoImage.text(json.name);
            infoLicence.text(json.license);
            imageId = json.id;
        })
        .catch(function (err) {
            console.error('Request to /random failed: ', err);
        });
}

function upVote() {
    fetch(buildUrl('/id/' + imageId + '/vote/up'),{method:'post'})
        .then(function (response) {
            if (response.status !== 204) {
                throw new Error ('Request returned status code !== 204: ' + response.status + '-')
            }
            loadRandomImage();
        })
}

function downVote() {
    fetch(buildUrl('/id/' + imageId + '/vote/down'),{method:'post'})
        .then(function (response) {
            if (response.status !== 204) {
                    throw new Error ('Request returned status code !== 204: ' + response.status + '-')
            }
            loadRandomImage();
        })
}

$(function () {
    loadRandomImage();
});