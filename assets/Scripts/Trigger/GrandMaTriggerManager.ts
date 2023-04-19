/**
 * @date: Fri Mar 10 2023 05:55:53 GMT+0800 (中国标准时间)
 * @filename: GrandMotherTriggerManager.ts
 * @author: alinda
 * @url: db://assets/Scripts/Trigger/GrandMotherTriggerManager.ts
 */
import {_decorator, Component, Node, Label} from 'cc';
import {TriggerManager} from "db://assets/Scripts/Trigger/TriggerManager";
import {ItemStatusEnum, ItemTypeEnum, TriggerStateEnum, TriggerTypeEnum} from "db://assets/Scripts/Enum";
import DataManager from "db://assets/Scripts/Runtime/DataManager";

const {ccclass, property} = _decorator;

@ccclass('GrandMaTriggerManager')
export class GrandMaTriggerManager extends TriggerManager {
    public type: TriggerTypeEnum = TriggerTypeEnum.Grandma;

    @property(Node)
    public dialogNode: Node = null;
    @property(Label)
    public label: Label = null;

    private readonly _unTriggeredDialogContentList = [
        "我年纪大了，很多事情想不起来了。",
        "你是谁？算了，我也不在乎你是谁。你能帮我找到信箱的钥匙吗？",
        "老头子说最近会给我寄船票过来，叫我和他一起出去看看。虽然我没有什么兴趣...",
        "他折腾了一辈子，不是躲在楼上捣鼓什么时间机器，就是出海找点什么东西。",
        "这些古怪的电视节目真没有什么意思。",
        "老头子说这个岛上有很多秘密，其实我知道，不过是岛上的日子太孤独，他找点事情做罢了。",
        "人嘛，谁没有年轻过。年轻的时候...算了，不说这些往事了。",
        "老了才明白，万物静默如迷。"
    ];

    private readonly _triggeredDialogContentList = [
        "没想到老头子的船票寄过来了，谢谢你。"
    ];


    public render() {
        if(DataManager.Instance.grandMaDialogIndex === -1) {
            this.dialogNode.active = false;
            return;
        } else {
            this.dialogNode.active = true;
        }

        if(DataManager.Instance.grandMaStatus === TriggerStateEnum.UnTriggered) {
            this.label.string = this._unTriggeredDialogContentList[DataManager.Instance.grandMaDialogIndex];
        } else if (DataManager.Instance.grandMaStatus === TriggerStateEnum.Triggered) {
            this.label.string = this._triggeredDialogContentList[DataManager.Instance.grandMaDialogIndex];
        }
    }

    public onClick() {
        if(DataManager.Instance.grandMaStatus === TriggerStateEnum.UnTriggered) {
            if(DataManager.Instance.curInventoryItem?.type === ItemTypeEnum.Mail && DataManager.Instance.isSelected_CurInventoryItem) {
                DataManager.Instance.curInventoryItem = null;
                DataManager.Instance.isSelected_CurInventoryItem = false;
                DataManager.Instance.items.find(i=> i.type === ItemTypeEnum.Mail).status = ItemStatusEnum.Disable;
                DataManager.Instance.grandMaStatus = TriggerStateEnum.Triggered;
                DataManager.Instance.grandMaDialogIndex = 0;
            } else {
                if(DataManager.Instance.grandMaDialogIndex >= this._unTriggeredDialogContentList.length - 1 ) {
                    DataManager.Instance.grandMaDialogIndex = -1;
                } else {
                    DataManager.Instance.grandMaDialogIndex++;
                }
            }

        } else if (DataManager.Instance.grandMaStatus === TriggerStateEnum.Triggered) {
            if(DataManager.Instance.grandMaDialogIndex >= this._triggeredDialogContentList.length - 1 ) {
                DataManager.Instance.grandMaDialogIndex = -1;
            } else {
                DataManager.Instance.grandMaDialogIndex++;
            }
        }
    }
}

