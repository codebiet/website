import React from "react";
import { AskBar } from "./AskBar";
import { SwitchBar } from "./SwitchBar";
import { DiscussCard } from "./DiscussCard";
import { HorizontalBar } from "./horizontalBar";
import { Sidebar } from "./sidebar";
import { FloatingButtons } from "./floatingButtons";
function Discussion() {
  return (
    <main className="discussion-container-main">
      <div id="qna-wrapper" class="row">
        <div id="qnasection" class="col-xs-12 col-sm-12 col-lg-9">
          <div id="discussPanel">
            <AskBar />
            <HorizontalBar />
            <SwitchBar />
            <DiscussCard />
          </div>
        </div>
        <Sidebar />
      </div>
      <FloatingButtons />
    </main>
  );
}

export default Discussion;
