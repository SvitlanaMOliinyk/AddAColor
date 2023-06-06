import { Link } from "react-router-dom";
import Section from "../components/Section.tsx";
import List from "../components/List.tsx";

export const About = () => {
  return (
    <main className="about content flex flex-col justify-center">
      <h2 className="self-center font-bold text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-violet-500">
        This color suits you well!
      </h2>
      <h3 className="self-center font-bold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-violet-300 to-blue-500 mb-4">
        Season theory: short guideline
      </h3>

      <div className="color-basis self-center text-2xl">
        <p>Seasonal color analysis is broken up into three main factors:</p>

        <p>
          <b>Hue (coloring):</b> Your hue can either be cool or warm (there are
          also neutral leaning seasons but they will still often lean one way
          slightly)
        </p>

        <p>
          <b>Value:</b> Your value is either light or dark{" "}
        </p>

        <p>
          <b>Chroma (purity or intensity of color):</b> Muted/soft to
          bright/clear{" "}
        </p>
      </div>
      <h2 className="font-bold self-center text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-violet-500">
        Season palette list
      </h2>
      <div className="color-basis self-center">
        <List
          items={[
            "Light Spring",
            "Bright Spring",
            "True Spring",
            "Light Summer",
            "Soft Summer",
            "True Summer",
            "Soft Autumn",
            "Dark Autumn",
            "True Autumn",
            "Bright Winter",
            "Dark Winter",
            "True Winter",
          ]}
          render={(item: string) => <Link to={item}>{item}</Link>}
        />
      </div>
    </main>
  );
};
