import { comm } from './comm';

class Action {
  constructor(props) {

  }

  // 初始化
  start () {
    comm.send('G21 \n');
  }

  resetAllAxis () {
    comm.send('G00 A0 B0 C0 D0 X0 Y0 Z0 \n');
  }

  setRelativeMove () {
    comm.send('G91 \n');
  }

  setAbsoluteMove () {
    comm.send('G90 \n');
  }

  // 相对单轴运动
  move (axis, angle, speed) {
    speed = (speed > 2000) ? 2000 : speed;
    var cmd = 'G01 ' + axis + angle + ' F' + speed + '\n';
    console.log(cmd);
    comm.send(cmd);
  }

  // 多轴联动控制
  moveAllAxis (as, bs, cs, ds, xs, speed) {
    var cmd = 'G01 A' + as + ' B' + bs + ' C' + cs + ' D' + ds + ' X' + xs + ' F' + speed + '\n';
    comm.send(cmd);
  }

  // 设置固件模式
  setMode (mode) {
    let modeMaps = {
      "paishe-open": "M10",
      "paishe-close": "M11",
      "penqi-open": "M10",
      "penqi-close": "M11",
      "jiaqu-open": "M10",
      "jiaqu-close": "M11",
      "xiqu-open": "M10",
      "xiqu-close": "M11",
      "hanjie-open": "M10",
      "hanjie-close": "M11"
    };
    comm.send(modeMaps[mode]);
  }
}

export const action = new Action();