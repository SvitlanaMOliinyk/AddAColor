import { MouseEvent, useState } from "react";
import { Result } from "./Result.tsx";
import { useNavigate } from "react-router-dom";

interface ThirdStepBlueLightProps {
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
export const ThirdStepBlueLight = ({
  photo,
  hue,
  resultValue,
  metal,
  onValuesUpdated,
}: ThirdStepBlueLightProps) => {
  // const [gray, setGray] = useState<boolean>(false);
  // const [bright, setBright] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [chroma, setChroma] = useState<string>("");
  const navigate = useNavigate();

  const handleButtonClick = (e: MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    if (target) {
      setIsClicked(true);
      setChroma(target.value);
      onValuesUpdated(photo, hue, metal, resultValue, target.value);
    }
  };
  const handleBackClick = () => {
    navigate("/secondStepBlue");
  };
  return (
    <section className="photo-section">
      {!isClicked ? (
        <div className="wrapper flex flex-col">
          <div className="img-container-both flex space-x-12">
            <div className="img-container-one">
              <img src={photo} alt="userPhoto" width={300} />
              <div className="background-test-blue-gray"></div>
              <button
                value="gray"
                onClick={handleButtonClick}
                className="w-full"
              >
                Click Me!
              </button>
            </div>

            <div className="img-container-two">
              <img src={photo} alt="userPhoto" width={300} />
              <div className="background-test-blue-bright"></div>
              <button
                value="bright"
                onClick={handleButtonClick}
                className="w-full"
              >
                Click Me!
              </button>
            </div>
          </div>

          <button onClick={handleBackClick} className="w-full bg-red-100">
            Back
          </button>
        </div>
      ) : (
        <Result
          photo={photo}
          hue={hue}
          metal={metal}
          resultValue={resultValue}
          chroma={chroma}
        />
      )}
    </section>
  );
};
