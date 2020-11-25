var ex = require('express');
const NetworkSpeed = require('network-speed'); // ES5
const testNetworkSpeed = new NetworkSpeed();

const options = {
    hostname: 'www.google.com',
    port: 80,
    path: '/catchers/544b09b4599c1d0200000289',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
};





var app = ex();
app.use(ex.static('img'))
app.set('view engine', 'ejs')
app.listen(3005)
app.get('/', async(req, res) => {
    const baseUrl = 'http://eu.httpbin.org/stream-bytes/50000000';
    var fileSizeInBytes = 50000000;
    const down = await testNetworkSpeed.checkDownloadSpeed(baseUrl, fileSizeInBytes);
    fileSizeInBytes = 2000000
    const up = await testNetworkSpeed.checkUploadSpeed(options, fileSizeInBytes);


    var downmb = down.mbps * 0.125
    var upmb = up.mbps * 0.125
    res.render('index', { up: upmb.toFixed(2), down: downmb.toFixed(2) })
})