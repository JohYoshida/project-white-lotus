export function postNewMonster(creature) {
  return (fetch('/monsters/', {
    credentials: 'same-origin',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({creature: creature, cost: 50})
  }));
}
