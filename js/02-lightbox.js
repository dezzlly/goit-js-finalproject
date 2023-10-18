import { galleryItems } from "./gallery-items.js";

function createGalleryItems(items) {
  return items
    .map(
      (item) => `
    <li class="gallery__item">
      <a class="gallery__link" href="${item.original}">
        <img
          class="gallery__image"
          src="${item.preview}"
          alt="${item.description}"
        />
      </a>
    </li>
  `
    )
    .join("");
}

const gallery = document.querySelector(".gallery");
gallery.innerHTML = createGalleryItems(galleryItems);

document.addEventListener("DOMContentLoaded", () => {
  const lightbox = new SimpleLightbox(".gallery a", {
    captionsData: "alt",
    captionDelay: 250,
  });
});

console.log(galleryItems);
