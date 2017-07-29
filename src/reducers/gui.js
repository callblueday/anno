const {combineReducers} = require('redux');

module.exports = combineReducers({
    applist: require('./applist'),
    ble: require('./ble')
});
