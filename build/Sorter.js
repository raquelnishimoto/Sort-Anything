"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sorter = void 0;
var Sorter = /** @class */ (function () {
    function Sorter() {
    }
    Sorter.prototype.sort = function () {
        var length = this.length;
        for (var idx = 0; idx < length; idx++) {
            for (var iidx = 0; iidx < length - idx - 1; iidx++) {
                if (this.compare(iidx, iidx + 1)) {
                    this.swap(iidx, iidx + 1);
                }
            }
        }
    };
    return Sorter;
}());
exports.Sorter = Sorter;
