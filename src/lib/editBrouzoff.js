export default function editBrouzoff(playerId, amount) {
  fetch('/user/brouzoff/', {
    credentials: 'same-origin',
    method: 'PUT',
    body: encodeURI(`brouzoffChange=${amount}`),
    headers: {
      'content-type' : 'application/x-www-form-urlencoded'
    }
  });
}
