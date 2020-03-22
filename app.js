const getUsersBtn = document.querySelector('.get-users-btn');
const usersList = document.querySelector('.users-list');
const userInfo = document.querySelector('.user-info-outer');
const userInfoCard = document.querySelector('.user-info-card');
const form = document.forms['form-add-new-user'];
const inputName = document.querySelector('#input-name');
const inputUserName = document.querySelector('#input-user-name');
const inputEmail = document.querySelector('#input-email');
const inputAdd = document.querySelector('#input-add');
let formData = new FormData(document.forms.formAddNewUser);
const objOfUsers = {}

function getUsers(cb) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://jsonplaceholder.typicode.com/users');
  xhr.addEventListener('load', () => {
    const response = JSON.parse(xhr.responseText);
    cb(response);
  });

  xhr.addEventListener('error', () =>{
    console.log('error');
  });

  xhr.send();
}

function liTemplate(user) {
  const li = document.createElement('li');
  li.classList.add('list-item');
  li.setAttribute('data-user-id', user.id);
  li.textContent = user.name;
  return li;
}

function renderUsers(response) {
  const fragment = document.createDocumentFragment();

  response.forEach(user => {
    const li = liTemplate(user);
    fragment.appendChild(li);
    objOfUsers[user.id] = user;
  })

  if (usersList.hasChildNodes()) {
    usersList.innerHTML = ""
    usersList.appendChild(fragment)
  } else usersList.appendChild(fragment);
}

getUsersBtn.addEventListener('click', e => {
  getUsers(renderUsers)  
})

usersList.addEventListener('click', onLiHandler);

function getUserInfo(cb, id) {
  let user = objOfUsers[id]
  cb(user)
}

function cardTemplate(user) {
  userInfoCard.innerHTML = `<p>Name: ${user.name}</p><p>Username: ${user.username}</p><p>Email: ${user.email}</p>`
  return userInfoCard;
}

function renderUserInfo(user) {
  const fragment = document.createDocumentFragment();
  const card = cardTemplate(user);
  fragment.appendChild(card);
  
  userInfo.appendChild(fragment);
}

function onLiHandler({ target }) {
  if (target.classList.contains('list-item')) {
    const id = target.dataset.userId;
    getUserInfo(renderUserInfo, id)
  }
}

function renderNewUser(user) {
  const fragment = document.createDocumentFragment();
  const li = liTemplate(user);
  fragment.appendChild(li);
  usersList.appendChild(fragment);
}

inputAdd.addEventListener('click', e => {
  e.preventDefault();
  fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    body: JSON.stringify({
      name: inputName.value,
      username: inputUserName.value,
      email: inputEmail.value
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(json => {
    objOfUsers[json.id] = json;
    renderNewUser(json);
    form.reset();
  })
})
