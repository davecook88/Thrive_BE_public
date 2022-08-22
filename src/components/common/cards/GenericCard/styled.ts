import tw from "tailwind-styled-components";
import { StyledGenericCardProps } from "./types";

export const GenericCardHolder = tw.div<StyledGenericCardProps>`
    card w-96
    bg-base-100
    shadow-xl
    m-4
    ${(p: StyledGenericCardProps) => p.$className}
`;
