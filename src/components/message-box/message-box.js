import './style.scss';

export default function (text, timeout, options) {
    try {
        document.body.removeChild(document.querySelector('div.toast-it'));
    } catch (e) {

    }

    // create a toast box
    var timeout = timeout || 1600;
    let toast = document.createElement('DIV');
    toast.classList.add('toast-it');
    let content = document.createTextNode(text);
    toast.appendChild(content);
    toast.style.animationDuration = timeout / 1000 + 's';

    for (let prop in options) {
        toast.style[prop] = options[prop];
    }

    toast.style['z-index'] = 9999999;
    document.body.appendChild(toast);
    setTimeout(function () {
        try {
            document.body.removeChild(toast);
        } catch (e) {

        }
    }, timeout);
};
