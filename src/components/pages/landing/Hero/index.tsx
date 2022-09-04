import React from "react";
import Image from "next/image";
import tw from "tailwind-styled-components";

const HeroContainer = tw.div`
    flex
    md:justify-around
    p-5
`;

const ImageContainer = tw.div`
    relative
    h-96
    w-96
    
`;

const HeroTextContainer = tw.div`
    flex
    align-middle
`;

const HeroText = tw.div`
    self-center
`;

const HeroTitle = tw.h1`
whitespace-nowrap
text-2xl
md:text-3xl
`;

const HeroTitleUpper = tw(HeroTitle)`
text-xl
md:text-3xl
`;
const HeroTitleLower = tw(HeroTitle)`
    text-primary
    font-extrabold
`;

const SubtitleContainer = tw.div`
    my-6
    w-4/6

`;
const HeroSection = () => {
  return (
    <section className="mt-20 min-h-max relative md:px-10">
      <HeroContainer>
        <HeroTextContainer>
          <HeroText>
            <HeroTitleUpper>Don't just survive in Spanish</HeroTitleUpper>
            <HeroTitleLower>Thrive in Spanish</HeroTitleLower>
            <SubtitleContainer>
              <h2>
                Online Spanish courses to get students speaking Spanish from the
                first class.
              </h2>
            </SubtitleContainer>
          </HeroText>
        </HeroTextContainer>
        <ImageContainer>
          <Image src="/hero.png" layout="fill" objectFit="contain" />
        </ImageContainer>
      </HeroContainer>
    </section>
  );
};

export default HeroSection;
