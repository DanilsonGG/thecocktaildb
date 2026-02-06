import {IonPage,IonHeader,IonToolbar,IonTitle,IonContent,IonList,IonItem,IonThumbnail,IonLabel} from '@ionic/react';

import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import { CocktailService } from '../services/cocktail.service';
import './Tab3.css';


const columnChartData = [
  ["Letra", "Número de Cocktails", { role: "style" }],
  ["A", 40, "#3366cc"],
  ["B", 28, "#dc3912"],
  ["C", 35, "#ff9900"],
  ["D", 18, "#109618"],
  ["E", 22, "#990099"],
  ["F", 15, "#0099c6"],
];

const columnChartOptions = {
  title: "Distribuição de cocktails por letra",
  legend: { position: "none" },
};

const Tab3: React.FC = () => {
  const [drinks, setDrinks] = useState<any[]>([]);

  useEffect(() => {
    const api = new CocktailService();
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
    Promise.all(letters.map(letter => api.getByLetter(letter)))
      .then(results => {
        const allDrinks = results.flatMap(r => r.drinks || []);
        setDrinks(allDrinks);
      });
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>All Cocktails</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>

        
        <div style={{ padding: "16px" }}>
          <Chart
            chartType="ColumnChart"
            width="100%"
            height="500px"
            data={columnChartData}
            options={columnChartOptions}
          />
        </div>

        
        <IonList>
          {drinks.map(d => (
            <IonItem key={d.idDrink} button routerLink={`/cocktail/${d.idDrink}`}>
              <IonThumbnail slot="start">
                <img src={d.strDrinkThumb} />
              </IonThumbnail>
              <IonLabel>{d.strDrink}</IonLabel>
            </IonItem>
          ))}
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default Tab3;
