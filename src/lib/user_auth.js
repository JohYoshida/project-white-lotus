export function postLogin(event) {
  const form = event.target.parentNode;
  const userName = form.elements['username'].value;
  const password = form.elements['password'].value;
  return (fetch('/login', {
    method: 'POST',
    body: encodeURI(`email=${userName}&password=${password}`),
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  }));
}

export function fetchUserDetails(component) {
  console.log(component.state.id);
  fetch(`/user/${component.state.id}`).then(res => {
    console.log(res);
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
      cookies.set('id', data.id, {path: '/'});
      component.setState({id: cookies.get('id'), loggedin: true});
      fetchUserDetails(component);
    }
  }).catch((err) => {
    console.log('Promise error in generate_user.js', err);
  }));
}
