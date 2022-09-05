import React from "react";
import Image from "next/image";
import tw from "tailwind-styled-components";

const HeroContainer = tw.div`
    flex
    flex-col
    items-center
    md:flex-row
    md:justify-around
    p-5
`;

const ImageContainer = tw.div`
    relative
    h-80
    w-80
    -mt-10
    -mb-16
    md:my-0
`;

const HeroTextContainer = tw.div`
    flex
    justify-center
    align-middle
`;

const HeroText = tw.div`
    self-center
    text-center
    md:text-left
`;

const HeroTitle = tw.h1`
    whitespace-nowrap
    text-3xl
    md:text-3xl
`;

const HeroTitleUpper = tw(HeroTitle)`
    text-2xl
    md:text-3xl
    mb-2
`;
const HeroTitleLower = tw(HeroTitle)`
    text-primary
    font-extrabold
`;

const SubtitleContainer = tw.div`
    my-5
    text-xl
    md:w-4/6
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
