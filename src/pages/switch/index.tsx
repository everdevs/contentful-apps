import Spaced from "@/components/spaced";
import { useAutoResizer } from "@/hooks/use-auto-resizer";
import { useExternalChange } from "@/hooks/use-external-change";
import withSDK from "@/utils/with-sdk";
import { FieldExtensionSDK } from "@contentful/app-sdk";
import { Switch } from "@contentful/forma-36-react-components";
import React from "react";

export interface AppProps {
	sdk: FieldExtensionSDK;
}

const SwitchApp: React.FC<AppProps> = ({ sdk }) => {
	const [fieldValue, setFieldValue] = React.useState(sdk.field.getValue());
	useExternalChange(sdk, setFieldValue);
	useAutoResizer(sdk);

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
