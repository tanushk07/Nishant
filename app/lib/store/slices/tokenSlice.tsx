import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TokenState {
  selectedToken: string | null;
  priceUpdates: Record<string, number>;
}

const initialState: TokenState = {
  selectedToken: null,
  priceUpdates: {},
};

export const tokenSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    selectToken: (state, action: PayloadAction<string>) => {
      state.selectedToken = action.payload;
    },
    updatePrice: (
      state,
      action: PayloadAction<{ symbol: string; price: number }>
    ) => {
      state.priceUpdates[action.payload.symbol] = action.payload.price;
    },
  },
});

export const { selectToken, updatePrice } = tokenSlice.actions;
export default tokenSlice.reducer;
