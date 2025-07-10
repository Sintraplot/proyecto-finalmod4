export function showSpinner(container, message = "Cargando...") {
  container.innerHTML = `
    <div class="spinner-container">
      <div class="spinner"></div>
      <p class="spinner-text">${message}</p>
    </div>
  `;
}

export function hideSpinner(container) {
  const spinnerContainer = container.querySelector(".spinner-container");
  if (spinnerContainer) {
    spinnerContainer.remove();
  }
}
