export interface ISelectable {
    isSelected: boolean;
    markSelected?(): void;
    markUnselected?(): void;
    toggleSelection?(): void;
}