import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonThumbnail, IonLabel } from '@ionic/react';
import React from 'react';
import { CocktailService } from '../services/cocktail.service';
import './Tab4.css';

const Tab4: React.FC = () => {
  const [ingredients, setIngredients] = React.useState<any[]>([]);

  React.useEffect(() => {
    const api = new CocktailService();
    api.getIngredients().then(res => setIngredients(res.drinks || []));
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ingredients</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <h2>Popular Ingredients</h2>
        <IonList>
          {ingredients.map((ing: any, index: number) => (
            <IonItem key={index}>
              <IonThumbnail slot="start">
                <img src={`https://www.thecocktaildb.com/images/ingredients/${ing.strIngredient1}-Medium.png`} alt={ing.strIngredient1} />
              </IonThumbnail>
              <IonLabel>{ing.strIngredient1}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab4;
