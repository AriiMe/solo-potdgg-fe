/** @format */

import React from "react";
import TextTransition, { presets } from "react-text-transition";

const TEXTS = ["Trending", "Relevant", "On the Rise", "To the moon!"];

function TrendingText() {
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

export default TrendingText;
