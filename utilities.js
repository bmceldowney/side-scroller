var Utilities;

(function () {
    Utilities = {};

    Utilities.reduceValue = function (value, factor, tolerance) {
        var val = value * factor;
        
        if (Math.abs(val) < tolerance) {
            val = 0;
        }

        return val;
    };
})();