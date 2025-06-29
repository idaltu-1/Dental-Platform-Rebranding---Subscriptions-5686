import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiStar, FiQuote } = FiIcons;

function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'General Dentist',
      practice: 'Smile Dental Care',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
      rating: 5,
      quote: 'refer.dental has completely transformed how we manage patient referrals. The seamless integration and intuitive interface have saved us countless hours.',
      metrics: { patients: '2,500+', time_saved: '15 hrs/week' }
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Oral Surgeon',
      practice: 'Advanced Oral Surgery',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
      rating: 5,
      quote: 'The clinical notes feature is outstanding. It has streamlined our documentation process and improved communication with referring dentists significantly.',
      metrics: { referrals: '500+', efficiency: '40% faster' }
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Endodontist',
      practice: 'Root Canal Specialists',
      image: 'https://images.unsplash.com/photo-1594824804732-ca58f6ee4d4a?w=400&h=400&fit=crop&crop=face',
      rating: 5,
      quote: 'Outstanding platform! The analytics dashboard gives us incredible insights into our practice performance. Highly recommended for any dental practice.',
      metrics: { revenue: '+25%', satisfaction: '98%' }
    }
  ];

  const stats = [
    { number: '98%', label: 'Customer Satisfaction' },
    { number: '10,000+', label: 'Active Users' },
    { number: '1M+', label: 'Referrals Processed' },
    { number: '99.9%', label: 'Uptime Guarantee' }
  ];

  return (
    <section id="testimonials" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <SafeIcon icon={FiStar} className="mr-2" />
            Customer Stories
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by Leading Dental Professionals
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See what dental professionals are saying about how our platform 
            has transformed their practice management and patient care.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-50 rounded-2xl p-8 relative hover:shadow-lg transition-shadow duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-blue-200">
                <SafeIcon icon={FiQuote} className="text-2xl" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <SafeIcon key={i} icon={FiStar} className="text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 mb-6 text-lg leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-white rounded-lg">
                {Object.entries(testimonial.metrics).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{value}</div>
                    <div className="text-sm text-gray-500 capitalize">
                      {key.replace('_', ' ')}
                    </div>
                  </div>
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-sm text-blue-600">{testimonial.practice}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Proven Results</h3>
            <p className="text-blue-100">
              Join thousands of dental professionals who trust our platform
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100 text-sm lg:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Video Testimonial CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="bg-gray-50 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              See refer.dental in Action
            </h3>
            <p className="text-gray-600 mb-6">
              Watch how Dr. Smith transformed his practice workflow with our platform
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 inline-flex items-center space-x-2">
              <SafeIcon icon={FiStar} />
              <span>Watch Success Story</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default TestimonialsSection;