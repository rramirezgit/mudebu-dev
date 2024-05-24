interface ImageEraserProps {
  url: string;
  base?: string;
  split: string;
}

export const convertImageToBase64 = async ({
  base = '/api/proxy/',
  url,
  split,
}: ImageEraserProps) => {
  try {
    const urlPath = url.split(split)[1];
    const response = await fetch(`${base}${urlPath}`);
    const blob = await response.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error converting image to Base64:', error);
    return null;
  }
};
