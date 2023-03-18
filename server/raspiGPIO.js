//const { Gpio } = require( 'onoff' );


const ouputPin = 27;
const Gpio = require('onoff').Gpio; // Gpio class
const led = new Gpio(ouputPin, 'out');       // Export GPIO17 as an output

// Toggle the state of the LED connected to GPIO17 every 200ms
// const blinkLed = _ => {
//   if (stopBlinking) {
//     return led.unexport();
//   }

//   led.read((err, value) => { // Asynchronous read
//     if (err) {
//       throw err;
//     }

//     led.write(value ^ 1, err => { // Asynchronous write
//       if (err) {
//         throw err;
//       }
//     });
//   });

//   setTimeout(blinkLed, 200);
// };

// blinkLed();

let isLEDOn = false;
function turnOn()
{
    if(!isLEDOn)
    {
        console.log(`Turning ${ouputPin} to high`)
        isLEDOn = true;
    }
    led.write(Gpio.HIGH, err => { 
        if (err) {
            console.error(err);
            //throw err;
        }
      });
}

function turnOff()
{
    if(isLEDOn)
    {
        console.log(`Turning ${ouputPin} to low`)
        isLEDOn = false;
    }
    
    led.write(Gpio.LOW, err => { 
        if (err) {
            console.error(err);
            //throw err;
        }
      });
}


module.exports.turnOn = turnOn;
module.exports.turnOff = turnOff;