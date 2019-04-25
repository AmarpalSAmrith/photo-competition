'use strict';
// JavaScript for use with the toprated page.
var imageId;

function loadTopRatedImage() {
    fetch(buildUrl('/top'))
        .then(function (response) {
            if (response.status !== 200) {
                throw new Error('Request return status code !== 200: ' + response.status + ' - ')
            }
            return response.json();
        })
        .then(function (json) {
            console.log('Request to /top succeeded: ');
            console.log(json);

            var mainImage = $('#main-image');
            var infoAuthor = $('#info-author');
            var infoImage = $('#info-image');
            var infoLicence = $('#info-license');
            mainImage.attr('src', json.url);
            mainImage.attr('alt', 'Top Rated Photo, ' + json.name);
            infoAuthor.text(json.author);
            infoImage.text(json.name);
            infoLicence.text(json.license);
            imageId = json.id;
        })
        .catch(function (err) {
            console.error('Request to /top failed: ', err);
        });
}

$(function () {
    loadTopRatedImage();
});