import { useEffect, useState } from "react";
import {colorResult} from "../util/helper.ts"

interface ResultProps {
  photo: string;
  resultValue: string;
  chroma: string;
  hue: string;
  metal: string;
}
type PaletteProps = {
  paletteName: string;
  url: string;
  _id: string;
}

export const Result = ({ photo, resultValue, chroma, hue, metal }: ResultProps) => {
  const [palette, setPalette] = useState<PaletteProps[]>([]);
  const [userSeason, setUserSeason] = useState<string>("");


  console.log("Value, chroma, hue from Result:", resultValue, chroma, hue, metal);

  useEffect(() => {
    if (hue === "blue" && resultValue === "light" && chroma === "gray" && metal === "silver") {
      setUserSeason("Light Summer");
    }
    if (hue === "blue" && resultValue === "light" && chroma === "gray" && metal === "gold") {
      setUserSeason("Light Summer");
    }

    if (
      hue === "blue" &&
      metal === "silver" &&
      resultValue === "dark" &&
      chroma === "gray"
    ) {
      setUserSeason("True Summer");
    }

    if (
      hue === "blue" &&
      metal === "gold" &&
      resultValue === "dark" &&
      chroma === "gray"
    ) {
      setUserSeason("Soft Summer");
    }
    if (
      hue === "orange" &&
      metal === "silver" &&
      resultValue === "light" &&
      chroma === "gray"
    ) {
      setUserSeason("Soft Autumn");
    }

    if (hue === "blue" && resultValue === "light" && chroma === "bright" && metal === "silver") {
      setUserSeason("Bright Winter");
    }

    if (hue === "blue" && resultValue === "light" && chroma === "bright" && metal === "gold") {
      setUserSeason("Bright Winter");
    }

    if (hue === "blue" && resultValue === "dark" && chroma === "bright" && metal === "gold") {
      setUserSeason("Dark Winter");
    }
    if (
      hue === "blue" &&
      resultValue === "dark" &&
      chroma === "bright"
      && metal === "silver"
    ) {
      setUserSeason("True Winter");
    }
    if (hue === "orange" && resultValue === "light" && chroma === "bright" && metal === "gold") {
      setUserSeason("Light Spring");
    }
    if (hue === "orange" && resultValue === "light" && chroma === "bright" && metal === "silver") {
      setUserSeason("Light Spring");
    }
    if (
      hue === "orange" &&
     metal === "gold" &&
      resultValue === "dark" &&
      chroma === "bright"
    ) {
      setUserSeason("True Spring");
    }
    if (hue === "orange" && metal === "gold" && resultValue === "dark" && chroma === "bright") {
      setUserSeason("Bright Spring");
    }
    if (hue === "orange" && metal === "gold" && resultValue === "dark" && chroma === "gray") {
      setUserSeason("Dark Autumn");
    }
    if (
      hue === "orange" && metal === "gold" &&
      resultValue === "dark" &&
      chroma === "gray"
    ) {
      setUserSeason("True Autumn");
    }
    if (hue === "orange" && resultValue === "light" && chroma === "gray" && metal === "gold") {
      setUserSeason("Soft Autumn");
    }
  }, []);

  useEffect(() => {
    async function loadCircle() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/palette/${userSeason}`,
          { method: "GET" }
        );
        const responsePalette = await response.json();
        console.log("responsePalette:", responsePalette);
        setPalette(responsePalette);
      } catch (error) {
        console.error(error);
      }
    }
    loadCircle();
  }, [userSeason]);

  const userColors = colorResult(userSeason);


  return (
    <section className="photo-section">
      <>
        <div className="img-container-one">
          <h2>{userSeason}</h2>
          <img style={userColors} src={photo} alt="userPhoto" width={300} />
          <div className="background-test">
          <img
            src={palette[0]?.url}
            alt={palette[0]?.paletteName}
            width={300}
          />
          </div>
        </div>
      </>
    </section>
  );
};
