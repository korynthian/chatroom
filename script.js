document.addEventListener("DOMContentLoaded", () => {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;
  const links = document.querySelectorAll('a');

  // Apply saved theme on page load
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.add('light-mode');
    darkModeToggle.checked = true;
  } else {
    body.classList.remove('light-mode');
    darkModeToggle.checked = false;
  }

  // Listen for toggle changes
  darkModeToggle.addEventListener('change', function () {
    if (this.checked) {
      // Light mode ON
      body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    } else {
      // Dark mode ON
      body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    }
  });
});
