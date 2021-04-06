import { KnownSDK } from "@contentful/app-sdk";
import { Spinner } from "@contentful/forma-36-react-components";
import useSDK from "@/hooks/use-sdk";
import React from "react";

export interface WithSDKProps<S extends KnownSDK> {
	sdk: S;
}

const withSDK = <S extends KnownSDK, T = Record<string, unknown>>(
	Component: React.ComponentType<WithSDKProps<S> & T>
) => {
	return (props: T) => {
		const sdk = useSDK();
		return sdk ? <Component {...props} sdk={sdk as S} /> : <Spinner size="large" />;
	};
};

export default withSDK;
