import {Document, model} from "mongoose";
import {IShoppingLists} from "../../interfaces";
import shoppingListsSchema from "../../schemas/shoppingListsSchema";

const ShoppingLists = model<Document & IShoppingLists>("ShoppingLists", shoppingListsSchema); 

export default ShoppingLists;