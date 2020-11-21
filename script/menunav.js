function addClass(event) {
  const liSelected = event.target;

  const lis = document.querySelectorAll('ul#nav li');
  lis.forEach(element => {
    element.classList.remove('active');
  });

  liSelected.classList.add('active');
}