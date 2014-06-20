
var fridgeApp = {};

fridgeApp.init = function(){
	$("#ingredientChoice").on("submit", function(e){
		e.preventDefault();
		var ingredient1 = $("#ingredient1").val();
		var ingredient2 = $("#ingredient2").val();
		var ingredient3 = $("#ingredient3").val();
		fridgeApp.getRecipes(ingredient1 + "+" + ingredient2 + "+" + ingredient3);
		fridgeApp.hideHeader();
		fridgeApp.bolt();
	});
};

fridgeApp.getRecipes = function(query){
	//AJAX request to get recipes goes here
	$.ajax({
		url: "http://api.yummly.com/v1/api/recipes?_app_id=a1b5f523&_app_key=0bdfe3b08043cedfd5adaa8bf16894d5",
		type: "GET",
		data: {
			q: query
		},
		dataType: "jsonp",
		success: function(result){
			// console.log(result.matches);
			$("#recipeResults").empty();
			fridgeApp.displayRecipes(result.matches);
		}
	});
};

fridgeApp.displayRecipes = function(data){
	//check that more than 0 recipes (data) are returned
	//if 0 recipes returned, html "oops!"
	if (data.length == 0) {
		$("#recipeResults").html("<h3>Oops! Even magic can't make a meal out of <em>those</em> random things.</h3>");
	}
	$.each(data, function(i,recipe){
		// console.log(recipe);
	var recipeName = $("<h2>").text(recipe.recipeName);
	var originalImage;
	if (recipe.imageUrlsBySize) {
		originalImage = recipe.imageUrlsBySize['90'];
	} else {
		originalImage = "images/knifefork.gif";
	}
	// var originalImage = recipe.imageUrlsBySize['90'];
	// var largeImage = originalImage.replace("s90-c", "s100-c");

	var image = $("<img>").attr("src", originalImage);
	var recipeLink = $("<a>").attr("href", "http://www.yummly.com/recipe/" + recipe.id).attr("target", "blank").addClass("clearfix").append(image,recipeName);
	var fullRecipe = $("<div>").addClass("fullRecipe clearfix").append(recipeLink);
	$("#recipeResults").append(fullRecipe);
	});
};

fridgeApp.bolt = function(){
	$('#animate').show();
	setTimeout(function() {
        $("#animate").fadeOut(500);
    },200);
};

fridgeApp.hideHeader = function(){
	$(".header").hide();
	$(".again").show();
};

$(function(){
	fridgeApp.init();
});
