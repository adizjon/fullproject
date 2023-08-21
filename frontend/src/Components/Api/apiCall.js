import React from 'react';
import axios from "axios";

function Index({url, method, data, param}) {
    let accessToken = localStorage.getItem("accessToken");
    return axios({
        url: "http://localhost:8080" + url,
        method,
        data,
        headers: {
            "Authorization": accessToken
        },
        params: param
    })
}

export default Index;