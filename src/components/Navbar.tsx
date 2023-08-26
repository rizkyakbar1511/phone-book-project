import { useRef } from "react";
import { css } from "@emotion/react";
import { Icon } from "@iconify/react";
import { CARD_BG_COLOR, PRIMARY_COLOR } from "@/constants/color";
import { buttonBase } from "@/styles/button";
import useSearch from "@/hooks/useSearch";
import useModal from "@/hooks/useModal";

const navbarCss = {
  self: css`
    padding: 1rem 1.4375rem 0.75rem 1rem;
    background: ${CARD_BG_COLOR};
    box-shadow: 0px 0px 1px 0px rgba(37, 37, 37, 0.51);
  `,
  heading: css`
    color: #252525;
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.3rem;
  `,
  subHeading: css`
    color: rgba(37, 37, 37, 0.5);
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    margin-bottom: 1rem;
  `,
};

const searchBarCss = {
  self: css`
    display: flex;
    gap: 1rem;
  `,
  form: css`
    display: flex;
    flex: 1;
    align-items: center;
    gap: 0.5rem;
    background-color: rgba(255, 255, 255, 1);
    border: 1px solid rgba(230, 230, 230, 1);
    border-radius: 0.375rem;
    padding: 0.625rem;
  `,
  button: css`
    ${buttonBase}
    color: ${PRIMARY_COLOR};
    padding-inline: 0.375rem;
  `,
  input: css`
    background: transparent;
    flex: 1;
    border: 0;
    font-size: 0.75rem;
    color: rgba(37, 37, 37, 1);
    outline: none;
    &::placeholder {
      color: rgba(37, 37, 37, 0.5);
    }
  `,
};

const Navbar = () => {
  const { openModal } = useModal();
  const { setSearchQuery } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const queryValue = inputRef.current?.value;
    setSearchQuery(queryValue!);
  }

  return (
    <div css={navbarCss.self}>
      <h5 css={navbarCss.heading}>Phone Book App</h5>
      <p css={navbarCss.subHeading}>Always Connected</p>
      <div css={searchBarCss.self}>
        <form onSubmit={onSubmit} css={searchBarCss.form}>
          <button css={searchBarCss.button} type="submit">
            <Icon display="block" icon="mdi:magnify" width={16} height={16} />
          </button>
          <input ref={inputRef} css={searchBarCss.input} type="text" placeholder="Try search something..." />
        </form>
        <button onClick={() => openModal("modal-add-contact")} css={searchBarCss.button}>
          <Icon icon="mdi:account-plus-outline" display="block" width={24} height={24} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
