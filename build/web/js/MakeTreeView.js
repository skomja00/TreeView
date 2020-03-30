
"use strict";

var ele = document.createElement("div");

function MakeTreeView (params) {
    var firstKey = Object.keys(params.json[0])[0]; //1st key of 1st json obj
    var treeName = params.json[0][firstKey];       //1st value of 1st json obj. 
    const tree = new Tree(treeName); 
    tree.makeTreeJSON(params.json);
    ele.appendChild(tree.makeTreeView());
    console.log(ele);
    document.getElementById(params.container).appendChild(tree.makeTreeView(params.json));
}