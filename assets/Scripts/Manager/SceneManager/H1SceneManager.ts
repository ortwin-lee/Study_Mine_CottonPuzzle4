/**
 * @date: Tue Mar 07 2023 22:46:41 GMT+0800 (中国标准时间)
 * @filename: H1SceneManager.ts
 * @author: alinda
 * @url: db://assets/Scripts/Manager/SceneManager/H1SceneManager.ts
 */
import { _decorator } from 'cc';
import { SceneManager } from './SceneManager';
import { sceneNameEnum } from '../../Enum';

const { ccclass } = _decorator;

@ccclass('H1SceneManager')
export class H1SceneManager extends SceneManager {
    protected type: sceneNameEnum = sceneNameEnum.H1;

    start() {
        super.start();
        this.preloadScene(sceneNameEnum.H2);
    }

}


