const express = require('express');
const { LoopStatus, CurrentStatus } = require("./status");
const router = express.Router();
const crypto = require('crypto');



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});



router.post('/update', (req, res, next) => {
  console.log("/update post");
  let body = req.body;
  console.log(JSON.stringify(body));


    if (body.isOn === true) {
      if (body.durrationInMs) {
        CurrentStatus.turnOffTime = Date.now() + (body.durrationInMs - 0);
      }
      else {
        CurrentStatus.turnOffTime = Date.now() + CurrentStatus.defaultIntervalInMS;
      }

      CurrentStatus.isOn = true;
    }
    else {
      CurrentStatus.turnOffTime = Date.now();
      CurrentStatus = false;
    }

  res.statusCode = 200;
  res.end();

});

router.get('/events', async function (req, res) {
  console.log('Got /events');
  let dataobj = {
    connectionHeartbeat: 0,
  }

  Object.assign(dataobj, CurrentStatus);
  let connected = true;
  CurrentStatus.connectedClients++;


  res.on('close', () => {
    console.log('client dropped me');
    connected = false;
    CurrentStatus.connectedClients--;
    res.end();
    return;
  });

  res.set({
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream',
    'Access-Control-Allow-Origin': '*',
    'Connection': 'keep-alive'
  });
  res.flushHeaders();

  // Tell the client to retry every 10 seconds if connectivity is lost
  res.write('retry: 10000\n\n');



  while (connected) {
    await new Promise(resolve => setTimeout(resolve, LoopStatus.heartbeatIntervalInMS));
    dataobj.connectionHeartbeat++;
    //console.log('Emit', dataobj.connectionHeartbeat);

    Object.assign(dataobj, CurrentStatus);
    // Emit an SSE that contains the current 'count' as a string
    if(connected)
    {
      res.write(`data: ${JSON.stringify(dataobj)}\n\n`);
    }
  }
});


// const favicon = new Buffer.from('AAABAAEAEBAQAAAAAAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAA/4QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEREQAAAAAAEAAAEAAAAAEAAAABAAAAEAAAAAAQAAAQAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAEAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wAA//8AAP//AAD8HwAA++8AAPf3AADv+wAA7/sAAP//AAD//wAA+98AAP//AAD//wAA//8AAP//AAD//wAA', 'base64'); 
// router.get("/favicon.ico", function(req, res) {
//  res.statusCode = 200;
//  res.setHeader('Content-Length', favicon.length);
//  res.setHeader('Content-Type', 'image/x-icon');
//  res.setHeader("Cache-Control", "public, max-age=2592000");                // expiers after a month
//  res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());

// });

module.exports = router;

