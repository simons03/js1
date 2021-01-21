let users = [
    {
        id:'1',
        firstName: 'Simon',
        lastName: 'Soderberg',
        Email: 'simon@sod.com'
    },
    {
        id:'2',
        firstName: 'Nils',
        lastName: 'Carlsson',
        Email: 'No@mail.com'
    },
    {
        id:'3',
        firstName: 'Rudolf',
        lastName: 'Svensson',
        Email: 'Rudolf@Sven.com'
    },
    {
        id:'4',
        firstName: 'Johanna',
        lastName: 'Eriksson',
        Email: 'Johanna@erik.com'
    },
]


const form = document.querySelector('#user-form');
const firstname = document.querySelector('#firstname');
const lastname = document.querySelector('#lastname');
const email = document.querySelector('#Email');
const adduserbtn = document.querySelector('#submit');
const list = document.querySelector('#list');
let userId;



// Error meddelanden som läggs ut under input fliken 
const errorfirstname = document.querySelector('#errorfirstname');
const errorlastname = document.querySelector('#errorlastname');
const errormail = document.querySelector('#errormail');


let change = false

const listUser = () => {
        list.innerHTML = ''
    users.forEach(user => {
        // console.log(user)   //skriver ut users i consolen
        // console.log(users)
        list.innerHTML += `<div id="${user.id}" class=" listitems rounded p-2 d-flex justify-content-between align-items-center mt-1"> <div> ${user.firstName} ${user.lastName}<br><span class="email-style"> ${user.Email} </span> </div> <div><button class="btn btn-primary px-2 Change-btn">Change</button> <button class="btn btn-danger px-2 remove-btn">Remove</button></div></div>`
    })
}
listUser()



adduserbtn.addEventListener('click', (e) => {
    e.preventDefault();

    if(change === true) {
        // console.log(userId)
        users = changeUser(userId);
        change = false
        adduserbtn.innerText = 'Add User';
        // console.log(changeUser(userId))
        listUser();
        firstname.value = '';
        lastname.value = '';
        Email.value = '';
        return
    }
    
    validate('firstname');
    validate('lastname');
    checkInputsEmail();
    console.log(checkInputsEmail())
  


    let inputfirstname = document.querySelector('#firstname')
    let inputlastname = document.querySelector('#lastname')
    let inputemail = document.querySelector('#Email')




    if (validate('firstname') && validate('lastname') && checkInputsEmail()) {
        let newuser = {
            id: uuidv4(),
            firstName: firstname.value,
            lastName: lastname.value,
            Email: email.value
        }
        inputfirstname.classList.remove('is-valid');
        inputlastname.classList.remove('is-valid');
        inputemail.classList.remove('is-valid');
    
        users.push(newuser);
        listUser();
        console.log(users)

        firstname.value = '';
        lastname.value = '';
        email.value = '';

    }
});



function validate(id) {
    let input = document.querySelector('#' + id);
    let error = document.querySelector('#error' + id) 
    const re =/^[A-Za-z- ]+$/
    const checknumber = re.test(input.value)


    if(input.value === '' || input.value < 2) {
        input.classList.add('is-invalid');
        error.innerHTML = `You need a  ` + id;

        input.focus()
        return false
    } 
    else if (checknumber == false){
        input.classList.add('is-invalid');
        error.innerHTML = `Can't use numbers`;
        input.focus()
        return false

    }

    else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');

        error.innerHTML = ``;
        return true
    }
}







function checkInputsEmail() {
    // const input = document.querySelector('#Email')
    // const checkifemailistaken = document.querySelector('#Email').value
    const emailValue = email.value.trim(); 

    const re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const emailtest = re.test(emailValue);
    // console.log(emailtest)
    let sucsess = false
   
    email.classList.remove('is-invalid');

    if(emailtest == true) {
        email.classList.add('is-valid');
        errormail.innerHTML = ``

        if(users.some(user => user.Email === email.value)) {
            sucsess = false
            errormail.innerHTML = `Eposten finns redan`;
            email.classList.add('is-invalid');
        } else {
            sucsess = true
            errormail.innerHTML = ``;
            email.classList.remove('is-invalid');
        }
    }
    else if (emailValue == '') {
        email.classList.add('is-invalid');
        errormail.innerHTML = `You need to enter an valid email`;
        // input.focus();
    }

    else {
        email.classList.add('is-invalid');
        errormail.innerHTML = `Must enter an valid email: simple@example.com`;
        // input.focus();
    }

   return sucsess
}






function changeUser(id) {
    return users.map(user => {
        if(user.id === id)
            return {
                id: user.id, 
                firstName: firstname.value,
                lastName: lastname.value,
                Email: email.value,
            }
            // console.log(user.firstName)
            console.log(user)
        return user
    })
    // console.log(users)
}

 






list.addEventListener('click', (e) => {
    // console.log(e.target)
    //kollar om klassen remove-btn finns om den finns så tar den bort parent parent id
    if(e.target.classList.contains('remove-btn')) {
        users = users.filter(user => user.id !== e.target.parentNode.parentNode.id)
        listUser();
        // console.log(users)
    }

    // Kollar om klassen Change-btn finns i så fall ska den stoppa in värdet i inputsen
    else if(e.target.classList.contains('Change-btn')) {
        // console.log(e.target)
        change = true;
        adduserbtn.innerText = 'Change user info';

        userId = e.target.parentNode.parentNode.id;
        let user = users.find(user => user.id == e.target.parentNode.parentNode.id)
        // let i = users.indexOf(user)
        let firstname = user.firstName
        let lastname = user.lastName
        let email = user.Email



        document.querySelector('#firstname').value = firstname
        document.querySelector('#lastname').value = lastname
        document.querySelector('#Email').value = email
        // firstname = i.firstName.value

    }
  })












