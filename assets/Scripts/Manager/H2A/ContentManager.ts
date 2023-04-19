/**
 * @date: Sat Mar 11 2023 03:56:31 GMT+0800 (中国标准时间)
 * @filename: ContentManager.ts
 * @author: alinda
 * @url: db://assets/Scripts/Manager/H2A/ContentManager.ts
 */
import {_decorator, Component, Node, SpriteFrame, CCInteger, Sprite} from 'cc';
import {RenderManager} from "db://assets/Scripts/Base/RenderManager";
import DataManager from "db://assets/Scripts/Runtime/DataManager";

const {ccclass, property} = _decorator;

@ccclass('ContentManager')
export class ContentManager extends RenderManager {
    @property(SpriteFrame)
    public normalSpriteFrame: SpriteFrame = null;

    @property(SpriteFrame)
    public successSpriteFrame: SpriteFrame = null;

    @property({type:CCInteger})
    public index: number = 0;

    public render() {
        const locationIndex = DataManager.Instance.H2AData.findIndex(i => i===this.index);
        if(this.index === DataManager.Instance.H2ATruePosition[locationIndex]) {
            this.getComponent(Sprite).spriteFrame = this.successSpriteFrame;
        } else {
            this.getComponent(Sprite).spriteFrame = this.normalSpriteFrame;
        }
    }
}


