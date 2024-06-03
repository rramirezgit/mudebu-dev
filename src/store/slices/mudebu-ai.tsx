'use client';

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { mudebuAIState } from './types';

const initialState: mudebuAIState = {
  haveBenchmarks: false,
  benchmarkList: [],
  blendList: [],
  editImage: false,
  brushRadius: 10,
  brushRadiusEditor: false,
  reloadEditor: false,
  imageSelectedFinishing: null,
  mask: null,
  activeStep: 0,
};

export const mudebuAiSlice = createSlice({
  name: 'mudebuAI',
  initialState,
  reducers: {
    setHaveBenchmarks: (state, action: PayloadAction<boolean>) => {
      state.haveBenchmarks = action.payload;
    },
    setBenchmarkList: (state, action: PayloadAction<any[]>) => {
      state.benchmarkList = action.payload;
    },
    setBlendList: (state, action: PayloadAction<any[]>) => {
      state.blendList = action.payload;
    },
    setEditImage: (state, action: PayloadAction<boolean>) => {
      state.editImage = action.payload;
    },
    setBrushRadius: (state, action: PayloadAction<number>) => {
      state.brushRadius = action.payload;
    },
    setBrushRadiusEditor: (state, action: PayloadAction<boolean>) => {
      state.brushRadiusEditor = action.payload;
    },
    setReloadEditor: (state, action: PayloadAction<boolean>) => {
      state.reloadEditor = action.payload;
    },
    setimageSelectedFinishing: (state, action: PayloadAction<any>) => {
      state.imageSelectedFinishing = action.payload;
    },
    setMask: (state, action: PayloadAction<any>) => {
      state.mask = action.payload;
    },
    setActiveStep: (state, action: PayloadAction<number>) => {
      state.activeStep = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setHaveBenchmarks,
  setBenchmarkList,
  setBlendList,
  setEditImage,
  setBrushRadius,
  setBrushRadiusEditor,
  setReloadEditor,
  setimageSelectedFinishing,
  setMask,
  setActiveStep,
} = mudebuAiSlice.actions;

export default mudebuAiSlice.reducer;
