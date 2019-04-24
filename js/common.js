'use strict';
// JavaScript containing shared constants, for use in all pages.

var backendIp = 'ec2-99-81-194-20.eu-west-1.compute.amazonaws.com';
var token = '0aa87f9e-009e-4ac5-a57f-f9711c4e5345';

function buildUrl(path) {
    return 'http://' + backendIp + '/images' + path + '?token=' + token;
}
