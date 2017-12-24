const toggleElementByIdButton = (id) => {
  return (event) => {
    event.preventDefault();
    const elt = document.getElementById(id);
    elt.classList.toggle('hidden');
  };
};
const toggleElementById = (id) => {
  const elt = document.getElementById(id);
  elt.classList.toggle('hidden');
};

export {toggleElementByIdButton, toggleElementById};
