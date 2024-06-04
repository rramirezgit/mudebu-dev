import { removeStorage } from 'src/hooks/use-local-storage';
import { storageKeys } from 'src/sections/onboarding/form/form-layaout';
import {
  setBenchmarkList,
  setBlendList,
  setBrushRadius,
  setEditImage,
  setHaveBenchmarks,
  setMask,
  setimageSelectedFinishing,
} from 'src/store/slices/mudebu-ai';
import { setImagesData } from 'src/store/slices/onBoarding';

export const cleanStorage = (dispatch: any) => {
  removeStorage(storageKeys.uploadedImages);
  removeStorage(storageKeys.mudebuAiBlend);
  removeStorage(storageKeys.mudebuIaBenchmarkAi);
  removeStorage(storageKeys.onboardingId);
  removeStorage(storageKeys.onboardingProgress);
  removeStorage(storageKeys.onboardingResult);

  /// refrescar todas las variables de redux

  dispatch(setHaveBenchmarks(false));
  dispatch(setBenchmarkList([]));
  dispatch(setBlendList([]));
  dispatch(setBrushRadius(10));
  dispatch(setMask(null));
  dispatch(setEditImage(false));
  dispatch(setimageSelectedFinishing(null));
  dispatch(setImagesData(null));
};
