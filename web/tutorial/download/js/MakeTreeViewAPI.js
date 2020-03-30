
"use strict";

        /*
         * MakeTreeAPI makes an API call and passes the JSON to makeTreeJSON 
         */
function MakeTreeViewAPI (params) {
    ajax2({
        "url": params.url,
        "successFn": successFn,
        "errorId": params.container
    });
    function successFn(obj) {
        // var obj = JSON.parse(hreq.responseText); // this already done by function ajax2...
        if (!obj) {
            document.getElementById(params.container).innerHTML += "Http Request (from AJAX call) did not parse to an object.";
            return;
        }
        if (obj.dbError.length > 0) {
            document.getElementById(params.container).innerHTML += "Database Error Encountered: " + obj.dbError;
            return;
        }
        MakeTreeView({"json" : obj.json, "container" : params.container});
    }
}