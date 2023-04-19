/**
 * @date: Sat Mar 11 2023 14:08:40 GMT+0800 (中国标准时间)
 * @filename: CatalogManager.ts
 * @author: alinda
 * @url: db://assets/Scripts/Manager/GameSave/CatalogManager.ts
 */
import { _decorator, Component, Node, Label, director } from 'cc';
import DataManager from "db://assets/Scripts/Runtime/DataManager";
const { ccclass, property } = _decorator;

@ccclass('CatalogManager')
export class CatalogManager extends Component {
    public onClick() {
        const saveName = this.node.getComponentInChildren(Label).string;
        DataManager.Instance.restore(saveName);
        director.loadScene(DataManager.Instance.curScene);
    }
}


