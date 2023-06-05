import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import { useEffect, useState } from "react";
import Home from "./pages/Home.tsx";
import { About } from "./pages/About.tsx";
import { Login } from "./components/Login.tsx";
import { Season } from "./components/Season.tsx";
import { Register } from "./components/Register.tsx";
import { UserModel } from "./models/userModel.ts";
import { Profile } from "./pages/Profile.tsx";
import { FirstStep } from "./components/FirstStep.tsx";
import { GoldSilverCheck } from "./components/GoldSilverCheck.tsx";
import { SecondStepBlue } from "./components/SecondStepBlue.tsx";
import { SecondStepOrange } from "./components/SecondStepOrange.tsx";
import { ThirdStepBlueDark } from "./components/ThirdStepBlueDark.tsx";
import { ThirdStepBlueLight } from "./components/ThirdStepBlueLight.tsx";
import { ThirdStepOrangeDark } from "./components/ThirdStepOrangeDark.tsx";
import { ThirdStepOrangeLight } from "./components/ThirdStepOrangeLight.tsx";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<UserModel | null>(null);
  const [photo, setPhoto] = useState<string>("");
  const [hue, setHue] = useState<string>("");
  const [metal, setMetal] = useState<string>("");
  const [resultValue, setResultValue] = useState<string>("");
  const [chroma, setChroma] = useState<string>("");

  const handleValuesUpdated = (
    updatedPhoto: string,
    updatedHue: string,
    updatedMetal: string,
    updatedResultValue: string,
    updatedChroma: string
  ) => {
    // Update the values in the parent component's state
    setPhoto(updatedPhoto);
    setHue(updatedHue);
    setMetal(updatedMetal);
    setResultValue(updatedResultValue);
    setChroma(updatedChroma);
  };

  useEffect(() => {
    async function getLoggedInUser() {
      try {
        const response = await fetch("/api/user", { method: "GET" });
        const responseResult = await response.json();
        console.log("responseUser:", responseResult);
        setLoggedInUser(responseResult);
      } catch (error) {
        console.error(error);
      }
    }
    getLoggedInUser();
  }, []);

  return (
    <>
      <Navbar
        loggedInUser={loggedInUser}
        onLogout={() => setLoggedInUser(null)}
      />
      <Routes>
        <Route path="/" element={<Home loggedInUser={loggedInUser} />} />
        <Route path="/about/:key" element={<Season />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/profile"
          element={
            <Profile
              loggedInUser={loggedInUser}
              photo={photo}
              onValuesUpdated={handleValuesUpdated}
              resultValue={""}
              hue={""}
              metal={""}
              chroma={""}
            />
          }
        />
        <Route
          path="/firstStep"
          element={
            <FirstStep
              photo={photo}
              onValuesUpdated={handleValuesUpdated}
              resultValue={""}
              hue={""}
              metal={""}
              chroma={""}
            />
          }
        />
        <Route
          path="/goldSilver"
          element={
            <GoldSilverCheck
              photo={photo}
              hue={hue}
              onValuesUpdated={handleValuesUpdated}
              resultValue={""}
              metal={""}
              chroma={""}
            />
          }
        />
        <Route
          path="/secondStepBlue"
          element={
            <SecondStepBlue
              photo={photo}
              metal={metal}
              hue={hue}
              onValuesUpdated={handleValuesUpdated}
              resultValue={""}
              chroma={""}
            />
          }
        />
        <Route
          path="/secondStepOrange"
          element={
            <SecondStepOrange
              photo={photo}
              metal={metal}
              hue={hue}
              onValuesUpdated={handleValuesUpdated}
              resultValue={""}
              chroma={""}
            />
          }
        />
        <Route
          path="/thirdStepBlueDark"
          element={
            <ThirdStepBlueDark
              photo={photo}
              metal={metal}
              hue={hue}
              resultValue={resultValue}
              onValuesUpdated={handleValuesUpdated}
            />
          }
        />
        <Route
          path="/thirdStepBlueLight"
          element={
            <ThirdStepBlueLight
              photo={photo}
              metal={metal}
              hue={hue}
              resultValue={resultValue}
              onValuesUpdated={handleValuesUpdated}
            />
          }
        />
        <Route
          path="/thirdStepOrangeDark"
          element={
            <ThirdStepOrangeDark
              photo={photo}
              metal={metal}
              hue={hue}
              resultValue={resultValue}
              onValuesUpdated={handleValuesUpdated}
            />
          }
        />
        <Route
          path="/thirdStepOrangeLight"
          element={
            <ThirdStepOrangeLight
              photo={photo}
              metal={metal}
              hue={hue}
              resultValue={resultValue}
              onValuesUpdated={handleValuesUpdated}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Register
              onRegisterSuccessful={(user) => {
                setLoggedInUser(user);
              }}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              onLoginSuccessful={(user) => {
                setLoggedInUser(user);
              }}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
