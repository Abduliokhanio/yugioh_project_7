document.addEventListener('DOMContentLoaded', () => {

});

const BaseUrl = "http://127.0.0.1:3000"

////////////////////////////////////////////////////////////////create
function addToCart(){
    event.preventDefault();
    let cardFromApiId = event.target.parentElement.id
    fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${cardFromApiId}`)
    .then(response => response.json())
    .then(card => {
        let cardData = card.data[0]

        //let cardId = cardData.id;
        let cardName = cardData.name;
        let cardDesc = cardData.desc;
        let cardImgSm = cardData.card_images[0].image_url_small
        
        let cardWeCreate =  {
            name: cardName,
            desc: cardDesc,
            img_sm: cardImgSm,
            cart_id: 1
        }

        let config = {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cardWeCreate)
        }

        fetch(`${BaseUrl}/cards`, config)

    })
}

//////////////////////////////////////////////////////////////read
function getAllCardsFromApi(){
    let cardCollection = document.getElementById("card-collection")
    cardCollection.innerHTML = ''
    fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php?level=12')
        .then(response => response.json())
        .then(cards => {
            let cards_array = cards.data;
            cards_array.forEach(card => {
                let cardId = card.id;
                let cardName = card.name;
                let cardDesc = card.desc;
                let cardImgSm = card.card_images[0].image_url_small

                c = new Card(cardId, cardName, cardDesc, cardImgSm)
                c.displayCardsFromApi()
            })
        });
}

function getAllCardsFromCart(){
    let cardCollection = document.getElementById("card-collection")
    cardCollection.innerHTML = ''
    fetch(`${BaseUrl}/cards`)
        .then(response => response.json())
        .then(cards =>{
            cards.forEach(card => {
                let cardId = card.id;
                let cardName = card.name;
                let cardDesc = card.desc;
                let cardImgSm = card.img_sm
                c = new Card(cardId, cardName, cardDesc, cardImgSm)
                c.displayCardsFromCart()
            })
            
        })
}


////////////////////////////////////////////////////////////////update

function editCardForm(){
    event.preventDefault()
    let editForm =  document.getElementById("card-edit")
    let cardId = parseInt(event.target.parentElement.id)
   
    editForm.innerHTML = 
    `
    <form action="/action_page.php">
        <label>Name:</label><br>
        <input type="text" id="edit-name" value=""><br>
        <label>Description:</label><br>
        <input type="text" id="edit-desc" value=""><br>
        <input type='hidden' id = 'edit_card_id' value="${cardId}">
        <input type="submit" value="Edit Card">
    </form>
    `

    document.addEventListener('submit', editCard)
}

function editCard(){
    event.preventDefault()
    let editName = document.getElementById("edit-name").value;
    let editDesc = document.getElementById("edit-desc").value
    let cardId = parseInt(document.getElementById("edit_card_id").value)

    let card = {
        name: editName,
        desc: editDesc
    }

    let config = {
        method: 'PATCH',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(card)
    }

    fetch(`${BaseUrl}/cards/${cardId}`, config)
        .then(response => response.json())
        .then(card => {
            let cardId = card.id;
            let cardName = card.name;
            let cardDesc = card.desc;
            let cardImgSm = card.img_sm
            c = new Card(cardId, cardName, cardDesc, cardImgSm)
            c.replaceCardAfterEdit(cardId)
        })
}


////////////////////////////////////////////////////////////////delete
function deleteCard(){
    event.preventDefault()
    let cardId = parseInt(event.target.parentElement.id)

    let config = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }

    
    fetch(`${BaseUrl}/cards/${cardId}`, config)
    event.target.parentElement.remove()
}