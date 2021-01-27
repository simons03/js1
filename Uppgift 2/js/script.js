
// deklararar för add knappen och för form
const add = document.querySelector('#add');
const addIcon = document.querySelector('#addicon');
const addIcon2 = document.querySelector('#addicon2');
const formHolder = document.querySelector('#form-holder')
const form = document.querySelector('#form');
const input = document.querySelector('#input');
const addTodobtn = document.querySelector('#addTodo')
const output = document.querySelector('#output')
const errorMessage = document.querySelector('#error-message');


// skapar arrayen
let todos = [];


// den här ändrar add knappen
let addvalue = true;

// Hämtar hem alla todos från jasonplaceholders
const fetchTodos = () => {
  fetch('https://jsonplaceholder.typicode.com/todos?_start=0&_limit=10')
  .then(response => response.json())
  .then(data => {
    todos = data;
    // console.log(todos)
    listTodos();
    // console.log(data)
  })
}
fetchTodos();




const newTodo = (todo) => {
  let card = document.createElement('div');
  card.classList.add('card', 'py-3', 'my-3', 'animate')
  card.setAttribute('id', `${todo.id}`)

  let innerCard = document.createElement('div');
  innerCard.classList.add('d-flex', 'justify-content-between', 'align-items-center');

  let innerInnerCard = document.createElement('div');
  innerInnerCard.classList.add('d-flex', 'align-items-center')

  let h5 = document.createElement('h5');
  h5.classList.add('title', 'mx-3')
  h5.innerText = todo.title

  if(todo.completed) {
    h5.classList.add('text-decoration')
  }

  let innerInnerCardButtons = document.createElement('div');
  
  let buttonRemove = document.createElement('button');
  buttonRemove.classList.add('button', 'bg-removed', 'd-none')
  
  buttonRemove.addEventListener('click', (e) => {
    todos = todos.filter(todo => todo.id != e.target.parentNode.parentNode.parentNode.id)
    listTodos();

    // console.log(todos)
  })



  let buttonCheck = document.createElement('button');
  buttonCheck.classList.add('button')

  if(todo.completed) {
    buttonCheck.classList.add('bg-checked')
    buttonRemove.classList.remove('d-none')
  }


  // Kör min event lissener för button check här
  buttonCheck.addEventListener('click', () => {
    buttonCheck.classList.toggle('bg-checked')
    buttonRemove.classList.toggle('d-none')
    h5.classList.toggle('text-decoration')

    todo.completed = !todo.completed;

  })

 
  innerInnerCardButtons.appendChild(buttonRemove);
  innerInnerCardButtons.appendChild(buttonCheck);

  innerInnerCard.appendChild(h5);

  innerCard.appendChild(innerInnerCard);
  innerCard.appendChild(innerInnerCardButtons);
  

  card.appendChild(innerCard)
  output.insertBefore(card, document.querySelector('#output .card'));
}






const listTodos = () => {
  sortArray()
  output.innerHTML = '';
  todos.forEach(todo => {
    newTodo(todo)
  })
}


const createTodo = async (title) => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body:JSON.stringify({
        title,
        completed: false
      })
    });
    const data = await res.json();
    todos.unshift(data);
    newTodo(data)
  } 
  catch(error) {
    console.log(error);
  }

}




const validate = () => {
  if (input.value == '') {
    input.classList.add('is-invalid')
    errorMessage.innerText = 'Du måste skrive en Todo!!'
    return false
  }
  else {
    input.classList.remove('is-invalid');
    errorMessage.innerText = ''
    return true

  }
}


form.addEventListener('submit', (e) => {
  e.preventDefault();

  if(validate()) {
    createTodo(input.value);
    // console.log(input.value)
    input.value = '';
    formHolder.classList.add('d-none');    
    addIcon.classList.remove('d-none');
    addIcon2.classList.add('d-none');

    addvalue = true
  }

})






// Denna funktionen tar fram formuläret
add.addEventListener('click', () => {
  if (addvalue == true) {
    addIcon.classList.add('d-none');
    addIcon2.classList.remove('d-none');

    formHolder.classList.remove('d-none')
    addvalue = false;
    input.focus();
  }
  else if (addvalue == false) {
    addIcon.classList.remove('d-none');
    addIcon2.classList.add('d-none');

    formHolder.classList.add('d-none')

    addvalue = true;
  }
})



function sortArray() {
  todos.sort((a,b) => b.completed - a.completed)
}
