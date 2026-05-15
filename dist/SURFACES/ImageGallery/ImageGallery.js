"use client";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { forwardRef } from "react";
import { Image } from "../../DATADISPLAY/Image/Image";
import Button from "../../INPUTS/Button/Button";
import Container from "../../LAYOUT/Container/Container";
import { Panel } from "../../LAYOUT/Panels/Panel";
import { IMAGE_GALLERY_DEFAULTS, IMAGE_GALLERY_CLASSES } from "./ImageGallery.constants";
import { buildGalleryClasses, buildGridStyle } from "./ImageGallery.utils";
import { useImageGallery } from "./ImageGallery.hooks";
import { sanitizeUrl } from "../../utils/sanitizeUrl";
const ImageGallery = forwardRef(({
  images = IMAGE_GALLERY_DEFAULTS.images,
  title,
  layout = IMAGE_GALLERY_DEFAULTS.layout,
  columns = IMAGE_GALLERY_DEFAULTS.columns,
  gap = IMAGE_GALLERY_DEFAULTS.gap,
  showCaptions = IMAGE_GALLERY_DEFAULTS.showCaptions,
  lightbox = IMAGE_GALLERY_DEFAULTS.lightbox,
  imageRounded = IMAGE_GALLERY_DEFAULTS.imageRounded,
  imageShadow = IMAGE_GALLERY_DEFAULTS.imageShadow,
  imageHoverEffect = IMAGE_GALLERY_DEFAULTS.imageHoverEffect,
  thumbnails = IMAGE_GALLERY_DEFAULTS.thumbnails,
  emptyMessage = IMAGE_GALLERY_DEFAULTS.emptyMessage,
  unstyled = IMAGE_GALLERY_DEFAULTS.unstyled,
  className = IMAGE_GALLERY_DEFAULTS.className
}, ref) => {
  const { selectedImage, currentIndex, openLightbox, closeLightbox, goToPrevious, goToNext } = useImageGallery(images, lightbox);
  if (images.length === 0) {
    return /* @__PURE__ */ jsxs(Container, { ref, className: IMAGE_GALLERY_CLASSES.container, children: [
      title && /* @__PURE__ */ jsx("h3", { className: IMAGE_GALLERY_CLASSES.title, children: title }),
      /* @__PURE__ */ jsxs(Panel, { className: IMAGE_GALLERY_CLASSES.empty, children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            className: IMAGE_GALLERY_CLASSES.emptyIcon,
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx("p", { className: IMAGE_GALLERY_CLASSES.emptyText, children: emptyMessage })
      ] })
    ] });
  }
  const galleryCls = buildGalleryClasses(layout, className, unstyled);
  const gridStyle = buildGridStyle(layout, columns, gap);
  return /* @__PURE__ */ jsxs(Container, { ref, className: IMAGE_GALLERY_CLASSES.container, children: [
    title && /* @__PURE__ */ jsx("h3", { className: IMAGE_GALLERY_CLASSES.title, children: title }),
    /* @__PURE__ */ jsx("div", { className: galleryCls, style: gridStyle, children: images.map((image, index) => /* @__PURE__ */ jsxs(
      Panel,
      {
        className: IMAGE_GALLERY_CLASSES.item,
        padding: false,
        card: true,
        children: [
          /* @__PURE__ */ jsx(
            Image,
            {
              src: thumbnails && image.thumbnail ? image.thumbnail : image.src,
              alt: image.alt ?? `Imagen ${index + 1}`,
              rounded: imageRounded,
              shadow: imageShadow,
              hoverEffect: lightbox ? imageHoverEffect : void 0,
              className: IMAGE_GALLERY_CLASSES.image,
              onClick: () => openLightbox(image, index),
              loading: "lazy"
            }
          ),
          showCaptions && image.caption && /* @__PURE__ */ jsx("p", { className: IMAGE_GALLERY_CLASSES.caption, children: image.caption })
        ]
      },
      image.id ?? index
    )) }),
    lightbox && selectedImage && /* @__PURE__ */ jsxs(
      "div",
      {
        className: IMAGE_GALLERY_CLASSES.lightboxOverlay,
        onClick: closeLightbox,
        role: "dialog",
        "aria-modal": "true",
        "aria-label": "Vista ampliada de imagen",
        children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              className: IMAGE_GALLERY_CLASSES.lightboxClose,
              onClick: closeLightbox,
              "aria-label": "Cerrar lightbox",
              variant: "text",
              children: /* @__PURE__ */ jsx("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M6 18L18 6M6 6l12 12"
                }
              ) })
            }
          ),
          images.length > 1 && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                className: `${IMAGE_GALLERY_CLASSES.lightboxNav} ${IMAGE_GALLERY_CLASSES.lightboxPrev}`,
                onClick: goToPrevious,
                "aria-label": "Imagen anterior",
                variant: "text",
                children: /* @__PURE__ */ jsx("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M15 19l-7-7 7-7"
                  }
                ) })
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                className: `${IMAGE_GALLERY_CLASSES.lightboxNav} ${IMAGE_GALLERY_CLASSES.lightboxNext}`,
                onClick: goToNext,
                "aria-label": "Siguiente imagen",
                variant: "text",
                children: /* @__PURE__ */ jsx("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M9 5l7 7-7 7"
                  }
                ) })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(
            Panel,
            {
              className: IMAGE_GALLERY_CLASSES.lightboxContent,
              onClick: (e) => e.stopPropagation(),
              padding: false,
              children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: sanitizeUrl(selectedImage.src),
                    alt: selectedImage.alt ?? "Imagen ampliada",
                    className: IMAGE_GALLERY_CLASSES.lightboxImage
                  }
                ),
                selectedImage.caption && /* @__PURE__ */ jsxs("div", { className: IMAGE_GALLERY_CLASSES.lightboxCaption, children: [
                  /* @__PURE__ */ jsx("p", { children: selectedImage.caption }),
                  images.length > 1 && /* @__PURE__ */ jsxs("span", { className: IMAGE_GALLERY_CLASSES.lightboxCounter, children: [
                    currentIndex + 1,
                    " / ",
                    images.length
                  ] })
                ] })
              ]
            }
          )
        ]
      }
    )
  ] });
});
ImageGallery.displayName = "ImageGallery";
var ImageGallery_default = ImageGallery;
export {
  ImageGallery,
  ImageGallery_default as default
};
//# sourceMappingURL=ImageGallery.js.map
