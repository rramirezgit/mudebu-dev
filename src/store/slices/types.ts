export interface OnboardingState {
  step: number;
  contentStep: number;
  isvalidDataform: boolean;
  onoardingInfo: any;
}

export interface mudebuAIState {
  haveBenchmarks: boolean;
  benchmarkList: string[];
  blendList: string[];
  editImage: boolean;
  brushRadius: number;
  brushRadiusEditor: boolean;
  reloadEditor: boolean;
}

export interface AuthSliceState {
  redirect: string;
}
