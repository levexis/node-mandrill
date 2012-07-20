var request = require('request'),
    _ = require('underscore');

var MANDRILL_API_ROOT = 'https://mandrillapp.com/api/1.0/'; 

function makeMandrill(key)
{
    function mandrill(path, opts, callback)
    {
        if (typeof opts == 'function')
        {
            var callback = opts;
            opts = { key: key };
        }

        var requestOptions = {
            method: 'POST',
            url: MANDRILL_API_ROOT + path,
        };

        requestOptions['body'] = JSON.stringify( _.extend(opts, { key: key }) );
        
        request(requestOptions, function(error, response, body)
        {
            if (typeof callback == 'function')
            {
                if (!error)
                {
                    //everything is good!
                    if (path.substr(-4).toLowerCase() == 'json')
                    {
                        body = JSON.parse(body);
                    }

                    if (response['statusCode'] >= 200 && response['statusCode'] < 300)
                    {
                        callback(null, body);
                    }
                    else
                    {
                        callback(body);
                    }
                }
                else
                {
                    callback(error);
                }
            }
        });
    }
    
    return mandrill;
}

module.exports = makeMandrill;
