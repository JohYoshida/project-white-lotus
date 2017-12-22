function editBrouzoff(playerId, amount) {
  fetch(`http://localhost:3000/users/${playerId}`, {
      method: 'PATCH',
      body: encodeURI(`brouzoffChange=${amount}`),
      headers: {
        'content-type' : 'application/x-www-form-urlencoded'
      }
  });
}

module.exports = editBrouzoff;