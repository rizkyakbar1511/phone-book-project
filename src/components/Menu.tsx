import { useState, useRef, useEffect } from "react";
import { css } from "@emotion/react";
import { Icon } from "@iconify/react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { motion, AnimatePresence } from "framer-motion";
import { buttonBase } from "@/styles/button";
import { PRIMARY_COLOR } from "@/constants/color";
import { DELETE_CONTACT } from "@/graphql/mutation";
import { GET_CONTACT_AGGREGATE, GET_CONTACT_DETAIL, GET_CONTACT_LIST } from "@/graphql/queries";
import useModal from "@/hooks/useModal";
import { getArrayFromLocalStorage, removeArrayFromLocalStorage, setArrayToLocalStorage } from "@/utils/localStorage";
import { useFavoritesContext } from "@/hooks/useFavourites";
import useInput from "@/hooks/useInput";

const styles = {
  self: css`
    position: relative;
  `,
  menu: css`
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    transform-origin: top right;
    border-radius: 0.25rem;
    background: #fcfefe;
    box-shadow: 0px 1px 4px 0px rgba(37, 37, 37, 0.17);
    padding-block: 0.5rem;
    list-style: none;
  `,
  menuItem: css``,
  button: css`
    ${buttonBase}
    display: flex;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    width: 100%;
    &:hover {
      color: #fff;
      background-color: ${PRIMARY_COLOR};
    }

    svg {
      color: ${PRIMARY_COLOR};
    }

    &:hover svg {
      color: #fff;
    }
  `,
};

interface MenuProps {
  id: number | undefined;
  isFavourite?: boolean;
}

const Menu = ({ id, isFavourite }: MenuProps) => {
  const { setInputValue } = useInput();
  const { addFavorite, removeFavorite } = useFavoritesContext();
  const [delete_contact_by_pk] = useMutation(DELETE_CONTACT, {
    refetchQueries: [GET_CONTACT_LIST, GET_CONTACT_AGGREGATE],
    variables: {
      id,
    },
  });
  const [getContactDetail] = useLazyQuery(GET_CONTACT_DETAIL, {
    onCompleted: (data) => {
      console.log(data);
      setInputValue("first_name", data.contact_by_pk.first_name);
      setInputValue("last_name", data.contact_by_pk.last_name);
      setInputValue("phones", data.contact_by_pk.phones);
    },
  });
  const { openModal } = useModal();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const menuRef = useRef(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      if (menuRef.current) {
        setAnchorEl(null);
      }
    };

    if (anchorEl) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [anchorEl]);

  return (
    <div css={styles.self}>
      <button onClick={handleClick} css={buttonBase}>
        <Icon icon="mdi:dots-vertical" width={14} height={14} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} css={styles.menu} ref={menuRef}>
            <li css={styles.menuItem}>
              <button
                css={styles.button}
                onClick={() => {
                  openModal("modal-edit-contact");
                  getContactDetail({ variables: { id } });
                  setInputValue("id", id!);
                }}
                type="button"
              >
                <Icon icon="mdi:pencil" width={14} height={14} /> Edit
              </button>
            </li>
            <li css={styles.menuItem}>
              <button
                onClick={() => {
                  if (isFavourite) {
                    removeArrayFromLocalStorage("favourites", id!);
                    removeFavorite(id!);
                  } else {
                    setArrayToLocalStorage("favourites", [...getArrayFromLocalStorage("favourites")!, id]);
                    addFavorite(id!);
                  }
                }}
                css={styles.button}
                type="button"
              >
                <Icon icon="mdi:star" width={14} height={14} /> {isFavourite ? "Remove" : "Favourite"}
              </button>
            </li>
            <li css={styles.menuItem}>
              <button onClick={() => delete_contact_by_pk()} css={styles.button} type="button">
                <Icon icon="mdi:delete" width={14} height={14} /> Delete
              </button>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Menu;
