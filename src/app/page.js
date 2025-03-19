import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import EmailSection from "./components/EmailSection";
import Footer from "./components/Footer";
import Events from "./components/Events";
import SkillsSection from "./components/SkillsSection";
import BlogsSection from "./components/BlogsSection";

// Reusable divider components to reduce redundancy
const GradientDivider = ({ color = "from-primary-300 via-primary-500 to-secondary-500" }) => (
  <div className="w-full my-2 flex justify-center">
    <div className={`w-1/3 h-0.5 bg-gradient-to-r ${color} rounded-full`}></div>
  </div>
);

const ElementDivider = ({ elements = ["earth", "water", "fire", "air"] }) => (
  <div className="w-full my-2 flex justify-center">
    <div className="flex w-1/2 h-0.5 rounded-full overflow-hidden">
      {elements.map((element, index) => (
        <div key={index} className={`w-1/4 h-full bg-${element}`}></div>
      ))}
    </div>
  </div>
);

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col">
      {/* Modern background with gradient and mesh */}
      <div className="fixed inset-0 -z-10 bg-[#030014] bg-gradient-to-b from-[#030014] via-[#05001E] to-[#0B0029]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#1C0056,transparent)]"></div>
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_20%,#0A4C82,transparent)]"></div>
        <div className="absolute bottom-40 right-0 bg-[radial-gradient(circle_600px_at_0%_100%,#1E075F,transparent)]"></div>
      </div>
      
      <Navbar />
      
      {/* Hero Section - Only component that keeps full height */}
      <div className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 lg:px-8">
          <HeroSection />
        </div>
      </div>
      
      {/* About Section with Stats */}
      <div className="container mx-auto px-4 lg:px-8 py-4">
        <AboutSection />
      </div>
      
      <ElementDivider elements={["earth", "water", "fire", "air"]} />
      
      {/* Skills Section with Progress Bars */}
      <div className="container mx-auto px-4 lg:px-8">
        <SkillsSection />
      </div>
      
      <GradientDivider />
      
      {/* Events/Experience Section */}
      <div className="container mx-auto px-4 lg:px-8 py-4">
        <Events />
      </div>
      
      <ElementDivider elements={["air", "fire", "water", "earth"]} />
      
      {/* Featured Projects Section */}
      <div className="container mx-auto px-4 lg:px-8 py-4">
        <ProjectsSection />
      </div>
      
      <GradientDivider color="from-secondary-500 via-primary-500 to-secondary-500" />
      
      {/* Blog Section */}
      <div className="container mx-auto px-4 lg:px-8 py-4">
        <BlogsSection />
      </div>
      
      <ElementDivider elements={["fire", "earth", "air", "water"]} />
      
      {/* Contact Section */}
      <div className="container mx-auto px-4 lg:px-8 py-4">
        <EmailSection />
      </div>
      
      <Footer />
    </main>
  );
}