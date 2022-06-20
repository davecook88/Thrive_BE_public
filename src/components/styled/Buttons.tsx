import tw from "tailwind-styled-components";

interface ButtonProps {}

export const StandardButton = tw.button<ButtonProps>`
    bg-blue-500
    hover:bg-blue-700
    text-white
    font-bold
    py-2
    px-4
    rounded
`;
