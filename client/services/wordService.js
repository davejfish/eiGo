export async function fetchWords(difficulty, targetSound) {
  const response = await fetch(`/api/v1/words/${difficulty}/${targetSound}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (response.ok) {
    const words = await response.json();
    return words;
  }
};
