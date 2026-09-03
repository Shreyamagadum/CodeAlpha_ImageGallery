/* ========================================
   SELECT ELEMENTS
======================================== */

const galleryItems = document.querySelectorAll(".gallery-item");

const filterButtons = document.querySelectorAll(".filter-btn");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const lightboxCategory = document.getElementById("lightboxCategory");

const lightboxTitle = document.getElementById("lightboxTitle");

const imageCounter = document.getElementById("imageCounter");

const closeBtn = document.getElementById("closeBtn");

const prevBtn = document.getElementById("prevBtn");

const nextBtn = document.getElementById("nextBtn");

const emptyState = document.getElementById("emptyState");

const previousPreview =
    document.getElementById("previousPreview");

const nextPreview =
    document.getElementById("nextPreview");


/* ========================================
   VARIABLES
======================================== */

let visibleItems = [];

let currentIndex = 0;


/* ========================================
   UPDATE VISIBLE ITEMS
======================================== */

function updateVisibleItems() {

    visibleItems = Array.from(galleryItems).filter(item => {

        return item.style.display !== "none";

    });

}


/* ========================================
   OPEN LIGHTBOX
======================================== */

function openLightbox() {

    if (visibleItems.length === 0) {
        return;
    }


    const currentItem =
        visibleItems[currentIndex];

    const image =
        currentItem.querySelector("img");

    const category =
        currentItem.querySelector(".image-info span");

    const title =
        currentItem.querySelector(".image-info h3");


    /* ================================
       MAIN IMAGE
    ================================= */

    lightboxImage.src = image.src;

    lightboxImage.alt = image.alt;


    /* ================================
       DETAILS
    ================================= */

    lightboxCategory.textContent =
        category.textContent;

    lightboxTitle.textContent =
        title.textContent;


    imageCounter.textContent =
        `${currentIndex + 1} / ${visibleItems.length}`;


    /* ================================
       PREVIOUS PREVIEW
    ================================= */

    const previousIndex =
        (currentIndex - 1 + visibleItems.length)
        % visibleItems.length;


    const previousImage =
        visibleItems[previousIndex].querySelector("img");


    previousPreview.src =
        previousImage.src;

    previousPreview.alt =
        previousImage.alt;


    /* ================================
       NEXT PREVIEW
    ================================= */

    const nextIndex =
        (currentIndex + 1)
        % visibleItems.length;


    const nextImage =
        visibleItems[nextIndex].querySelector("img");


    nextPreview.src =
        nextImage.src;

    nextPreview.alt =
        nextImage.alt;


    /* ================================
       SHOW LIGHTBOX
    ================================= */

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";


    closeBtn.focus();

}


/* ========================================
   CLOSE LIGHTBOX
======================================== */

function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

}


/* ========================================
   OPEN IMAGE WHEN CLICKED
======================================== */

galleryItems.forEach((item) => {

    item.addEventListener("click", () => {

        updateVisibleItems();

        currentIndex = visibleItems.indexOf(item);

        openLightbox();

    });

});


/* ========================================
   NEXT IMAGE
======================================== */

function showNextImage() {

    if (visibleItems.length === 0) {
        return;
    }

    currentIndex++;

    if (currentIndex >= visibleItems.length) {

        currentIndex = 0;

    }

    openLightbox();

}


nextBtn.addEventListener("click", showNextImage);


/* ========================================
   PREVIOUS IMAGE
======================================== */

function showPreviousImage() {

    if (visibleItems.length === 0) {
        return;
    }

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex = visibleItems.length - 1;

    }

    openLightbox();

}


prevBtn.addEventListener("click", showPreviousImage);


/* ========================================
   CLOSE BUTTON
======================================== */

closeBtn.addEventListener("click", closeLightbox);


/* ========================================
   CLICK OUTSIDE IMAGE
======================================== */

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {

        closeLightbox();

    }

});


/* ========================================
   CATEGORY FILTER
======================================== */

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const selectedCategory =
            button.dataset.category;


        /* Update active button */

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");


        /* Filter gallery */

        let numberOfVisibleImages = 0;


        galleryItems.forEach((item) => {

            const itemCategory =
                item.dataset.category;


            const shouldShow =
                selectedCategory === "all" ||
                selectedCategory === itemCategory;


            if (shouldShow) {

                item.style.display = "block";

                numberOfVisibleImages++;

            } else {

                item.style.display = "none";

            }

        });


        /* Empty state */

        if (numberOfVisibleImages === 0) {

            emptyState.style.display = "block";

        } else {

            emptyState.style.display = "none";

        }


        updateVisibleItems();

    });

});


/* ========================================
   KEYBOARD CONTROLS
======================================== */

document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("active")) {

        return;

    }


    if (event.key === "ArrowRight") {

        showNextImage();

    }


    if (event.key === "ArrowLeft") {

        showPreviousImage();

    }


    if (event.key === "Escape") {

        closeLightbox();

    }

});