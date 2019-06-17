//lecture 140
import axios from 'axios';
export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults(query) {
        const key = `652cc07aebcb41baa7b23a5ac404cf21`;

        try {

            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
            // console.log(this.result);
        } catch (error) {
            alert(error);
        }
    }
}