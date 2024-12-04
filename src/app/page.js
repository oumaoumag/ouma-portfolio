import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import EmailSection from "./components/EmailSection";
import Footer from "./components/Footer";
import Events from "./components/Events";
import SkillBadge from "./components/SkillBadge";

export default function Home() {
  const skills = [
    { name: "Go", level: "Advanced" },
    { name: "JavaScript", level: "Advanced" },
    { name: "React", level: "Advanced" },
    // { name: "Python", level: "Intermediate" },
    { name: "Docker", level: "Intermediate" },
    // { name: "TypeScript", level: "Intermediate" },
    { name: "HTML5", level: "Expert" },
    { name: "CSS", level: "Expert" }
  ];

  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <Navbar />
      <div className="container mt-24 mx-auto px-12 py-4">
        <HeroSection />
        <AboutSection />
        
        <section className="my-12">
          <h2 className="text-center text-4xl font-bold text-white mb-8">
            My Skills
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill, index) => (
              <SkillBadge 
                key={index} 
                name={skill.name} 
                level={skill.level} 
              />
            ))}
          </div>
        </section>
        
        <ProjectsSection />
        <Events />
        <EmailSection />
      </div>
      <Footer />
    </main>
  );
}