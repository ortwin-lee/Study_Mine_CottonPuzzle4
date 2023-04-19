/**
 * @date: Sat Mar 11 2023 09:35:17 GMT+0800 (中国标准时间)
 * @filename: DoorTriggerManager.ts
 * @author: alinda
 * @url: db://assets/Scripts/Trigger/DoorTriggerManager.ts
 */
import { _decorator, Component, Node, director, Sprite } from 'cc';
import {TriggerManager} from "db://assets/Scripts/Trigger/TriggerManager";
import {sceneNameEnum, TriggerStateEnum, TriggerTypeEnum} from "db://assets/Scripts/Enum";
import DataManager from "db://assets/Scripts/Runtime/DataManager";

const { ccclass, property } = _decorator;

@ccclass('DoorTriggerManager')
export class DoorTriggerManager extends TriggerManager {
    public type: TriggerTypeEnum = TriggerTypeEnum.Door;


    onClick() {
        if(DataManager.Instance.H2DoorStatus === TriggerStateEnum.UnTriggered) {
            DataManager.Instance.curScene =  sceneNameEnum.H2A;
        } else {
            DataManager.Instance.curScene =  sceneNameEnum.H3;
        }
    }

    render(): void {
        this.node.getComponent(Sprite).enabled = DataManager.Instance.H2DoorStatus === TriggerStateEnum.UnTriggered;
    }
}


