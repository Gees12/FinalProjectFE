
// import Navbar from "./Components/Navbar";
// import HeroSection from "./components/HeroSection";
import FeatureSection from "./Components/FeatureSection/index";
import Workflow from "./Components/Workflow/index.jsx";
// import Footer from "./components/Footer";
// import Pricing from "./components/Pricing";
// import Testimonials from "./components/Testimonials";

const App = () => {
  return (
    <>
      {/* <Navbar /> */}
      <div className="max-w-7xl mx-auto pt-20 px-6">
        {/* <HeroSection /> */}
        <FeatureSection />
        <Workflow />
        {/* <Pricing /> */}
        {/* <Testimonials /> */}
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default App;
