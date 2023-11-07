export const BASE_URL = "https://auth.nomoreparties.co";

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => console.log(err));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  .then((res => res.json()))
  .then((data) => {
    if (data.user) {
      localStorage.setItem('jwt', data.token);
      return data;
    }
  })
  .catch((err) => console.log(err))
}
