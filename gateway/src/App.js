import "App.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { Widget } from "near-social-vm";
import React, { useEffect, useMemo } from "react";
import "react-bootstrap-typeahead/css/Typeahead.css";

import { sanitizeUrl } from "@braintree/sanitize-url";
import { useAccount, useInitNear } from "near-social-vm";
import {
  createBrowserRouter,
  Link,
  RouterProvider,
  useLocation,
} from "react-router-dom";

import { BroadcastComponent } from "./components/Broadcast/Broadcast";
import { VideoPlayer } from "./components/Player/Player";

import useRedirectMap from "./useRedirectMap";
import Editor from "./components/Editor/Editor";

function Viewer({ widgetSrc, code, initialProps }) {
  const { components: redirectMap } = useRedirectMap();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // create props from params
  const passProps = useMemo(() => {
    return Array.from(searchParams.entries()).reduce((props, [key, value]) => {
      props[key] = value;
      return props;
    }, {});
  }, [location]);

  const path = location.pathname.substring(1);

  const src = useMemo(() => {
    const pathSrc = widgetSrc ?? path;
    return pathSrc;
  }, [widgetSrc, path]);

  return (
    <>
      <Widget
        src={!code && src}
        code={code} // prioritize code
        props={{ ...initialProps, ...passProps }}
        config={{ redirectMap }}
      />
    </>
  );
}

function App(props) {
  const { src, code, initialProps, rpc, selectorPromise } = props;
  const { initNear } = useInitNear();

  useAccount();
  useEffect(() => {
    const networkId = "mainnet";

    const config = {
      networkId: networkId,
      selector: selectorPromise,
      customElements: {
        Link: (props) => {
          if (!props.to && props.href) {
            props.to = props.href;
            delete props.href;
          }
          if (props.to) {
            props.to = sanitizeUrl(props.to);
          }
          return <Link {...props} />;
        },
        Player: (props) => {
          return <VideoPlayer {...props} />;
        },
        "Player.Display": (props) => {
          return <VideoPlayer.Display {...props} />;
        },
        "Player.GetSrc": (props) => {
          return <VideoPlayer.GetSrc {...props} />;
        },
        "Player.GetUploadUrl": (props) => {
          return <VideoPlayer.GetUploadUrl {...props} />;
        },
        "Player.DirectUploadAsset": (props) => {
          return <VideoPlayer.DirectUploadAsset {...props} />;
        },
        "Player.ResumableUploadAsset": (props) => {
          return <VideoPlayer.ResumableUploadAsset {...props} />;
        },
        "Player.Debug": (props) => {
          return <VideoPlayer.Debug {...props} />;
        },
        "Player.ApiKey": (props) => {
          return <VideoPlayer.ApiKey {...props} />;
        },
        "Player.GetAssets": (props) => {
          return <VideoPlayer.GetAssets {...props} />;
        },
        "Player.FileUploader": (props) => {
          return <VideoPlayer.FileUploader {...props} />;
        },
        Broadcast: (props) => {
          return <BroadcastComponent {...props} />;
        },
        "Broadcast.Player": (props) => {
          return <BroadcastComponent.Player {...props} />;
        },
        "Broadcast.GenerateStream": (props) => {
          return <BroadcastComponent.GenerateStream {...props} />;
        },
        "Broadcast.Debug": (props) => {
          return <BroadcastComponent.Debug {...props} />;
        },
        "Broadcast.WatchStream": (props) => {
          return <BroadcastComponent.WatchStream {...props} />;
        },
        "Broadcast.ApiKey": (props) => {
          return <BroadcastComponent.ApiKey {...props} />;
        },
        "Editor": (props) => {
          return <Editor {...props} />;
        }
      },
      features: {
        enableComponentSrcDataKey: true,
      },
      config: {
        defaultFinality: undefined,
      },
    };

    if (rpc) {
      config.config.nodeUrl = rpc;
    }

    initNear && initNear(config);
  }, [initNear]);

  const router = createBrowserRouter([
    {
      path: "/*",
      element: (
        <Viewer widgetSrc={src} code={code} initialProps={initialProps} />
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
