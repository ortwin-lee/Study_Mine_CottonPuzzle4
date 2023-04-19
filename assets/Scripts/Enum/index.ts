export enum sceneNameEnum {
    H1 = 'H1',
    H2 = 'H2',
    H2A = 'H2A',
    H3 = 'H3',
    H4 = 'H4',
    Menu = 'Menu',
    GameSave = 'GameSave'
}

export enum ItemStatusEnum {
    Scene = 'Scene',
    Inventory = 'Inventory',
    Disable = 'Disable',
}

export enum ItemTypeEnum {
    Key = 'Key',
    Mail = 'Mail',
}

export enum EventEnum {
    Render = 'Render',
}

export enum TriggerTypeEnum {
    MailBox = 'MailBox',
    Grandma = 'Grandma',
    Door = 'Door'
}

export enum TriggerStateEnum {
    Triggered = 'Triggered',
    UnTriggered = 'unTriggered',
}

export const SAVA_NAME_PREFIX = 'storage_key_';