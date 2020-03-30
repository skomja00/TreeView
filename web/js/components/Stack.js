/* 
* 
* Stack class
* 
*/
function Stack() {
   this._size = 0;
   this._storage = {};

   this.push = function(data) {
       var size = ++this._size;
       this._storage[size] = data;
   };
   this.pop = function() {
       var size = this._size,
           deletedData;
       if (size) {
           deletedData = this._storage[size];
           delete this._storage[size];
           this._size--;
           return deletedData;
       }
   };
}