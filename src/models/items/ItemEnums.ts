import ITypedMap from '../util/ITypedMap';

export enum ItemRank {
    NORMAL,
    MAGIC,
    RARE,
    UNIQUE,
    LEGENDARY,
    DIVINE,
    ANCIENT,
};

export enum ItemType {

}

export enum ItemState {
    NONE = -1,
    STRENGTH = 0,
    AGILITY = 1,
    INTELLECT = 2,
    VITALITY = 3,
    PHYSICAL_DAMAGE_MIN = 4,
    PHYSICAL_DAMAGE_MAX = 5,
    MAGICAL_DAMAGE_MIN = 6,
    MAGICAL_DAMAGE_MAX = 7,
    PHYSICAL_DEFENSE = 8,
    MAGICAL_DEFENSE = 9,
    PARALYZE = 10,
    PARALYZE_RESIST = 11,
    CRITICAL = 12,
    CRITICAL_RESIST = 13,
    STUN = 14,
    STUN_RESIST = 15,
    FIRE_ATTACK = 16,
    ICE_ATTACK = 17,
    LIGHT_ATTACK = 18,
    DARK_ATTACK = 19,
    FIRE_DEFENSE = 20,
    ICE_DEFENSE = 21,
    LIGHT_DEFENSE = 22,
    DARK_DEFENSE = 23,
    MOVEMENT_SPEED = 24,
    HP = 25,
    MANA = 26,
    MANA_RECOVERY = 27,
    TWENTY_EIGHT = 28,
    FINAL_DAMAGE = 29,
    SAFE_ZONE_MOVEMENT_SPEED = 30,
    THIRTY_ONE = 31,
    PHYSICAL_DAMAGE_MINMAX = 32,
    MAGICAL_DAMAGE_MINMAX = 33,
    STR_AGI_INT_VIT = 37,
    STRENGTH_PERCENT = 50,
    AGILITY_PERCENT = 51,
    INTELLECT_PERCENT = 52,
    VITALITY_PERCENT = 53,
    PHYSICAL_DAMAGE_MIN_PERCENT = 54,
    PHYSICAL_DAMAGE_MAX_PERCENT = 55,
    MAGICAL_DAMAGE_MIN_PERCENT = 56,
    MAGICAL_DAMAGE_MAX_PERCENT = 57,
    PHYSICAL_DEFENSE_PERCENT = 58,
    MAGICAL_DEFENSE_PERCENT = 59,
    PARALYZE_PERCENT = 60,
    PARALYZE_RESIST_PERCENT = 61,
    CRITICAL_PERCENT = 62,
    CRITICAL_RESIST_PERCENT = 63,
    STUN_PERCENT = 64,
    STUN_RESIST_PERCENT = 65,
    MOVEMENT_SPEED_PERCENT = 74,
    HP_PERCENT = 75,
    MP_PERCENT = 76,
    MANA_RECOVERY_PERCENT = 77,
    FINAL_DAMAGE_PERCENT = 79,
    SAFE_ZONE_MOVEMENT_SPEED_PERCENT = 81,
    STR_AGI_INT_VIT_PERCENT = 87,
    FIRE_ICE_LIGHT_DARK_ATTACK = 88,
    WILL = 100,
    PHYSICAL_DAMAGE_MINMAX_PERCENT = 101,
    MAGICAL_DAMAGE_MINMAX_PERCENT = 102,
    CRITICAL_DAMAGE = 103,
    CRITICAL_DAMAGE_PERCENT = 104,
    PVP_DAMAGE = 105,
    PVP_DEFENSE = 106,
    ONE_HUNDRED_SEVEN = 107,
}

export interface IItemStateInfo {
    abbv: string;
    type: 'stat'|'percent'|'compound';
    compound?: ItemState[];
    minmax?: 'min'|'max';
}

export const StateInfo: { [key: number]: IItemStateInfo } = {
    [ItemState.STRENGTH]: {
        abbv: 'STR',
        type: 'stat',
    },
    [ItemState.AGILITY]: {
        abbv: 'AGI',
        type: 'stat',
    },
    [ItemState.INTELLECT]: {
        abbv: 'INT',
        type: 'stat',
    },
    [ItemState.VITALITY]: {
        abbv: 'VIT',
        type: 'stat',
    },
    [ItemState.PHYSICAL_DAMAGE_MIN]: {
        abbv: 'PDMG [MIN]',
        type: 'stat',
        minmax: 'min',
    },
    [ItemState.PHYSICAL_DAMAGE_MAX]: {
        abbv: 'PDMG [MAX]',
        type: 'stat',
        minmax: 'max',
    },
    [ItemState.MAGICAL_DAMAGE_MIN]: {
        abbv: 'MDMG [MIN]',
        type: 'stat',
        minmax: 'min',
    },
    [ItemState.MAGICAL_DAMAGE_MAX]: {
        abbv: 'MDMG [MAX]',
        type: 'stat',
        minmax: 'max',
    },
    [ItemState.PHYSICAL_DEFENSE]: {
        abbv: 'PDEF',
        type: 'stat',
    },
    [ItemState.MAGICAL_DEFENSE]: {
        abbv: 'MDEF',
        type: 'stat',
    },
    [ItemState.PARALYZE]: {
        abbv: 'PARA',
        type: 'stat',
    },
    [ItemState.PARALYZE_RESIST]: {
        abbv: 'PARARES',
        type: 'stat',
    },
    [ItemState.CRITICAL]: {
        abbv: 'CRIT',
        type: 'stat',
    },
    [ItemState.CRITICAL_RESIST]: {
        abbv: 'CRITRES',
        type: 'stat',
    },
    [ItemState.STUN]: {
        abbv: 'STUN',
        type: 'stat',
    },
    [ItemState.STUN_RESIST]: {
        abbv: 'STUNRES',
        type: 'stat',
    },
    [ItemState.FIRE_ATTACK]: {
        abbv: 'FIRE %',
        type: 'percent',
    },
    [ItemState.ICE_ATTACK]: {
        abbv: 'ICE %',
        type: 'percent',
    },
    [ItemState.LIGHT_ATTACK]: {
        abbv: 'LIGHT %',
        type: 'percent',
    },
    [ItemState.DARK_ATTACK]: {
        abbv: 'DARK %',
        type: 'percent',
    },
    [ItemState.FIRE_DEFENSE]: {
        abbv: 'FIRE DEF%',
        type: 'percent',
    },
    [ItemState.ICE_DEFENSE]: {
        abbv: 'ICE DEF%',
        type: 'percent',
    },
    [ItemState.LIGHT_DEFENSE]: {
        abbv: 'LIGHT DEF%',
        type: 'percent',
    },
    [ItemState.DARK_DEFENSE]: {
        abbv: 'DARK DEF%',
        type: 'percent',
    },
    [ItemState.MOVEMENT_SPEED]: {
        abbv: 'MOVE',
        type: 'stat',
    },
    [ItemState.HP]: {
        abbv: 'HP',
        type: 'stat'
    },
    [ItemState.MANA]: {
        abbv: 'MANA',
        type: 'stat'
    },
}

export enum WeaponType {
    WA_GREATSWORD = 0,
    WA_GAUNTLET = 1,
    WA_AXE = 2,
    WA_HAMMER = 3,
    AR_SHORTBOW = 4,
    AR_LONGBOW = 5,
    AR_CROSSBOW = 6,
    SO_STAFF = 7,
    SO_GRIMOIRE = 8,
    SO_ORB = 9,
    SO_PUPPET = 10,
    CL_MACE = 11,
    CL_FLAIL = 12,
    CL_WAND = 13,
    CL_SHIELD = 14,
    AR_QUIVER = 15,
    AC_CANNON = 16,
    AC_BUBBLE_BLASTER = 17,
    AC_POWERGLOVE = 18,
    KA_FAN = 19,
    KA_CHAKRAM = 20,
    KA_CHARM = 21,
    AS_SCIMITAR = 22,
    AS_DAGGER = 23,
    AS_HOOK = 24,
    LE_SPEAR = 25,
    LE_LANCE = 26,
    LE_BRACELET = 27,
    MC_KNUCKLE = 28,
    MC_BLASTER = 29,
    MC_CLAW = 30,
    CONVERSION_MAINHAND = 31,
    CONVERSION_OFFHAND = 32,
}
