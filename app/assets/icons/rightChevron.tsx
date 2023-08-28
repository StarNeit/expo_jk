import React, { FC } from "react";

import { SvgIcon, SvgIconProps } from "./svgIcon";

const RightChevron = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.2273 10.9242C18.8131 11.5192 18.8131 12.4856 18.2273 13.0806L9.22906 22.2204C8.64324 22.8154 7.69186 22.8154 7.10604 22.2204C6.52022 21.6254 6.52022 20.659 7.10604 20.064L15.0451 12L7.11073 3.93604C6.5249 3.34101 6.5249 2.37466 7.11073 1.77962C7.69655 1.18458 8.64793 1.18458 9.23375 1.77962L18.232 10.9194L18.2273 10.9242Z" fill="white"/>
</svg>
`;

export const RightChevronSvg: FC<SvgIconProps> = (props) => (
  <SvgIcon width="24" height="24" xml={RightChevron} {...props} />
);
