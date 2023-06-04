import { MouseEvent, useState } from "react";
import { ThirdStepBlueDark } from "./ThirdStepBlueDark.tsx";
import { ThirdStepBlueLight } from "./ThirdStepBlueLight.tsx";
interface SecondStepBlueProps {
  photo: string;
  hue: string;
}

export const SecondStepBlue = ({photo, hue}: SecondStepBlueProps) => {
  const [dark, setDark] = useState<boolean>(false);
  const [light, setLight] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [resultValue, setResultValue] = useState<string>("");
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
    console.log("Target value:", target.value)
  };
  return (
    <section className="photo-section">
      {!isClicked ? (
        <>
          <div className="img-container-one">
            <img src={photo} alt="userPhoto" width={300} />
            <div className="background-test-blue-dark"></div>
            <button value="dark" onClick={handleButtonClick}>
              Click Me!
            </button>
          </div>
          <div className="img-container-two">
            <img src={photo} alt="userPhoto" width={300} />
            <div className="background-test-blue-light"></div>
            <button value="light" onClick={handleButtonClick}>
              Click Me!
            </button>
          </div>
        </>
      ) : dark ? (
        <ThirdStepBlueDark photo={photo} resultValue={resultValue} hue={hue}/>
      ) : (
        <ThirdStepBlueLight photo={photo} resultValue={resultValue} hue={hue}/>
      )}
    </section>
  );
}