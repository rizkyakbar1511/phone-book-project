import { css } from "@emotion/react";

interface CardProps {
  children: React.ReactNode;
}

const styles = css`
  border-radius: 0.25rem;
  background: #fcfefe;
  box-shadow: 0px 1px 4px 0px rgba(37, 37, 37, 0.17);
  padding: 1rem;
`;

const Card: React.FC<CardProps> = ({ children }) => {
  return <div css={styles}>{children}</div>;
};

export default Card;
