import { Emitter } from './EmitterService';
class BleService {
  constructor() {
    this.type = 'ble';
    this.isConnected = false;
  }

  init(){
  	if (!window.ble) {
      return;
    }

    //连接成功的回调
  	window.ble.startListenConnected((msg) => {
      this.isConnected = true;
      Emitter.emit('connectSuccess', msg);
    }, (err) => {
    	 Emitter.emit('ConnectFail', err);
    });

  	//蓝牙断开回调
    window.ble.startListenDisconnected((msg) => {
      if (this.isConnected) {
        this.isConnected = false;
        Emitter.emit('DisconnectSuccess', err);
        this.showConnect();
      }
    }, (err) => {
      Emitter.emit('DisconnectFail', err);
    });

    //回退键
    window.ble.startListenBackButtonClicked(() => {
      this.isConnected = false;
      Emitter.emit('BackSuccess', msg);
    }, (msg) => {
      Emitter.emit('BackFail', msg);
    });
  }

  showConnect(success, fail) {
    if (!window.ble) {
      return;
    }
    //打开蓝牙组件
    window.ble.showBluetoothConnectScence(success, fail);
  }
}

export default BleService;