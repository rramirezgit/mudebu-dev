'use client';

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { OnboardingState } from './types';

const initialState: OnboardingState = {
  step: 0,
  contentStep: 0,
  isvalidDataform: false,
  onoardingInfo: {
    business_orientation: '',
    colors_ai: '',
    specific_functionality: '',
    preferred_material: '',
    styles_ai: '',
    types_of_furniture: '',
    dimensions: '',
    prompt_images: '',
    project_location: '',
  },
};

export const onBoardingSlice = createSlice({
  name: 'OnBoarding',
  initialState,
  reducers: {
    nextStep: (state) => {
      state.step += 1;
      state.contentStep = 0;
    },
    prevStep: (state) => {
      state.step -= 1;
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    setContentStep: (state, action: PayloadAction<number>) => {
      state.contentStep = action.payload;
    },
    setIsValidDataForm: (state, action: PayloadAction<boolean>) => {
      state.isvalidDataform = action.payload;
    },
    setOnboardingInfo: (state, action: PayloadAction<any>) => {
      state = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  nextStep,
  prevStep,
  setStep,
  setContentStep,
  setIsValidDataForm,
  setOnboardingInfo,
} = onBoardingSlice.actions;

export default onBoardingSlice.reducer;
