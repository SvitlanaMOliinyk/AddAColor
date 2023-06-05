import { MouseEvent, useState } from "react";
import { Result } from "./Result.tsx";
import { useNavigate } from "react-router-dom";

interface ThirdStepOrangeLightProps {
  photo: string;
  resultValue: string;
  hue: string;
  metal: string;
  onValuesUpdated: (
    updatedPhoto: string,
    updatedHue: string,
    updatedMetal: string,
    updatedResultValue: string,
    updatedChroma: string
  ) => void;
}
export const ThirdStepOrangeLight = ({photo, hue, resultValue, metal, onValuesUpdated}: ThirdStepOrangeLightProps) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [chroma, setChroma] = useState<string>("");
  const navigate = useNavigate();
  const handleButtonClick = (e: MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    if (target) {
      setIsClicked(true);
    setChroma(target.value)
    onValuesUpdated(photo, hue, metal, resultValue, target.value);
    }
  };
  const handleBackClick = () => {
    navigate("/secondStepOrange"); // Navigate back to the previous page
  };
  return (
    <section className="photo-section">
      {!isClicked ? (
        <>
          <div className="img-container-one">
            <img src={photo} alt="userPhoto" width={300} />
            <div className="background-test-orange-gray"></div>
            <button value="gray" onClick={handleButtonClick}>
              Click Me!
            </button>
          </div>
          <div className="img-container-between">
          <button onClick={handleBackClick}>Back</button>
          </div>
          <div className="img-container-two">
            <img src={photo} alt="userPhoto" width={300} />
            <div className="background-test-orange-bright"></div>
            <button value="bright" onClick={handleButtonClick}>
              Click Me!
            </button>
          </div>
        </>
      ) : (
        <Result photo={photo} hue={hue} metal={metal} resultValue={resultValue} chroma={chroma}/>
      )}
    </section>
  );
}