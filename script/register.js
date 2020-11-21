function show(e) {
  console.log(e);
}

let regs = new Array();
let get = e => document.querySelector(e);
let getAll = e => document.querySelectorAll(e);

let nome;
let gender;
let birth;
let CPF;
let Email;
let tel;
let state;
let city;
let hour;

function register() {
  nome = get('#name').value;

  let inputs = getAll('#alt1 input');
  inputs.forEach(e => {
    if (inputs[0].checked == true) {
      gender = 'M';
    }
    else if (inputs[1].checked == true) {
      gender = 'F';
    }
  });

  birth = get('#dateBirth').value;

  CPF = get('#cpf').value;

  Email = get('#email').value;

  tel = get('#tel').value;

  state = get('#state').value;

  city = get('#town').value;

  let horarios = getAll('#alt2 input');
  horarios.forEach(e => {
    if (horarios[0].checked == true) {
      hour = "8h às 12h";
    } else if (horarios[1].checked == true) {
      hour = "13h às 17h";
    } else if (horarios[2].checked == true) {
      hour = "18h às 22h";
    } else if (horarios[3].checked == true) {
      hour = "8h às 17h";
    }
  });


  let cadastro = {
    name: nome,
    genero: gender,
    nascimento: birth,
    cpf: CPF,
    email: Email,
    telefone: tel,
    estado: state,
    cidade: city,
    disponibilidade: hour
  };

  regs.push(cadastro);
  
  get('fieldset').remove();
  get('main').innerHTML += `<h1>Enviado!  &#128513;</h1>`;
  setTimeout(() => {
    location.reload();
  }, 3000);
}