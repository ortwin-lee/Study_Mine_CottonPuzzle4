/**
 * @date: Wed Mar 08 2023 02:31:37 GMT+0800 (中国标准时间)
 * @filename: MailItem.ts
 * @author: alinda
 * @url: db://assets/Scripts/Item/MailItem.ts
 */
import { _decorator, Component, Node } from 'cc';
import {Item} from "db://assets/Scripts/Item/Item";
import {ItemStatusEnum, ItemTypeEnum} from "db://assets/Scripts/Enum";
const { ccclass, property } = _decorator;

@ccclass('MailItem')
export class MailItem extends Item {
    public labelString: string = '船票';
    public type: ItemTypeEnum = ItemTypeEnum.Mail;
}


