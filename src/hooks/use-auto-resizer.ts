import React from "react";
import { FieldExtensionSDK } from "@contentful/app-sdk";

export const useAutoResizer = (sdk: FieldExtensionSDK) => {
	React.useEffect(() => {
		const subscribe = () => {
			// Enable auto-resizer
			sdk.window.startAutoResizer();

			// Return unsubscribe
			return () => {
				// Disable auto-resizer
				sdk.window.stopAutoResizer();
			};
		};

		// Subscribe and return the unsubscribe handler
		return subscribe();
	}, [sdk]);
};
