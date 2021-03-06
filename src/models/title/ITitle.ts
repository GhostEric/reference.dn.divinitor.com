import IUiStringMessage from '../uistring/IUiStringMessage';
import IItemState from '../items/IItemState';

export default interface ITitle {
    id: number;
    name: IUiStringMessage;
    description: IUiStringMessage;
    requiredLevel: number;
    colorCode: number;
    type: number;
    displayColor: string;
    foregroundColor: string;
    backgroundColor: string;
    skillLinkItemId: number;
    states: IItemState[];
}
