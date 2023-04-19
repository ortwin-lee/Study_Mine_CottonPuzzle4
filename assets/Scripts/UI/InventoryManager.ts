/**
 * @date: Wed Mar 08 2023 18:02:10 GMT+0800 (中国标准时间)
 * @filename: InventoryManager.ts
 * @author: alinda
 * @url: db://assets/Scripts/UI/InventoryManager.ts
 */
import { _decorator, Component, Node, Label, Button, Prefab, instantiate } from 'cc';
import {RenderManager} from "db://assets/Scripts/Base/RenderManager";
import DataManager from "db://assets/Scripts/Runtime/DataManager";
import {ItemStatusEnum, ItemTypeEnum} from "db://assets/Scripts/Enum";
import {Item} from "db://assets/Scripts/Item/Item";

const { ccclass, property } = _decorator;

@ccclass('InventoryManager')
export class InventoryManager extends RenderManager {
    @property(Prefab)
    public keyPrefab: Prefab = null;
    @property(Prefab)
    public mailPrefab: Prefab = null;


    @property(Label)
    public label: Label = null;
    @property(Button)
    public leftBtn: Button = null;
    @property(Button)
    public rightBtn: Button = null;
    @property(Node)
    public placeholder: Node = null;
    @property(Node)
    public hand:Node = null;

    onEnable() {
        this.placeholder.on(Node.EventType.TOUCH_START, this.changeSelectStatus, this);
    }

    onDisable() {
        this.placeholder.off(Node.EventType.TOUCH_START, this.changeSelectStatus, this);
    }

    public changeSelectStatus() {
        DataManager.Instance.isSelected_CurInventoryItem = !DataManager.Instance.isSelected_CurInventoryItem;
    }

    public render() {
        const curItem = DataManager.Instance.curInventoryItem;
        if(!curItem || curItem.status !== ItemStatusEnum.Inventory) {
            const itemsInventory = DataManager.Instance.items.filter(item=> item.status === ItemStatusEnum.Inventory);
            if(itemsInventory.length > 0) {
                this.generateItem(itemsInventory[0].type);
                DataManager.Instance.curInventoryItem = itemsInventory[0];
            } else {
                this.node.active = false;
            }
        } else {
            this.generateItem(curItem.type);
        }

        this.hand.active = Boolean(DataManager.Instance.curInventoryItem) && DataManager.Instance.curInventoryItem.status === ItemStatusEnum.Inventory && DataManager.Instance.isSelected_CurInventoryItem;
        this.changeBtnInteraction();
    }

    protected generateItem(type: ItemTypeEnum) {
        this.node.active = true;
        this.placeholder.destroyAllChildren();
        switch (type) {
            case ItemTypeEnum.Key:
                const keyNode = instantiate(this.keyPrefab);
                this.placeholder.addChild(keyNode);
                this.label.string = keyNode.getComponent(Item).labelString;
                break;
            case ItemTypeEnum.Mail:
                const mailNode = instantiate(this.mailPrefab);
                this.placeholder.addChild(mailNode);
                this.label.string = mailNode.getComponent(Item).labelString;
                break;
            default:
                break;
        }
    }


    handleLeftBtnClick() {
        if(DataManager.Instance.curInventoryItem === null) {
            return;
        }

        const itemsInventory = DataManager.Instance.items.filter(item=> item.status === ItemStatusEnum.Inventory);
        const index = itemsInventory.findIndex(i => i.type === DataManager.Instance.curInventoryItem.type);
        if(index > 0) {
            DataManager.Instance.curInventoryItem = itemsInventory[index - 1];
        }
    }

    handleRightBtnClick() {
        if(DataManager.Instance.curInventoryItem === null) {
            return;
        }

        const itemsInventory = DataManager.Instance.items.filter(item=> item.status === ItemStatusEnum.Inventory);
        const index = itemsInventory.findIndex(i => i.type === DataManager.Instance.curInventoryItem.type);
        if(index < itemsInventory.length - 1) {
            DataManager.Instance.curInventoryItem = itemsInventory[index + 1];
        }
    }

    changeBtnInteraction() {
        const itemsInventory = DataManager.Instance.items.filter(item=> item.status === ItemStatusEnum.Inventory);
        const index = itemsInventory.findIndex(i => i.type === DataManager.Instance.curInventoryItem.type);
        this.leftBtn.interactable = index > 0;
        this.rightBtn.interactable = index < itemsInventory.length - 1;
    }


}


