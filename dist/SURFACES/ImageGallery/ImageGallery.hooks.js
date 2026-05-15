import { useState, useEffect, useCallback } from "react";
function useImageGallery(images, enabled) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    document.body.style.overflow = selectedImage ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);
  const openLightbox = useCallback(
    (image, index) => {
      if (!enabled) return;
      setSelectedImage(image);
      setCurrentIndex(index);
    },
    [enabled]
  );
  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
  }, []);
  const goToPrevious = useCallback(
    (e) => {
      e.stopPropagation();
      const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
      setCurrentIndex(newIndex);
      setSelectedImage(images[newIndex]);
    },
    [currentIndex, images]
  );
  const goToNext = useCallback(
    (e) => {
      e.stopPropagation();
      const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
      setCurrentIndex(newIndex);
      setSelectedImage(images[newIndex]);
    },
    [currentIndex, images]
  );
  useEffect(() => {
    if (!selectedImage) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") goToPrevious(e);
      else if (e.key === "ArrowRight") goToNext(e);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, goToPrevious, goToNext, closeLightbox]);
  return { selectedImage, currentIndex, openLightbox, closeLightbox, goToPrevious, goToNext };
}
export {
  useImageGallery
};
//# sourceMappingURL=ImageGallery.hooks.js.map
