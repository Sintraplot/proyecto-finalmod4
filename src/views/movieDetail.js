export function MovieDetail(container, params) {
  const { movieId } = params;

  container.innerHTML = `
    <h2>Detalle de la Película</h2>
    <p>ID: ${movieId}</p>
    <p>Aquí podrías cargar más información sobre la película con ID ${movieId}.</p>
  `;
}
