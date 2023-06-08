import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";



// type SeasonProps = { season: string };
type KeyParams = { key: string };
type PaletteProps = { 
    paletteName: string,
    url: string,
    url_two: string,
    _id: string
}

export const Season = () => {
  const { key }= useParams<KeyParams>();
  console.log("Key:", key)
  const [palette, setPalette] = useState<PaletteProps[]>([]);

  useEffect(() => {
    async function loadSeason() {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/palette/${key}`, { method: "GET" });
        const responsePalette = await response.json()
        console.log("responsePalette:", responsePalette)
        setPalette(responsePalette);
      } catch (error) {
        console.error(error);
      }
    }
    loadSeason();
  }, [key]);

  return (
    <main className="content season flex ">
        
        <div className="img-container pt-4 mr-10 flex flex-col">
        <h2 className="font-bold self-center text-4xl pb-4">{palette[0]?.paletteName}:Best Colors</h2>
            <img src={palette[0]?.url} alt={palette[0]?.paletteName} width="400"/>
        </div>
        
        <div className="img-container pt-4 flex flex-col">
        <h2 className="font-bold self-center text-2xl pb-2">Colors to avoid</h2>
            <img src={palette[0]?.url_two} alt={palette[0]?.paletteName} width="400"/>
        </div>
     
    </main>
  );
};
