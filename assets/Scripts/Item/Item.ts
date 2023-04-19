/**
 * @date: Wed Mar 08 2023 02:31:15 GMT+0800 (中国标准时间)
 * @filename: Item.ts
 * @author: alinda
 * @url: db://assets/Scripts/Item/Item.ts
 */
import {_decorator, Node, SpriteFrame, Sprite} from 'cc';
import {ItemStatusEnum, ItemTypeEnum} from '../Enum/index';
import DataManager from "db://assets/Scripts/Runtime/DataManager";
import {RenderManager} from "db://assets/Scripts/Base/RenderManager";

const {ccclass, property} = _decorator;

@ccclass('Item')
export class Item extends RenderManager {
    public labelString: string = '物品';
    public type: ItemTypeEnum;

    @property(SpriteFrame)
    public sceneSF: SpriteFrame = null;

    @property(SpriteFrame)
    public InventorySF: SpriteFrame = null;

    start() {
        super.start()
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    public onTouchEnd() {
        const item = DataManager.Instance.items.find(item => item.type === this.type);

        if (!item) {
            return;
        }

        if (item.status === ItemStatusEnum.Scene) {
            item.status = ItemStatusEnum.Inventory;
            DataManager.Instance.items = [...DataManager.Instance.items];
            DataManager.Instance.curInventoryItem = item;
        }

    }

    public render() {
        const status = DataManager.Instance.items.find(item => item.type === this.type)?.status;
        if (!status) {
            return;
        } else {
            const spriteComponent = this.getComponent(Sprite);
            switch (status) {
                case ItemStatusEnum.Scene:
                    this.node.active = true;
                    spriteComponent.spriteFrame = this.sceneSF;
                    break;
                case ItemStatusEnum.Inventory:
                    this.node.active = true;
                    spriteComponent.spriteFrame = this.InventorySF;
                    break;
                case ItemStatusEnum.Disable:
                    this.node.active = false;
                    break;
            }
        }
    }
}


