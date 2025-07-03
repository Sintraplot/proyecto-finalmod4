const baseUrl = "https://685ed4157b7aebd2afab60a.mockapi.io/modulo4";

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


// get User

export async function getUsers() {
    const url = `${baseUrl}/users`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error in getAllUsers request")
        }
        const users = await response.json();
        console.log(users); 
        listarUsuarios(users)
        // return allUsers;
    } catch (error) {
        console.error("Error")
    }
}

//------------------------

export function getCurrentUser() {
  const storedUser = localStorage.getItem("current-user");
  return storedUser ? JSON.parse(storedUser) : null;
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
      })
    });

    if (!response.ok) {
      throw new Error("Error editing user");
    }

    const updatedUser = await response.json();

    console.log(updatedUser, "User updated");
  } catch (error) {
    console.error(error);
  }
}
