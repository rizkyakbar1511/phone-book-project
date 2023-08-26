import React from "react";
import ReactDOM from "react-dom/client";
import { Global } from "@emotion/react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { global } from "@/styles/global-styles";
import { SearchProvider } from "@/context/SearchContext";
import { ModalProvider } from "@/context/ModalContext";
import { PaginationProvider } from "@/context/PaginationContext.tsx";
import { FavoritesProvider } from "@/context/favouritesContext.tsx";
import { InputContextProvider } from "@/context/InputContext.tsx";

import App from "./App.tsx";

const client = new ApolloClient({
  uri: import.meta.env.VITE_API_URL,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Global styles={global} />
    <ApolloProvider client={client}>
      <ModalProvider>
        <SearchProvider>
          <PaginationProvider>
            <FavoritesProvider>
              <InputContextProvider>
                <App />
              </InputContextProvider>
            </FavoritesProvider>
          </PaginationProvider>
        </SearchProvider>
      </ModalProvider>
    </ApolloProvider>
  </React.StrictMode>
);
