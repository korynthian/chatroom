document.addEventListener("DOMContentLoaded", function () {
    const content = document.querySelector('.scrolling-content');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const links = document.querySelectorAll('a');
  
  
    // Dark mode toggle event listener
    darkModeToggle.addEventListener('change', function () {
      if (this.checked) {
        body.classList.add('light-mode');
        links.forEach(link => link.classList.add('light-mode'));
        localStorage.setItem('theme', 'light');  // Save preference
      } else {
        body.classList.remove('light-mode');
        links.forEach(link => link.classList.remove('light-mode'));
        localStorage.setItem('theme', 'dark');  // Save preference
      }
    });
  
    // Check and apply the saved theme preference from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      body.classList.add('light-mode');
      darkModeToggle.checked = true; // Ensure toggle reflects saved preference
      links.forEach(link => link.classList.add('light-mode'));
    }
  });