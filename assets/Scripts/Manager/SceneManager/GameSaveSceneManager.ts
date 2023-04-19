/**
 * @date: Sat Mar 11 2023 13:34:11 GMT+0800 (中国标准时间)
 * @filename: GameSaveSceneManager.ts
 * @author: alinda
 * @url: db://assets/Scripts/Manager/SceneManager/GameSaveSceneManager.ts
 */
import {_decorator, Component, Event, Node, director, Prefab, instantiate, Label} from 'cc';
import {SceneManager} from "db://assets/Scripts/Manager/SceneManager/SceneManager";
import {sceneNameEnum} from "db://assets/Scripts/Enum";
import DataManager from "db://assets/Scripts/Runtime/DataManager";

const { ccclass, property } = _decorator;

@ccclass('GameSaveSceneManager')
export class GameSaveSceneManager extends SceneManager {

    @property(Prefab)
    public catalogPrefab: Prefab = null;

    @property(Node)
    public listNode: Node = null;

    protected type: sceneNameEnum = sceneNameEnum.GameSave;

    start() {
        super.start();
        this.preloadScene(sceneNameEnum.Menu);
        this.generateList();
    }


    public generateList() {
        this.listNode.destroyAllChildren();
        for (const storageArrayElement of DataManager.Instance.StorageArray) {
            if(storageArrayElement) {
                const catalogNode = instantiate(this.catalogPrefab);
                catalogNode.getComponentInChildren(Label).string = storageArrayElement;
                this.listNode.addChild(catalogNode);
            }
        }
    }
    
    public onChangeScene() {
        director.loadScene(sceneNameEnum.Menu);
    }

    public render() {

    }

}


