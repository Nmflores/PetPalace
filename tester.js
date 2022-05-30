const createUsersElementOnScreen = (title, tag, className, content) => {
    const root = document.getElementById('root');
    const h1 = document.createElement('h1');
    h1.innerText = title;
    const element = document.createElement(tag);
    element.classList.add(className)
    const ul = document.createElement('ul');

    for (let elem of content) {
        //console.log(elem)
        const li = document.createElement('li');
        li.innerText = `${elem.first_name} ${elem.second_name}`
        ul.appendChild(li)
    }
    element.appendChild(ul)
    root.appendChild(h1)
    root.appendChild(element)
}

const createPetsElementOnScreen = (title, tag, className, content) => {
    const root = document.getElementById('root');
    const h1 = document.createElement('h1');
    h1.innerText = title;
    const element = document.createElement(tag);
    element.classList.add(className)
    const ul = document.createElement('ul');

    for (let elem of content) {
        //console.log(elem)
        const li = document.createElement('li');
        li.innerText = `${elem.petName} -- ${elem.petType} -- ${elem.ownerName}`
        ul.appendChild(li)
    }
    element.appendChild(ul)
    root.appendChild(h1)
    root.appendChild(element)
}


const createWorkersElementOnScreen = (title, tag, className, content) => {
    const root = document.getElementById('root');
    const h1 = document.createElement('h1');
    h1.innerText = title;
    const element = document.createElement(tag);
    element.classList.add(className)
    const ul = document.createElement('ul');

    for (let elem of content) {
        //console.log(elem)
        const li = document.createElement('li');
        li.innerText = `${elem.first_name} ${elem.second_name} -- ${elem.service_name} -- serviceID: ${elem.service_id}`
        ul.appendChild(li)
    }
    element.appendChild(ul)
    root.appendChild(h1)
    root.appendChild(element)
}

const createWorkersByServiceIdElementOnScreen = (title, tag, className, content) => {
    const root = document.getElementById('root');
    const h1 = document.createElement('h1');
    h1.innerText = title;
    const element = document.createElement(tag);
    element.classList.add(className)
    const ul = document.createElement('ul');

    for (let elem of content) {
        //console.log(elem)
        const li = document.createElement('li');
        li.innerText = `${elem.first_name} ${elem.second_name} -- ${elem.service_name} -- serviceID: ${elem.service_id}`
        ul.appendChild(li)
    }
    element.appendChild(ul)
    root.appendChild(h1)
    root.appendChild(element)
}

const getUsers = function () {
    $.get({
        url: 'http://localhost:8080/api/v1/users',
        //data: data,
        //success: success,
        //dataType: dataType
    }).done(function (response) {
        //console.log('USERS: ',response);
        createUsersElementOnScreen('Users Display', 'div', 'users-container', response)
    }).fail(function (error) {
        //console.log('ERROR: ',error);
    })
}

const getPets = function () {
    $.get({
        url: 'http://localhost:8080/api/v1/pets',
        //data: data,
        //success: success,
        //dataType: dataType
    }).done(function (response) {
        //console.log('PETS: ',response);
        createPetsElementOnScreen('Pets Display', 'div', 'users-container', response)
    }).fail(function (error) {
        //console.log('ERROR: ',error);
    })
}

const getWorkers = function () {
    $.get({
        url: 'http://localhost:8080/api/v1/works',
        //data: data,
        //success: success,
        //dataType: dataType
    }).done(function (response) {
        //console.log('WORKS: ',response);
        createWorkersElementOnScreen('Workers Display', 'div', 'users-container', response)
    }).fail(function (error) {
        //console.log('ERROR: ',error);
    })
}

const getWorkersByServiceID = function (serviceId) {
    $.get({
        url: `http://localhost:8080/api/v1/works/${serviceId}`,
        //data:{} ,
        //success: success,
        //dataType: dataType
    }).done(function (response) {
        createWorkersByServiceIdElementOnScreen(`Workers by Service ID ${serviceId}`, 'div', 'users-container', response)
        //console.log('WORKERS: ',response);
    }).fail(function (error) {
        //console.log('ERROR: ',error);
    })
}

getUsers();
getPets();
getWorkers();
getWorkersByServiceID(0);



let login = () => {
    $.ajax({
        type:'POST',
        url: `http://localhost:8080/api/v1/login`,
        data:  {username:'jonas', password:'12345'},
        dataType: 'text/json',
        async: true, 
        success:  function (response) {
            console.log('login: ', response.auth);
            //console.log('cookies: ',response.cookies);
            //createWorkersElementOnScreen('Workers Display', 'div', 'users-container', response)
        },
        error:  function (error) {
            console.log('ERROR: ', error.msg);
        }
    })
}

const register = () => {
    const registerData =  {
        username: "jose",
        password: "12345",
        email : "jose_porfirio@gmail.com",
        firstName: "jose",
        secondName: "porfirio",
        userGender: "m",
        cpf : "9381283",
        loyalty: null,
        address: "rua sardinha",
        addressNbr: 20,
        district: "zona sul",
        cep: "955540000",
        state: "PR"
    };
    $.ajax({
        type:'POST',
        url: `http://localhost:8080/api/v1/register`,
        data:  registerData,
        dataType: 'text/json',
        async: true, 
        success:  function (response) {
            console.log('login: ', response.auth);
            //console.log('cookies: ',response.cookies);
            //createWorkersElementOnScreen('Workers Display', 'div', 'users-container', response)
        },
        error:  function (error) {
            console.log('ERROR: ', error.msg);
        }
    })
}


