import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


// type SeasonProps = { season: string };
type KeyParams = { key: string };
type PaletteProps = { 
    paletteName: string,
    url: string,
    _id: string
}

export const Season = () => {
  const { key }= useParams<KeyParams>();
  console.log("Key:", key)
  const [palette, setPalette] = useState<PaletteProps[]>([]);

  useEffect(() => {
    async function loadSeason() {
      try {
        const response = await fetch(`http://localhost:8080/api/palette/${key}`, { method: "GET" });
        const responsePalette = await response.json()
        console.log("responsePalette:", responsePalette.result)
        setPalette(responsePalette.result);
      } catch (error) {
        console.error(error);
      }
    }
    loadSeason();
  }, [key]);

  return (
    <main className="content season">
        
        <h2>{palette[0]?.paletteName}</h2>
        <div className="img-container">
            <img src={palette[0]?.url} alt={palette[0]?.paletteName} width="400"/>
        </div>
     
    </main>
  );
};
