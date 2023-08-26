import { Icon } from "@iconify/react";
import { css } from "@emotion/react";
import { ContactType } from "@/types";
import Menu from "@/components/Menu";

const styles = {
  self: css`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-inline: 1rem;
    &:not(:last-child) {
      margin-bottom: 0.5rem;
    }
  `,
  photo: css`
    width: 2rem;
    height: 2rem;
    position: relative;
    overflow: hidden;
    border-radius: 50%;
    align-self: flex-start;
  `,
  image: css`
    position: absolute;
    object-fit: cover;
    max-width: 100%;
  `,
  heading: css`
    font-size: 0.75rem;
    font-weight: 500;
    color: #252525;
  `,
  subHeading: css`
    font-size: 0.75rem;
    font-weight: 500;
    color: rgba(37, 37, 37, 0.5);
  `,
};

const Contact: React.FC<ContactType & { isFavourite?: boolean }> = ({ id, first_name, last_name, phones, isFavourite }) => {
  return (
    <div css={styles.self}>
      <div css={styles.photo}>
        <img css={styles.image} src="/default.png" alt="default" />
      </div>
      <div
        css={css`
          flex: 1;
        `}
      >
        <h6 css={styles.heading}>
          {first_name} {last_name}
        </h6>
        {phones?.map(({ number }) => (
          <p key={number} css={styles.subHeading}>
            {number}
          </p>
        ))}
      </div>
      {isFavourite && <Icon icon="mdi:star" width={14} height={14} />}
      <Menu id={id} isFavourite={isFavourite} />
    </div>
  );
};

export default Contact;
