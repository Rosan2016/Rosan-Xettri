 const toggleBtn = document.getElementById("toggleSmartButton");
  const circleContainer = document.querySelector(".circle-container");

  toggleBtn.addEventListener("click", () => {
    const visible = circleContainer.style.display === "block";
    circleContainer.style.display = visible ? "none" : "block";
    toggleBtn.textContent = visible ? "◉" : "◎";
  });

  document.querySelector('.circle').addEventListener('click', function (e) {
    if (e.target.classList.contains('menu-item') || e.target.tagName === 'IMG') return;
    this.classList.toggle('expanded');
  });

  document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function (e) {
      e.stopPropagation();
      const link = this.getAttribute('data-link');
      if (link) {
        window.location.href = link;
      }
    });
  });

  // Drag support
  let isDragging = false, offsetX = 0, offsetY = 0;

  const startDrag = (x, y) => {
    const rect = circleContainer.getBoundingClientRect();
    offsetX = x - rect.left;
    offsetY = y - rect.top;
    isDragging = true;
    circleContainer.style.cursor = "move";
  };

  const moveDrag = (x, y) => {
    if (!isDragging) return;
    let newX = x - offsetX;
    let newY = y - offsetY;
    circleContainer.style.left = `${newX}px`;
    circleContainer.style.top = `${newY}px`;
    circleContainer.style.transform = `none`;
  };

  const stopDrag = () => {
    isDragging = false;
    circleContainer.style.cursor = "pointer";
  };

  // Mouse events
  circleContainer.addEventListener('mousedown', e => startDrag(e.clientX, e.clientY));
  window.addEventListener('mousemove', e => moveDrag(e.clientX, e.clientY));
  window.addEventListener('mouseup', stopDrag);

  // Touch events
  circleContainer.addEventListener('touchstart', e => {
    const touch = e.touches[0];
    startDrag(touch.clientX, touch.clientY);
  });
  window.addEventListener('touchmove', e => {
    const touch = e.touches[0];
    moveDrag(touch.clientX, touch.clientY);
  }, { passive: false });
  window.addEventListener('touchend', stopDrag);