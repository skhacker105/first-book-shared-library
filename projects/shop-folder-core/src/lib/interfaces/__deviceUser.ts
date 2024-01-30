export interface IUser {
    name: string;
    mainPhoneNumber: string;
    otherPhoneNumbers: string[];
    selectedFolderContactId?: number;
}