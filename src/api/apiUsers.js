const baseUrl = "https://685ed4157b57aebd2afab60a.mockapi.io/modulo4";


async function getUsers() {
    const url = `${baseUrl}/users`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error en la petición getUsers")
        }
        const allUsers = await response.json();
        console.log(users); 
        userList(users);
        return users;
    } catch (error) {
        console.error("Error")
    }

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