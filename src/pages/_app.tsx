import globalStyles from "@/styles/global";
import "@contentful/forma-36-react-components/dist/styles.css";
import { cache } from "@/utils/emotion-cache";
import { theme } from "@/utils/theme";
import { CacheProvider, Global, ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import Head from "next/head";
import React from "react";

export interface AppProps {
	Component: React.ComponentType<unknown>;
	pageProps: Record<string, unknown>;
}

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<CacheProvider value={cache}>
			<Global styles={globalStyles} />
			<Head>
				<title>Evernest Contentful Extensions</title>
				<script src="https://unpkg.com/@contentful/app-sdk@3.32.2" />
			</Head>
			<EmotionThemeProvider theme={theme}>
				<Component {...pageProps} />
			</EmotionThemeProvider>
		</CacheProvider>
	);
};

export default App;
