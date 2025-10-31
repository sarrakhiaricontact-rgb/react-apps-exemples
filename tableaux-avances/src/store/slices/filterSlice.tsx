import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { FilterState } from "../../types/types";

const initialState: FilterState = {
  searchTerm: "",
  sortBy: "id",
  sortOrder: "asc",
  currentPage: 1,
  pageSize: 10,
  selectedTab: "users",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.currentPage = 1;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      if (state.sortBy === action.payload) {
        state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
      } else {
        state.sortBy = action.payload;
        state.sortOrder = "asc";
      }
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
      state.currentPage = 1;
    },
    setSelectedTab: (state, action: PayloadAction<"users" | "posts">) => {
      state.selectedTab = action.payload;
      state.currentPage = 1;
      state.searchTerm = "";
    },
  },
});

// ✅ Correct exports
export const {
  setSearchTerm,
  setSortBy,
  setCurrentPage,
  setPageSize,
  setSelectedTab,
} = filterSlice.actions;

export default filterSlice.reducer;
