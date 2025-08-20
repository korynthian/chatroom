document.addEventListener("DOMContentLoaded", () => {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;

  // Apply saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.add('light-mode');
    darkModeToggle.checked = true;
  } else {
    body.classList.remove('light-mode');
    darkModeToggle.checked = false;
  }

  // Dark mode toggle
  darkModeToggle.addEventListener('change', function () {
    if (this.checked) {
      body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    } else {
      body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    }
  });
});
