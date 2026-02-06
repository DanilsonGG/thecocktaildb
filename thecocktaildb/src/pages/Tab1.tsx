import {IonPage,IonHeader,IonToolbar,IonTitle,IonContent,IonSearchbar,IonList,IonItem,IonThumbnail,IonLabel,IonButton} from '@ionic/react';
import React from 'react';
import { Chart } from "react-google-charts";
import { CocktailService } from '../services/cocktail.service';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [search, setSearch] = React.useState("");
  const [drinks, setDrinks] = React.useState<any[]>([]);

 
  React.useEffect(() => {
    if (search.trim() === "") {
      setDrinks([]);
      return;
    }
    const api = new CocktailService();
    api.searchByName(search).then(res => setDrinks(res.drinks || []));
  }, [search]);


const data = [
  ["Tipo de Bebida", "Quantidade"],
  ["Alcoólicas", 382],
  ["Não alcoólicas", 159],
  ["Cocktails clássicos", 95],
];
  const options = {
    title: "Distribuição de Tipos de Cocktails",
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cocktails</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="cocktail-page">


        <IonSearchbar
          value={search}
          onIonChange={e => setSearch(e.detail.value!)}
          placeholder="Search cocktails..."
        />

        
        <div className="cocktail-intro">
          <h2>Welcome to Cocktails!</h2>
          <p>Explore, search, and discover your favorite cocktails.</p>
        </div>

       
        <div style={{ marginTop: "20px", marginBottom: "30px" }}>
          <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"100%"}
            height={"500px"}
          />
        </div>

 
        <div className="cocktail-suggestions">
          <h3>Suggested Cocktails:</h3>
          <IonList>
            <IonItem button routerLink={`/cocktail/11007`}>
              <IonThumbnail slot="start">
                <img src="https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg" />
              </IonThumbnail>
              Margarita
            </IonItem>

            <IonItem button routerLink={`/cocktail/11000`}>
              <IonThumbnail slot="start">
                <img src="https://www.thecocktaildb.com/images/media/drink/3z6xdi1589574603.jpg" />
              </IonThumbnail>
              Mojito
            </IonItem>
          </IonList>
        </div>

        
        <IonList>
          {drinks.map(d => (
            <IonItem key={d.idDrink} button routerLink={`/cocktail/${d.idDrink}`}>
              <IonThumbnail slot="start">
                <img src={d.strDrinkThumb} />
              </IonThumbnail>
              <IonLabel>{d.strDrink}</IonLabel>
              <IonButton slot="end" routerLink={`/cocktail/${d.idDrink}`}>
                Details
              </IonButton>
            </IonItem>
          ))}
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default Tab1;


