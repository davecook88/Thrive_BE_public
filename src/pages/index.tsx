import Head from "next/head";
import Image from "next/image";
import GoogleLoginButton from "../components/auth/google/LoginButton";
import CoursesSection from "../components/pages/landing/CoursesSection";
import { DescriptionSection } from "../components/pages/landing/DescriptionSection";
import HeroSection from "../components/pages/landing/Hero";
import ReviewSection from "../components/pages/landing/ReviewSection";
// import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className="bg-skin-fill mb-10">
      <HeroSection />
      <ReviewSection />
      <DescriptionSection />
      <CoursesSection />
    </div>
  );
}
