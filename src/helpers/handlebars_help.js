// module.exports = {
//     select: function (selected, option) {
//         return (selected == option) ? 'selected="selected"' : '';
//     }
// };

module.exports = {
    inc: function(value, options)
    {
        return parseInt(value) + 1;
    },    
    select: function(selected, options){
          return options.fn(this).replace(
               new RegExp(' value=\"' + selected + '\"'), 
               '$& selected="selected"').replace( new RegExp('>' + selected + '</option>'), 
               ' selected="selected"$&');
      },
      ifeq: function (a, b, options) {
        if (a ==  b ) { return options.fn(this); }
        return options.inverse(this);
    },
    ifNoteq: function (a, b, options) {
        if (a != b) { return options.fn(this); }
        return options.inverse(this);
    },    
    eq: function (v1, v2) {
        return v1 === v2;
    },
    ne: function (v1, v2) {
        return v1 !== v2;
    },
    lt: function (v1, v2) {
        return v1 < v2;
    },
    gt: function (v1, v2) {
        return v1 > v2;
    },
    lte: function (v1, v2) {
        return v1 <= v2;
    },
    gte: function (v1, v2) {
        return v1 >= v2;
    },
    and: function () {
        return Array.prototype.slice.call(arguments).every(Boolean);
    },
    or: function () {
        return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
    }    

};