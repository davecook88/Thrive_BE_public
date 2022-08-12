import Head from "next/head";
import Image from "next/image";
import GoogleLoginButton from "../components/auth/google/LoginButton";
import CoursesSection from "../components/pages/landing/CoursesSection";
import { DescriptionSection } from "../components/pages/landing/DescriptionSection";
import ReviewSection from "../components/pages/landing/ReviewSection";
// import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className="bg-skin-fill mb-10">
      <section className="bg-gray-50 dark:bg-gray-900 mt-20 min-h-max ">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <div className="relative rounded-full  bg-secondary w-80 h-80 relative">
            <h2 className="text-5xl  tracking-tight text-gray-900  absolute w-[200%] top-1/3 left-6">
              <span className="block dark:text-skin-white">
                Don't just <span className="font-bold">survive</span> in Spanish
              </span>
              <span className="block text-skin-base font-extrabold text-base-100">
                Thrive{" "}
                <span className="text-neutral font-bold ">in Spanish</span>
              </span>
            </h2>
          </div>

          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0"></div>
        </div>
      </section>
      <ReviewSection />
      <DescriptionSection />
      <CoursesSection />
    </div>
  );
}
