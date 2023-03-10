let led = {
    "write" : function(input)
    {
        //console.log(3);
    }
}


function turnOn()
{
    //console.log(`Turning 17 to high`)
    led.write(1, err => { 
        if (err) {
            //qconsole.error(err);
            //throw err;
        }
      });
}

function turnOff()
{
    //console.log(`Turning 17 to low`)
    led.write(0, err => { 
        if (err) {
    //        console.error(err);
            //throw err;
        }
      });
}


module.exports.turnOn = turnOn;
module.exports.turnOff = turnOff;