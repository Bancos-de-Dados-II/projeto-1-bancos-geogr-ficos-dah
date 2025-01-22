export async function getToken() {
    return JSON.parse(localStorage.getItem('token'));
  }