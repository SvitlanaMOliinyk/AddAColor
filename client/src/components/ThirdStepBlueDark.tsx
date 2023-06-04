import { MouseEvent, useState } from "react";
import { Result } from "./Result.tsx";

interface ThirdStepBlueDarkProps {
  photo: string;
  resultValue: string;
  hue: string;
}

export const ThirdStepBlueDark = ({photo, hue, resultValue}:ThirdStepBlueDarkProps) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [chroma, setChroma] = useState<string>("");
  const handleButtonClick = (e: MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    if (target) {
      setIsClicked(true);
    setChroma(target.value)
    }
  };
  return (
    <section className="photo-section">
      {!isClicked ? (
        <>
          <div className="img-container-one">
            <img src={photo} alt="userPhoto" width={300} />
            <div className="background-test-blue-gray"></div>
            <button value="gray" onClick={handleButtonClick}>
              Click Me!
            </button>
          </div>
          <div className="img-container-two">
            <img src={photo} alt="userPhoto" width={300} />
            <div className="background-test-blue-bright"></div>
            <button value="bright" onClick={handleButtonClick}>
              Click Me!
            </button>
          </div>
        </>
      ) : (
        <Result photo={photo} hue={hue} resultValue={resultValue} chroma={chroma}/>
      )}
    </section>
  );
}