import { createBrowserRouter, Outlet } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import AppRoutes from "./appRouter";
import ScrollToTop from "../components/utils/ScrollToTop";
import { ScrollToTopButton } from "../components/common/ScrollToTopButton";
import PageLoader from "../components/common/PageLoader";
import CookieConsent from "../components/common/CookieConsent";
import { Chatbot } from "../components/common/Chatbot";

// Lazy loaded components
const Landing = lazy(() => import("../features/landing/pages/LandingPage"));
const AboutPage = lazy(() => import("../features/company/pages/AboutPage"));
const CareersPage = lazy(() => import("../features/company/pages/CareersPage"));
const InsightsPage = lazy(() => import("../features/company/pages/InsightsPage"));
const ContactPage = lazy(() => import("../features/company/pages/ContactPage"));
const CategoryReviewPage = lazy(() => import("../features/categories/pages/CategoryReviewPage"));
const BusinessPage = lazy(() => import("../features/business/pages/BusinessPage"));
const HowItWorksPage = lazy(() => import("../features/how-it-works/pages/HowItWorksPage"));
const TermsPage = lazy(() => import("../features/legal/pages/TermsPage"));
const PrivacyPage = lazy(() => import("../features/legal/pages/PrivacyPage"));
const CookiePage = lazy(() => import("../features/legal/pages/CookiePage"));
const GuidelinesPage = lazy(() => import("../features/legal/pages/GuidelinesPage"));
const TrendingNowPage = lazy(() => import("../features/quick-links/pages/TrendingNowPage"));
const NewestReviewsPage = lazy(() => import("../features/quick-links/pages/NewestReviewsPage"));
const HelpCenterPage = lazy(() => import("../features/quick-links/pages/HelpCenterPage"));
const SocietyBlogPage = lazy(() => import("../features/quick-links/pages/SocietyBlogPage"));
const NotFoundPage = lazy(() => import("../components/common/NotFoundPage"));

const RootLayout = () => (
    <>
        <Suspense fallback={<PageLoader />}>
            <Outlet />
        </Suspense>
        <ScrollToTop />
        <ScrollToTopButton />
        <Chatbot />
        <CookieConsent />
    </>
);

const createFullRouter = createBrowserRouter([
    {
        element: <RootLayout />,
        errorElement: import.meta.env.PROD ? <NotFoundPage /> : undefined,
        children: [
            {
                path: AppRoutes.MainPage,
                element: <Landing />
            },
            {
                path: AppRoutes.About,
                element: <AboutPage />
            },
            {
                path: AppRoutes.Careers,
                element: <CareersPage />
            },
            {
                path: AppRoutes.Insights,
                element: <InsightsPage />
            },
            {
                path: AppRoutes.Contact,
                element: <ContactPage />
            },
            {
                path: AppRoutes.CategoryReviews,
                element: <CategoryReviewPage />
            },
            {
                path: AppRoutes.Business,
                element: <BusinessPage />
            },
            {
                path: AppRoutes.HowItWorks,
                element: <HowItWorksPage />
            },
            {
                path: AppRoutes.Terms,
                element: <TermsPage />
            },
            {
                path: AppRoutes.Privacy,
                element: <PrivacyPage />
            },
            {
                path: AppRoutes.Cookies,
                element: <CookiePage />
            },
            {
                path: AppRoutes.Guidelines,
                element: <GuidelinesPage />
            },
            {
                path: AppRoutes.TrendingNow,
                element: <TrendingNowPage />
            },
            {
                path: AppRoutes.NewestReviews,
                element: <NewestReviewsPage />
            },
            {
                path: AppRoutes.HelpCenter,
                element: <HelpCenterPage />
            },
            {
                path: AppRoutes.SocietyBlog,
                element: <SocietyBlogPage />
            },
            {
                path: AppRoutes.NotFound,
                element: <NotFoundPage />
            },
        ]
    }
]);

export default createFullRouter