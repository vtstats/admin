import { Box } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import React from "react";
import { Redirect, Route, Switch } from "wouter";

import { credentialValidAtom } from "./atoms";
import Nav from "./components/Nav";
import Channels from "./pages/Channels";
import Jobs from "./pages/Jobs";
import Notifications from "./pages/Notifications";
import SignIn from "./pages/SignIn";
import Streams from "./pages/Streams";
import Subscriptions from "./pages/Subscriptions";
import Vtubers from "./pages/VTubers";

const App: React.FC = () => {
  const credentialValid = useAtomValue(credentialValidAtom);

  if (!credentialValid) return <SignIn />;

  return (
    <>
      <Nav />

      <Box mt="60px">
        <Switch>
          <Route path="/jobs" component={Jobs} />
          <Route path="/streams" component={Streams} />
          <Route path="/notifications" component={Notifications} />
          <Route path="/vtubers" component={Vtubers} />
          <Route path="/subscriptions" component={Subscriptions} />
          <Route path="/channels" component={Channels} />
          <Route path="/" children={<Redirect to="/jobs" />} />
        </Switch>
      </Box>
    </>
  );
};

export default App;
