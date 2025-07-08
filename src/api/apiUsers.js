const baseUrl = "https://685ed4157b57aebd2afab60a.mockapi.io/modulo4";

//User Signup

export async function createNewUser(user) {
  const url = `${baseUrl}/users`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: user.signupName,
        email: user.signupEmail,
        password: user.signupPassword,
        island: user.signupIsland,
        favorites: [],
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

// get User

export async function getUsers() {
  const url = `${baseUrl}/users`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error en la petición getAllUsers");
    }
    const users = await response.json();
    return users; // Devolver explícitamente el arreglo de usuarios
  } catch (error) {
    console.error("Error en getUsers:", error);
    throw error; // Re-lanzar el error para que el llamador lo maneje
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
  try {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

//Edit user

export async function editUser(id, userData) {
  const url = `${baseUrl}/users/${id}`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        island: userData.island,
        imageURL: userData.imageURL,
      }),
    });

    if (!response.ok) {
      throw new Error("Error editing user");
    }

    const updatedUser = await response.json();
  } catch (error) {
    console.error(error);
  }
}

//obtener favorito de usuarios----------------------------------------------------------------

export async function getUserFavorites(userId) {
  const url = `${baseUrl}/users/${userId}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error in getUserFavorites request");
    }
    const user = await response.json();

    return user.favorites || [];
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return [];
  }
}

//actualizar backend con favorito del localStorage------------------------

export async function updateFavoritesBackend(userId, favorites) {
  const url = `${baseUrl}/users/${userId}`;

  try {
    // 1. Obtener el usuario completo
    const getResponse = await fetch(url);
    if (!getResponse.ok) {
      throw new Error("Error fetching user for update");
    }
    const user = await getResponse.json();

    // 2. Actualizar el campo favorites
    user.favorites = favorites;

    // 3. Enviar PUT con el objeto completo
    const putResponse = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (!putResponse.ok) {
      throw new Error("Error updating favorites");
    }

    const updatedUser = await putResponse.json();
    return updatedUser;
  } catch (error) {
    console.error(error);
  }
}
