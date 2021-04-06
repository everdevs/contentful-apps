import globalStyles from "@/styles/global";
import "@contentful/forma-36-react-components/dist/styles.css";
import { Global } from "@emotion/react";
import Head from "next/head";
import React from "react";

export interface AppProps {
	Component: React.ComponentType<unknown>;
	pageProps: Record<string, unknown>;
}
const App: React.FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<>
			<Global styles={globalStyles} />
			<Head>
				<title>Evernest Contentful Extensions</title>
				<script src="https://unpkg.com/@contentful/app-sdk@3.32.2" />
			</Head>
			<Component {...pageProps} />
		</>
	);
};

export default App;
