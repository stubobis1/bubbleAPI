//const { Gpio } = require( 'onoff' );



const Gpio = require('onoff').Gpio; // Gpio class
const led = new Gpio(17, 'out');       // Export GPIO17 as an output

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


function turnOn()
{
    console.log(`Turning 17 to high`)
    led.write(Gpio.HIGH, err => { 
        if (err) {
            console.error(err);
            //throw err;
        }
      });
}

function turnOff()
{
    console.log(`Turning 17 to low`)
    led.write(Gpio.LOW, err => { 
        if (err) {
            console.error(err);
            //throw err;
        }
      });
}


module.exports.turnOn = turnOn;
module.exports.turnOff = turnOff;