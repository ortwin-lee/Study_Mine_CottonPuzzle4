import {
    EventEnum,
    ItemStatusEnum,
    ItemTypeEnum,
    SAVA_NAME_PREFIX,
    sceneNameEnum,
    TriggerStateEnum
} from "db://assets/Scripts/Enum";
import Singleton from "db://assets/Scripts/Base/Singleton";
import {EventManager} from "db://assets/Scripts/Runtime/EventManager";
import {sys} from "cc";

interface IItem {
    type: ItemTypeEnum;
    status: ItemStatusEnum;
}

export default class DataManager extends Singleton {
    private _items: Array<IItem> = [
        {
            type: ItemTypeEnum.Key,
            status: ItemStatusEnum.Scene,
        },
        {
            type: ItemTypeEnum.Mail,
            status: ItemStatusEnum.Disable,
        }
    ]

    private _curScene: sceneNameEnum = null;

    private _curInventoryItem: IItem | null = null;
    private _isSelected_CurInventoryItem: boolean = false;

    private _mailBoxSwitchState: TriggerStateEnum = TriggerStateEnum.UnTriggered;
    private _grandMaStatus: TriggerStateEnum = TriggerStateEnum.UnTriggered;
    private _grandMaDialogIndex = -1;

    readonly H2ATruePosition = [0, 1, 2, 3, null, 5, 6];
    readonly H2AInitPosition = [1, 0, 6, 5, null, 3, 2];
    private _H2AData = [...this.H2AInitPosition];

    private _H2DoorStatus: TriggerStateEnum = TriggerStateEnum.UnTriggered;

    private _StorageArray: string[] = [];

    static get Instance() {
        return super.getInstance<DataManager>();
    }

    get items() {
        return this._items;
    }

    set items(items: Array<IItem>) {
        this._items = items;
        this.render();
    }

    get curInventoryItem() {
        return this._curInventoryItem;
    }

    set curInventoryItem(value: IItem) {
        this._curInventoryItem = value;
        this.render();
    }

    get isSelected_CurInventoryItem(): boolean {
        return this._isSelected_CurInventoryItem;
    }

    set isSelected_CurInventoryItem(value: boolean) {
        this._isSelected_CurInventoryItem = value;
        this.render();
    }

    get mailBoxSwitchState() {
        return this._mailBoxSwitchState;
    }

    set mailBoxSwitchState(value: TriggerStateEnum) {
        this._mailBoxSwitchState = value;
        this.render();
    }

    get grandMaStatus() {
        return this._grandMaStatus;
    }

    set grandMaStatus(value: TriggerStateEnum) {
        this._grandMaStatus = value;
        this.render();
    }

    get grandMaDialogIndex(): number {
        return this._grandMaDialogIndex;
    }

    set grandMaDialogIndex(value: number) {
        this._grandMaDialogIndex = value;
        this.render();
    }

    get H2AData(): (number | null)[] {
        return this._H2AData;
    }

    set H2AData(value: (number | null)[]) {
        this._H2AData = value;
        this.render();
    }

    public get H2DoorStatus() {
        return this._H2DoorStatus;
    }

    public set H2DoorStatus(value: TriggerStateEnum) {
        this._H2DoorStatus = value;
        this.render();
    }

    public get curScene() {
        return this._curScene;
    }

    public set curScene(value: sceneNameEnum) {
        this._curScene = value;
        this.render();
    }

    public get StorageArray(): string[] {
        return this._StorageArray;
    }

    public set StorageArray(value: string[]) {
        this._StorageArray = value;
    }




    private render() {
        //触发渲染
        EventManager.Instance.emit(EventEnum.Render);
    }

    public save() {
        const length = this._StorageArray.length;
        if(length >= 10) {
            let removeName = this._StorageArray.shift();
            sys.localStorage.removeItem(removeName);
        }
        let name = `${SAVA_NAME_PREFIX}${Math.random()*100000000}`;
        this._StorageArray.push(name);
        sys.localStorage.setItem(name, JSON.stringify({
            items: this._items,
            curScene: this._curScene,
            curInventoryItem: this._curInventoryItem,
            isSelected_CurInventoryItem: this._isSelected_CurInventoryItem,
            mailBoxSwitchState: this._mailBoxSwitchState,
            grandMaStatus: this._grandMaStatus,
            grandMaDialogIndex: this._grandMaDialogIndex,
            H2AData: this._H2AData,
            H2DoorStatus: this._H2DoorStatus,
        }))
    }

    public restore(saveName: string) {
        const _data = sys.localStorage.getItem(saveName);
        try {
            const data = JSON.parse(_data);
            this._items = data.items;
            this._curScene = data.curScene;
            this._curInventoryItem = data.curInventoryItem;
            this._isSelected_CurInventoryItem = data.isSelected_CurInventoryItem;
            this._mailBoxSwitchState = data.mailBoxSwitchState;
            this._grandMaStatus = data.grandMaStatus;
            this._grandMaDialogIndex = data.grandMaDialogIndex;
            this._H2AData = data.H2AData;
            this._H2DoorStatus = data.H2DoorStatus;
        } catch (e) {
            console.log(e);
        }
    }

    public reset() {
        this._items = [
            {
                type: ItemTypeEnum.Key,
                status: ItemStatusEnum.Scene,
            },
            {
                type: ItemTypeEnum.Mail,
                status: ItemStatusEnum.Disable,
            }
        ]
        this._curScene = sceneNameEnum.H1;
        this._curInventoryItem = null;
        this._isSelected_CurInventoryItem = false;
        this._mailBoxSwitchState = TriggerStateEnum.UnTriggered;
        this._grandMaStatus = TriggerStateEnum.UnTriggered;
        this._grandMaDialogIndex = -1;
        this._H2AData = [...this.H2AInitPosition];
        this._H2DoorStatus = TriggerStateEnum.UnTriggered;
    }
}