import tw from "tailwind-styled-components";

export const StandardForm = tw.form`
    rounded
    p-5
    pb-1
    w-full
    text-center`;

export const StandardFormBody = tw.div`
    grid
    grid-cols-1

    gap-3
    md:grid-cols-3
`;

export const FormSection = tw.div`
    shadow
    border
    border-secondary
    p-4
    bg-base-100
    rounded-lg
`;
