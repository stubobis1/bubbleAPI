const { LoopStatus, CurrentStatus } = require("./status");
//const gpioOut = require("./raspiGPIO.js");
const gpioOut = require("./test-raspiGPIO.js");



async function loop() {
    while (true) {
        await new Promise(resolve => setTimeout(resolve, LoopStatus.intervalInMS));
        //console.log("looping");
        if (CurrentStatus.isOn === true && !(Date.now() < CurrentStatus.turnOffTime)) { // Inversion of logic to deal with NaN, which will always be false on comparison
            console.log(`turning off...  ${Date.now()} > ${CurrentStatus.turnOffTime}` );
            CurrentStatus.isOn = false;
        }
        if(CurrentStatus.isOn)
        {
            gpioOut.turnOn();
        }
        else
        {
            gpioOut.turnOff();
        }

    }
}



module.exports = loop;