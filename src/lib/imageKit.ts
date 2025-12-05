const IMAGEKIT_BASE = "https://ik.imagekit.io/gvtkbnh6v";

/**
 * Wrap a remote image URL with ImageKit for resizing/quality and modern formats.
 * Leaves local/assets/data URLs untouched.
 */
export const optimizeImageUrl = (url: string, targetWidth = 900, quality = 70) => {
  if (!url || typeof url !== "string") return url;
  if (url.startsWith(IMAGEKIT_BASE)) return url;
  if (url.startsWith("/") || url.startsWith("data:") || url.startsWith("blob:")) return url;

  const width = Math.min(Math.max(targetWidth, 50), 2000);
  const q = Math.min(Math.max(quality, 30), 90);

  try {
    const encodedSrc = encodeURIComponent(url);
    return `${IMAGEKIT_BASE}/tr:w-${width},q-${q}/${encodedSrc}`;
  } catch {
    return url;
  }
};

