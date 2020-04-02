var beverages = {};

beverages.list = function () {

    // Remember: getting a DB error does NOT mean ajax call unsuccessful. That is a secondary error after ajax call OK.
    ajax2({
        url: "webAPIs/listAPI.jsp",
        successFn: listAPISuccess,
        errorId: "content"
    });

    function listAPISuccess(obj) {
        
        // var obj = JSON.parse(hreq.responseText); // this already done by function ajax2...
        if (!obj) {
            contentDOM.innerHTML += "Http Request (from AJAX call) did not parse to an object.";
            return;
        }
        console.log(obj);

        if (obj.dbError.length > 0) {
            contentDOM.innerHTML += "Database Error Encountered: " + obj.dbError;
            return;
        }

        return obj.bevs;
        
    } // end of function success

}; // end of function beverages.list
