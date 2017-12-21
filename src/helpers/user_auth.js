export function postLogin(event) {
  const form = event.target.parentNode;
  const userName = form.elements['username'].value;
  const password = form.elements['password'].value;
  return (fetch(`/login`, {
    method: 'POST',
    body: encodeURI(`email=${userName}&password=${password}`),
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  }));
}
