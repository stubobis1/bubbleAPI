let CurrentStatus = {
  defaultIntervalInMS: 1_000,
  timeLeft: 0,
  isOn: false,
  connectedClients: 0,
  turnOffTime: 0,
};
let LoopStatus = {
  intervalInMS: 500,
  heartbeatIntervalInMS: 500,
};


exports.CurrentStatus = CurrentStatus;
exports.LoopStatus = LoopStatus;
