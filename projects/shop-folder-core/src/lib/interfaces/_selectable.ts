export interface ISelectable {
    isSelected: boolean;
    markSelected(): boolean;
    markUnselected(): boolean;
    toggleSelection(): boolean;
}