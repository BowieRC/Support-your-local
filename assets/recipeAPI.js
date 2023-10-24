var sortContainerEl = $("#sortByContainer");
var sortOptionsEl = $("#sortOptions");
var catOptionsEl = $("#catOptions");
var areaOptionsEl = $("#areaOptions");
var ingsOptionsEl = $("#ingrOptions");
var filterOptionsEl = $('#fOptionsList');
var sortContainer = $("#sort-container");
var vSortContainer = document.getElementById("sort-container");
var imageWrapper = document.getElementById("imageWrapper");

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
var selectedMeal; 

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
    viewFilteredContent();
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
    var sortCont = document.getElementById("sort-container");

    if(currentSearchMeals.length != 0){
      currentSearchMeals = [];
      while (sortCont.hasChildNodes()){
        sortCont.removeChild(sortCont.firstChild);
      }
    }
  
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
  var sortWrapper = $("<div>");
  var imageWrapper = $("<div>");
  var sortedTitle = $("<h1>");
  var button = $("<button>");
  
  sortContainer.attr("id", "sort-container");
  sortWrapper.attr("class", "sortWrapper");
  imageWrapper.attr("id", data.meals[i].idMeal);
  imageWrapper.attr("class", "imageWrapper");
  imageWrapper.attr("style", "background-image: url(" + data.meals[i].strMealThumb + ")");
  sortedTitle.attr("class", "sortedTitle");
  button.attr("id", + data.meals[i].idMeal);

  button.text(data.meals[i].strMeal)
  sortedTitle.text(currentSearchMeals.meals[i].strMeal);

  button.on('click', async (event) => {
   
    button = event.target;
    mealID = button.getAttribute("id");

    fetch( "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + mealID, {

    })
    .then(function (response) {
      return response.json();
  })
  .then(function (data) {
  
      for(i=0; i<data.meals.length; i++){
        if(data.meals[i].idMeal == mealID){
          selectedMeal = data.meals[i];
        } 
      } 

    
    var displayMealContainer = $("<section>");
    var closeButton = $("<button>");
    var displayMealTitle = $("<h1>");
    var displayMealImage = $("<div>");
    var displayMealIngredients = $("<div>");
    var displayMealMethod = $("<p>");

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

    var stringIngredientObject = [];

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
        displayMealIngredients.append(mealIngredient);
    }
  }

    addIngToObj();

    displayMealContainer.attr("id", "display-container");
      closeButton.attr("id", "btn-close");
      closeButton.text("Close");
        displayMealTitle.text(selectedMeal.strMeal);
       displayMealImage.attr("style", "background-image: url(" + selectedMeal.strMealThumb + ");width: 300px; height: 300px; background-size: cover; background-location: center");
      displayMealMethod.text(selectedMeal.strInstructions);
      displayMealIngredients.text()

      
  
  
      $("#container").append(displayMealContainer);
      displayMealContainer.append(closeButton);
      displayMealContainer.append(displayMealTitle);
      displayMealContainer.append(displayMealImage);
      displayMealContainer.append(displayMealMethod);
      displayMealContainer.append(displayMealIngredients);
  
      $("#sortByContainer").addClass("hidden");
      $("#filterOptions").addClass("hidden");
      $("#sort-container").addClass("hidden");
  
      closeButton.on('click', () => {
        displayMealContainer.remove();
        $("#sortByContainer").removeClass("hidden");
        $("#filterOptions").removeClass("hidden");
        $("#sort-container").removeClass("hidden");
}) 

      })
  });
    
  sortContainer.append(sortWrapper);
  sortWrapper.append(imageWrapper);
  sortWrapper.append(sortedTitle);
  sortWrapper.append(button)
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
  mealIds = [];
  for(i=0; i<currentSearchMeals.meals.length; i++){  
  var sortWrapper = $("<div>");
  var imageWrapper = $("<div>");
  var sortedTitle = $("<h1>");
  var button = $("<button>");
  
  sortContainer.attr("id", "sort-container");
  sortWrapper.attr("class", "sortWrapper");
  imageWrapper.attr("id", data.meals[i].idMeal);
  imageWrapper.attr("class", "imageWrapper");
  imageWrapper.attr("style", "background-image: url(" + data.meals[i].strMealThumb + ")");
  sortedTitle.attr("class", "sortedTitle");
  button.attr("id", + data.meals[i].idMeal);

  button.text(data.meals[i].strMeal)
  sortedTitle.text(currentSearchMeals.meals[i].strMeal);

  button.on('click', async (event) => {
   
    button = event.target;
    mealID = button.getAttribute("id");

    fetch( "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + mealID, {

    })
    .then(function (response) {
      return response.json();
  })
  .then(function (data) {
  
      for(i=0; i<data.meals.length; i++){
        if(data.meals[i].idMeal == mealID){
          selectedMeal = data.meals[i];
        } 
      } 

    
    var displayMealContainer = $("<section>");
    var closeButton = $("<button>");
    var displayMealTitle = $("<h1>");
    var displayMealImage = $("<div>");
    var displayMealIngredients = $("<div>");
    var displayMealMethod = $("<p>");

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

    var stringIngredientObject = [];

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
        displayMealIngredients.append(mealIngredient);
    }
  }

    addIngToObj();

    displayMealContainer.attr("id", "display-container");
      closeButton.attr("id", "btn-close");
      closeButton.text("Close");
        displayMealTitle.text(selectedMeal.strMeal);
       displayMealImage.attr("style", "background-image: url(" + selectedMeal.strMealThumb + ");width: 300px; height: 300px; background-size: cover; background-location: center");
      displayMealMethod.text(selectedMeal.strInstructions);
      displayMealIngredients.text()

      
  
  
      $("#container").append(displayMealContainer);
      displayMealContainer.append(closeButton);
      displayMealContainer.append(displayMealTitle);
      displayMealContainer.append(displayMealImage);
      displayMealContainer.append(displayMealMethod);
      displayMealContainer.append(displayMealIngredients);
  
      $("#sortByContainer").addClass("hidden");
      $("#filterOptions").addClass("hidden");
      $("#sort-container").addClass("hidden");
  
      closeButton.on('click', () => {
        displayMealContainer.remove();
        $("#sortByContainer").removeClass("hidden");
        $("#filterOptions").removeClass("hidden");
        $("#sort-container").removeClass("hidden");
}) 

      })
  });
  
    
  sortContainer.append(sortWrapper);
  sortWrapper.append(imageWrapper);
  sortWrapper.append(sortedTitle);
  sortWrapper.append(button)

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
  var sortWrapper = $("<div>");
  var imageWrapper = $("<div>");
  var sortedTitle = $("<h1>");
  var button = $("<button>");
  
  sortContainer.attr("id", "sort-container");
  sortWrapper.attr("class", "sortWrapper");
  imageWrapper.attr("id", data.meals[i].idMeal);
  imageWrapper.attr("class", "imageWrapper");
  imageWrapper.attr("style", "background-image: url(" + data.meals[i].strMealThumb + ")");
  sortedTitle.attr("class", "sortedTitle");
  button.attr("id", + data.meals[i].idMeal);
  
  sortedTitle.text(currentSearchMeals.meals[i].strMeal);
  button.text(currentSearchMeals.meals[i].strMeal)


  button.on('click', (event) => {
    button = event.target;
  });  

  button.on('click', async (event) => {
   
    button = event.target;
    mealID = button.getAttribute("id");

    fetch( "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + mealID, {

    })
    .then(function (response) {
      return response.json();
  })
  .then(function (data) {
  
      for(i=0; i<data.meals.length; i++){
        if(data.meals[i].idMeal == mealID){
          selectedMeal = data.meals[i];
        } 
      } 

    
    var displayMealContainer = $("<section>");
    var closeButton = $("<button>");
    var displayMealTitle = $("<h1>");
    var displayMealImage = $("<div>");
    var displayMealIngredients = $("<div>");
    var displayMealMethod = $("<p>");

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

    var stringIngredientObject = [];

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
        displayMealIngredients.append(mealIngredient);
    }
  }

    addIngToObj();

    displayMealContainer.attr("id", "display-container");
      closeButton.attr("id", "btn-close");
      closeButton.text("Close");
        displayMealTitle.text(selectedMeal.strMeal);
       displayMealImage.attr("style", "background-image: url(" + selectedMeal.strMealThumb + ");width: 300px; height: 300px; background-size: cover; background-location: center");
      displayMealMethod.text(selectedMeal.strInstructions);
      displayMealIngredients.text()

      
  
  
      $("#container").append(displayMealContainer);
      displayMealContainer.append(closeButton);
      displayMealContainer.append(displayMealTitle);
      displayMealContainer.append(displayMealImage);
      displayMealContainer.append(displayMealMethod);
      displayMealContainer.append(displayMealIngredients);
  
      $("#sortByContainer").addClass("hidden");
      $("#filterOptions").addClass("hidden");
      $("#sort-container").addClass("hidden");
  
      closeButton.on('click', () => {
        displayMealContainer.remove();
        $("#sortByContainer").removeClass("hidden");
        $("#filterOptions").removeClass("hidden");
        $("#sort-container").removeClass("hidden");
}) 

      })
  });
  
  
  sortContainer.append(sortWrapper);
  sortWrapper.append(imageWrapper);
  sortWrapper.append(sortedTitle);
  sortWrapper.append(button)

  }
        })
  }
}

//Implement favouriting, where ID is stored and placed into favourites.
