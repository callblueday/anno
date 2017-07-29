const BLUETOOTH_CONNECTED = 'bluetooth_connected';
const BLUETOOTH_DISCONNECTED = 'bluetooth_disconnected';
const BLUETOOTH_RECEIVED = 'bluetooth_received';

const initialState = {
  "status": false,
  "message": ""
};

const bluetooth = function (state = initialState, action) {
  switch (action.type) {
    case BLUETOOTH_CONNECTED:
      return Object.assign({}, state, {
        status: true
      });
    case BLUETOOTH_DISCONNECTED:
      return Object.assign({}, state, {
        status: false
      });
    case BLUETOOTH_RECEIVED:
      return Object.assign({}, state, {
        message: action.message
      });
    default:
      return state;
  }
};

bluetooth.btConnect = function (status) {
    return {
        type: BLUETOOTH_CONNECTED,
        status: status
    }
};

bluetooth.btDisconnect = function (status) {
    return {
        type: BLUETOOTH_DISCONNECTED,
        status: status
    }
};

bluetooth.btReceive = function (message) {
    return {
        type: BLUETOOTH_DISCONNECTED,
        message: message
    }
};

module.exports = bluetooth;