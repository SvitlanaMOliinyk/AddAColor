import { MouseEvent, useState } from "react";
import { SecondStepBlue } from "./SecondStepBlue.tsx";
import { SecondStepOrange } from "./SecondStepOrange.tsx";
import { useNavigate } from "react-router-dom";
interface GoldSilverCheckProps {
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
export const GoldSilverCheck = ({ photo, resultValue, chroma, hue, onValuesUpdated }: GoldSilverCheckProps) => {
  const [silver, setSilver] = useState<boolean>(false);
  const [gold, setGold] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [metal, setMetal] = useState<string>("");
  const navigate = useNavigate();

  const handleButtonClick = (e: MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    if (target) {
      setIsClicked(true);
    }
    if (target.value === "silver") {
      setSilver(true);
    }
    if (target.value === "gold") {
      setGold(true);
    }
    setMetal(target.value)
    onValuesUpdated(photo, hue, target.value, resultValue, chroma);
    console.log("Target value:", target.value)
  };
  const handleBackClick = () => {
    navigate("/firstStep"); // Navigate back to the previous page
  };
  return (
    <section className="photo-section">
      {!isClicked ? (
        <>
          <div className="img-container-one">
            <img src={photo} alt="userPhoto" width={300} />
            <div className="background-test-silver"></div>
            <button value="silver" onClick={handleButtonClick}>
              Click Me!
            </button>
          </div>
          <div className="img-container-between">
          <button onClick={handleBackClick}>Back</button>
          </div>
          <div className="img-container-two">
            <img src={photo} alt="userPhoto" width={300} />
            <div className="background-test-gold"></div>
            <button value="gold" onClick={handleButtonClick}>
              Click Me!
            </button>
          </div>
         
        </>
      ) : silver ? (
        <SecondStepBlue photo={photo} hue={hue} metal={metal} resultValue={resultValue} chroma={chroma} onValuesUpdated={onValuesUpdated}/>
      ) : (
        <SecondStepOrange photo={photo} hue={hue} metal={metal} resultValue={resultValue} chroma={chroma} onValuesUpdated={onValuesUpdated}/>
      )}
      
      
    </section>
  );
};
