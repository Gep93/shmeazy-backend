import mongoose, {Schema} from "mongoose";
import { IShoppingLists } from "../interfaces";

const shoppingListsSchema = new Schema({
    userId: String,
    shoppingLists: [
        {
            name: String,
            created: String,
            items: [
                {
                    name: String,
                    quantity: String,
                    unit: String,
                    packaging: String,
                    note: String,
                    checked: Boolean
                }
            ]
        }
    ]
});

shoppingListsSchema.statics.getShoppingList = async function(req) {
    let {shoppingLists} = await this.findOne({userId: req.user._id}, {shoppingLists: {$elemMatch: {_id: req.params.id}}});
    return {list: shoppingLists[0]};
}

shoppingListsSchema.statics.getShoppingLists = async function(req) {
    let {shoppingLists} = await this.findOne({userId: req.user._id});
    return {lists: shoppingLists};
}

shoppingListsSchema.statics.updateShoppingList = async function(req) {
    let shoppingListsDoc = await this.find({userId: req.user._id});
    shoppingListsDoc[0].shoppingLists = shoppingListsDoc[0].shoppingLists.map(list => {
        if(list._id.toString() === req.params.id) return {...req.body.list};
        return list;
    });
    let data = await shoppingListsDoc[0].save();
    const list = data.shoppingLists.filter(list => list._id.toString() === req.params.id);

    return {list: list[0]};
}

/**
 * Returns updated shopping lists for a given user
 *
 * @param {any} req Request parameter.
 * @returns Shopping Lists for a given user.
 */
shoppingListsSchema.statics.updateShoppingLists = async function(req) {
    let shoppingListsDoc = await this.find({userId: req.user._id});
    if(!shoppingListsDoc[0].shoppingLists) throw new Error("No lists found for given user");
    shoppingListsDoc[0].shoppingLists = req.body.lists;
    const {shoppingLists} = await shoppingListsDoc[0].save();

    return {lists: shoppingLists};
}

/**
 * Adds new shopping list to existing shopping lists.
 * 
 * @param {any} req Request parameter.
 * @returns Shopping lists for given user.
 */
shoppingListsSchema.statics.addNewShoppingList = async function(req) { 
    let shoppingListsDoc = null;
    shoppingListsDoc = await this.find({userId: req.user._id});
    if(!shoppingListsDoc[0]) { 
        // @ts-ignore
        const shoppingLists = await this.createNewShoppingListsResource(req);
        return {lists: [...shoppingLists]};
    }
    shoppingListsDoc[0].shoppingLists.push(req.body.list);
    const {shoppingLists} = await shoppingListsDoc[0].save();

    return {lists: shoppingLists};
}

/**
 * Deletes shopping list of a given user.
 * 
 * @param {any} req Request parameter.
 * @returns Shopping lists for given user.
 */
shoppingListsSchema.statics.deleteShoppingList = async function(req) {
    const shoppingListsDoc = await this.find({userId: req.user._id});
    if(!shoppingListsDoc[0].shoppingLists) throw new Error("No lists found for given user");
    shoppingListsDoc[0].shoppingLists = shoppingListsDoc[0].shoppingLists.filter(list => list._id.toString() !== req.params.id.toString()); 
    const {shoppingLists} = await shoppingListsDoc[0].save();

    return shoppingLists;
}

/**
 * Deletes all shopping lists of a given user.
 * 
 * @param {any} req Request parameter.
 * @returns Empty array.
 */
shoppingListsSchema.statics.deleteAllShoppingLists = async function(req) {
    const shoppingListsDoc = await this.find({userId: req.user._id});
    if(!shoppingListsDoc[0].shoppingLists) throw new Error("No lists found for given user");
    shoppingListsDoc[0].shoppingLists = [];
    const {shoppingLists} = await shoppingListsDoc[0].save();

    return {lists: shoppingLists};
}

shoppingListsSchema.statics.createNewShoppingListsResource = async function(req) {
    const ShoppingLists =  mongoose.model<IShoppingLists & mongoose.Document>("ShoppingList", shoppingListsSchema);
    const shoppingListsDoc = new ShoppingLists({
        userId: req.user._id,
        shoppingLists: [
            req.body.list
        ]
    });
    const {shoppingLists} = await shoppingListsDoc.save();
    return shoppingLists;
}

export default shoppingListsSchema;