import 'isomorphic-unfetch';


const toQueryString = (obj) => {
    return obj ? Object.keys(obj).sort().map(function (key) {
        var val = obj[key];
        if (Array.isArray(val)) {
            return val.sort().map(function (val2) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
            }).join('&');
        }
        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
    }).join('&') : '';
}

const getTables = (data) => {
    return async function (dispatch) {



        await dispatch({
            type: "PAGE1_LOADING",
            payload: true
        })

        dispatch({
            type: "PAGE1_OFFSET",
            payload: data.offset
        })

        dispatch({
            type: "PAGE1_LIMIT",
            payload: data.limit
        })

        let res = await fetch("http://youyong.ba:8080/mock/5d8c57403908d745b308239c/example/cname", {
            method: 'GET',
            // mode: 'cors',
            // cache: 'force-cache',

            headers: {
                'Cache-Control': 'no-cache',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer xxx'
            }

            // cache: 'default',
            // body: toQueryString(data)
            // body: toQueryString(data)
        });

        let json = await res.json();


        console.log(22);
        await dispatch({
            type: "HOME_TABLEDATA",
            payload: json.data
        })

    }
}

export {
    getTables
}