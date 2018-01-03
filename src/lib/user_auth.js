export function postLogin(event) {
  const form = event.target.parentNode;
  const userName = form.elements['username'].value;
  const password = form.elements['password'].value;
  return (fetch('/login', {
    credentials: 'same-origin',
    method: 'POST',
    body: encodeURI(`email=${userName}&password=${password}`),
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  }));
}

export function fetchUserDetails(component) {
  fetch('/user/', {
    credentials: 'same-origin'
  }).then(res => {
    res.json().then(data => {
      component.setState({brouzoff: data.brouzoff, username: data.email});
    });
  });
}

export function postRegister(event) {
  const form = event.target.parentNode;
  const userName = form.elements['username'].value;
  const password = form.elements['password'].value;
  return (fetch('/user', {
    credentials: 'same-origin',
    method: 'POST',
    body: encodeURI(`email=${userName}&password=${password}`),
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  }));
}

export function setUserState(component, res) {
  const {cookies} = component.props;
  return (res.json().then(data => {
    if (!data.error) {
      cookies.set('loggedin', true);
      component.setState({loggedin: cookies.get('loggedin')});
      fetchUserDetails(component);
    }
  }));
}
