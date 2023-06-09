import { MouseEvent, useState } from "react";
import { ThirdStepOrangeDark } from "./ThirdStepOrangeDark.tsx";
import { ThirdStepOrangeLight } from "./ThirdStepOrangeLight.tsx";
import { useNavigate } from "react-router-dom";
interface SecondStepOrangeProps {
  photo: string;
  resultValue: string;
  hue: string;
  metal: string;
  chroma: string;
  onValuesUpdated: (
    updatedPhoto: string,
    updatedHue: string,
    updatedMetal: string,
    updatedResultValue: string,
    updatedChroma: string
  ) => void;
}

export const SecondStepOrange = ({
  photo,
  hue,
  metal,
  chroma,
  onValuesUpdated,
}: SecondStepOrangeProps) => {
  const [dark, setDark] = useState<boolean>(false);
  const [light, setLight] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [resultValue, setResultValue] = useState<string>("");
  const navigate = useNavigate();
  const handleButtonClick = (e: MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    if (target) {
      setIsClicked(true);
    }
    if (target.value === "dark") {
      setDark(true);
    }
    if (target.value === "light") {
      setLight(true);
    }
    setResultValue(target.value);
    onValuesUpdated(photo, hue, metal, target.value, chroma);
  };
  const handleBackClick = () => {
    navigate("/goldSilver");
  };
  return (
    <section className="photo-section">
      {!isClicked ? (
        <>
          <div className="img-container-one">
            <img src={photo} alt="userPhoto" width={300} />
            <div className="background-test-orange-dark"></div>
            <button value="dark" onClick={handleButtonClick}>
              Click Me!
            </button>
          </div>
          <div className="img-container-between">
            <button onClick={handleBackClick}>Back</button>
          </div>
          <div className="img-container-two">
            <img src={photo} alt="userPhoto" width={300} />
            <div className="background-test-orange-light"></div>
            <button value="light" onClick={handleButtonClick}>
              Click Me!
            </button>
          </div>
        </>
      ) : dark ? (
        <ThirdStepOrangeDark
          photo={photo}
          resultValue={resultValue}
          metal={metal}
          hue={hue}
          onValuesUpdated={onValuesUpdated}
        />
      ) : (
        <ThirdStepOrangeLight
          photo={photo}
          resultValue={resultValue}
          metal={metal}
          hue={hue}
          onValuesUpdated={onValuesUpdated}
        />
      )}
    </section>
  );
};
