

function awardMoney.js(playerId, amount) {
  var ajax = new XMLHttpRequest();
  ajax.open("POST" `/users/${playerId}`, true)
  xttp.send(`money=${amount}`);
}