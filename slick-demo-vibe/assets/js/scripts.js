document.addEventListener("DOMContentLoaded", function () {

  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));
  const nextButton = document.querySelector(".next");
  const prevButton = document.querySelector(".prev");
  const viewport = document.querySelector(".carousel__viewport");

  let currentIndex = 0;

  function activateTab(index, setFocus = true) {

    tabs.forEach((tab, i) => {
      const isSelected = i === index;

      tab.setAttribute("aria-selected", isSelected);
      tab.setAttribute("tabindex", isSelected ? "0" : "-1");

      panels[i].hidden = !isSelected;
    });

    currentIndex = index;

    if (setFocus) {
      tabs[index].focus();
    }
  }

  function nextSlide() {
    const newIndex = (currentIndex + 1) % tabs.length;
    activateTab(newIndex, false);
  }

  function prevSlide() {
    const newIndex =
      (currentIndex - 1 + tabs.length) % tabs.length;
    activateTab(newIndex, false);
  }

  // Click on tabs
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      activateTab(index);
    });

    tab.addEventListener("keydown", (event) => {

      let newIndex;

      switch (event.key) {

        case "ArrowRight":
        case "Right":
          newIndex = (index + 1) % tabs.length;
          activateTab(newIndex);
          break;

        case "ArrowLeft":
        case "Left":
          newIndex =
            (index - 1 + tabs.length) % tabs.length;
          activateTab(newIndex);
          break;

        case "Home":
          activateTab(0);
          break;

        case "End":
          activateTab(tabs.length - 1);
          break;

        default:
          return;
      }

      event.preventDefault();
    });
  });

  // Prev / Next buttons
  nextButton.addEventListener("click", nextSlide);
  prevButton.addEventListener("click", prevSlide);

  // Touch support
  let startX = 0;
  let endX = 0;

  viewport.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  viewport.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const threshold = 50;

    if (startX - endX > threshold) {
      nextSlide();
    } else if (endX - startX > threshold) {
      prevSlide();
    }
  }

});