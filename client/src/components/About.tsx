
import { Link } from "react-router-dom";
import Section from "./Section.tsx";
import List from "./List.tsx";

export const About = () => {
  return (
    <main className="about content">
      <h2>This color suits you well!</h2>
      <h3>Season theory: short guideline</h3>
      <Section title={"Changed title"}>
        <div className="color-basis">
          <p>Seasonal color analysis is broken up into three main factors:</p>

          <p>
            <b>Hue (coloring):</b> Your hue can either be cool or warm (there
            are also neutral leaning seasons but they will still often lean one
            way slightly)
          </p>

          <p>
            <b>Value:</b> Your value is either light or dark{" "}
          </p>

          <p>
            <b>Chroma (purity or intensity of color):</b> Muted/soft to
            bright/clear{" "}
          </p>
        </div>
      </Section>
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
    </main>
  );
};
