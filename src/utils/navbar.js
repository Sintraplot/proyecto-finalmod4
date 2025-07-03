export function renderNavbar(user) {
  const navbar = document.querySelector("nav");
  if (user) {
    navbar.innerHTML = `
      <a href="/" data-link>Home</a>
      <a href="/user/${user.id}" data-link>Profile</a>
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
// user ? navbar.innerHTML = `
//       <a href="/" data-link>Home</a>
//       <a href="/profile/${user.id}" data-link>Profile</a>
//       <a href="" id="logout" >Logout</a>
//     `:navbar.innerHTML = `
//       <a href="/" data-link>Home</a>
//       <a href="/login" data-link>Login</a>
//       <a href="/signup" data-link>Sign up</a>
//     `
