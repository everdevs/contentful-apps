import React from "react";
import { FieldExtensionSDK } from "@contentful/app-sdk";

export const useExternalChange = (sdk: FieldExtensionSDK, setFieldValue: React.Dispatch<any>) => {
	React.useEffect(() => {
		const subscribe = () => {
			// Handler for external field value changes (e.g. when multiple authors are working on the same entry).
			const detachExternalFit = sdk.field.onValueChanged(value => {
				setFieldValue(value);
			});

			// Return unsubscribe
			return () => {
				// Detach external changes
				detachExternalFit();
			};
		};

		// Subscribe and return the unsubscribe handler
		return subscribe();
	}, [sdk]);
};
