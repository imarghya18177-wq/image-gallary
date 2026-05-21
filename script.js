// script.js

const galleryImages = document.querySelectorAll(".gallery-item img");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let currentIndex = 0;

// Open Lightbox
galleryImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    showImage();
    lightbox.style.display = "flex";
  });
});

// Show Current Image
function showImage() {
  lightboxImg.src = galleryImages[currentIndex].src;
}

// Next Image
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  showImage();
});

// Previous Image
prevBtn.addEventListener("click", () => {
  currentIndex =
    (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  showImage();
});

// Close Lightbox
closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// Close on Background Click
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});

/* Filter Functionality */
const filterButtons = document.querySelectorAll(".filter-buttons button");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {

    document
      .querySelector(".filter-buttons .active")
      .classList.remove("active");

    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    galleryItems.forEach(item => {
      if (filter === "all" || item.classList.contains(filter)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});