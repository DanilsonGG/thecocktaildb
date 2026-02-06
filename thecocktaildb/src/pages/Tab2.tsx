import {IonPage, IonHeader, IonToolbar, IonTitle,IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonImg, IonList, IonItem} from '@ionic/react';import React from 'react';
import { useParams } from 'react-router';
import { CocktailService } from '../services/cocktail.service';
import './Tab2.css';

const Tab2: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [drink, setDrink] = React.useState<any>(null);

  React.useEffect(() => {
    const api = new CocktailService();
    api.getDetails(id).then(res => setDrink(res)); 
  }, [id]);

  if (!drink) return <p>Loading...</p>;

  const parseIngredients = (drink: any) => {
    const ingredients: { ingredient: string; measure: string }[] = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = drink[`strIngredient${i}`];
      const measure = drink[`strMeasure${i}`];
      if (ingredient) ingredients.push({ ingredient, measure: measure || '' });
    }
    return ingredients;
  };

  const ingredients = parseIngredients(drink);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{drink.strDrink}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonCard>
          <IonImg src={drink.strDrinkThumb} />
          <IonCardHeader>
            <IonCardTitle>{drink.strDrink}</IonCardTitle>
            <IonCardSubtitle>{drink.strCategory} • {drink.strAlcoholic}</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <h3>Instructions</h3>
            <p>{drink.strInstructions}</p>

            <h3>Ingredients</h3>
            <IonList>
              {ingredients.map((i, idx) => (
                <IonItem key={idx}>{i.ingredient} — {i.measure}</IonItem>
              ))}
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
