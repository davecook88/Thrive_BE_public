import tw from "tailwind-styled-components";

export const HeroImageContainer = tw.div`
relative
float-right
my-4
h-24
w-24
w-full
md:h-[30em]
md:w-[30em]
md:mr-[-30px]
md:mt-[-60px]
`;

export const HeroCourseDetailsBox = tw.div`
h-max
md:w-4/6
rounded-3xl
border
border-black
md:p-8
p-2
text-center
`;

export const HeroCourseTitleOuter = tw.div`
relative
md:pt-12
`;

export const HeroCourseTitleInner = tw.div`
w-max
my-2
m-auto
md:float-right
md:ml-12
md:mr-[-3em]
md:w-4/6
rounded-[50px]
bg-info
p-4
px-12
`;

export const HeroCourseTitleNameH1 = tw.h1`
text-xl
md:text-2xl
font-bold
text-base-100
`;

export const HeroCourseTitleSeparationLine = tw.hr`
my-2
w-3/6
border
bg-white
`;

export const HeroCourseTitleSubtitleH2 = tw.h2`
text-xl
text-base-100
`;

export const HeroCourseIncludesTable = tw.table`
font-lg
m-auto
text-left
`;
