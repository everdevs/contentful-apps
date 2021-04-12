import { SectionHeading } from "@contentful/forma-36-react-components";
import styled from "@emotion/styled";
import { stringify as queryStringify } from "query-string";
import React from "react";

export const Image = styled.img`
	width: 100%;
	height: auto;
`;

export const AspectRatio: React.FC<{
	focus: string;
	fit: string;
	aspectRatio: string;
	src: string;
}> = ({ focus, fit, aspectRatio, src }) => {
	const [width, height] = aspectRatio.split(":").map(value => Number.parseInt(value, 10));
	const w = 400;
	const h = Math.round(w / (width / height));

	return (
		<div style={{ height: h }}>
			<SectionHeading>{aspectRatio}</SectionHeading>
			<Image
				title={aspectRatio}
				alt={aspectRatio}
				src={`${src}?${queryStringify({
					h,
					w,
					f: focus || undefined,
					fit,
				})}`}
			/>
		</div>
	);
};
