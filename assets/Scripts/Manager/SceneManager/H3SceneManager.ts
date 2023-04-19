/**
 * @date: Tue Mar 07 2023 22:46:58 GMT+0800 (中国标准时间)
 * @filename: H3SceneManager.ts
 * @author: alinda
 * @url: db://assets/Scripts/Manager/SceneManager/H3SceneManager.ts
 */
import { _decorator } from 'cc';
import { SceneManager } from './SceneManager';
import { sceneNameEnum } from '../../Enum';
const { ccclass } = _decorator;

@ccclass('H3SceneManager')
export class H3SceneManager extends SceneManager {
    protected type: sceneNameEnum = sceneNameEnum.H3;
    start() {
        super.start();
        this.preloadScene(sceneNameEnum.H2);
    }
}


