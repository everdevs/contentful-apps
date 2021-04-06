import { KnownSDK } from "@contentful/app-sdk";
import React from "react";

// Add contentfulExtension to window
declare global {
	interface Window {
		contentfulExtension: {
			init: <T extends KnownSDK = KnownSDK>(
				initCallback: (sdk: T) => any,
				options?: {
					supressIframeWarning?: boolean;
				}
			) => void;
		};
	}
}

const useSDK = () => {
	const [knownSDK, setKnownSDK] = React.useState<null | KnownSDK>(null);
	React.useEffect(() => {
		window.contentfulExtension.init(sdk => {
			setKnownSDK(sdk);
		});
	}, []);
	return knownSDK;
};

export default useSDK;
