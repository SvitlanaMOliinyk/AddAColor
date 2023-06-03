import { MouseEvent, useState } from "react";
import { SecondStepBlue } from "./SecondStepBlue.tsx";
import { SecondStepOrange } from "./SecondStepOrange.tsx";
interface FirstStepProps {
  photo: string;
}
export const FirstStep = ({ photo }: FirstStepProps) => {
  const [blue, setBlue] = useState<boolean>(false);
  const [orange, setOrange] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleButtonClick = (e: MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    if (target) {
      setIsClicked(true);
    }
    if (target.value === "blue") {
      setBlue(true);
    }
    if (target.value === "orange") {
      setOrange(true);
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
      ) : blue ? (
        <SecondStepBlue />
      ) : (
        <SecondStepOrange />
      )}
    </section>
  );
};
