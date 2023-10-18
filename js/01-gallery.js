import { galleryItems } from "./gallery-items.js";

function createGalleryItems(items) {
  return items
    .map(
      (item, index) => `
    <li class="gallery__item">
      <a class="gallery__link" href="${item.original}">
        <img
          class="gallery__image"
          src="${item.preview}"
          data-source="${item.original}"
          alt="${item.description}"
          data-index="${index}"
        />
      </a>
    </li>
  `
    )
    .join("");
}

const gallery = document.querySelector(".gallery");
gallery.innerHTML = createGalleryItems(galleryItems);

function openModal(source, description, index) {
  const instance = basicLightbox.create(`
    <img src="${source}" alt="${description}" />
  `);

  instance.show();

  // Отримати lightbox елемент
  const lightboxElement = instance.element();

  // Функція для закриття модального вікна
  function closeModal() {
    instance.close();
    // При закритті модального вікна видалимо обробник клавіш
    window.removeEventListener("keydown", handleKeyDown);
  }

  // Обробник клавіатурних подій
  function handleKeyDown(e) {
    if (e.key === "Escape") {
      closeModal();
    }
  }

  // Додавання обробника клавіш для закриття модального вікна
  window.addEventListener("keydown", handleKeyDown);

  // Додати обробник кліку на модальному вікні
  lightboxElement.addEventListener("click", () => {
    closeModal();
  });

  // Обробник лівої та правої стрілок
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && index > 0) {
      closeModal();
      openModal(
        galleryItems[index - 1].original,
        galleryItems[index - 1].description,
        index - 1
      );
    } else if (e.key === "ArrowRight" && index < galleryItems.length - 1) {
      closeModal();
      openModal(
        galleryItems[index + 1].original,
        galleryItems[index + 1].description,
        index + 1
      );
    }
  });
}

gallery.addEventListener("click", (e) => {
  e.preventDefault();

  if (e.target.classList.contains("gallery__image")) {
    const source = e.target.dataset.source;
    const description = e.target.alt;
    const index = Number(e.target.dataset.index);
    openModal(source, description, index);
  }
});

console.log(galleryItems);
