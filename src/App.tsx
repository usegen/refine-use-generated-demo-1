import {
  Refine,
  GitHubBanner,
  WelcomePage,
  Authenticated,
} from '@refinedev/core';
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  AuthPage, ErrorComponent
  , notificationProvider
  , RefineSnackbarProvider
  , ThemedLayoutV2
} from '@refinedev/mui';

import GlobalStyles from "@mui/material/GlobalStyles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import routerBindings, { NavigateToResource, CatchAllNavigate, UnsavedChangesNotifier, DocumentTitleHandler } from "@refinedev/react-router-v6";
import dataProvider, { GraphQLClient } from "refine-use-generated";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { Header } from "./components/header";

import { MuiInferencer } from "@refinedev/inferencer/mui";




function App() {




  return (
    <BrowserRouter>

      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <Refine notificationProvider={notificationProvider}
              routerProvider={routerBindings}
              dataProvider={dataProvider(new GraphQLClient('http://localhost:3001/graphql'))}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,

              }}
              resources={[
                {
                  name: "blog-posts",
                  list: "/blog-posts",
                  show: "/blog-posts/show/:id",
                  create: "/blog-posts/create",
                  edit: "/blog-posts/edit/:id",
                },
              ]}
            >


              <Routes>
                <Route path="blog-posts">
                  <Route index
                    element={
                      <MuiInferencer
                        meta={{
                          'blog-posts': {
                            getList: {
                              fields: ["id", "title", "content"],
                            },
                          },
                        }}
                      />}
                  />
                  <Route
                    path="show/:id"
                    element={
                      <MuiInferencer
                        meta={{
                          'blog-posts': {
                            getOne: {
                              fields: ["id", "title", "content"],
                            },
                          },
                        }}
                      />}
                  />
                </Route>
              </Routes>

            </Refine>
          </RefineSnackbarProvider>


        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
};

export default App;
