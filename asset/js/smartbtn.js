const toggleBtn = document.getElementById("toggleSmartButton");
const circleContainer = document.querySelector(".circle-container");

// Check saved state on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedState = localStorage.getItem('circleContainerState');
  if (savedState) {
    const { display, left, top, expanded } = JSON.parse(savedState);
    circleContainer.style.display = display;
    if (left && top) {
      circleContainer.style.left = left;
      circleContainer.style.top = top;
      circleContainer.style.transform = 'none';
    }
    if (display === 'block') {
      toggleBtn.textContent = "◎";
    }
    if (expanded) {
      document.querySelector('.circle').classList.add('expanded');
    }
  }
});

toggleBtn.addEventListener("click", () => {
  const visible = circleContainer.style.display === "block";
  circleContainer.style.display = visible ? "none" : "block";
  toggleBtn.textContent = visible ? "◉" : "◎";
  
  // Save state
  saveState();
});

document.querySelector('.circle').addEventListener('click', function (e) {
  if (e.target.classList.contains('menu-item') || e.target.tagName === 'IMG') return;
  this.classList.toggle('expanded');
  
  // Save state
  saveState();
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
  
  // Save state during drag (throttle this if performance is an issue)
  saveState();
};

const stopDrag = () => {
  isDragging = false;
  circleContainer.style.cursor = "pointer";
  
  // Save final position
  saveState();
};

// Function to save current state
function saveState() {
  const state = {
    display: circleContainer.style.display,
    left: circleContainer.style.left,
    top: circleContainer.style.top,
    expanded: document.querySelector('.circle').classList.contains('expanded')
  };
  localStorage.setItem('circleContainerState', JSON.stringify(state));
}

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

// Save state before page unload (as extra precaution)
window.addEventListener('beforeunload', saveState);