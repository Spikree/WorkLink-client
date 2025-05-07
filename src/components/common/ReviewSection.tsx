import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  title: string;
  avatar: string;
  quote: string;
  rating: number;
}

const ReviewSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const testimonials: Testimonial[] = [
    {
      name: "Sarah Johnson",
      title: "UX Designer",
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      quote:
        "WorkLink has transformed how I find design projects. The platform is intuitive, clients are high-quality, and payments are always on time. It's become my go-to for freelance work.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      title: "Software Developer",
      avatar:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      quote:
        "As a developer, I was skeptical about freelance platforms, but WorkLink exceeded my expectations. The project matching is spot-on, and I've built long-term relationships with several clients.",
      rating: 5,
    },
    {
      name: "Emma Rodriguez",
      title: "Marketing Specialist",
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      quote:
        "Finding marketing projects used to be time-consuming until I discovered WorkLink. The platform connects me with clients who value my expertise, and the secure payment system gives me peace of mind.",
      rating: 4,
    },
    {
      name: "David Patel",
      title: "Product Manager",
      avatar:
        "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      quote:
        "WorkLink has been instrumental in helping our startup find specialized talent for short-term projects. The quality of professionals on the platform is outstanding.",
      rating: 5,
    },
    {
      name: "Lisa Wong",
      title: "Content Writer",
      avatar:
        "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      quote:
        "The messaging system makes communication seamless, and the milestone payment feature ensures I get paid for my work. I've recommended WorkLink to all my freelance friends.",
      rating: 4,
    },
    {
      name: "James Taylor",
      title: "Business Owner",
      avatar:
        "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      quote:
        "As a small business owner, WorkLink has been a game-changer. We've found amazing talent for various projects without the overhead of full-time employees. Highly recommend!",
      rating: 5,
    },
  ];

  // Automatic carousel sliding
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Slide every 5 seconds
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Handle dot click for manual navigation
  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-primary">
            What Our Users Say
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover how WorkLink has helped professionals and businesses around
            the world connect and succeed.
          </p>
        </div>

        {/* Carousel for small screens */}
        <div className="block md:hidden">
          <motion.div
            key={currentIndex}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
          >
            <div className="mb-4">
              <Quote className="w-10 h-10 text-primary/20" />
            </div>
            <p className="text-gray-700 italic mb-6 flex-grow">
              {testimonials[currentIndex].quote}
            </p>
            <div className="flex items-start mt-4">
              <div className="mr-4">
                <img
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  {testimonials[currentIndex].name}
                </p>
                <p className="text-sm text-gray-600">
                  {testimonials[currentIndex].title}
                </p>
                <div className="flex mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonials[currentIndex].rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          {/* Navigation dots */}
          <div className="flex justify-center mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-2 h-2 mx-1 rounded-full ${
                  index === currentIndex ? "bg-gray-900" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Grid for medium and larger screens */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
            >
              <div className="mb-4">
                <Quote className="w-10 h-10 text-primary/20" />
              </div>
              <p className="text-gray-700 italic mb-6 flex-grow">
                {testimonial.quote}
              </p>
              <div className="flex items-start mt-4">
                <div className="mr-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600">{testimonial.title}</p>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ReviewSection;