/**
 * @date: Thu Mar 09 2023 18:51:12 GMT+0800 (中国标准时间)
 * @filename: TriggerManager.ts
 * @author: alinda
 * @url: db://assets/Scripts/Trigger/TriggerManager.ts
 */
import {_decorator, Component, Node, Prefab} from 'cc';
import {RenderManager} from "db://assets/Scripts/Base/RenderManager";
import {TriggerTypeEnum} from "db://assets/Scripts/Enum";
const { ccclass, property } = _decorator;

@ccclass('TriggerManager')
export abstract class TriggerManager extends RenderManager {
    public type: TriggerTypeEnum;

    @property(Node)
    public TriggerNode: Node | null = null;

    onEnable() {
        if(this.TriggerNode) {
            this.TriggerNode.on(Node.EventType.TOUCH_START, this.onClick, this);
        }
    }

    onDisable() {
        if(this.TriggerNode) {
            this.TriggerNode.off(Node.EventType.TOUCH_START, this.onClick, this);
        }
    }

    abstract onClick();
}


