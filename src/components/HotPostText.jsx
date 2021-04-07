/** @format */

import React from "react";
import TextTransition, { presets } from "react-text-transition";

const TEXTS = [
  "Hot Posts",
  "Burning Posts",
  "Lit Posts",
  "Hottest Posts in the block",
];

function HotPostText() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);
  return (
    <div>
      <h1>
        <TextTransition
          text={TEXTS[index % TEXTS.length]}
          springConfig={presets.wobbly}
        />
      </h1>
    </div>
  );
}

export default HotPostText;
