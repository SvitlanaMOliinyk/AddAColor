import { MouseEvent, useState } from "react";
import { ThirdStepBlueDark } from "./ThirdStepBlueDark.tsx";
import { ThirdStepBlueLight } from "./ThirdStepBlueLight.tsx";
import { useNavigate } from "react-router-dom";
interface SecondStepBlueProps {
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

export const SecondStepBlue = ({photo, hue, metal, chroma, onValuesUpdated}: SecondStepBlueProps) => {
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
    setResultValue(target.value)
    onValuesUpdated(photo, hue, metal, target.value, chroma);
  };
  const handleBackClick = () => {
    navigate("/goldSilver");
  };
  return (
    <section className="photo-section">
      {!isClicked ? (
        <div className="wrapper flex flex-col">
        <div className="img-container-both flex space-x-12">
          <div className="img-container-one">
            <img src={photo} alt="userPhoto" width={300} />
            <div className="background-test-blue-dark"></div>
            <button value="dark" onClick={handleButtonClick} className="w-full">
              Click Me!
            </button>
          </div>
          
          <div className="img-container-two">
            <img src={photo} alt="userPhoto" width={300} />
            <div className="background-test-blue-light"></div>
            <button value="light" onClick={handleButtonClick} className="w-full">
              Click Me!
            </button>
            </div>
          </div>
          
          <button onClick={handleBackClick} className="w-full bg-red-100">Back</button>
          
        </div>
      ) : dark ? (
        <ThirdStepBlueDark photo={photo} resultValue={resultValue} metal={metal}  hue={hue} onValuesUpdated={onValuesUpdated}/>
      ) : (
        <ThirdStepBlueLight photo={photo} resultValue={resultValue} metal={metal} hue={hue} onValuesUpdated={onValuesUpdated}/>
      )}
    </section>
  );
}