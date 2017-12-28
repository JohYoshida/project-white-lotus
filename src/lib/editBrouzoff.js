export default function editBrouzoff(playerId, amount) {
  fetch(`/user/brouzoff/${playerId}`, {
      method: 'PATCH',
      body: encodeURI(`brouzoffChange=${amount}`),
      headers: {
        'content-type' : 'application/x-www-form-urlencoded'
      }
  });
}
