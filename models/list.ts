import mongoose, { Schema } from "mongoose";
import {IList} from "../interfaces";

export const listSchema = new Schema({
    name: String,
    created: String,
    items: [{
        name: String,
        quantity: String,
        unit: String,
        packaging: String,
        note: String,
        checked: Boolean
    }]
})
const List = mongoose.model<IList & mongoose.Document>("List", listSchema);

export default List;
