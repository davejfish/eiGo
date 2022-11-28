const BASE_URL = 'http://localhost:7890';

export async function signIn(user) {
  const response = await fetch(`${BASE_URL}/api/v1/users/sessions/sign-in`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
    credentials: 'include',
  });
  
  const data = await response.json();
  return data;

};

export async function signUp(user) {
  const response = await fetch(`${BASE_URL}/api/v1/users/sessions/sign-up`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
    credentials: 'include',
  });

  const data = await response.json();
  return data;
}

export async function getUser() {
  const response = await fetch(`${BASE_URL}/api/v1/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  
  if (response.ok) {
    const user = await response.json();
    return user;
  }
};
