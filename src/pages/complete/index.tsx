import { AspectRatio } from "@/components/aspect-ratio";
import { ASPECT_RATIOS } from "@/constants";
import { AppProps } from "@/types/app";
import { AssetEntry } from "@/types/image";
import withSDK from "@/utils/with-sdk";
import { FieldExtensionSDK } from "@contentful/app-sdk";
import { FieldGroup, Grid, Note, Option, SelectField } from "@contentful/forma-36-react-components";
import React from "react";

const ImageApp: React.FC<AppProps> = ({ sdk }) => {
	const [focus, setFocus] = React.useState<string>(sdk.entry.fields.focus.getValue() ?? "");
	const [fit, setFit] = React.useState<string>(sdk.entry.fields.fit.getValue() ?? "");
	const [imageSrc, setImgSrc] = React.useState("");

	const saveFocus = React.useCallback(
		({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) => {
			void sdk.entry.fields.focus.setValue(value);
			setFocus(value);
		},
		[sdk]
	);

	const saveFit = React.useCallback(
		({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) => {
			void sdk.entry.fields.fit.setValue(value);
			setFit(value);
		},
		[sdk]
	);

	React.useEffect(() => {
		const subscribe = () => {
			// Enable auto-resizer
			sdk.window.startAutoResizer();

			// Handlers for external field value changes (e.g. when multiple authors are working on the same entry).
			const detachExternalFit = sdk.entry.fields.fit.onValueChanged(value => {
				setFit(value);
			});
			const detachExternalFocus = sdk.entry.fields.focus.onValueChanged(value => {
				setFocus(value);
			});
			const detachImageChangeHandler = sdk.entry.fields.image.onValueChanged(value => {
				if (value) {
					void sdk.space.getAsset<AssetEntry>(value.sys.id).then(asset => {
						setImgSrc(asset.fields.file.en.url);
					});
				} else {
					setImgSrc("");
				}
			});

			// Return unsubscribe
			return () => {
				// Disable auto-resizer
				sdk.window.stopAutoResizer();

				// Detach external changes
				detachExternalFit();
				detachExternalFocus();
				detachImageChangeHandler();
			};
		};

		// Subscribe and return the unsubscribe handler
		return subscribe();
	}, [sdk]);

	React.useEffect(() => {
		const entryLink = sdk.entry.fields.image.getValue();
		if (entryLink) {
			void sdk.space.getAsset<AssetEntry>(entryLink.sys.id).then(asset => {
				setImgSrc(asset.fields.file.en.url);
			});
		}
	}, [sdk]);

	return (
		<div>
			{imageSrc ? (
				<>
					<FieldGroup>
						<Grid columns={2} rows={1} columnGap="spacingXs" rowGap="spacingXs">
							<SelectField
								id="focus"
								name="focus"
								labelText="Focus"
								value={focus}
								onChange={saveFocus}
							>
								<Option value="">None</Option>
								<Option value="face">Face</Option>
								<Option value="center">Center</Option>
								<Option value="top">Top</Option>
								<Option value="top_right">Top Right</Option>
								<Option value="right">Right</Option>
								<Option value="bottom_right">Bottom Right</Option>
								<Option value="bottom">Bottom</Option>
								<Option value="bottom_left">Bottom Left</Option>
								<Option value="left">Left</Option>
								<Option value="top_left">Top Left</Option>
							</SelectField>
							<SelectField
								id="fit"
								name="fit"
								labelText="Fit"
								required={focus !== ""}
								value={fit}
								onChange={saveFit}
							>
								<Option value="">None</Option>
								<Option value="fill">Fill</Option>
								<Option value="crop">Crop</Option>
								<Option value="thumb">Thumb</Option>
							</SelectField>
						</Grid>
					</FieldGroup>
					{Boolean(focus) && !fit ? (
						<Note noteType="warning">Please select a fit value</Note>
					) : (
						<Grid
							columns={ASPECT_RATIOS.length}
							columnGap="spacingXs"
							rowGap="spacingXs"
						>
							{ASPECT_RATIOS.map(aspectRatio => {
								return (
									<AspectRatio
										key={aspectRatio}
										focus={focus}
										fit={fit}
										aspectRatio={aspectRatio}
										src={imageSrc}
									/>
								);
							})}
						</Grid>
					)}
				</>
			) : (
				<Note noteType="warning">Please select a file first</Note>
			)}
		</div>
	);
};

export default withSDK<FieldExtensionSDK>(ImageApp);
