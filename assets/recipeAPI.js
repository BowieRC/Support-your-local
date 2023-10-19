var keywordSearchEl = $("#searchKeyword");
var searchButtonEl = $("#enter");
var containerEl = $(".container");
var mod = '';
var searchType = ["/search.php?s=", '/search.php?f=']
var wrapperEl;

var hasChild = containerEl.wrapperEl;

searchButtonEl.on("click", () => {
    searchText = keywordSearchEl.val();
    mod = "/search.php?s=" + searchText;
    callAPI();
});

function callAPI(){
    var requestUTL = "https://www.themealdb.com/api/json/v1/1/";
    fetch(requestUTL + mod, {
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        displayMeals(data);

        console.log(data);

    })
}

function displayMeals(data) {
    wrapperEl = $("<div>");
    containerEl.append(wrapperEl);
    if(data.meals != null){
        for(i=0; i<data.meals.length; i++){

            var mealWrapperEl = $("<div>");
            mealWrapperEl.attr('class', 'mealWrapper');
            var imageWrapperEl = $('<div>');
            imageWrapperEl.attr('class', 'imageWrapper');
            imageWrapperEl.attr('style', 'background-image: url( "'+ data.meals[i].strMealThumb + '")');
            var mealTitleEl = $('<h1>');
            mealTitleEl.text(data.meals[i].strMeal);
            var mealRegionEl = $('<h1>');
            mealRegionEl.text(data.meals[i].strArea);
            var mealCategoryEl = $('<h1>');
            mealCategoryEl.text(data.meals[i].strCategory);

            wrapperEl.append(mealWrapperEl);
            mealWrapperEl.append(imageWrapperEl);
            mealWrapperEl.append(mealTitleEl);
            mealWrapperEl.append(mealRegionEl);
            mealWrapperEl.append(mealCategoryEl);




            // var mealWrapperEl = $("<img src='" + data.meals[i].strMealThumb + "'>");
            // mealWrapperEl.attr("style", "background-image: url(" + data.meals[i].strMealThumb + ")");

            // wrapperEl.append(mealWrapperEl);


            // var mealNamesEl = $("<h1>");
            // mealNamesEl.text(data.meals[i].strMeal);
            // wrapperEl.append(mealNamesEl);
            
    
            // console.log(data.meals[i].strMeal);
        }
    } else {
        var mealNamesEl = $("<h1>");
        mealNamesEl.text("Nothing called " + searchText);
        console.log("Nada");
        wrapperEl.append(mealNamesEl);
    } 
    
}

function displayRecipe() {
    containerEl.remove(wrapperEl);
    callAPI();
}