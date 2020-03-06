const getUsersBtn = document.querySelector('.get-users-btn');
const usersList = document.querySelector('.users-list');
const userInfo = document.querySelector('.user-info-outer');
const userInfoCard = document.querySelector('.user-info-card')

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
  li.setAttribute('data-user-id', user.id)
  const a = document.createElement('a');
  a.classList.add('user-link')  
  a.setAttribute('href', '#')
  a.textContent = user.name;
  li.appendChild(a)
  return li;
}

function renderUsers(response) {
  const fragment = document.createDocumentFragment();

  response.forEach(user => {
    const li = liTemplate(user);
    fragment.appendChild(li);
  })

  usersList.appendChild(fragment);
}

getUsersBtn.addEventListener('click', e => {
  getUsers(renderUsers)
})

usersList.addEventListener('click', onLiHandler);

function getUserInfo(cb, id) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `https://jsonplaceholder.typicode.com/users/${id}`);
  xhr.addEventListener('load', () => {
    const response = JSON.parse(xhr.responseText);
    cb(response);
  });

  xhr.addEventListener('error', () =>{
    console.log('error');
  });

  xhr.send();
}

function cardTemplate(user) {
  userInfoCard.innerHTML = `Name: ${user.name}<br>Username: ${user.username}<br>Email: ${user.email}<br>Address: ${user.address.street} str., ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}<br>Phone: ${user.phone}<br>Web-site: ${user.website}<br>Company: ${user.company.name}`
  return userInfoCard;
}

function renderUserInfo(user) {
  const fragment = document.createDocumentFragment();
  const card = cardTemplate(user);
  fragment.appendChild(card);
  
  userInfo.appendChild(fragment);
}

function onLiHandler({ target }) {
  if (target.classList.contains('user-link')) {
    const parent = target.closest('[data-user-id]');
    const id = parent.dataset.userId;
    getUserInfo(renderUserInfo, id)
  }
}

