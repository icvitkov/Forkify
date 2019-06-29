import Search from "./models/Search";
import Recipe from "./models/Recipe";
import List from "./models/List";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import {
    elements,
    renderLoader,
    clearLoader
} from "./views/base";
/* Global state of the app
 *- Search object
 *- Current recipe object
 *- Shopping list object
 *- Liked recipes
 */

const state = {};

/**
 * search controller
 */
const controlSearch = async () => {
    //1. Get query from view
    const query = searchView.getInput();

    if (query) {
        // 2. New search object and add to state
        state.search = new Search(query);

        // 3. Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // 4. Search for recipes
            await state.search.getResults();

            //5. render result on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (err) {
            alert('Something weong with the search...');
            clearLoader();
        }
    }
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});


//
elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
        console.log(goToPage);
    }
});

/**
 * recipe controller
 */
const controlRecipe = async () => {
    // get id form url
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if (id) {
        // prepare ui for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        //highlight selected search item
        if (state.search) searchView.highlightSelected(id);

        //create new recipe object
        state.recipe = new Recipe(id);


        try {

            //get recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            //calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            //render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        } catch (err) {
            alert('Error processing recipe!');
        }
    }
};
//window.addEventListener('hashchange', controlRecipe);
//window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


// handling recipe button clicks
elements.recipe.addEventListener('click', e => {
if(e.target.matches('.btn-decrease, .btn-decrease *')) {
    //decrease buton is clicked
    if(state.recipe.servings > 1){
        state.recipe.updateServings('dec');
        recipeView.updateServingsIngredients(state.recipe);
    }
} else if (e.target.matches('.btn-increase, .btn-increase *')) {
    //increase buton is clicked
    state.recipe.updateServings('inc');
    recipeView.updateServingsIngredients(state.recipe);
}

});

window.l = new List();