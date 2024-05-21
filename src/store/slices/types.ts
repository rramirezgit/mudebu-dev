export interface OnboardingState {
  step: number;
  contentStep: number;
  isvalidDataform: boolean;
  onoardingInfo: any;
  loadingForm: boolean;
  imagesData: any;
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
}

export interface AuthSliceState {
  redirect: string;
}
