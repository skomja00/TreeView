/*
 * 
 * Tree class
 * 
 */
function Tree(data) {
    var node = new Node(data);
    this._root = node;

    this.printTreeBF = function () {
        const prnt = (obj) => {console.log(obj.data);}; 
        console.log("*** " + this._root.data + ": print tree breadth-first");
        this.traverseBF( prnt );
    };
    this.printTreeDF = function () {
        const prnt = (obj) => {console.log(obj.data);}; 
        console.log("*** " + this._root.data + ": print tree depth-first");
        this.traverseDF( prnt );
    };        
    this.traverseDF = function(callback) {
        // this is a recurse and immediately-invoking function
        (function recurse(currentNode) {
            // step 2
            for (var i = 0, length = currentNode.children.length; i < length; i++) {
                // step 3
                recurse(currentNode.children[i]);
            }
            // step 4
            callback(currentNode);
            // step 1
        })(this._root);
    };
    this.traverseBF = function(callback) {
        var queue = new Queue();
        queue.enqueue(this._root);
        var currentTree = queue.dequeue();
        while(currentTree){
            for (var i = 0, length = currentTree.children.length; i < length; i++) {
                queue.enqueue(currentTree.children[i]);
            }
            callback(currentTree);
            currentTree = queue.dequeue();
        }
    };
    this.contains = function(callback, traversal) {
        traversal.call(this, callback);
    };
    this.add = function(data, toData, traversal) {
        var child = new Node(data),
            parent = null,
            callback = function(node) {
                if (node.data === toData) {
                    parent = node;
                }
            };
        this.contains(callback, traversal);
        if (parent) {
            parent.children.push(child);
            child.parent = parent;
        } else {
            throw new Error('Cannot add node to a non-existent parent.');
        }
    };

    this.remove = function(data, fromData, traversal) {
        function findIndex(arr, data) {
            var index;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].data === data) {
                    index = i;
                }
            }
            return index;
        }        
        var tree = this,
            parent = null,
            childToRemove = null,
            index;
        var callback = function(node) {
            if (node.data === fromData) {
                parent = node;
            }
        };
        this.contains(callback, traversal);
        if (parent) {
            index = findIndex(parent.children, data);
            if (index === undefined) {
                throw new Error('Node to remove does not exist.');
            } else {
                childToRemove = parent.children.splice(index, 1);
            }
        } else {
            throw new Error('Parent does not exist.');
        }
        return childToRemove;
    };
    /*
    * makeTreeView implements a breadth-first Tree approach to build a list of nested sublists
    * Input (i.e. "this") is a tree structure.
    * 
    */
    this.makeTreeView = function() {
        var ul = document.createElement("ul");
        ul.setAttribute("class","treeview");
        const recurse = (currentNode) => {
            // the li object is LOCAL to facilitate the recursion!
            var li = document.createElement("li");
            // this node has children. add add as a list item and also nest a new list for the children
            if (currentNode.children.length) {
                var s = document.createElement("span");
                s.setAttribute("class","caret");
                s.innerHTML = currentNode.data;
                li.appendChild(s);
                var ul = document.createElement("ul");
                ul.setAttribute("class","nested");
                li.appendChild(ul);
            // this node has no children. just add add as a list item 
            } else {
                li.innerHTML = currentNode.data;
            }
            // step 2 enter a for loop and iterate once for each child 
            for (var i = 0, length = currentNode.children.length; i < length; i++) {
                // step 3 invoke recurse with all children of currentNode.
                // each recurse returns "sublists" which are appended to the lastChild to build the "complete" list
                li.lastChild.appendChild(recurse(currentNode.children[i]));
            }
            return li;
        };
        // step 1 invoke recurse starting at the root node of the tree
        ul.appendChild(recurse(this._root));

        // this styles and adds click event for the parent nodes (ie list items with the caret) 
        var toggler = ul.getElementsByClassName("caret");
        for (var i = 0; i < toggler.length; i++) {
            toggler[i].addEventListener("click", function() {
            this.parentElement.querySelector(".nested").classList.toggle("active"); //expand & contract
            this.classList.toggle("caret-down"); //rotate & restyle as before::
            });
        }
        console.log(ul);
        return ul;
    };
    /*
     * MakeTreeJSON builds a breadth-first tree from JSON
     */
    this.makeTreeJSON = function (json) {
        var currentNode = this._root;
        /* spin through each json obj(s) */
        for (var i = 0; i < json.length; i++) {
            /* spin through each obj property(s) */
            for (var p in json[i]) {
                /* do we have a property? Remember left joins may have returned null (ie. "") columns meaning 0 children */
                if (json[i][p].length > 0) { 
                    /* traverse tree & callback every node. as we visit each node. if this prop is found set it to our current position in the tree */
                    this.contains(function(node){ 
                        /* if the prop is already on the tree. position on it in case later we may add children under here and also know not to add it again */
                        if (node.data === json[i][p]) {
                            currentNode = node;
                        }
                    }, this.traverseDF);
                    /* we didnt find the prop so add it and position on it in case later we may add children under here */
                    if (currentNode.data !== json[i][p]) {
                        this.add(
                            json[i][p], /* add this child... */
                            currentNode.data, /* to this parent node... */
                            this.traverseDF); /* searching for the parent node with traverseDF */
                        this.contains(function(node){ /* position on the node just added */
                            if (node.data === json[i][p]) {
                                currentNode = node;
                            }
                        }, this.traverseDF);
                    }
                } else {
                    break; /* no more to descendants to add for this json obj. */
                }                    
            }
            currentNode = this._root; // position to tree root and move to the next obj
        }
        console.log(this);
        this.printTreeBF();
        return this;
    };            
}   
