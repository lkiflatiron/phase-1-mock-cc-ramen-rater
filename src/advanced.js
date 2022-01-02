// write your code here
fetch(' http://localhost:3000/ramens')
.then(res => res.json())
.then(data => displayRamenMenu(data))
.catch(error => console.error(error))

//display all ramen images in menu
function displayRamenMenu(ramenArray) {
  const menu = document.getElementById('ramen-menu')
  //boolean so that show details is called initially for the first menu item
  let done = false
  ramenArray.forEach(ramen => {
    const img = document.createElement('img')
    img.src = ramen.image
    //need to know last id to add ramen from form
    lastId = ramen.id
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
}

deleteButton.addEventListener("click", deleteRaman)
//delete detail area
function deleteRaman() {
  const img = document.querySelector('.detail-image')
  img.src = ''
  img.alt = ''
  document.querySelector('.name').textContent = ''
  document.querySelector('.restaurant').textContent = ''
  document.querySelector('#rating-display').textContent = ''
  document.querySelector('#comment-display').textContent = ''
  deleteMenuRamen()
}

function deleteMenuRamen() {
  const ramenId = deleteButton.getAttribute('ramen-id')
  imgs = document.querySelectorAll("#ramen-menu img")
  imgs.forEach(img => {
    ramenImageId = img.getAttribute('ramen-id')
    if (ramenImageId === ramenId) {
      img.remove()
      return
    }
  })
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
const updateForm = document.getElementById('edit-ramen')
updateForm.addEventListener('submit', (event)=> {
  event.preventDefault()
  const newRating = event.target[0].value
  const newComment = event.target[1].value
  document.getElementById('rating-display').textContent = newRating
  document.getElementById('comment-display').textContent = newComment
})
