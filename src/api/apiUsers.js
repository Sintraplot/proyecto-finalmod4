const baseUrl = "https://685ed4157b57aebd2afab60a.mockapi.io/modulo4";

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
  } catch (error) {
    console.error(error);
  }
}

