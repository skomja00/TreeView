/*
 * 
 * Queue class
 * 
 */
function Queue() {
    this._oldestIndex = 1;
    this._newestIndex = 1;
    this._storage = {};

    this.size = function() {
        return this._newestIndex - this._oldestIndex;
    };
    this.enqueue = function(data) {
        this._storage[this._newestIndex] = data;
        this._newestIndex++;
    };
    this.dequeue = function() {
        var oldestIndex = this._oldestIndex,
            newestIndex = this._newestIndex,
            deletedData;
        if (oldestIndex !== newestIndex) {
            deletedData = this._storage[oldestIndex];
            delete this._storage[oldestIndex];
            this._oldestIndex++;
           return deletedData;
        }
    }; 
}  