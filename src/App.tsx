import { Box } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "wouter";

import { credentialValidAtom } from "./atoms";
import Nav from "./components/Nav";

const Jobs = lazy(() => import("./pages/Jobs"));
const SignIn = lazy(() => import("./pages/SignIn"));
const Streams = lazy(() => import("./pages/Streams"));
const Subscriptions = lazy(() => import("./pages/Subscriptions"));
const Catalog = lazy(() => import("./pages/Catalog"));

const App: React.FC = () => {
  const credentialValid = useAtomValue(credentialValidAtom);

  if (!credentialValid) return <SignIn />;

  return (
    <>
      <Nav />

      <Box mt="60px">
        <Switch>
          <Suspense fallback={<div>loading...</div>}>
            <Route path="/jobs/:tab?">{(params) => <Jobs {...params} />}</Route>

            <Route path="/streams/:tab?">
              {(params) => <Streams {...params} />}
            </Route>

            <Route path="/subscriptions/:tab?">
              {(params) => <Subscriptions {...params} />}
            </Route>

            <Route path="/catalog/:tab?">
              {(params) => <Catalog {...params} />}
            </Route>

            <Route path="/">
              <Redirect to="/jobs" />
            </Route>

            <Route path="/vtubers">
              <Redirect to="/catalog/vtubers" />
            </Route>
          </Suspense>
        </Switch>
      </Box>
    </>
  );
};

export default App;
