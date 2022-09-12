import tw from "tailwind-styled-components";

interface ButtonProps {
  $color?: string;
}

export const StandardButton = tw.button<ButtonProps>`
    btn
    bg-info
    border-info
    text-base-100
    hover:bg-primary
    hover:border-primary
    ${(props: ButtonProps) => props.$color}
`;
