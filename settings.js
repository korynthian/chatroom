function confirmCustomCSS() {
  document.querySelectorAll('style, link[rel="stylesheet"]').forEach(style => style.remove());
  const style = document.createElement('style');
  if (location.href.includes('/settings.html') && customCSS) {
    const customCSS = document.getElementById('customCSS');
    localStorage.setItem('CSS', customCSS.value);
    style.textContent = customCSS.value;
  }
  else if (localStorage.getItem('CSS')) {
    style.textContent = localStorage.getItem('CSS');
  }
  else {
    window.open('settings.html', 'popupWindow');
  }
  document.head.appendChild(style);
}

document.addEventListener("DOMContentLoaded", async () => {
  const confirmButton = document.getElementById('confirmCustomCSS');
  if(confirmButton) {
    if (localStorage.getItem('CSS')) {
      document.getElementById('customCSS').value = localStorage.getItem('CSS');
    }
    confirmButton.addEventListener('click', confirmCustomCSS);
    document.getElementById("darkDefaultThemeButton").addEventListener('click', () => {
      fetch('/themes/default-dark.css')
        .then(response => response.text())
        .then(data => {
          document.getElementById('customCSS').value = data;
          confirmCustomCSS();
        })
    });
    document.getElementById("lightDefaultThemeButton").addEventListener('click', () => {
      fetch('/themes/default-light.css')
        .then(response => response.text())
        .then(data => {
          document.getElementById('customCSS').value = data;
          confirmCustomCSS();
        })
    });
    document.getElementById("noThemeButton").addEventListener('click', () => {
      document.getElementById('customCSS').value = "//unstyled theme"
      confirmCustomCSS();
    });
    document.getElementById("changeUsername").addEventListener('click', () => {
      const username = prompt("Please enter your username:");
      localStorage.setItem('username', username || "Secret");
    });
  }

  confirmCustomCSS();
});