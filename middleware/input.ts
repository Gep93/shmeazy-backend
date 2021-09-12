import Joi, { array, required } from "joi";
import { ObjectId } from "mongodb";

class ValidateInput {
    constructor(){
        this.shoppingLists = this.shoppingLists.bind(this);
        this.shoppingList = this.shoppingList.bind(this);
    }

    shoppingLists(req, res, next) {
        if(req.params.id) {
            const result = listSchema.validate(req.body.list);
            if(result.error) {next({status: "400"});}
            next();
            return;
        }
        const result = listSchema.validate(req.body.list);
        console.log(result);
        if(result.error) {next({status: "400"});}
        next();
    }

    shoppingList(req, res, next) {
      if(req.params.id !== new ObjectId(req.params.id).toString())
      next({status: "400"});
      const result = listSchema.validate(req.body.list);
      if(result.error) next({status: "400"});
      next();
    }
}

let listSchema = Joi.object({
    _id: Joi.string().empty('').default(''),
    name: Joi.string().min(3),
    created: Joi.string(),
    items: Joi.array().items({
      _id: Joi.string().empty('').default(''),
      name: Joi.string().required().min(3),
      packaging: Joi.string().empty('').default(''),
      unit: Joi.string().empty('').default(''),
      quantity: Joi.string().empty('').default(''),
      note: Joi.string().empty('').default(''),
      checked: Joi.boolean().required()
    })
  }).required();

  let shoppingListsSchema = Joi.object({
    _id: Joi.string().empty('').default(''),
    userId: Joi.string(),
    shoppingLists: Joi.array().items(listSchema)
  }).required();

  export default new ValidateInput();