// write your code here
//get necessary document elements
const deleteButton = document.querySelector('#delete-ramen')
const updateForm = document.querySelector('#edit-ramen')
const addForm = document.querySelector('#new-ramen')

//add ramen to page
setRamanPage();

//display all ramen images in menu
function displayRamenMenu(ramenArray) {
  console.log(ramenArray)
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
      done = true;
    }
  });
}

//display ramen details
function handleShowDetail(event, id=0) {
  if (!id) {
    const img = event.target
    id = img.getAttribute('ramen-id')
  }
  //get single ramen
  getSingleRamen(id) 
}

//display ramen info in detail area
function displayRamenDetail(data) {
  const img = document.querySelector('.detail-image')
  img.src = data.image
  img.alt = data.name
  document.querySelector('.name').textContent = data.name
  document.querySelector('.restaurant').textContent = data.restaurant
  document.querySelector('#rating-display').textContent = data.rating
  document.querySelector('#comment-display').textContent = data.comment
  //put id in delete button and update form
  deleteButton.setAttribute("ramen-id", data.id)
  updateForm.setAttribute("ramen-id", data.id)
}

//EVENT LISTENERS

//delete button event listener
deleteButton.addEventListener("click", deleteRaman)

function deleteRaman() {
  const button = document.getElementById("delete-ramen")
  const deleteId = button.getAttribute("ramen-id")
  deleteRamen(deleteId) 
}

//update form event listener 
updateForm.addEventListener('submit', (event)=> {
  event.preventDefault()
  const ramenId = event.target.getAttribute("ramen-id")
  const updateObj = {
    rating: event.target[0].value,
    comment: event.target[1].value
  }
  updateRamen(updateObj, ramenId)
  updateForm.reset();
})

// new ramen event listener
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
  addForm.reset();
})

//  FETCH CALLS

// GET all
function setRamanPage() {
  fetch(' http://localhost:3000/ramens')
  .then(res => res.json())
  .then(data => displayRamenMenu(data))
  .catch(error => console.error(error))
}

//GET single ramen
function getSingleRamen(id) {
  fetch(`http://localhost:3000/ramens/${id}`)
  .then(res => res.json())
  .then(data => {
    displayRamenDetail(data)
  })
  .catch(error => console.error(error))
}

//POST new ramen
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
  .then(added => {
    console.log(added)
    setRamanPage()
  })
  .catch(error => console.error(error))
}

//PATCH ramen
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
  .then(edited => {
    console.log(edited)
    setRamanPage()
  })
  .catch(error => console.error(error))
}

//DELETE single ramen
function deleteRamen(id) {
  fetch(`http://localhost:3000/ramens/${id}`, {
    method: 'DELETE',
    'Content-Type': 'application/json'
  })
  .then(res => res.json())
  .then(res => {
    console.log(res)
    setRamanPage()
  })
  .catch(err => console.error(err))
}
