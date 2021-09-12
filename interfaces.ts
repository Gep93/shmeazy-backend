import mongoose from "mongoose";

export interface IUser {
    username: string,
      email: string,
      password: string,
      dateCreated: string,
      verified: boolean,
      shoppingLists: IList[]
  }

export interface IItem {
  name: string,
  quantity: string,
  unit: string,
  packaging: string,
  note: string,
  checked: boolean
}

export interface IList {
    _id?: string,
    name?: string,
    created?: string,
    items?: [IItem]
  }

  export interface IShoppingLists {
    _id?: string,
    userId: string,
    shoppingLists: IList[];
  }