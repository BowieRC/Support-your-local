var sortContainerEl = $("#sortByContainer");
var sortOptionsEl = $("#sortOptions");
var catOptionsEl = $("#catOptions");
var areaOptionsEl = $("#areaOptions");
var ingsOptionsEl = $("#ingrOptions");
var filterOptionsEl = $('#fOptionsList');
var sortContainer = $("#sort-container");
var vSortContainer = document.getElementById("sort-container");
var imageWrapper = document.getElementById("imageWrapper");
var categoriesButton = $("#catsBtn");
var areaButton = $("#areaBtn");
var ingredientsButton = $("#ingsBtn");


var requestURL = "HTTPS://www.themealdb.com/api/json/v1/1/";
var getCat = "list.php?c=list";
var getArea = "list.php?a=list";
var getIngr = "list.php?i=list";
var searchIng = "filter.php?i=";
var searchCats = "filter.php?c=";
var searchArea = "filter.php?a=";

var currentSearchType = [];
var currentSearchMeals = [];
var mealIds = [];
var shoppingList = [];
var stringIngredientObject = [];
var selectedMeal; 
var mealIngredient;var listBoxEl = $("<div>")

//When changing the Sort By dropdown
sortOptionsEl.on("change", () => { 
  
  var fOptions = document.getElementById("fOptionsList"); 

  while (fOptions.children[0]){
      fOptions.remove(fOptions.children[0]);
    }
  filterBy();    
})

//When changing result of sort by
filterOptionsEl.on("change", () => {
displayResults();

});





  
// chooses which option to filter by
function filterBy(){
    switch (sortOptionsEl.val()){
    case ("Categories"): 
        document.getElementById("filterOptions").classList.remove("hidden");
        document.getElementById("filterOptionsLabel").textContent = "Categories";
        getCats();
      break;
    case ("Area"): 
        document.getElementById("filterOptions").classList.remove("hidden");
        document.getElementById("filterOptionsLabel").textContent = "Areas";
        
        getAreas();
      break;
    case ("Ingredients"): 
        document.getElementById("filterOptions").classList.remove("hidden");
        document.getElementById("filterOptionsLabel").textContent = "Ingredients";
        
        getIngs();
      break;
  }
}

// if the categories option is selected
function getCats() {   
  fetch( requestURL + getCat, {})
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
      currentSearchType = data;
        for(i=0; i<currentSearchType.meals.length; i++){
          var catChoiceEl = $('<option>');
          catChoiceEl.text(currentSearchType.meals[i].strCategory);
          catChoiceEl.attr("value", currentSearchType.meals[i].strCategory);
          filterOptionsEl.append(catChoiceEl);
        }
  })
}

// if the areas option is selected
function getAreas(){   
  fetch( requestURL + getArea, {})
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
      currentSearchType = data;
    
        for(i=0; i<currentSearchType.meals.length; i++){
        var areaChoiceEl = $('<option>');
          areaChoiceEl.text(currentSearchType.meals[i].strArea);
          areaChoiceEl.attr("value", currentSearchType.meals[i].strArea);
          filterOptionsEl.append(areaChoiceEl);
          
        }
  })
}

// if the ingredients option is selected
function getIngs(){   
  fetch( requestURL + getIngr, {})
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
      currentSearchType = data;
    
        for(i=0; i<currentSearchType.meals.length; i++){
        var ingsChoiceEl = $('<option>');
         ingsChoiceEl.text(currentSearchType.meals[i].strIngredient);
          ingsChoiceEl.attr("value", currentSearchType.meals[i].strIngredient);
          filterOptionsEl.append(ingsChoiceEl);
        }
  })
}


function displayResults(){
    var sortCont = document.getElementById("meals-container");

    // if(currentSearchMeals.length != 0){
    //   currentSearchMeals = [];
      while (sortCont.hasChildNodes()){
        sortCont.removeChild(sortCont.firstChild);
      }
    // }
  
  var searchParameter = filterOptionsEl.val();

  //catagory search
  if(sortOptionsEl.val() == "Categories"){
  fetch (requestURL+searchCats+searchParameter, {})
    .then(function (response) {
        return response.json();
    })
.then(function(data) {
  currentSearchMeals = data;
  for(i=0; i<currentSearchMeals.meals.length; i++){  
    styling(currentSearchMeals.meals[i]);
  }
        })
  }

  //area search
  if(sortOptionsEl.val() === "Area"){
    fetch (requestURL+searchArea+searchParameter, {})
    .then(function (response) {
        return response.json();
    })
  .then(function(data) {
    currentSearchMeals = data;
    for(i=0; i<currentSearchMeals.meals.length; i++){  
      styling(currentSearchMeals.meals[i]);
    }
          })
  }

  //ingredient search
  if(sortOptionsEl.val() === "Ingredients"){
    fetch (requestURL+searchIng+searchParameter, {})
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
      currentSearchMeals = data;
      for(i=0; i<currentSearchMeals.meals.length; i++){  
        styling(currentSearchMeals.meals[i]);
      }
            })
  }
}

//Implement favouriting, where ID is stored and placed into favourites.

// history
function setToHistory(){
  var mealHistory = {
    idMeal: selectedMeal.idMeal,
    strMeal: selectedMeal.strMeal,
    strMealThumb: selectedMeal.strMealThumb
  };

  localStorage.setItem("lastMeal", JSON.stringify(mealHistory));
}

function pullFromHistory() {
var lastMeal = JSON.parse(localStorage.getItem("lastMeal"));
console.log(lastMeal.mealThumb);

  $('.imageWrapper').attr("id", lastMeal.mealID);
  $('.imageWrapper').attr("style", "background-image: url(" + lastMeal.mealThumb + ")");
  $(".historyOpenMeal").attr("id", + lastMeal.mealID);
  
  $(".storedTitle").text(lastMeal.mealName);
  $(".historyOpenMeal").text(lastMeal.mealName)

  styling(lastMeal);

}

function loading(){
  currentData = JSON.parse(localStorage.getItem("lastMeal"));
  console.log(currentData);
  styling(currentData);
}



$("body").on("load", loading());

function sortingStyles(){
  
  var listBoxContentEl = $("<div>")
  var listBoxContentListEl = $("<ul>")
  var listBoxContentListItemEl = $("<li>")
  var listBoxContentListItemButtonEl = $("<button>")

  // listOverlay.attr("style", "width: 100vw; height: 100vh; postion:absolute; background-color: black; opactiy: 0.8");
  listBoxEl.attr("class", "box");
  listBoxContentEl.attr("class", "content");
  listBoxContentListEl.attr("style", "list-style-type: none;");
  listBoxContentListItemButtonEl.attr("class", "button is-success;");

  listBoxEl.append(listBoxContentEl);
  listBoxContentEl.append(listBoxContentListEl);
  listBoxContentListEl.append(listBoxContentListItemEl);
  listBoxContentListItemEl.append(listBoxContentListItemButtonEl);

  console.log("Box")
}

function styling(cData) {
  var topContainerEl = $("<section>");
  var topCardContainerEl = $("<div>");
  var imgContainerEl = $("<div>");
  var imgFigureEl = $("<figure>");
  var imageEl = $("<img>");
  var cardContentEl = $("<div>");
  var mediaContainerEl = $("<div>");
  var mediaContentEl = $("<div>");
  var mediaEl = $("<p>");
  var selectMealBtnEl = $("<button>");

  $("#meals-container").append(topContainerEl);
  topContainerEl.append(topCardContainerEl);
  topCardContainerEl.append(imgContainerEl);
  topCardContainerEl.append(cardContentEl);
  imgContainerEl.append(imgFigureEl);
  imgFigureEl.append(imageEl);
  cardContentEl.append(mediaContainerEl);
  mediaContainerEl.append(mediaContentEl);
  mediaContentEl.append(mediaEl);
  cardContentEl.append(selectMealBtnEl);

  topContainerEl.attr("class", "container columns is-flex flex-direction-column is-flex-wrap-wrap is-justify-content-space-evenly mt-4");
  topCardContainerEl.attr("class","card column is-one-third-desktop is-two-fifths-tablet is-full-tablet m-6-mobile m-2 mt-0");
  topCardContainerEl.attr("style","height: 90%");
  imgContainerEl.attr("class","card-image");
  imgFigureEl.attr("class","image is-3by3");
  imageEl.attr("src", cData.strMealThumb);
  cardContentEl.attr("class", "card-content is-rounded");
  mediaContainerEl.attr("class", "media");
  mediaContentEl.attr("class", "media-content");
  mediaEl.attr("title is-4");
  mediaEl.text(cData.strMeal);
  selectMealBtnEl.text("View Recipe");
  selectMealBtnEl.attr("class", "button is-success has-text-black");
  selectMealBtnEl.attr("id", cData.idMeal );


  selectMealBtnEl.on('click', async (event) => {
   
    button = event.target;
    mealID = selectMealBtnEl.attr("id");

    console.log("selectMealBtn : " , selectMealBtnEl);


    fetch( "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + mealID, {


    })
    .then(function (response) {
      console.log(response);
      return response.json();
  })
  .then(function (data) {
    console.log(data);
  
      for(i=0; i<data.meals.length; i++){
        if(data.meals[i].idMeal == mealID){
          selectedMeal = data.meals[i];
        } 
      } 

      var modalEl = $("<div>");
      var modalBackgroundEl = $("<div>");
      var modalCardEl = $("<div>");
      var modalCardHeadEl = $("<header>");
      var modalCardTitleEl = $("<p>");
      var modalCardCloseEl = $("<button>");
      var modalCardBodyEl = $("<section>");
      //content
        var methodColumnsEl = $("<div>");
        var methodImageColumnEl = $("<figure>");
        var methodImageEl = $("<img>");
        var methodImageContentEl = $("<p>");
        var methodContentEl = $("<p>");
      var modalCardFootEl = $("<footer>");
      var modalCardFootSuccessEl = $("<button>");
      var modalCardFootCancelEl = $("<button>");

      modalEl.attr("class", "modal is-active");
      modalBackgroundEl.attr("class", "modal-background");
      modalCardEl.attr("class", "modal-card");
      modalCardHeadEl.attr("class", "modal-card-head");
      modalCardTitleEl.attr("class", "modal-card-title");
      modalCardCloseEl.attr("class", "delete");
      modalCardBodyEl.attr("class", "modal-card-body");
      // content 
        methodColumnsEl.attr("class", "columns");
        methodImageColumnEl.attr("class", "column image is-flex is-justify-content-space-evenly is-flex-wrap-wrap is-flex-direction-column");
        methodImageEl.attr("style", "background-image: url(" + selectedMeal.strMealThumb + ");width: 300px; height: 300px; background-size: cover; background-location: center");
        methodImageContentEl.attr("class", "content column");
        methodImageContentEl.attr("style", "min-width: 300px;");
        methodContentEl.attr("class", "content");
        methodContentEl.text(selectedMeal.strInstructions);

      modalCardFootEl.attr("class", "modal-card-foot if-flex is-justify-content-space-around");
      modalCardFootSuccessEl.attr("class", "button is-success");
      modalCardFootSuccessEl.attr("id", "btn-addList");
      modalCardFootSuccessEl.text("Save Ingredients")
      modalCardFootCancelEl.attr("class", "button is-danger");
      modalCardFootCancelEl.attr("id", "close");
      modalCardFootCancelEl.text("Close");

      modalCardTitleEl.text(selectedMeal.strMeal);

      modalEl.append(modalBackgroundEl);
      modalEl.append(modalCardEl);
      modalCardEl.append(modalCardHeadEl);
      modalCardHeadEl.append(modalCardTitleEl);
      modalCardHeadEl.append(modalCardCloseEl);
      modalCardEl.append(modalCardBodyEl);
      // Content
      modalCardBodyEl.append(methodColumnsEl);
      methodColumnsEl.append(methodImageColumnEl);
      methodImageColumnEl.append(methodImageEl);
      methodImageColumnEl.append(methodImageContentEl);
      modalCardBodyEl.append(methodContentEl);

      modalCardEl.append(modalCardFootEl);
      modalCardFootEl.append(modalCardFootSuccessEl);
      modalCardFootEl.append(modalCardFootCancelEl);

      $("#container").append(modalEl);





    var stringIngredientName = [
      data.meals[0].strIngredient1, 
      data.meals[0].strIngredient2, 
      data.meals[0].strIngredient3, 
      data.meals[0].strIngredient4, 
      data.meals[0].strIngredient5,
      data.meals[0].strIngredient6, 
      data.meals[0].strIngredient7, 
      data.meals[0].strIngredient8, 
      data.meals[0].strIngredient9, 
      data.meals[0].strIngredient10,
      data.meals[0].strIngredient11, 
      data.meals[0].strIngredient12, 
      data.meals[0].strIngredient13, 
      data.meals[0].strIngredient14, 
      data.meals[0].strIngredient15,
      data.meals[0].strIngredient16, 
      data.meals[0].strIngredient17, 
      data.meals[0].strIngredient18, 
      data.meals[0].strIngredient19, 
      data.meals[0].strIngredient20, 
    ]
    var stringIngredientAmount = [
      data.meals[0].strMeasure1, 
      data.meals[0].strMeasure2, 
      data.meals[0].strMeasure3, 
      data.meals[0].strMeasure4, 
      data.meals[0].strMeasure5,
      data.meals[0].strMeasure6, 
      data.meals[0].strMeasure7, 
      data.meals[0].strMeasure8, 
      data.meals[0].strMeasure9, 
      data.meals[0].strMeasure10,
      data.meals[0].strMeasure11, 
      data.meals[0].strMeasure12, 
      data.meals[0].strMeasure13, 
      data.meals[0].strMeasure14, 
      data.meals[0].strMeasure15,
      data.meals[0].strMeasure16, 
      data.meals[0].strMeasure17, 
      data.meals[0].strMeasure18, 
      data.meals[0].strMeasure19, 
      data.meals[0].strMeasure20,
    ]


    addIngToObj();
    setToHistory();
  
      $("#sortByContainer").addClass("hidden");
      $("#filterOptions").addClass("hidden");
      $("#sort-container").addClass("hidden");

      $('#btn-addList').on("click", () => {
        console.log(stringIngredientObject);
        console.log("click");
        for(i = 0; i<stringIngredientObject.length; i++){
          shoppingList.push(stringIngredientObject[i].amount + " " + stringIngredientObject[i].name);

        }
        console.log(shoppingList);

        // localStorage.setItem("ingredients", JSON.stringify(shoppingList));
      
      });
  
      modalCardFootCancelEl.on('click', () => {
        modalEl.remove();
        stringIngredientObject = [];
      }) 
      modalCardCloseEl.on('click', () => {
        modalEl.remove();
        stringIngredientObject = [];
        sortContainer.append(sortOptionsEl);
      }) 

      function addIngToObj(){
        for(i = 0; i<stringIngredientName.length; i++){
            if(stringIngredientName[i] != '' && stringIngredientName[i] != null){
              stringIngredientObject.push({
                name: stringIngredientName[i],
                amount: stringIngredientAmount[i]
              })
            }
        }
        for(i = 0; i<stringIngredientObject.length; i++){
          var mealIngredient = $("<li>");
          mealIngredient.text(stringIngredientObject[i].amount + " " + stringIngredientObject[i].name);
          methodImageContentEl.append(mealIngredient);
      }
      }

      })
  });

}
