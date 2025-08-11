document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
  
  
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