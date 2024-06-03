export interface OnboardingState {
  step: number;
  contentStep: number;
  isvalidDataform: boolean;
  onoardingInfo: any;
  loadingForm: boolean;
  imagesData: any;
  initialText: string;
}

export interface mudebuAIState {
  haveBenchmarks: boolean;
  benchmarkList: string[];
  blendList: string[];
  editImage: boolean;
  brushRadius: number;
  brushRadiusEditor: boolean;
  reloadEditor: boolean;
  imageSelectedFinishing: any;
  mask: any;
  activeStep: number;
}

export interface AuthSliceState {
  redirect: string;
}
