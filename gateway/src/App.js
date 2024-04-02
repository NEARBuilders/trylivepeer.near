import "App.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { Widget } from "near-social-vm";
import React, { useEffect, useMemo, useState } from "react";
import "react-bootstrap-typeahead/css/Typeahead.bs5.css";
import "react-bootstrap-typeahead/css/Typeahead.css";

import { sanitizeUrl } from "@braintree/sanitize-url";
import { useAccount, useInitNear } from "near-social-vm";
import {
	Link,
	Route,
	BrowserRouter as Router,
	useLocation,
} from "react-router-dom";
import { VideoPlayer } from "./components/Player";
import { BroadcastComponent } from "./components/Broadcast";

const SESSION_STORAGE_REDIRECT_MAP_KEY = "nearSocialVMredirectMap";

function Viewer({ widgetSrc, code }) {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);

	const defaultRoute = {
		path: "trylivepeer.near/widget/index",
		blockHeight: "final",
	};

	// create props from params
	const passProps = useMemo(() => {
		return Array.from(searchParams.entries()).reduce((props, [key, value]) => {
			props[key] = value;
			return props;
		}, {});
	}, [location]);

	const path = location.pathname.substring(1);

	const src = useMemo(() => {
		const defaultSrc = defaultRoute.path; // default widget to load
		const pathSrc = widgetSrc || (path !== "" && path) || defaultSrc; // if no path, load default widget
		return pathSrc;
	}, [widgetSrc]);

	const [redirectMap, setRedirectMap] = useState(null);

	useEffect(() => {
		const fetchRedirectMap = async () => {
			try {
				const localStorageFlags = JSON.parse(
					localStorage.getItem("flags") || "{}",
				);
				let redirectMapData;

				if (localStorageFlags.bosLoaderUrl) {
					const response = await fetch(localStorageFlags.bosLoaderUrl);
					const data = await response.json();
					redirectMapData = data.components;
				} else {
					redirectMapData = JSON.parse(
						sessionStorage.getItem(SESSION_STORAGE_REDIRECT_MAP_KEY) || "{}",
					);
				}
				setRedirectMap(redirectMapData);
			} catch (error) {
				console.error("Error fetching redirect map:", error);
			}
		};
		fetchRedirectMap();
	}, []);

	return (
		<Widget
			src={!code && src}
			code={code} // prioritize code
			props={{ ...defaultRoute.init, ...passProps }}
			config={{ redirectMap }}
		/>
	);
}

function App(props) {
	const { initNear } = useInitNear();

	useAccount();
	useEffect(() => {
		initNear &&
			initNear({
				networkId: "mainnet",
				selector: props.selectorPromise,
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
					Broadcast: (props) => {
						return <BroadcastComponent {...props} />;
					},
				},
				config: {
					defaultFinality: undefined,
				},
			});
	}, [initNear]);

	return (
		<Router>
			<Route>
				<Viewer widgetSrc={props.widgetSrc} code={props.code}></Viewer>
			</Route>
		</Router>
	);
}

export default App;
