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


  darkModeToggle.addEventListener('change', function () {
    if (this.checked) {
      // Light
      body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    } else {
      // Dark
      body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    }
  });
});
