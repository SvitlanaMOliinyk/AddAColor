import { useEffect, useState } from "react";
interface ResultProps {
  photo: string;
  resultValue: string;
  chroma: string;
  hue: string;
}
type PaletteProps = {
  paletteName: string;
  url: string;
  _id: string;
}

export const Result = ({ photo, resultValue, chroma, hue }: ResultProps) => {
  const [palette, setPalette] = useState<PaletteProps[]>([]);
  const [userSeason, setUserSeason] = useState<string>("");

  console.log("Value, chroma, hue from Result:", resultValue, chroma, hue);

  useEffect(() => {
    if (hue === "blue" && resultValue === "light" && chroma === "gray") {
      setUserSeason("Light Summer");
    }

    if (
      hue === "blue" &&
      resultValue === ("dark" || "light") &&
      chroma === "gray"
    ) {
      setUserSeason("True Summer");
    }

    if (
      hue === "blue" &&
      resultValue === ("dark" || "light") &&
      chroma === "gray"
    ) {
      setUserSeason("Soft Summer");
    }

    if (hue === "blue" && resultValue === "light" && chroma === "bright") {
      setUserSeason("Bright Winter");
    }
    if (hue === "blue" && resultValue === "dark" && chroma === "bright") {
      setUserSeason("Dark Winter");
    }
    if (
      hue === "blue" &&
      resultValue === ("dark" || "light") &&
      chroma === "bright"
    ) {
      setUserSeason("True Winter");
    }
    if (hue === "orange" && resultValue === "light" && chroma === "bright") {
      setUserSeason("Light Spring");
    }
    if (
      hue === "orange" &&
      resultValue === ("dark" || "light") &&
      chroma === "bright"
    ) {
      setUserSeason("True Spring");
    }
    if (hue === "orange" && resultValue === "dark" && chroma === "bright") {
      setUserSeason("Bright Spring");
    }
    if (hue === "orange" && resultValue === "dark" && chroma === "gray") {
      setUserSeason("Dark Autumn");
    }
    if (
      hue === "orange" &&
      resultValue === ("dark" || "light") &&
      chroma === "gray"
    ) {
      setUserSeason("True Autumn");
    }
    if (hue === "orange" && resultValue === "light" && chroma === "gray") {
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

  return (
    <section className="photo-section">
      <>
        <div className="img-container-one">
          <h2>{userSeason}</h2>
          <img src={photo} alt="userPhoto" width={300} />
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
