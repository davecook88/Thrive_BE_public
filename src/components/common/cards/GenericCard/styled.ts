import tw from "tailwind-styled-components";
import { StyledGenericCardProps } from "./types";

export const GenericCardHolder = tw.div<StyledGenericCardProps>`
    card
    rounded-sm
    bg-base-100
    shadow
    m-4
    ${(p: StyledGenericCardProps) => p.$className}
`;
