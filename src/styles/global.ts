import { css } from "@emotion/react";
import F36Tokens from "@contentful/forma-36-tokens";

const globalStyles = css`
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}
	html {
		font-family: ${F36Tokens.fontStackPrimary};
	}
	body,
	div {
		margin: 0;
		padding: 0;
		border: 0;
		font: inherit;
		font-size: 100%;
		vertical-align: baseline;
	}
`;

export default globalStyles;
