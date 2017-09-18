import { comm } from '../../../js/comm';

class Action {
  constructor(props) {

  }

  moveMotor (deviceId, speed) {
    var cmd = `G1 D${deviceId} S${speed}`;
    comm.send(cmd);
  }

  moveAngle (deviceId, angle, speed) {
    speed = speed ? speed : 50;
    var cmd = `G2 D${deviceId} A${angle} S${speed}`;
    comm.send(cmd);
  }

}

export const action = new Action();
