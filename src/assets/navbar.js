const navbar = document.querySelector("nav");

export function renderNavbar(user) {
  if (user) {
    navbar.innerHTML = `
      <a href="/" data-link>Home</a>
      <a href="/profile/${user.id}" data-link>Profile</a>
      <a href="" id="logout" >Logout</a>
    `;
  } else {
    navbar.innerHTML = `
      <a href="/" data-link>Home</a>
      <a href="/login" data-link>Login</a>
      <a href="/signup" data-link>Sign up</a>
    `;
  }
}
