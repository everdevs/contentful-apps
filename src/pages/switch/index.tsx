import Spaced from "@/components/spaced";
import { AppProps } from "@/types/app";
import withSDK from "@/utils/with-sdk";
import { FieldExtensionSDK } from "@contentful/app-sdk";
import { Switch } from "@contentful/forma-36-react-components";
import React from "react";

const SwitchApp: React.FC<AppProps> = ({ sdk }) => {
	const [fieldValue, setFieldValue] = React.useState(sdk.field.getValue());

	React.useEffect(() => {
		const subscribe = () => {
			// Enable auto-resizer
			sdk.window.startAutoResizer();

			// Handler for external field value changes (e.g. when multiple authors are working on the same entry).
			const detachExternalFit = sdk.field.onValueChanged(value => {
				setFieldValue(value);
			});

			// Return unsubscribe
			return () => {
				// Disable auto-resizer
				sdk.window.stopAutoResizer();

				// Detach external changes
				detachExternalFit();
			};
		};

		// Subscribe and return the unsubscribe handler
		return subscribe();
	}, [sdk]);

	return (
		<Spaced>
			<Switch
				id="switch:yes"
				labelText="Yes"
				isChecked={fieldValue}
				onToggle={bool => {
					setFieldValue(bool);
					void sdk.field.setValue(bool);
				}}
			/>
		</Spaced>
	);
};

export default withSDK<FieldExtensionSDK>(SwitchApp);
