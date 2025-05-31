import {
  Briefcase,
  MessageCircle,
  UserCheck,
  Star,
  Shield,
  TrendingUp,
  Users,
  Building2,
  CheckCircle,
  Brain,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ArrowRight,
  Sparkles,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ReviewSection from "../components/common/ReviewSection";

const LandingPage = () => {
  const navigate = useNavigate();
  const features = [
    {
      icon: <Briefcase className="w-7 h-7" />,
      title: "Post Projects",
      description:
        "Easily post your projects and find the perfect freelancer with our intuitive project management system",
      gradient: "from-blue-500 to-cyan-400",
    },
    {
      icon: <UserCheck className="w-7 h-7" />,
      title: "Expert Freelancers",
      description:
        "Access a global network of skilled professionals vetted through our rigorous screening process",
      gradient: "from-purple-500 to-pink-400",
    },
    {
      icon: <MessageCircle className="w-7 h-7" />,
      title: "Secure Messaging",
      description:
        "Communicate seamlessly with integrated messaging, file sharing, and real-time collaboration tools",
      gradient: "from-green-500 to-emerald-400",
    },
    {
      icon: <Star className="w-7 h-7" />,
      title: "Rating System",
      description:
        "Make informed decisions with our comprehensive review system and verified client feedback",
      gradient: "from-yellow-500 to-orange-400",
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: "Secure Payments",
      description:
        "Protected payments with escrow services, milestone tracking, and comprehensive dispute resolution",
      gradient: "from-red-500 to-pink-400",
    },
    {
      icon: <TrendingUp className="w-7 h-7" />,
      title: "Track Progress",
      description:
        "Monitor your projects with real-time updates, analytics dashboard, and performance insights",
      gradient: "from-indigo-500 to-purple-400",
    },
  ];

  const stats = [
    {
      icon: <Users className="w-10 h-10" />,
      number: "10k+",
      label: "Active Freelancers",
      description: "Skilled professionals ready to work",
      gradient: "from-blue-600 to-cyan-500",
    },
    {
      icon: <Building2 className="w-10 h-10" />,
      number: "5k+",
      label: "Trusted Employers",
      description: "Companies growing with our platform",
      gradient: "from-purple-600 to-pink-500",
    },
    {
      icon: <CheckCircle className="w-10 h-10" />,
      number: "30k+",
      label: "Completed Projects",
      description: "Successfully delivered on time",
      gradient: "from-green-600 to-emerald-500",
    },
    {
      icon: <Brain className="w-10 h-10" />,
      number: "100+",
      label: "Skill Categories",
      description: "From design to development",
      gradient: "from-orange-600 to-red-500",
    },
  ];

  const goToAuth = () => {
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Logo */}
            <div className="flex items-center justify-center mb-12">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-lg opacity-75" />
              </div>
              <div className="ml-6">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                  WorkLink
                </h1>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-200 text-sm font-medium"
                >
                  Trusted Platform
                </motion.div>
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-8 mb-16">
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold leading-tight tracking-tight">
                  Where{" "}
                  <span className="relative">
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                      Talent
                    </span>
                    <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-30" />
                  </span>{" "}
                  <br className="hidden sm:block" />
                  Meets{" "}
                  <span className="relative">
                    <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                      Opportunity
                    </span>
                    <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-30" />
                  </span>
                </h1>
              </div>

              <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
                Connect with world-class freelancers, manage projects
                seamlessly, and scale your business with our AI-powered platform
                designed for the future of work.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 20px rgba(59, 130, 246, 0.25)",
                  }}
                  onClick={goToAuth}
                  whileTap={{ scale: 0.95 }}
                  className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white px-10 py-6 text-lg font-semibold rounded-2xl shadow-2xl transition-all duration-500"
                >
                  <span className="relative z-10 flex items-center">
                    Get Started
                    <motion.div
                      className="ml-3 w-5 h-5"
                      transition={{ duration: 0.3 }}
                      whileHover={{ x: 4 }}
                    >
                      <ArrowRight />
                    </motion.div>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center mb-4 px-3 py-1 rounded-full bg-white/10 text-white border border-white/20 text-sm font-medium"
            >
              <Zap className="w-4 h-4 mr-2" />
              Platform Statistics
            </motion.div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Trusted by thousands worldwide
            </h2>
            <p className="text-xl text-blue-100">
              Join our growing community of successful professionals
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -8 }}
                className="relative bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/15 transition-all duration-500 rounded-lg p-8 text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`bg-gradient-to-r ${stat.gradient} p-4 rounded-2xl mb-6 mx-auto w-fit shadow-2xl transition-all duration-500`}
                >
                  <div className="text-white">{stat.icon}</div>
                </motion.div>
                <div className="text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-blue-100 mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-blue-200">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center mb-6 px-4 py-2 border border-blue-200 text-blue-700 rounded-full text-sm font-medium"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Platform Features
            </motion.div>
            <h2 className="text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent leading-tight">
              Everything you need to
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                succeed together
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our comprehensive platform provides all the tools, security, and
              support you need to build successful working relationships and
              deliver exceptional results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  y: -12,
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
                }}
                className="relative bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-500 rounded-lg shadow-lg overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-8">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    className={`bg-gradient-to-r ${feature.gradient} p-4 rounded-2xl mb-6 w-fit shadow-lg transition-all duration-500`}
                  >
                    <div className="text-white">{feature.icon}</div>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-900 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {feature.description}
                  </p>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <div className="py-8 flex flex-col items-center">
        <div className="text-center">
          <h2 className="text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent leading-tight">
            What Our Users Say
            <br />
          </h2>
          <p className="text-xl pb-4 text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover how WorkLink has helped professionals and businesses around
            the world connect and succeed.
          </p>
        </div>

        <ReviewSection />
      </div>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to transform your workflow?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of professionals who are already building their
            future with WorkLink
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 20px rgba(255, 255, 255, 0.25)",
              }}
              onClick={goToAuth}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 hover:bg-blue-50 px-10 py-6 text-lg font-semibold rounded-2xl shadow-2xl transition-all duration-300"
            >
              Start Your Journey
              <ArrowRight className="ml-3 w-5 h-5 inline" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-700/50 pb-12 mb-16">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 text-white border border-gray-600 hover:bg-gray-800 rounded-xl px-6 py-3"
            >
              <Globe className="w-5 h-5" />
              <span>English</span>
            </motion.button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <h3 className="text-xl font-bold mb-8 text-white">
                Learn & Grow
              </h3>
              <ul className="space-y-4 text-gray-300">
                {[
                  "Get the app",
                  "About us",
                  "Careers",
                  "Blog",
                  "Press",
                  "Affiliate",
                ].map((item) => (
                  <li key={item}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 4, color: "#fff" }}
                      className="transition-colors duration-200"
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-8 text-white">
                Connect & Learn
              </h3>
              <ul className="space-y-4 text-gray-300">
                {[
                  "Community",
                  "Free Resources",
                  "Become an Instructor",
                  "Course Creation",
                ].map((item) => (
                  <li key={item}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 4, color: "#fff" }}
                      className="transition-colors duration-200"
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-8 text-white">Support</h3>
              <ul className="space-y-4 text-gray-300">
                {[
                  "Help Center",
                  "Terms of Service",
                  "Privacy Policy",
                  "Cookie Settings",
                  "Accessibility",
                ].map((item) => (
                  <li key={item}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 4, color: "#fff" }}
                      className="transition-colors duration-200"
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-8 text-white">
                Stay Updated
              </h3>
              <p className="text-gray-300 mb-6">
                Get the latest updates and insights delivered to your inbox.
              </p>
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors duration-200"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl px-4 py-3 text-white font-semibold"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-700/50 pt-12">
            <div className="flex items-center mb-6 md:mb-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-75" />
              </div>
              <div className="ml-4">
                <span className="text-3xl font-bold">WorkLink</span>
                <div className="text-gray-400 text-sm">
                  © {new Date().getFullYear()} All rights reserved
                </div>
              </div>
            </div>

            <div className="flex space-x-6">
              {[Facebook, Twitter, Instagram, Linkedin, Youtube].map(
                (Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.25, y: -4 }}
                    className="text-gray-400 transition-all duration-200"
                  >
                    <Icon className="w-7 h-7" />
                  </motion.a>
                )
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
