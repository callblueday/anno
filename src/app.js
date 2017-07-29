import BleService from './services/BleService';
import { Emitter } from './services/EmitterService';

/**
 * 获取QueryString
 */
const qs = (name) => {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  let r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
};

class App {

  constructor() {
    this.mediumService = new BleService();
  	this.env = {
	  	domain: qs('domain'), //由cordova内嵌脚本中作为常量写死
	    server: 'local' || 'dev' || 'demo' || 'production',  //由服务器环境配置文件配置，并由远程接口返回给客户端
	    platform: ''  //从cordova中获取，没有window.cordova=web，否则取window.device.platform
    };

    this.initCordova();
    this.initFlow();
  }

  initCordova() {
  	//mobile 环境
    if (window.cordova) {

    	this.env.platform = 'mobile';
    	//最终要的事件
      document.addEventListener('deviceready', this.onDdeviceready.bind(this), false);
      document.addEventListener('pause', (e) => {
      	//
      });
      document.addEventListener('resume', (e) => {
      	//
      });
      const exitApp = () => {
        navigator.app.exitApp();
      }
      const onBackKeyDown = () => {
        document.removeEventListener("backbutton", onBackKeyDown, false); // 注销返回键
        document.addEventListener("backbutton", exitApp, false);//绑定退出事件
        // 3秒后重新注册
        let intervalID = window.setInterval(function () {
          window.clearInterval(intervalID);
          document.removeEventListener("backbutton", exitApp, false); // 注销返回键
          document.addEventListener("backbutton", onBackKeyDown, false); // 返回键
        }, 3000);
      };
      document.addEventListener('backbutton', onBackKeyDown);
      //是什么？
      window.openUrl = (url) => {
        if (cordova.InAppBrowser) {
          cordova.InAppBrowser.open(url, '_system', 'location=no,toolbar=yes,toolbarposition=top,closebuttoncaption=关闭');
        }
      }
    } else {
    	this.env.platform = 'web';
    }
  }

  initFlow(){
    //蓝牙通信
    if(this.mediumService.type == 'ble'){
      Emitter.on('connectSuccess', (msg)=>{
        // 告知连接成功
        Emitter.emit('tellConnected', msg);
      })
      Emitter.on('DisconnectSuccess', (msg) =>{
        // 告知连接失败
        Emitter.emit('tellDisconnected', msg);
      })
      Emitter.on('BackSuccess', (msg)=>{
        // 告知连接失败
        Emitter.emit('tellDisconnected', msg);
      })
    }
  }

  onDdeviceready(){
    // 桥接完成之后才有 window.ble
    this.mediumService.init();
    navigator.splashscreen.hide();
    //打开蓝牙面板
    this.mediumService.showConnect((msg) => {
      console.log('打开面板成功', msg);
    }, (msg) => {
      console.log('打开面板失败', msg);
    });
  }

  // 索取 deviceInfo
  getDeviceInfo(callback){
    this.mediumService.getDeviceInfo(callback);
  }
  /**
   * 动态注入脚本函数
   */
  injectScript(src, type, onLoadFinish) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = false;
    script.onload = (result) => {
      if (onLoadFinish) {
        onLoadFinish(src, result);
      }
    };
    if (window.baseUrl) {
      script.src = mBaseUrl + src;
    } else {
      script.src = src;
    }
    //插入
    if (type === 'body') {
      document.body.appendChild(script);
    } else {
      document.getElementsByTagName('head')[0].appendChild(script);
    }
  }
}

//实例化 app
const app = new App();
export default app;
