/**
 * @date: Wed Mar 08 2023 06:47:31 GMT+0800 (中国标准时间)
 * @filename: RenderManager.ts
 * @author: alinda
 * @url: db://assets/Scripts/Base/RenderManager.ts
 */
import { _decorator, Component, Node } from 'cc';
import {EventManager} from "db://assets/Scripts/Runtime/EventManager";
import {EventEnum} from "db://assets/Scripts/Enum";
const { ccclass, property } = _decorator;

@ccclass('RenderManager')
export abstract class RenderManager extends Component {
    onLoad() {
        EventManager.Instance.on(EventEnum.Render, this.render, this);
    }

    onDestroy() {
        EventManager.Instance.off(EventEnum.Render, this.render, this);
    }

    start() {
        this.render();
    }

    abstract render(): void;
}


