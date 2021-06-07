import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload]
    },
    removeFromBasket: (state, action) => {
      // use this when same item added in counter incresing
      // const newBasket = state.items.filter((basketItem) => basketItem.id !== action.payload.id);
      // state.items = newBasket

      const index = state.items.findIndex(basketItem => basketItem.id == action.payload.id)
      let newBasket = [...state.items]

      if (index >= 0) newBasket.splice(index, 1)
      else console.warn(`Can't remove product ${action.payload.id} as its does not exist!`)

      state.items = newBasket
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectedItemsTotal = (state) => state.basket.items.reduce((total, item) => total + item.price, 0)

export default basketSlice.reducer;
