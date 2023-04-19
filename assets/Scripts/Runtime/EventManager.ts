/**
 * @date: Wed Mar 08 2023 05:59:28 GMT+0800 (中国标准时间)
 * @filename: EventManager.ts
 * @author: alinda
 * @url: db://assets/Scripts/Runtime/EventManager.ts
 */
import Singleton from "db://assets/Scripts/Base/Singleton";

interface IItem {
    fn: Function,
    target: unknown
}

export class EventManager extends Singleton {
    private _eventDir: Map<string, Array<IItem>> = new Map();

    static get Instance() {
        return super.getInstance<EventManager>();
    }

    on(eventName: string, fn: Function, target: unknown) {
        if (this._eventDir.has(eventName)) {
            this._eventDir.get(eventName).push({fn,target});
        } else {
            this._eventDir.set(eventName, [{fn,target}]);
        }
    }

    off(eventName: string, fn?: Function, target?: unknown) {
        if (!this._eventDir.has(eventName)) {
            return;
        }

        if (!fn) {
            this._eventDir.delete(eventName);
        } else {
            const index = this._eventDir.get(eventName).findIndex(x => x.fn === fn && x.target === target);
            index > -1 && this._eventDir.get(eventName).splice(index, 1);
        }
    }

    emit(eventName: string, ...params: unknown[]) {
        if (this._eventDir.has(eventName)) {
            this._eventDir.get(eventName).forEach(({fn, target}) => {
                target ? fn.apply(target, ...params) : fn(...params);
            });
        }
    }


    clear() {
        this._eventDir.clear();
    }
}


