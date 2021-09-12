import express from "express";
import ShoppingLists from "../services/shoppingList/ShoppingListModel";
import validate from "../middleware/input";
import asyncMiddleware from "../middleware/async";

const router = express.Router({mergeParams: true});

// returns all Lists of a given user
router.get("/", asyncMiddleware(async (req, res) => {
    let data: any;
    // @ts-ignore
    data = await ShoppingLists.getShoppingLists(req);
    res.send(data);
}));

// returns list with given id of a given user
router.get("/:id", asyncMiddleware(async (req, res) => {
    let data: any;
    // @ts-ignore
    data = await ShoppingLists.getShoppingList(req);
    res.send(data);
}));

router.put("/:id", validate.shoppingList , asyncMiddleware(async (req, res) => {
  let data: any;
  // @ts-ignore
  data = await ShoppingLists.updateShoppingList(req);
  res.send(data);
}));

router.post("/", validate.shoppingLists, asyncMiddleware(async (req, res) => {
  let data: any;
  // @ts-ignore
  data = await ShoppingLists.addNewShoppingList(req);
  res.send(data);
}));

router.put("/", asyncMiddleware(async (req, res) => {
  let data: any;
  // @ts-ignore
  data = await ShoppingLists.updateShoppingLists(req);
  res.send(data);
}));

router.delete("/:id", asyncMiddleware(async (req, res) => {
  let data: any;
  // @ts-ignore
  data = await ShoppingLists.deleteShoppingList(req);
  res.send(data);
}));

router.delete("/", asyncMiddleware(async (req, res) => {
  let data: any;
  // @ts-ignore
  data = await ShoppingLists.deleteAllShoppingLists(req);
  res.send(data);
}));

export default router;