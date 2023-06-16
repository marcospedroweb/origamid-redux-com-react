/*
    [Currying]  
      Uma função curried permite passarmos um argumento por vez, ao invés de todos de uma vez.
    */
function somar(a, b, c) {
  return a + b + c;
}
somar(2, 5, 10);

function somar_(a) {
  return (b) => {
    return (c) => {
      return a + b + c;
    };
  };
}
// ou const somar_ = a => b => c => a + b + c;
console.log(somar_(2)(5)(10));

window.onload = () => {
  //EXEMPLO REAL

  const getElementAttr = (attr) => (element) => element.getAttribute(attr);
  const getAttrDataSlide = getElementAttr('data-slide');
  const getAttrId = getElementAttr('id');

  const li = Array.from(document.querySelectorAll('li'));

  const dataSlideList = li.map(getAttrDataSlide); // ['1', '2', '3', '4'];
  const idList = li.map(getAttrId); // ['item1', 'item2', 'item3', 'item4'];
};
