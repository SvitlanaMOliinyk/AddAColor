import { MouseEvent, useState } from "react";
import { GoldSilverCheck } from "./GoldSilverCheck.tsx";
interface FirstStepProps {
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
export const FirstStep = ({ photo, resultValue, metal, chroma, onValuesUpdated }: FirstStepProps) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [hue, setHue] = useState<string>("");

  const handleButtonClick = (e: MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    if (target) {
      setIsClicked(true);
    setHue(target.value)
    onValuesUpdated(photo, target.value, metal, resultValue, chroma);
    }
  };
  
  return (
    <section className="photo-section">
      {!isClicked ? (
        <>
          <div className="img-container-one">
            <img src={photo} alt="userPhoto" width={300} />
            <div className="background-test-one"></div>
            <button value="blue" onClick={handleButtonClick}>
              Click Me!
            </button>
          </div>
          <div className="img-container-two">
            <img src={photo} alt="userPhoto" width={300} />
            <div className="background-test-two"></div>
            <button value="orange" onClick={handleButtonClick}>
              Click Me!
            </button>
          </div>
        </>
      ) : (
        <GoldSilverCheck photo={photo} hue={hue} metal={metal} resultValue={resultValue} chroma={chroma} onValuesUpdated={onValuesUpdated}/>
      )}
    </section>
  );
};
