/**
 * @date: Fri Mar 10 2023 18:31:48 GMT+0800 (中国标准时间)
 * @filename: H2AGameManager.ts
 * @author: alinda
 * @url: db://assets/Scripts/Manager/H2A/H2AGameManager.ts
 */
import {_decorator, EventTouch, instantiate, Node, Prefab, UITransform, director} from 'cc';
import {RenderManager} from "db://assets/Scripts/Base/RenderManager";
import DataManager from "db://assets/Scripts/Runtime/DataManager";
import {ContentManager} from "db://assets/Scripts/Manager/H2A/ContentManager";
import {sceneNameEnum, TriggerStateEnum} from "db://assets/Scripts/Enum";

const {ccclass, property} = _decorator;

@ccclass('H2AGameManager')
export class H2AGameManager extends RenderManager {
    @property([Node])
    public circles: Node[] = [];
    @property(Node)
    public linesNode: Node = null;
    @property(Prefab)
    public linePrefab: Prefab = null;

    @property([Node])
    public contentNodes: Node | null[] = [];

    private _circleConnectivityArray: Array<number[]> = null;


    onEnable() {
        for(let i = 0; i < this.circles.length; i++) {
            this.circles[i].on(Node.EventType.TOUCH_START, (e)=>{
                this.onClick(e,i);
            }, this.circles[i])
        }
    }

    onDisable() {
        for(let i = 0; i < this.circles.length; i++) {
            this.circles[i].off(Node.EventType.TOUCH_START, (e)=>{
                this.onClick(e,i);
            }, this.circles[i])
        }
    }


    start() {
        super.start();
        this.checkSuccess();
        this.generateCircleConnectivityArray();
        this.generateLines();
    }


    public render() {
        for (let i = 0; i < this.circles.length; i++) {
            const position = this.circles[i].position;

            const contentIndex = DataManager.Instance.H2AData[i];
            if (contentIndex !== null) {
                this.contentNodes[contentIndex]?.setPosition(position);
            }
        }
    }

    public generateCircleConnectivityArray() {
        this._circleConnectivityArray = [
            [1, 4, 5],
            [0, 3, 4],
            [3, 4],
            [1, 2, 4, 5],
            [0, 1, 2, 3, 5, 6],
            [0, 3, 4, 6],
            [4, 5]
        ];
    }

    public generateLines() {
        for (let i = 0; i < this._circleConnectivityArray.length; i++) {
            for (const j of this._circleConnectivityArray[i]) {
                if (i < j) {
                    this.generateLine(i, j);
                }
            }
        }
    }

    public generateLine(start: number, end: number) {
        const line = instantiate(this.linePrefab);

        const {x: x1, y: y1} = this.circles[start].position;
        const {x: x2, y: y2} = this.circles[end].position;

        const adjacent = x2 - x1;
        const opposite = y2 - y1;

        const length = Math.sqrt(adjacent ** 2 + opposite ** 2);
        const angle = opposite / Math.abs(opposite) * Math.acos(adjacent / length) * 180 / Math.PI;

        this.linesNode.addChild(line);
        line.setPosition(x1, y1);

        const uiTransform = line.getComponent(UITransform);
        const {y: h} = uiTransform.contentSize;
        uiTransform.setContentSize(length, h);

        line.setRotationFromEuler(0, 0, angle);
    }

    public onClick(e: EventTouch, circleIndex: number) {
        const curContentIndex = DataManager.Instance.H2AData[circleIndex];
        if(curContentIndex === null) {
            return;
        }

        const curCircleConnectivityArray = this._circleConnectivityArray[circleIndex];
        for (let i = 0; i < curCircleConnectivityArray.length; i++) {
            const connectedCircleIndex = curCircleConnectivityArray[i];
            const connectedContentIndex = DataManager.Instance.H2AData[connectedCircleIndex];
            if(connectedContentIndex === null) {
                DataManager.Instance.H2AData[circleIndex] = connectedContentIndex;
                DataManager.Instance.H2AData[connectedCircleIndex] = curContentIndex;
                DataManager.Instance.H2AData = [...DataManager.Instance.H2AData];
            }
        }

        this.checkSuccess();
    }


    public checkSuccess() {
        if(DataManager.Instance.H2AData.every((value, i) => value === DataManager.Instance.H2ATruePosition[i] )) {
            DataManager.Instance.H2DoorStatus = TriggerStateEnum.Triggered;
            DataManager.Instance.curScene =  sceneNameEnum.H3;
        }
    }
}


