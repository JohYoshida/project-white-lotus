const showElementById = (id) => {
  return (event) => {
    console.log('running');
    event.preventDefault();
    const elt = document.getElementById(id);
    elt.classList.remove('hidden');
  };
};

export {showElementById};
