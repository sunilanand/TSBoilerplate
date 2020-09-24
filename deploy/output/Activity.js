var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("events/eventdispatcher", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * EventDispatcher (TypeScript)
     * - Simple extendable event dispatching class
     *
     * @version 1.0.0
     * @author Amit Jain
     * @license MIT License
     **/
    var EventDispatcher = /** @class */ (function () {
        function EventDispatcher() {
            this._listeners = [];
        }
        EventDispatcher.prototype.addEventListener = function (type, method) {
            //console.log(this._listeners)
            if (!(this.listeners = this._listeners)) {
                this.listeners = this._listeners = {};
            }
            if (!(this.handlers = this.listeners[type])) {
                this.handlers = this.listeners[type] = [];
            }
            this.scope = (this.scope ? this.scope : window);
            this.handlers.push({
                method: method,
                scope: this.scope,
                context: (this.context ? this.context : this.scope)
            });
        };
        EventDispatcher.prototype.dispatchEvent = function (type, data) {
            if (data === void 0) { data = {}; }
            var i, n, handler;
            //console.log('called',this.handlers,this.listeners)
            if (!(this.listeners = this._listeners)) {
                return;
            }
            if (!(this.handlers = this.listeners[type])) {
                return;
            }
            for (i = 0, n = this.handlers.length; i < n; i++) {
                handler = this.handlers[i];
                //console.log(handler,'called inside',this.context)
                if (typeof (this.context) !== "undefined" && this.context !== handler.context)
                    continue;
                if (handler.method.call(handler.scope, this, type, data) === false) {
                    return false;
                }
            }
            return true;
        };
        return EventDispatcher;
    }());
    exports.EventDispatcher = EventDispatcher;
});
define("ObjectDiv", ["require", "exports", "events/eventdispatcher"], function (require, exports, eventdispatcher_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ObjectDiv = /** @class */ (function (_super) {
        __extends(ObjectDiv, _super);
        function ObjectDiv(str) {
            var _this = _super.call(this) || this;
            _this.objHTML = $("<div>");
            _this.myStr = "";
            _this.myStr = str;
            _this.createObject();
            return _this;
        }
        ObjectDiv.prototype.createObject = function () {
            this.objHTML.append(this.myStr);
            this.objHTML.draggable();
            this.addEvents();
        };
        ObjectDiv.prototype.onClick = function (e) {
            console.log(e.data.myStr, this.myStr, "on click");
            e.data.dispatchEvent(ObjectDiv.CREATED, { 'obj': e.data.myStr }); // example dispatch event to emit
        };
        ObjectDiv.prototype.addEvents = function () {
            console.log(this.myStr);
            this.objHTML.bind('click', this, this.onClick); // example to add events
        };
        ObjectDiv.prototype.getHTML = function () {
            return this.objHTML;
        };
        ObjectDiv.CREATED = "ObjectsCreated";
        return ObjectDiv;
    }(eventdispatcher_1.EventDispatcher));
    exports.ObjectDiv = ObjectDiv;
});
define("model/model", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Model = /** @class */ (function () {
        function Model() {
            //...
        }
        Object.defineProperty(Model, "Instance", {
            get: function () {
                // Do you need arguments? Make it a regular method instead.
                return this._instance || (this._instance = new this());
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Model.prototype, "myText", {
            get: function () {
                return "MyWorld";
            },
            enumerable: true,
            configurable: true
        });
        return Model;
    }());
    exports.Model = Model;
});
define("Controller", ["require", "exports", "ObjectDiv", "model/model"], function (require, exports, ObjectDiv_1, model_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller = /** @class */ (function () {
        function Controller($container) {
            this.modelRef = model_1.Model.Instance;
            this.$container = $container;
            this.bootStrapComponents();
        }
        Controller.prototype.bootStrapComponents = function () {
            this.oObjectDiv1 = new ObjectDiv_1.ObjectDiv("Hello sunil!!");
            this.oObjectDiv1.addEventListener(ObjectDiv_1.ObjectDiv.CREATED, this.fnCallback); // Listen to events
            this.oObjectDiv2 = new ObjectDiv_1.ObjectDiv(this.modelRef.myText); //singleton model ref
            this.oObjectDiv2.addEventListener(ObjectDiv_1.ObjectDiv.CREATED, this.fnCallback);
            this.oObjectDiv3 = new ObjectDiv_1.ObjectDiv("My Name is amit ");
            this.oObjectDiv3.addEventListener(ObjectDiv_1.ObjectDiv.CREATED, this.fnCallback); // Listen to events
            this.render();
        };
        Controller.prototype.fnCallback = function (e, eType, eData) {
            console.log(eData);
        };
        Controller.prototype.render = function () {
            this.$container.append(this.oObjectDiv1.getHTML());
            this.$container.append(this.oObjectDiv2.getHTML());
            this.$container.append(this.oObjectDiv3.getHTML());
        };
        return Controller;
    }());
    exports.Controller = Controller;
});
define("Activity", ["require", "exports", "Controller"], function (require, exports, Controller_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var oController = new Controller_1.Controller($("#activityContainer"));
});

//# sourceMappingURL=Activity.js.map
