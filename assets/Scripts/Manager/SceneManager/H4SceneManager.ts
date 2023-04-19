/**
 * @date: Tue Mar 07 2023 22:47:07 GMT+0800 (中国标准时间)
 * @filename: H4SceneManager.ts
 * @author: alinda
 * @url: db://assets/Scripts/Manager/SceneManager/H4SceneManager.ts
 */
import {_decorator, instantiate, Node, Prefab,} from 'cc';
import { SceneManager } from './SceneManager';
import {ItemStatusEnum, ItemTypeEnum, sceneNameEnum} from '../../Enum';
import DataManager from "db://assets/Scripts/Runtime/DataManager";
const { ccclass, property} = _decorator;

@ccclass('H4SceneManager')
export class H4SceneManager extends SceneManager {

    @property(Prefab)
    public mailPrefab: Prefab = null;

    @property(Node)
    public mailLocationNode: Node = null;

    protected type: sceneNameEnum = sceneNameEnum.H4;

    start() {
        super.start();
        this.preloadScene(sceneNameEnum.H2);
    }

    public render() {
        super.render();
        this.itemsNode.destroyAllChildren();
        const mail = DataManager.Instance.items.find(x => x.type === ItemTypeEnum.Mail);
        if(mail && (mail.status === ItemStatusEnum.Scene)) {
            const mailNode = instantiate(this.mailPrefab);
            this.itemsNode.addChild(mailNode);
            mailNode.setPosition(this.mailLocationNode.position);
        }
    }
}


