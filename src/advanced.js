// write your code here
const setRamanPage = () => {
  fetch(' http://localhost:3000/ramens')
  .then(res => res.json())
  .then(data => displayRamenMenu(data))
  .catch(error => console.error(error))
}

setRamanPage();

//display all ramen images in menu
function displayRamenMenu(ramenArray) {
  const menu = document.getElementById('ramen-menu')
  menu.innerHTML = '';
  //boolean so that show details is called initially for the first menu item
  let done = false
  ramenArray.forEach(ramen => {
    const img = document.createElement('img')
    img.src = ramen.image
    img.setAttribute('ramen-id', ramen.id)
    img.addEventListener('click', handleShowDetail)
    menu.appendChild(img)
    if (!done) {
      handleShowDetail("", ramen.id)
      done = true
    }
  });
  
}

//display ramen details
function handleShowDetail(event, id=0) {
  if (!id) {
    const img = event.target
    id = img.getAttribute('ramen-id')
  }
  fetch(`http://localhost:3000/ramens/${id}`)
  .then(res => res.json())
  .then(data => {
    displayRamenDetail(data)
  })
  .catch(error => console.error(error))
}

const deleteButton = document.querySelector('#delete-ramen')
const updateForm = document.querySelector('#edit-ramen')
const addForm = document.querySelector('#new-ramen')

function displayRamenDetail(data) {
  const img = document.querySelector('.detail-image')
  img.src = data.image
  img.alt = data.name
  document.querySelector('.name').textContent = data.name
  document.querySelector('.restaurant').textContent = data.restaurant
  document.querySelector('#rating-display').textContent = data.rating
  document.querySelector('#comment-display').textContent = data.comment
  //put id in delete button
  deleteButton.setAttribute("ramen-id", data.id)
  updateForm.setAttribute("ramen-id", data.id)
}

deleteButton.addEventListener("click", deleteRaman)
//delete detail area
function deleteRaman() {
  const button = document.getElementById("delete-ramen")
  const deleteId = button.getAttribute("ramen-id")
  fetch(`http://localhost:3000/ramens/${deleteId}`, {
    method: 'DELETE',
    'Content-Type': 'application/json'
  })
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err))

  setRamanPage();
}

//display form data ramen in menu
const form = document.getElementById('new-ramen')
form.addEventListener("submit", (event) => {
  event.preventDefault()
  const url = event.target[2].value
  const img = document.createElement('img')
  img.src = url
  img.alt=event.target[0].value
  const menu = document.getElementById('ramen-menu')
  menu.appendChild(img)
})

//update form 
updateForm.addEventListener('submit', (event)=> {
  event.preventDefault()
  const ramenId = event.target.getAttribute("ramen-id")
  const updateObj = {
    rating: event.target[0].value,
    comment: event.target[1].value
  }
  updateRamen(updateObj, ramenId)
  setRamanPage()
})

function updateRamen(ramenObj, ramenId) {
  const ramen = JSON.stringify(ramenObj)
  fetch(`http://localhost:3000/ramens/${ramenId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: ramen
  })
  .then(res => res.json())
  .then(edited => console.log(edited))
}


//create new ramen
addForm.addEventListener('submit', event => {
  event.preventDefault()
  const formData = new FormData(addForm)
  ramenObj = {
    name: formData.get('name'),
    restaurant: formData.get('restaurant'),
    image: formData.get('image'),
    rating: formData.get('rating'),
    comment: formData.get('new-comment')
  }
  createNewRamen(ramenObj)
  setRamanPage();
})

function createNewRamen(ramenObj) {
  const ramen = JSON.stringify(ramenObj)
  fetch(`http://localhost:3000/ramens`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: ramen
  })
  .then(res => res.json())
  .then(added => console.log(added))
  .catch(error => console.error(error))
}