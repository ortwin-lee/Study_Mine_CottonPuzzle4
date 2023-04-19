/**
 * @date: Sat Mar 11 2023 11:24:15 GMT+0800 (中国标准时间)
 * @filename: menuManager.ts
 * @author: alinda
 * @url: db://assets/Scripts/UI/menuManager.ts
 */
import { _decorator, Component, Node, director } from 'cc';
import {sceneNameEnum} from "db://assets/Scripts/Enum";
const { ccclass, property } = _decorator;

@ccclass('MenuManager')
export class MenuManager extends Component {
    onEnable() {
        this.node.on(Node.EventType.TOUCH_START, this._onClick, this);
    }

    onDisable() {
        this.node.off(Node.EventType.TOUCH_START, this._onClick, this);
    }

    private _onClick() {
        director.loadScene(sceneNameEnum.Menu);
    }
}


