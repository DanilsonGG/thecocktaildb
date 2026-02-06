export class CocktailService {
  async searchByName(name: string) {
    const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
    return res.json();
  }

  async getByLetter(letter: string) {
    const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
    return res.json();
  }

  async getDetails(id: string) {
    const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await res.json();
    return data.drinks[0];
  }

  async getIngredients() {
    const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`);
    return res.json();
  }

 
  static parseIngredients(drink: any) {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = drink[`strIngredient${i}`];
      const measure = drink[`strMeasure${i}`];
      if (ingredient) ingredients.push({ ingredient, measure: measure || '' });
    }
    return ingredients;
  }
}
