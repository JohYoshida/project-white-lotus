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

const toggleModalByIdButton = (id) => {
  return (event) => {
    event.preventDefault();
    const elt = document.getElementById(id);
    elt.classList.toggle('hidden');
    document.body.classList.toggle('modal-open');
  };
};
const toggleModalById = (id) => {
  console.log("i'm being called");
  console.log(elt);
  const elt = document.getElementById(id);
  elt.classList.toggle('hidden');
  document.body.classList.toggle('modal-open');
};

export {toggleElementByIdButton, toggleElementById, toggleModalByIdButton, toggleModalById};
