// write your code here
fetch(' http://localhost:3000/ramens')
.then(res => res.json())
.then(data => displayRamenMenu(data))
.catch(error => console.error(error))

//display all ramen images in menu
function displayRamenMenu(ramenArray) {
  const menu = document.getElementById('ramen-menu')
  ramenArray.forEach(ramen => {
    const img = document.createElement('img')
    img.src = ramen.image
    //need to know last id to add ramen from form
    lastId = ramen.id
    img.setAttribute('ramen-id', ramen.id)
    img.addEventListener('click', handleShowDetail)
    menu.appendChild(img)
  });
}

//display ramen details
function handleShowDetail(event) {
  const img = event.target
  const id = img.getAttribute('ramen-id')
  fetch(`http://localhost:3000/ramens/${id}`)
  .then(res => res.json())
  .then(data => {
    displayRamenDetail(data)
  })
  .catch(error => console.error(error))
}

function displayRamenDetail(data) {
  const img = document.querySelector('.detail-image')
  img.src = data.image
  img.alt = data.name
  const nameArea = document.querySelector('.name')
  nameArea.textContent = data.name
  const restaurant = document.querySelector('.restaurant')
  restaurant.textContent = data.restaurant
  const ratingDisplay = document.querySelector('#rating-display')
  ratingDisplay.textContent = data.rating
  const commentDisplay = document.querySelector('#comment-display')
  commentDisplay.textContent = data.comment
}

//display form data ramen in menu and detail
const form = document.getElementById('new-ramen')
form.addEventListener("submit", (event) => {
  event.preventDefault()
  const url = event.target[2].value
  const img = document.createElement('img')
  img.src = url
  img.alt=event.target[0].value
  const menu = document.getElementById('ramen-menu')
  menu.appendChild(img)
  //https://rasamalaysia.com/wp-content/uploads/2017/02/kimchi-ramen1.jpg
  //kimchi ramen
  //ramenesque
  //name
})
