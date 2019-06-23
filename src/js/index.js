import Search from "./models/Search";
import Recipe from "./models/Recipe";
import * as searchView from "./views/searchView";
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
    //const query = searchView.getInput();
    const query = 'pizza';

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


//testing
window.addEventListener('load', e => {
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

        //create new recipe object
        state.recipe = new Recipe(id);
        
        //testing
        window.r = state.recipe;

        try {

            //get recipe data
            await state.recipe.getRecipe();

            //calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            //render recipe
            console.log(state.recipe);
        } catch (err) {
            alert('Error processing recipe!');
        }
    }
};
//window.addEventListener('hashchange', controlRecipe);
//window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));