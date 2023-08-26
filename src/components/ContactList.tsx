import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { css } from "@emotion/react";
// import { Icon } from "@iconify/react";

import { GET_CONTACT_AGGREGATE, GET_CONTACT_LIST } from "@/graphql/queries";
import { PRIMARY_COLOR } from "@/constants/color";

import { ContactType } from "@/types";
import useSearch from "@/hooks/useSearch";
import usePagination from "@/hooks/usePagination";

import EmptyState from "@/components/EmptyState";
import Card from "@/components/Card";
import Contact from "@/components/Contact";
import ContactLoader from "./Loader/ContactLoader";
import { useFavoritesContext } from "@/hooks/useFavourites";

const styles = {
  self: css`
    padding: 1rem;
  `,
  contactGroup: css`
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  `,
  headingFavourite: css`
    color: ${PRIMARY_COLOR};
    font-size: 0.75rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  `,
  headingRegular: css`
    color: rgba(37, 37, 37, 0.5);
    font-size: 0.75rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  `,
};

const ContactList = () => {
  const { favorites } = useFavoritesContext();
  const { searchQuery } = useSearch();
  const { currentPage, itemsPerPage } = usePagination();
  const offset = useMemo(() => (currentPage - 1) * itemsPerPage, [currentPage, itemsPerPage]);

  const { data: contactAggregate, loading: loadingAggregate } = useQuery(GET_CONTACT_AGGREGATE, {
    variables: {
      where: {
        _or: [
          {
            first_name: {
              _ilike: `%${searchQuery}%`,
            },
          },
          {
            last_name: {
              _ilike: `%${searchQuery}%`,
            },
          },
        ],
        _not: {
          id: {
            _in: favorites,
          },
        },
      },
    },
  });

  const {
    data,
    loading: loadingContactList,
    error,
  } = useQuery(GET_CONTACT_LIST, {
    variables: {
      limit: itemsPerPage,
      offset,
      where: {
        _or: [
          {
            first_name: {
              _ilike: `%${searchQuery}%`,
            },
          },
          {
            last_name: {
              _ilike: `%${searchQuery}%`,
            },
          },
        ],
        _not: {
          id: {
            _in: favorites,
          },
        },
      },
    },
  });

  const { data: favouritesContact, loading: loadingFavouritesContact } = useQuery(GET_CONTACT_LIST, {
    variables: {
      where: {
        id: {
          _in: favorites,
        },
      },
    },
  });

  const loading = useMemo(
    () => loadingAggregate || loadingContactList || loadingFavouritesContact,
    [loadingAggregate, loadingContactList, loadingFavouritesContact]
  );

  if (error) return `Error! ${error.message}`;

  return (
    <section css={styles.self}>
      {!loading && Boolean(favouritesContact.contact.length) && (
        <div css={styles.contactGroup}>
          <h6 css={styles.headingFavourite}>Favourite Contact ({favouritesContact.contact.length})</h6>
          <Card>
            {favouritesContact.contact.map((item: ContactType) => (
              <Contact key={item.id} {...item} isFavourite />
            ))}
          </Card>
        </div>
      )}
      <div css={styles.contactGroup}>
        {!loading && <h6 css={styles.headingRegular}>Regular Contact ({contactAggregate["contact_aggregate"]["aggregate"]["count"]})</h6>}
        <Card>
          {loading ? (
            <ContactLoader />
          ) : data.contact.length > 0 ? (
            data.contact.map((item: ContactType) => <Contact key={item.id} {...item} />)
          ) : (
            <EmptyState
              title="Oopss...."
              description={searchQuery ? `Sorry, we couldn't find contact with name "${searchQuery}"` : "No contact found"}
            />
          )}
        </Card>
      </div>
    </section>
  );
};

export default ContactList;
