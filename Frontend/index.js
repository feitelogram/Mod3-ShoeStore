// Code your solution here

let shoeList = document.querySelector("#shoe-list")
let shoesUrl = "http://localhost:3000/shoes"
let shoeShowImg = document.querySelector("#shoe-image")
let shoeShowName = document.querySelector("#shoe-name")
let shoeShowDesc = document.querySelector("#shoe-description")
let shoeShowPrice = document.querySelector("#shoe-price")
let shoeShowReviews = document.querySelector("#reviews-list")
let reviewFormDiv = document.querySelector("#form-container")

let getAllShoes = () => {
    fetch(shoesUrl)
    .then(resp => resp.json())
    .then(ShoesArr => {
        ShoesArr.forEach(shoeObj => {
            putShoesOnPage(shoeObj)
        })
        putShoeOnShow(ShoesArr[0])
    })
}

let putShoesOnPage = (shoeObj) => {
    let newShoeLi = document.createElement("li")
    newShoeLi.className = "list-group-item"
    newShoeLi.innerText = shoeObj.name
    newShoeLi.addEventListener ("click", (event) => {
        putShoeOnShow(shoeObj)
    })
    shoeList.append(newShoeLi)
}

let putShoeOnShow = (shoeObj) => {
    shoeShowImg.src = shoeObj.image
    shoeShowName.innerText = shoeObj.name
    shoeShowDesc.innerText = shoeObj.description
    shoeShowPrice.innerText = `${shoeObj.price} dollars`
    reviewFormDiv.innerHTML = ""
    let reviewForm = document.createElement("form")
    reviewForm.id = "new review"
    reviewForm.innerHTML = `
    <div class="form-group">
      <textarea class="form-control" id="review-content" rows="3"></textarea>
      <input type="submit" class="btn btn-primary"></input>
    </div>`
    reviewForm.addEventListener("submit", (event) => {
        event.preventDefault()
        let reviewContent = reviewForm.querySelector("#review-content").value
        console.log(reviewContent)
        fetch(`http://localhost:3000/shoes/${shoeObj.id}/reviews`, {
          method:'POST',
         headers: { 
             'Content-type': 'application/json',
             'accept': 'application/json'
         },
         body: JSON.stringify({
        content: reviewContent
          })
        })
        .then(resp => resp.json())
        .then(json_resp => {
        let reviewLi = document.createElement("li")
        reviewLi.innerText = reviewContent
        shoeShowReviews.append(reviewLi)
        })
    })
    reviewFormDiv.append(reviewForm)
    shoeShowReviews.innerHTML = ""
    fetch(`http://localhost:3000/shoes/${shoeObj.id}`)
    .then(resp => resp.json())
    .then(UpdatedShoe => {
        UpdatedShoe.reviews.forEach(review => {
            let reviewLi = document.createElement("li")
            reviewLi.innerText = review.content
            shoeShowReviews.append(reviewLi)
        })
    })
}

getAllShoes()