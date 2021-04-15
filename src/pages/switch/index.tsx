import Spaced from "@/components/spaced";
import withSDK from "@/utils/with-sdk";
import { FieldExtensionSDK } from "@contentful/app-sdk";
import { Switch } from "@contentful/forma-36-react-components";
import { NextPage } from "next";
import React from "react";

// Ensure the correct sdk type definition
export interface AppProps {
	sdk: FieldExtensionSDK;
}

const SwitchApp: NextPage<AppProps> = ({ sdk }) => {
	// Store the field values locally
	const [fieldValue, setFieldValue] = React.useState(sdk.field.getValue());

	React.useEffect(() => {
		const subscribe = () => {
			// Handler(s) for external field value changes.
			// (e.g. when multiple authors are working on the same entry)
			// If you are changing multiple/sibling fields you should add handlers for them here.
			const detachExternalChange = sdk.field.onValueChanged(value => {
				setFieldValue(value);
			});

			// Return unsubscribe
			return () => {
				// Detach external changes
				// If you are changing multiple/sibling fields you should detach them here.
				detachExternalChange();
			};
		};

		// Subscribe and return the unsubscribe handler(s)
		return subscribe();
	}, [sdk]);

	// Return your app here.
	// We wrap the app in a Wrapper with spacing to ensure that focus rings are visible.
	// Feel free to remove the Wrapper (<Spaced/>) if you want to handle this on your own.
	return (
		<Spaced>
			<Switch
				id="switch:yes"
				labelText="Yes"
				isChecked={fieldValue}
				onToggle={bool => {
					// Save the local state of the field value
					setFieldValue(bool);
					// Save the state of the field value on contentful
					// This will update the local (unpublished) change on contenful
					void sdk.field.setValue(bool);
				}}
			/>
		</Spaced>
	);
};

// Decorate the app with the contenful sdk and define the type of sdk here.
export default withSDK<FieldExtensionSDK>(SwitchApp);
