import React, { lazy } from "react";
const Founder = lazy(() => import("../Founder/founder"));
function Mission() {
  return (
    <div className="mission">
      <section>
        <h1>Why we are building C.O.D.E</h1>
        <div>
          <p>
            With the rising trend of video consumption, we believe videos are a
            great medium to educate & train people. But we found a gap that
            there are not much product video creation tools or video-first
            product onboarding platforms. So we went and built one. With Trainn
            you can create product training videos including product
            walkthroughs and host as a training academy or embed within your
            product as structured learning paths during onboarding process.
          </p>
        </div>
      </section>
      <section>
        <Founder />
      </section>
    </div>
  );
}

export default Mission;
