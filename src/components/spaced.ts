import F36Tokens from "@contentful/forma-36-tokens";
import styled from "@emotion/styled";

/**
 * Adds extra spacing to ensure focus rings and similar iframe related rendering issues
 *
 */
const Spaced = styled.div`
	margin: ${F36Tokens.spacingXs} 3px;
`;

export default Spaced;
