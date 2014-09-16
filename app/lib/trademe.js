
var OAuth = require('oauth');

function ApiClient(){
    this.environment = 'tmsandbox';

    this.oauth = new OAuth.OAuth(
        'https://secure.tmsandbox.co.nz/Oauth/RequestToken',
        'https://secure.tmsandbox.co.nz/Oauth/AccessToken',
        '4E3C3DA86700F8FE76BC05AF846D9334',
        '759285290B43C99812E91B70E20C8665',
        '1.0',
        null,
        'HMAC-SHA1'
    );

};

ApiClient.prototype.get = function(method, callback){
    this.oauth.get(
            'https://api.' + this.environment + '.co.nz' + method,
        '270A9AB24FA7ECE5C3D365AFB6198696', //test user token
        '7DA1534B09D7BEA848C0E71722F45CE8', //test user secret
        function (e, data, res){
            callback(e, e || JSON.parse(data), res);
        });
};

ApiClient.prototype.post = function(method, data, callback){

};

ApiClient.prototype.delete = function(method, callback){

};



module.exports = {'ApiClient': ApiClient};