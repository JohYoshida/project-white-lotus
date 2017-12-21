var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function awardMoney(playerId, amount) {
  var ajax = new XMLHttpRequest();
  ajax.open("PATCH", `http://localhost:3000/users/${playerId}`, true);
  ajax.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  const BODY = {money: amount};
  ajax.send(JSON.stringify(BODY));
}

awardMoney('testId', 500);