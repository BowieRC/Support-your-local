var sortContainerEl = $("#sortByContainer");
var sortOptionsEl = $("#sortOptions");
var catOptionsEl = $("#catOptions");
var areaOptionsEl = $("#areaOptions");
var ingsOptionsEl = $("#ingrOptions");
var filterOptionsEl = $('#fOptionsList');
var sortContainer = $("#sort-container");
var vSortContainer = document.getElementById("sort-container");

var requestURL = "HTTPS://www.themealdb.com/api/json/v1/1/";
var getCat = "list.php?c=list";
var getArea = "list.php?a=list";
var getIngr = "list.php?i=list";
var searchIng = "filter.php?i=";
var searchCats = "filter.php?c=";
var searchArea = "filter.php?a=";

var currentSearchType = [];
var currentSearchMeals = [];

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
  
  sortContainer.attr("id", "sort-container");
  sortWrapper.attr("class", "sortWrapper");
  imageWrapper.attr("class", "imageWrapper");
  imageWrapper.attr("style", "background-image: url(" + data.meals[i].strMealThumb + ")");
  sortedTitle.attr("class", "sortedTitle");
  
  sortedTitle.text(currentSearchMeals.meals[i].strMeal);

    
  sortContainer.append(sortWrapper);
  sortWrapper.append(imageWrapper);
  sortWrapper.append(sortedTitle);
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
  var sortWrapper = $("<div>");
  var imageWrapper = $("<div>");
  var sortedTitle = $("<h1>");
  
  sortContainer.attr("id", "sort-container");
  sortWrapper.attr("class", "sortWrapper");
  imageWrapper.attr("class", "imageWrapper");
  imageWrapper.attr("style", "background-image: url(" + data.meals[i].strMealThumb + ")");
  sortedTitle.attr("class", "sortedTitle");

  sortedTitle.text(currentSearchMeals.meals[i].strMeal);

    
  sortContainer.append(sortWrapper);
  sortWrapper.append(imageWrapper);
  sortWrapper.append(sortedTitle);
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
  
  sortContainer.attr("id", "sort-container");
  sortWrapper.attr("class", "sortWrapper");
  imageWrapper.attr("class", "imageWrapper");
  imageWrapper.attr("style", "background-image: url(" + data.meals[i].strMealThumb + ")");
  sortedTitle.attr("class", "sortedTitle");
  
  sortedTitle.text(currentSearchMeals.meals[i].strMeal);

    
  sortContainer.append(sortWrapper);
  sortWrapper.append(imageWrapper);
  sortWrapper.append(sortedTitle);
  }
        })
  }
}

//TODO:
// When clicking a meal, display ingredients, and method.

//Implement favouriting, where ID is stored and placed into favourites.