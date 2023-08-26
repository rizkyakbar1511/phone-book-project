import { css } from "@emotion/react";

export const global = css`
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");

  * {
    font-family: "Inter", sans-serif;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  #root,
  html,
  body {
    height: 100%;
    background-color: rgba(246, 250, 251, 1);
  }
`;
