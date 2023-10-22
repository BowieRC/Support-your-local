var sortContainerEl = $("#sortByContainer");
var sortOptionsEl = $("#sortOptions");
var catOptionsEl = $("#catOptions");
var areaOptionsEl = $("#areaOptions");
var ingsOptionsEl = $("#ingrOptions");
var filterOptionsEl = $('#fOptionsList');

var requestURL = "HTTPS://www.themealdb.com/api/json/v1/1/";
var getCat = "list.php?c=list";
var getArea = "list.php?a=list";
var getIngr = "list.php?i=list";
var searchIng = "filter.php?i=";
var searchCats = "filter.php?c=";
var searchArea = "filter.php?a=";

//When changing the Sort By dropdown
sortOptionsEl.on("change", () => { 
  if(sortOptionsEl.val() != "null"){
  
  var fOptions = document.getElementById("fOptionsList");  
  while (fOptions.children[0]){
      fOptions.remove(fOptions.children[0]);
    }
  filterBy();    
  }
})
//When changing result of sort by
filterOptionsEl.on("change", () => {
  var searchParameter = filterOptionsEl.val();
  // console.log(requestURL+searchIng+searchParameter.toLowerCase());
  console.log(sortOptionsEl.val())
  if(sortOptionsEl.val() == "Categories"){
  fetch (requestURL+searchCats+searchParameter, {})
    .then(function (response) {
        return response.json();
    })
.then(function(data) {
    for(i=0; i<data.meals.length; i++){
        console.log(data.meals[i].strMeal);      
    }
    console.log(data);
    
        })
  }
  if(sortOptionsEl === "Area"){
    console.log("Area Search");
  }
  if(sortOptionsEl === "Ingredients"){
    "Area Search"
  }
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
        for(i=0; i<data.meals.length; i++){
          var catChoiceEl = $('<option>');
          catChoiceEl.text(data.meals[i].strCategory);
          catChoiceEl.attr("value", data.meals[i].strCategory);
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
    
        for(i=0; i<data.meals.length; i++){
        var areaChoiceEl = $('<option>');
          areaChoiceEl.text(data.meals[i].strArea);
          areaChoiceEl.attr("value", data.meals[i].strArea);
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
    
        for(i=0; i<data.meals.length; i++){
        var ingsChoiceEl = $('<option>');
         ingsChoiceEl.text(data.meals[i].strIngredient);
          ingsChoiceEl.attr("value", data.meals[i].strIngredient);
          filterOptionsEl.append(ingsChoiceEl);
        }
  })
}

function displaySearch(data) {
  var sortContainer = $("<section>");
  
  for(i=0; i<data.meals.length; i++){  
  var sortWrapper = $("<div>");
  var imageWrapper = $("<div>");
  var sortedTitle = $("<h1>");
  var sortedDescription = $("<p>");
  
  sortContainer.attr("id", "sort-container");
  sortWrapper.attr("class", "sortWrapper");
  imageWrapper.attr("class", "imageWrapper");
  sortedTitle.attr("class", "sortedTitle");
  sortedDescription.attr("class", "sortedDescription");
  
  sortedTitle.text(data.meals[i].strMeals);
  sortedDescription.text(data.meals[i].strMeals);
    
  sortContainer.append(sortWrapper);
  sortWrapper.append(sortedTitle)
  imageWrapper
  }
  
}

