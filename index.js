var ex = require('express');
const NetworkSpeed = require('network-speed'); // ES5
const testNetworkSpeed = new NetworkSpeed();
const path = require('path');
var app = ex();
const options = {
    hostname: 'www.google.com',
    port: 80,
    path: '/catchers/544b09b4599c1d0200000289',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
};



app.use(ex.static(path.join(__dirname, 'img')));

// Set 'views' directory for any views 
// being rendered res.render()
app.set('views', path.join(__dirname, 'views'));

// Set view engine as EJS
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.listen(process.env.PORT || 3006, function() {
    console.log("Express server listening on port %d in %s mode.visit http://localhost:3006", this.address().port, app.settings.env);
});
app.get('/', async(req, res) => {
    const baseUrl = 'http://eu.httpbin.org/stream-bytes/50000000';
    var fileSizeInBytes = 50000000;
    const down = await testNetworkSpeed.checkDownloadSpeed(baseUrl, fileSizeInBytes);
    fileSizeInBytes = 2000000
    const up = await testNetworkSpeed.checkUploadSpeed(options, fileSizeInBytes);


    var downmb = down.mbps * 0.125
    var downmb = downmb - (0.25 * downmb)
    var upmb = up.mbps * 0.125
    var upmb = upmb - (0.25 * upmb)
    res.render('index', { up: upmb.toFixed(2), down: downmb.toFixed(2) })
})