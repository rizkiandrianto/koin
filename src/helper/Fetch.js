/**
 * @providesModule helper/Fetch
 */

 import Static from 'helpers/Static';

export function GET(param, callback) {
    const { market } = Static;
    let url = market.host + market.endpoint + param.url;
    if (param.query) url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(param.query);
    fetch(url, {
        method: 'GET',
        headers: {
            ...param.headers
        }
    })
    .then((response) => response.json())
    .then((res) => {callback && callback(false, res)})
    .catch((err)=>{
        console.error(err);
        callback && callback(err, false)
    });
}

function queryParams(params) {
    return Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&');
}