import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OverviewOption {
	id: number;
	name: string;
}

interface OverviewState {
	selectedOverview: OverviewOption;
	overviewOptions: OverviewOption[];
}

const overviewOptions: OverviewOption[] = [
	{ id: 1, name: "Financials" },
	{ id: 2, name: "ID Verifications" },
	{ id: 3, name: "Business Verifications" },
	{ id: 4, name: "Credit Bureau Report" },
	{ id: 5, name: "SMS Service" },
	{ id: 6, name: "Email Service" },
];

const initialState: OverviewState = {
	selectedOverview: overviewOptions[0],
	overviewOptions: overviewOptions,
};

const overviewSlice = createSlice({
	name: "overview-data",
	initialState,
	reducers: {
		resetOverview: () => {
			return initialState;
		},
		setSelectedOverview: (state, action: PayloadAction<OverviewOption>) => {
			state.selectedOverview = action.payload;
		},
		updateOverviewOptions: (state, action: PayloadAction<OverviewOption[]>) => {
			state.overviewOptions = action.payload;
			// Reset selected overview to first option if current selection is no longer in options
			if (
				!action.payload.find(
					(option) => option.id === state.selectedOverview.id,
				)
			) {
				state.selectedOverview = action.payload[0];
			}
		},
	},
});

export const { resetOverview, setSelectedOverview, updateOverviewOptions } =
	overviewSlice.actions;
export default overviewSlice.reducer;
