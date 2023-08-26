import { Icon } from "@iconify/react";
import { css } from "@emotion/react";
import { PRIMARY_COLOR } from "@/constants/color";
import usePagination from "@/hooks/usePagination";
import { useQuery } from "@apollo/client";
import { GET_CONTACT_AGGREGATE } from "@/graphql/queries";
import useSearch from "@/hooks/useSearch";
import { useFavoritesContext } from "@/hooks/useFavourites";

const styles = {
  pagination: css`
    padding: 0;
    list-style-type: none;
    display: flex;
    align-items: center;
    background-color: #ffffff;
    border-radius: 0.125rem;
    width: max-content;
    margin-inline: auto;
    margin-bottom: 1rem;
  `,
  paginationItem: css`
    font-size: 0.75rem;
  `,
  paginationButton: css`
    background-color: #ffffff;
    color: ${PRIMARY_COLOR};
    text-decoration: none;
    padding: 0.5rem 0.75rem;
    border-radius: 0.125rem;
    display: block;
    border: 0;
    outline: 0;
    cursor: pointer;
    &:disabled {
      cursor: not-allowed;
      pointer-events: none;
      background-color: #dfe6e9;
    }
    &:hover,
    &.active {
      background-color: ${PRIMARY_COLOR};
      color: #ffffff;
    }
  `,
};

const Pagination: React.FC = () => {
  const { favorites } = useFavoritesContext();
  const { searchQuery } = useSearch();
  const { data, loading } = useQuery(GET_CONTACT_AGGREGATE, {
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
  const { itemsPerPage, currentPage, setCurrentPage } = usePagination();

  if (loading) return null;

  const totalPages = Math.ceil(data["contact_aggregate"]["aggregate"]["count"] / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (!data["contact_aggregate"]["aggregate"]["count"]) return null;

  return (
    <ul css={styles.pagination}>
      <li css={styles.paginationItem}>
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} css={styles.paginationButton}>
          <Icon display="block" icon="grommet-icons:previous" width={16} height={16} />
        </button>
      </li>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <li key={page} css={styles.paginationItem}>
          <button className={currentPage === page ? "active" : ""} onClick={() => handlePageChange(page)} css={styles.paginationButton}>
            {page}
          </button>
        </li>
      ))}
      <li css={styles.paginationItem}>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} css={styles.paginationButton}>
          <Icon display="block" icon="grommet-icons:next" width={16} height={16} />
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
