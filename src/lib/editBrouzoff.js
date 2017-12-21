function editBrouzoff(playerId, amount) {
  fetch(`http://localhost:3000/users/${playerId}`, {
      method: 'PATCH',
      body: encodeURI(`money=${amount}`),
      headers: {
        'content-type' : 'application/x-www-form-urlencoded'
      }
  });
  // });
  // var ajax = new XMLHttpRequest();
  // ajax.open("PATCH", , true);
  // ajax.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  // const BODY = {money: amount};
  // ajax.send(JSON.stringify(BODY));
}

module.exports = editBrouzoff;