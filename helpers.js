const { ApolloError } = require('apollo-server');
const fetch = require('node-fetch');
var request = require("request");

var options = {
    method: 'POST',
    url: 'https://cqm-test.auth0.com/oauth/token',
    headers: { 'content-type': 'application/json' },
    body: '{"client_id":"FdeOEuCezGE1OnFt6nkXAy7pXd5wMpEL","client_secret":"cHaAGT9KnuCaHEUvjxgx2HxabuEmp5WBO4fgsmEG5Mqn2k8j5I1vZ0tMEUaArA3B","audience":"https://cqm-test.auth0.com/api/v2/","grant_type":"client_credentials"}'
};

let accessToken
request(options, function (error, response, body) {
    if (error) throw new Error(error);
    accessToken = JSON.parse(body).access_token
});



const getData = async url => {
    try {
        console.log(url)
        const res = await fetch(url, { method: "GET", headers: { 'Content-Type': 'application/json', 'authorization': 'Bearer '+accessToken } });
        const json = await res.json();
        if (isHTTPError(res.status)) {
            throw new ApolloError(json, "http-status-error", { statusCode: res.status, error: json });
        }
        console.log(json);
        return json;
    } catch (error) {
        console.log(JSON.stringify(error));
        throw error;
    }
};

const isHTTPError = status => {
    return !((status >= 200) && (status < 300));
};

exports.getData = getData;
