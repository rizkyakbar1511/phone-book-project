import { css } from "@emotion/react";

interface EmptyStateProps {
  title: string;
  description: string;
}

const styles = {
  self: css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  `,
  content: css`
    text-align: center;
  `,
  title: css`
    font-size: 1rem;
    font-weight: 600;
    color: #252525;
    margin-bottom: 1rem;
  `,
  description: css`
    color: rgba(37, 37, 37, 0.5);
    font-size: 0.875rem;
  `,
};
const EmptyState: React.FC<EmptyStateProps> = ({ title, description }) => {
  return (
    <div css={styles.self}>
      <img src="/EmptyState.png" alt="empty-state" />
      <div css={styles.content}>
        <h6 css={styles.title}>{title}</h6>
        <p css={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default EmptyState;
