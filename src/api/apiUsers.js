const baseUrl = "https://685ed4157b57aebd2afab60a.mockapi.io/modulo4";

//User Signup

export async function createNewUser(user) {
  const url = `${baseUrl}/users`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        password: user.password,
        country: user.country,
      }),
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

//------------------------

//User Login

// Actualizar la navbar con el nuevo estado
// renderNavbar(userData);
// Navegar a home
// navigate("/home");

//------------------------

export function getCurrentUser() {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
}
