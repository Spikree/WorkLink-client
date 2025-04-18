import {
  FaBriefcase,
  FaComments,
  FaHandshake,
  FaUserTie,
  FaStar,
  FaShieldAlt,
  FaChartLine,
} from "react-icons/fa";
import {
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Users,
  BriefcaseBusiness,
  LucideBadgeCheck,
  BrainCircuit,
} from "lucide-react";
import Button from "../components/common/Button";
import { FaArrowRight } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [isHovered, setIsHovered] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const features = [
    {
      icon: <FaBriefcase size={24} />,
      title: "Post Projects",
      description: "Easily post your projects and find the perfect freelancer",
    },
    {
      icon: <FaUserTie size={24} />,
      title: "Expert Freelancers",
      description: "Access a global network of skilled professionals",
    },
    {
      icon: <FaComments size={24} />,
      title: "Secure Messaging",
      description: "Communicate seamlessly with integrated messaging",
    },
    {
      icon: <FaStar size={24} />,
      title: "Rating System",
      description: "Make informed decisions with our trusted review system",
    },
    {
      icon: <FaShieldAlt size={24} />,
      title: "Secure Payments",
      description: "Protected payments and dispute resolution",
    },
    {
      icon: <FaChartLine size={24} />,
      title: "Track Progress",
      description: "Monitor your projects with real-time updates",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <div className="flex items-center justify-center mb-8">
          <FaHandshake className="text-5xl text-primary mr-4" />
          <h1 className="text-4xl font-bold ">WorkLink</h1>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl sm:text-6xl font-bold">
            Where <span className="text-secondary">Talent</span> Meets{" "}
            <span className="text-secondary">Opportunity</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-sm sm:max-w-3xl mx-auto">
            Connect with top freelancers, manage projects, and grow your
            business with our secure and efficient platform. Get Started
          </p>
          <Link to="/auth">
            <Button
              disableStyles={false}
              className="flex items-center gap-2 p-3"
            >
              Get Started now <FaArrowRight />
            </Button>
          </Link>
        </div>
      </div>

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-16 text-center bg-danger">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="bg-brand-blue/10 p-3 rounded-full mb-3">
              <Users className="h-7 w-7 text-brand-blue" />
            </div>
            <p className="text-lg font-medium">10k+ Freelancers</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="bg-brand-blue/10 p-3 rounded-full mb-3">
              <BriefcaseBusiness className="h-7 w-7 text-brand-blue" />
            </div>
            <p className="text-lg font-medium">5k+ Employers</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="bg-brand-teal/10 p-3 rounded-full mb-3">
              <LucideBadgeCheck className="h-7 w-7 text-brand-teal" />
            </div>
            <p className="text-lg font-medium">30k+ Projects</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="bg-brand-teal/10 p-3 rounded-full mb-3">
              <BrainCircuit className="h-7 w-7 text-brand-teal" />
            </div>
            <p className="text-lg font-medium">100+ Skills</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <div>
          <h1 className="text-4xl font-bold mb-4 text-primary">
            Everything you need to Succeed
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            WorkLink provides all the tools and features you need to find work,
            manage projects, and grow your business
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                onHoverStart={() => setIsHovered(index)}
                onHoverEnd={() => setIsHovered(null)}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <motion.div
                  animate={{
                    scale: isHovered === index ? 1.1 : 1,
                    color: isHovered === index ? "#6366f1" : "#4b5563",
                  }}
                  className="mb-4"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <footer className="w-full bg-[#1d1e27] text-white">
        {/* Top section with language selector */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-700 pb-8">
            <Button
              disableStyles={true}
              className="flex items-center space-x-2 text-sm text-white bg-transparent border border-white rounded px-4 py-2 hover:bg-gray-700 transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span>English</span>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-12">
            <div>
              <h3 className="text-sm font-bold mb-4">Learn & Grow</h3>
              <ul className="space-y-3 text-[14px] text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    Get the app
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    About us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Affiliate
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold mb-4">Connect & Learn</h3>
              <ul className="space-y-3 text-[14px] text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    Teach on SkillMatch
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Free Resources
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Become an Instructor
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Course Creation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-4">Support</h3>
              <ul className="space-y-3 text-[14px] text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Cookie Settings
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Accessibility
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-8">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="text-2xl font-bold mr-2">SkillMatch</span>
              <span className="text-sm text-gray-300">
                © {new Date().getFullYear()}
              </span>
            </div>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="text-center mt-8 text-sm text-gray-300">
            <p className="flex items-center justify-center"></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
