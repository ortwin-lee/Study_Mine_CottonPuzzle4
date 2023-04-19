/**
 * @date: Sat Mar 11 2023 10:08:54 GMT+0800 (中国标准时间)
 * @filename: H2ASceneManager.ts
 * @author: alinda
 * @url: db://assets/Scripts/Manager/SceneManager/H2ASceneManager.ts
 */
import {_decorator, Node} from 'cc';
import {SceneManager} from "db://assets/Scripts/Manager/SceneManager/SceneManager";
import {sceneNameEnum} from "db://assets/Scripts/Enum";
import DataManager from "db://assets/Scripts/Runtime/DataManager";

const {ccclass, property} = _decorator;

@ccclass('H2ASceneManager')
export class H2ASceneManager extends SceneManager {
    protected type: sceneNameEnum = sceneNameEnum.H2A;

    @property(Node)
    public resetNode: Node = null;

    onEnable() {
        this.resetNode.on(Node.EventType.TOUCH_START, this.resetContent, this.resetNode);
    }

    start() {
        super.start();
        this.preloadScene(sceneNameEnum.H3);
    }

    onDisable() {
        this.resetNode.off(Node.EventType.TOUCH_START, this.resetContent, this.resetNode);
    }

    public resetContent() {
        DataManager.Instance.H2AData = [...DataManager.Instance.H2AInitPosition];
    }
}


