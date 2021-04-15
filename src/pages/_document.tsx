import { cache } from "@/utils/emotion-cache";
import createEmotionServer from "@emotion/server/create-instance";
import NextDocument, {
	DocumentContext,
	DocumentInitialProps,
	Head,
	Html,
	Main,
	NextScript,
} from "next/document";
import React from "react";

const { extractCritical } = createEmotionServer(cache);

class Document extends NextDocument<any> {
	static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
		// Resolution order
		//
		// On the server:
		// 1. app.getInitialProps
		// 2. page.getInitialProps
		// 3. document.getInitialProps
		// 4. app.render
		// 5. page.render
		// 6. document.render
		//
		// On the server with error:
		// 1. document.getInitialProps
		// 2. app.render
		// 3. page.render
		// 4. document.render
		//
		// On the client
		// 1. app.getInitialProps
		// 2. page.getInitialProps
		// 3. app.render
		// 4. page.render

		try {
			const initialProps = await NextDocument.getInitialProps(ctx);
			const styles = extractCritical(initialProps.html);
			return {
				...initialProps,
				styles: [
					...React.Children.toArray(initialProps.styles),
					<style
						key="emotion"
						// eslint-disable-next-line react/no-danger
						dangerouslySetInnerHTML={{ __html: styles.css }}
						data-emotion-css={styles.ids.join(" ")}
					/>,
				],
			};
		} catch (error: unknown) {
			throw error;
		}
	}

	render() {
		return (
			<Html lang="de">
				<Head />
				<body>
					<script src="/noflash.js" />
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default Document;
