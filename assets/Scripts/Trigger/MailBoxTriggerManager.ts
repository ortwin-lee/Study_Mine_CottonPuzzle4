/**
 * @date: Thu Mar 09 2023 18:54:43 GMT+0800 (中国标准时间)
 * @filename: MailBoxTriggerManager.ts
 * @author: alinda
 * @url: db://assets/Scripts/Trigger/MailBoxTriggerManager.ts
 */
import { _decorator, Component, Node } from 'cc';
import {TriggerManager} from "db://assets/Scripts/Trigger/TriggerManager";
import DataManager from "db://assets/Scripts/Runtime/DataManager";
import {ItemStatusEnum, ItemTypeEnum, TriggerStateEnum, TriggerTypeEnum} from "db://assets/Scripts/Enum";

const { ccclass, property } = _decorator;

@ccclass('MailBoxTriggerManager')
export class MailBoxTriggerManager extends TriggerManager {
    public type: TriggerTypeEnum = TriggerTypeEnum.MailBox;

    @property(Node)
    public openMailBoxNode: Node = null;
    @property(Node)
    public closeMailBoxNode: Node = null;

    public render() {
        const isOpen = DataManager.Instance.mailBoxSwitchState === TriggerStateEnum.Triggered;
        this.openMailBoxNode.active = isOpen;
        this.closeMailBoxNode.active = !isOpen;
    }

    public onClick() {
        if(DataManager.Instance.curInventoryItem?.type === ItemTypeEnum.Key && DataManager.Instance.isSelected_CurInventoryItem) {
            DataManager.Instance.curInventoryItem = null;
            DataManager.Instance.isSelected_CurInventoryItem = false;
            DataManager.Instance.items.find(i=> i.type === ItemTypeEnum.Key).status = ItemStatusEnum.Disable;
            DataManager.Instance.items.find(i=> i.type === ItemTypeEnum.Mail).status = ItemStatusEnum.Scene;
            DataManager.Instance.mailBoxSwitchState = TriggerStateEnum.Triggered;
        }
    }
}


