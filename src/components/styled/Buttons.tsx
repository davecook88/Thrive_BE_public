import tw from "tailwind-styled-components";

interface ButtonProps {
  $color?: string;
}

export const StandardButton = tw.button<ButtonProps>`
    btn
    ${(props: ButtonProps) => props.$color}
`;
