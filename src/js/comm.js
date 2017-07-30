/**
 * @fileOverview bluetooth communication.
 */

class Comm {
  constructor(props) {
    this.settings = {
      isConnected: false,
      commServiceID: 'FFE1',
      writeCharacteristicID: 'FFE3',
      readCharacteristicID: 'FFE2'
    };
  }

  /**
   * Convert array of int to ArrayBuffer.
   * @param  {[int]} data array of int
   * @return {ArrayBuffer}      result array buffer
   * @private
   */
  arrayBufferFromArray (data) {
    var buffer = new ArrayBuffer(data.length);
    var result = new Int8Array(buffer);
    for (var i = 0; i < data.length; i++) {
      result[i] = data[i];
    }
    return buffer;
  }

  /**
   * Convert ArrayBuffer from array of int
   * @param  {ArrayBuffer} buffer the source arraybuffer
   * @return {[int]}        int array as the result;
   * @private
   */
  arrayFromArrayBuffer (buffer) {
    var dataView = new Uint8Array(buffer);
    var result = [];
    for (var i = 0; i < dataView.length; i++) {
      result.push(dataView[i]);
    }
    return result;
  }

  receiveData () {
    var self = this;
    if(typeof ble != 'undefined') {

      if (ble && ble.connectedDeviceID) {
        ble.startNotification(ble.connectedDeviceID, self.settings.commServiceID, self.settings.readCharacteristicID, function(data) {
          var bufArray = self.arrayFromArrayBuffer(data);
          // read success
          console.log(data);

        }, function(err) {
          // read failure
          console.log('read error, ', err);
        });
      } else {
        // connection may lost
      }
    }
  }

  send (buf, type) {
    var self = this;
    var cmdType = type ? type : "ascii";
    var cmd = buf;
    if(cmdType != "hex") {
      console.log(cmd);
    } else {
      console.log(buf.join(", "));
      cmd = self.arrayBufferFromArray(buf);
    }

    if(typeof ble != 'undefined') {
      if (ble && ble.connectedDeviceID) {
        ble.writeWithoutResponse(ble.connectedDeviceID, self.settings.commServiceID,
          self.settings.writeCharacteristicID, cmd,
          function() {
            console.log('send success');
            if (!self.isConnected) {
              self.receiveData();
            }
            self.isConnected = true;
          },
          function(err) {
            console.log('write error, ', err);
            ble.stopNotification(ble.connectedDeviceID, self.settings.commServiceID, self.settings.readCharacteristicID);
            self.isConnected = false;
          }
        );
      }
    }
  }
}


export const comm = new Comm();
