/**
 * @date: Wed Mar 08 2023 02:31:27 GMT+0800 (中国标准时间)
 * @filename: KeyItem.ts
 * @author: alinda
 * @url: db://assets/Scripts/Item/KeyItem.ts
 */
import { _decorator, Node } from 'cc';
import {Item} from "db://assets/Scripts/Item/Item";
import {ItemStatusEnum, ItemTypeEnum} from "db://assets/Scripts/Enum";
const { ccclass, property } = _decorator;

@ccclass('KeyItem')
export class KeyItem extends Item {
    public labelString: string = '信箱钥匙';
    public type: ItemTypeEnum = ItemTypeEnum.Key;


}


