window.addEventListener('DOMContentLoaded', () =>{
    
    
    /*-------VARIABLES ----- */
    const container = document.querySelector('#container');
    const form = document.querySelector('form');
    const input = document.querySelector('#search-bar');
    const mealsResults = document.querySelector('#meals-results');
    let idAPI  = 'ed54883b';
    let keyAPI = 'e4b5a24a1081aaa95b7ef7846e0b0400';
    let query = '';
    let num = 50;
    let result;
    let data;


    /*-------------EVENT LISTENERS ------- */
    form.addEventListener('submit', e =>{
        e.preventDefault();
        query = e.target.querySelector('input').value.trim();
        try{
            uiApp();
        }
        catch(error){
            console.log(error);
        }
    });

    /*--------------FUNCTIONS ----------------*/
    async function uiApp(){
        let url = `https://api.edamam.com/search?q=${query}&app_id=${idAPI}&app_key=${keyAPI}&to=${num}`;
        result = await fetch(url);
        data = await result.json();
        console.log(data);
        displayMeal(data.hits);
        const meal = mealsResults.querySelectorAll('.meal');
        meal.forEach(meal =>{
            meal.addEventListener('click', ()=>{
                meal.firstElementChild.classList.remove('meal-click-hidden');
                meal.firstElementChild.classList.add('layer');
            });
    
        meal.addEventListener('click', (e) =>{
            if(e.target.classList.contains('fas')){
                meal.firstElementChild.classList.add('meal-click-hidden');
                meal.firstElementChild.classList.remove('layer');
            }
        })
        })
    };


    function displayMeal(meals){
        let html = '';
            if(meals.length > 0){
                meals.map(meal =>{
                    container.classList.remove('before-meals');
                        html += `
                                <div class="meal">
                                    <div class = "meal-click-hidden">
                                    <div class="meal-click">
                                            <div class="close-btn">
                                                <i class="fas fa-window-close"></i>
                                            </div>
                                            <div class ="meal-data">
                                                <h3 class= "Area">Area</h3>
                                                <p>${meal.recipe.cuisineType ? meal.recipe.cuisineType.map(x => {return x.charAt(0).toUpperCase() + x.slice(1)}): "--"}</p>
                                                <h3 class="health-labels">Health Labels</h3>
                                                <p>${meal.recipe.dietLabels.length > 0 ? meal.recipe.dietLabels.join(' , ') : "--"}</p>
                                                <h3 class="diet-labels">Diet Labels</h3>
                                                <p>${meal.recipe.healthLabels.length > 0 ? meal.recipe.healthLabels.join(' , ') : "--"}</p>
                                                <h3 class ="calories">Calories</h3>
                                                <p>${meal.recipe.calories.toFixed(2)} kcal</p>
                                            </div>
                                            <a href="${meal.recipe.url}" class="view-recipe" target = "_blank">Recipe</a>
                                            </div>
                                    </div>
                                    

                                    <div class="meal-image">
                                        <img src="${meal.recipe.image}" img onerror = "this.src = 'images/recipe.jpg'">
                                    </div>
                                        <h2>${meal.recipe.label}</h2>
                                </div>
                            `;
                        mealsResults.innerHTML = html;
                        mealsResults.classList.remove('not-found');
                        }
                    )
            }
        else{
            html += "Sorry, we can't find any meals with this ingredient.";
            mealsResults.innerHTML = html;
            mealsResults.classList.add('not-found');
        }
        input.value = '';
    };

})




