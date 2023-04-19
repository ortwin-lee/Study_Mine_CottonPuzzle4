/**
 * @date: Sat Mar 11 2023 11:15:32 GMT+0800 (中国标准时间)
 * @filename: MenuSceneManager.ts
 * @author: alinda
 * @url: db://assets/Scripts/Manager/SceneManager/MenuSceneManager.ts
 */
import { _decorator, Component, Node, director, Button, Label, Color } from 'cc';
import {SceneManager} from "db://assets/Scripts/Manager/SceneManager/SceneManager";
import {sceneNameEnum} from "db://assets/Scripts/Enum";
import DataManager from "db://assets/Scripts/Runtime/DataManager";
const { ccclass, property } = _decorator;

@ccclass('MenuSceneManager')
export class MenuSceneManager extends SceneManager {

    @property(Node)
    public continueNode:Node = null;
    @property(Node)
    public saveGameNode:Node = null;

    protected type: sceneNameEnum = sceneNameEnum.Menu;

    private _a = [0,1,2,3,4,5,6,7,8,9];
    start() {
        super.start();
        this.preloadScene(sceneNameEnum.H1);
        this.preloadScene(sceneNameEnum.GameSave);
        if(!DataManager.Instance.curScene) {
            this.continueNode.getComponent(Button).interactable = false;
            this.continueNode.getChildByName('Label').getComponent(Label).color = new Color('#3A1919');
            this.saveGameNode.getComponent(Button).interactable = false;
            this.saveGameNode.getChildByName('Label').getComponent(Label).color = new Color('#3A1919');
        }
    }

    public newGame() {
        DataManager.Instance.reset();
        director.loadScene(sceneNameEnum.H1);
    }

    public continue() {
        director.loadScene(DataManager.Instance.curScene);
    }

    public loadGame() {
        director.loadScene(sceneNameEnum.GameSave);
    }

    public saveGame() {
        DataManager.Instance.save();
        this.saveGameNode.getComponent(Button).interactable = false;
        this.saveGameNode.getChildByName('Label').getComponent(Label).color = new Color('#3A1919');
    }

    public render() {

    }
}


