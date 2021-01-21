const form = document.querySelector('#form');
const input = document.querySelector('#todoInput');
const output = document.querySelector('#output')
const errorMessage = document.querySelector('#error-message');
const done = document.querySelector('.check')



let todos = []; 

const fetchTodos = () => {
  fetch('https://jsonplaceholder.typicode.com/todos?_start=0&_limit=10')
  .then(response => response.json())
  .then(data => {
    todos = data;
    console.log(todos)
    listTodos();
    // console.log(data)
  })
}
fetchTodos();















const newTodo = (todo) => {
  let card = document.createElement('div');
  card.classList.add('card', 'p-3')
  card.setAttribute('id', `${todo.id}`)

  if(todo.completed) {
    card.classList.add('bg-green')
  }
  else {
    card.classList.remove('bg-green')
  }


  let innerCard = document.createElement('div');
  innerCard.classList.add('d-flex', 'justify-content-between', 'align-items-center');

  let innerInnerCard = document.createElement('div');
  innerInnerCard.classList.add('d-flex', 'align-items-center');

  let innerCardInput = document.createElement('input');
  innerCardInput.classList.add('check');
  innerCardInput.setAttribute('type', 'checkbox');



  if(todo.completed) {
    innerCardInput.checked = true
    
  }


  innerCardInput.addEventListener('click', () => {
    card.classList.toggle('bg-green')
    button.classList.toggle('done')


    todos.map(g => {
      if(g.id === todo.id) {
        todo.completed = !todo.completed
        console.log(g)
      }
      return g
      
    })
  })


  let h3 = document.createElement('h3');
  h3.classList.add('title', 'mx-3')
  h3.innerText = todo.title


  let button = document.createElement('button');
  button.classList.add('btn', 'btn-danger')
  button.innerText = 'X';

  if(todo.completed) {
    button.classList.add('done')
  }
  else {
    button.classList.remove('done')
  }


  innerInnerCard.appendChild(innerCardInput)
  innerInnerCard.appendChild(h3)
  innerCard.appendChild(innerInnerCard)
  innerCard.appendChild(button)
 
  card.appendChild(innerCard)
  output.appendChild(card)


}

const listTodos = () => {
  
  output.innerHTML = '';

  todos.forEach(todo => {
    newTodo(todo)
  })

}



const createTodo = (title) => {

  fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      title,
      completed: false
    })
    
  })
  .then(res => res.json())
  .then(data => {
    console.log(data)
    todos.unshift(data)
    listTodos();

  })
}



const validate = () => {
  if(input.value == '') {
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



form.addEventListener('submit', e => {
  e.preventDefault();
  if (validate()) {
    createTodo(input.value);
    console.log(input.value)
    input.value = '';

  }
})








output.addEventListener('click', (e) => {
  // console.log(e.target.parentNode.parentNode.id)

  if(e.target.classList.contains('done')) {
    todos = todos.filter(todo => todo.id != e.target.parentNode.parentNode.id)
      // console.log(todo.id)
      // console.log('detta fungerar inte')
      // console.log(todos)

    
    

    // console.log(todo.id)
    // console.log(users)
    // console.log(todos)
    listTodos();
}
else {
  // console.log('nått är inte rätt')
}


})




