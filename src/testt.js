let cookies = {
    hello: 'world',
    _ga: 'GA1.1.1055049275.1524486693',
    _ym_uid: '1524486693816509462'
};

function writeCookies(obj) {
    let array = [];

    for (let prop in obj) {
        array.push(`${prop}=${obj[prop]}`)
    }
    document.cookies = array.join(';');
}

console.log(writeCookies(cookies));