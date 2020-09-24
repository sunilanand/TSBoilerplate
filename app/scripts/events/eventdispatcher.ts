/**
 * EventDispatcher (TypeScript)
 * - Simple extendable event dispatching class
 *
 * @version 1.0.0
 * @author Amit Jain
 * @license MIT License
 **/
export class EventDispatcher {
	private _listeners;
	private listeners
	private handlers;
	private scope;
	private context;
	constructor() {
		this._listeners = [];
	}

	public addEventListener(type, method) {
		//console.log(this._listeners)
		
		if (!(this.listeners = this._listeners)) {
			this.listeners = this._listeners = {};
		}
		if (!(this.handlers = this.listeners[type])){
			this.handlers = this.listeners[type] = [];
		}
		this.scope = (this.scope ? this.scope : window);
		this.handlers.push({
			method: method,
			scope: this.scope,
			context: (this.context ? this.context : this.scope)
		});
	}
	
	public dispatchEvent(type, data={}) {
		var i, n, handler;
		//console.log('called',this.handlers,this.listeners)
		if (!(this.listeners = this._listeners)) {
			return;
		}
		if (!(this.handlers = this.listeners[type])){
			return;
		}
		for (i = 0, n = this.handlers.length; i < n; i++){			
			handler = this.handlers[i];
			//console.log(handler,'called inside',this.context)
			if (typeof(this.context)!=="undefined" && this.context !== handler.context) continue;
			if (handler.method.call(
				handler.scope, this, type, data
			)===false) {
				return false;
			}
		}
		return true;
	}
}


