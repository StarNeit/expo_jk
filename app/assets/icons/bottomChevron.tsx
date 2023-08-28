import React, { FC } from "react";

import { SvgIcon, SvgIconProps } from "./svgIcon";

const BottomChevron = `<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.59656 6.1178C3.8197 6.34094 4.18208 6.34094 4.40522 6.1178L7.83264 2.69038C8.05579 2.46724 8.05579 2.10486 7.83264 1.88172C7.60951 1.65858 7.24713 1.65858 7.02399 1.88172L4 4.90571L0.976012 1.88351C0.752873 1.66037 0.390494 1.66037 0.167355 1.88351C-0.0557849 2.10665 -0.0557849 2.46902 0.167355 2.69216L3.59478 6.11959L3.59656 6.1178Z" fill="#545454"/>
</svg>
`;

export const BottomChevronSvg: FC<SvgIconProps> = (props) => (
  <SvgIcon width="8" height="8" xml={BottomChevron} {...props} />
);
