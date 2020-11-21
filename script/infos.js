let avaliations = [];
let idAval = 0;

function saveAval() {
  let name = document.querySelector('#nome');
  let avaliation = document.querySelector('#aval');

  if (name.value == "" || avaliation.value == ""){
    alert('Preencha os campos antes de enviar a avaliação!');
  } else {
    avaliations[idAval] = `Nome: ${name.value} | Avaliação: ${avaliation.value}`;
    name.value = "";
    avaliation.value = "";
    idAval++;

    document.querySelector('h1#ty').classList.remove('hide');

    setInterval(() => {
      document.querySelector('h1#ty').classList.add('hide');
    }, 5000)
  }
}