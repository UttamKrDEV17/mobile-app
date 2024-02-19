import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js"
import { getDatabase, ref, push, onValue} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-89867-default-rtdb.asia-southeast1.firebasedatabase.app"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListinDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

onValue(shoppingListinDB, function(snapshot){
    let itemsArray = Object.values(snapshot.val())
    clearInputFieldEl()
    for(let i=0;i<itemsArray.length;i++){
        appendItemToShoppinglistEl(itemsArray[i])
    }
})

addButtonEl.addEventListener("click", function(){
    let inputValue = inputFieldEl.value
    push(shoppingListinDB, inputValue)
    clearInputFieldEl()
})

function clearInputFieldEl(){
    inputFieldEl.value= ""
}

function appendItemToShoppinglistEl(itemValue){
    shoppingListEl.innerHTML += `<li>${itemValue}</li>`
}

function clearShoppingListEl(){
    shoppingListEl.innerHTML = ""
}