import $ from 'jquery';

const apiBaseUrl = "http://localhost:5000/api/";

    export async function get(uri, auth) {
        let url = apiBaseUrl + uri;

        return await $.ajax(url,{
            type:"GET",
            contentType: "application/json",
            dataType:"json"
        }).then(response => response.json())
    }

    export function post(uri, auth) {
        // ADD JWT TOKEN IN AUTH

        let url = apiBaseUrl + uri;

        return $.ajax({
            method: "GET",
            url: url
        });
    }