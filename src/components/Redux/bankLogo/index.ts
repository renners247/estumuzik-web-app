// src/store/slices/bankLogosSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface BankLogosState {
  logos: Record<string, string>;
  loading: boolean;
  loaded: boolean;
}

const initialState: BankLogosState = {
  logos: {},
  loading: false,
  loaded: false,
};

export const fetchBankLogos = createAsyncThunk(
  "bankLogos/fetch",
  async (_, { getState }) => {
    const state = getState() as { bankLogos: BankLogosState };
    if (state.bankLogos.loaded) return;

    const { data } = await axios.get("https://nigerianbanks.xyz");

    console.log("Bank Logos:", data);
    if (!data.status) throw new Error("Failed to fetch banks");

    return data.data;
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as { bankLogos: BankLogosState };
      return !state.bankLogos.loaded && !state.bankLogos.loading;
    },
  }
);

const bankLogosSlice = createSlice({
  name: "bankLogos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBankLogos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBankLogos.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;

        action.payload.forEach((bank: any) => {
          const nameKey = bank.name.toLowerCase();
          state.logos[nameKey] = bank.logo;
          state.logos[bank.code] = bank.logo;
        });
      })
      .addCase(fetchBankLogos.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Only export the reducer + the thunk (optional but recommended)
// export { fetchBankLogos };
export default bankLogosSlice.reducer;
