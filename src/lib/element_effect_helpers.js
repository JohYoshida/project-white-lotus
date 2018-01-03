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
  const elt = document.getElementById(id);
  elt.classList.toggle('hidden');
  document.body.classList.toggle('modal-open');
};

const toggleHiddenElements = (parentElt) => {
  for(const child of parentElt.children){
    if(child.classList.contains('hidden')){
      child.classList.toggle('hidden');
    }
  }
};

export {toggleElementByIdButton, toggleElementById, toggleModalByIdButton, toggleModalById, toggleHiddenElements};
