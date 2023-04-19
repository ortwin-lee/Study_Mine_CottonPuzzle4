/**
 * @date: Tue Mar 07 2023 22:46:50 GMT+0800 (中国标准时间)
 * @filename: H2SceneManager.ts
 * @author: alinda
 * @url: db://assets/Scripts/Manager/SceneManager/H2SceneManager.ts
 */
import {_decorator, instantiate, Node, Prefab} from 'cc';
import {SceneManager} from './SceneManager';
import {ItemStatusEnum, ItemTypeEnum, sceneNameEnum} from '../../Enum';
import DataManager from "db://assets/Scripts/Runtime/DataManager";

const { ccclass, property } = _decorator;

@ccclass('H2SceneManager')
export class H2SceneManager extends SceneManager {
    @property(Prefab)
    public keyPrefab: Prefab = null;

    @property(Node)
    public keyLocationNode: Node = null;

    protected type: sceneNameEnum = sceneNameEnum.H2;

    start() {
        super.start();
        this.preloadScene(sceneNameEnum.H1);
        this.preloadScene(sceneNameEnum.H2A);
        this.preloadScene(sceneNameEnum.H4);
    }

    public render() {
        super.render();
        this.itemsNode.destroyAllChildren();
        const key = DataManager.Instance.items.find(x => x.type === ItemTypeEnum.Key);
        if(key && key.status === ItemStatusEnum.Scene) {
            const keyNode = instantiate(this.keyPrefab);
            this.itemsNode.addChild(keyNode);
            keyNode.setPosition(this.keyLocationNode.position);
        }
    }
}


