/**
 * @date: Tue Mar 07 2023 22:46:29 GMT+0800 (中国标准时间)
 * @filename: SceneManager.ts
 * @author: alinda
 * @url: db://assets/Scripts/Manager/SceneManager/SceneManager.ts
 */
import {_decorator, director, Event, instantiate, Node, Prefab} from 'cc';
import {sceneNameEnum} from '../../Enum';
import {RenderManager} from "db://assets/Scripts/Base/RenderManager";
import DataManager from "db://assets/Scripts/Runtime/DataManager";


const {ccclass, property} = _decorator;


@ccclass('SceneManager')
export abstract class SceneManager extends RenderManager {

    @property(Node)
    public itemsNode: Node | null = null;

    @property(Prefab)
    public inventoryPrefab: Prefab | null = null;

    @property(Prefab)
    public menuPrefab: Prefab | null = null;


    protected abstract type: sceneNameEnum;

    start() {
        super.start();
        if (this.inventoryPrefab) {
            const node = instantiate(this.inventoryPrefab);
            this.node.addChild(node);
        }

        if (this.menuPrefab) {
            const node = instantiate(this.menuPrefab);
            this.node.addChild(node);
        }
    }

    public preloadScene(scene: sceneNameEnum) {
        director.preloadScene(scene);
    }

    public onChangeScene(e: Event, eventData: string) {
        DataManager.Instance.curScene = eventData as sceneNameEnum;
    }

    public render() {
        if (this.type !== DataManager.Instance.curScene) {
            director.loadScene(DataManager.Instance.curScene);
        }
    }
}


