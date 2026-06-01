import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Star, Quote } from 'lucide-react';
import { getTestimonials } from '../api';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const data = await getTestimonials();
        setTestimonials(data.testimonials || []);
      } catch (error) {
        console.error('Failed to load testimonials:', error);
        setTestimonials([]);
      }
      setLoading(false);
    };

    loadTestimonials();
  }, []);

  // Auto-advance testimonials
  useEffect(() => {
    if (testimonials.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-8"></div>
              <div className="h-64 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const goToPrevious = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials.length > 0 ? testimonials[currentIndex] : null;

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ direction: 'rtl' }}>آراء الناس عن الجبهة</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto" style={{ direction: 'rtl' }}>
            استمع إلى من غيرت حياتهم بفضل جبهة وادي هور الديمقراطية
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {testimonials.length === 0 ? (
              <Card className="border-0 shadow-xl">
                <CardContent className="p-8 md:p-12">
                  <div className="flex flex-col items-center text-center">
                    <p className="text-lg text-gray-500 italic" style={{ direction: 'rtl' }}>
                      قريباً...
                    </p>
                  <p className="text-sm text-gray-400 mt-2" style={{ direction: 'rtl' }}>
                    تابعونا لقراءة قصص ملهمة من مجتمعنا
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <Card className="border-0 shadow-xl">
                <CardContent className="p-8 md:p-12">
                  <div className="flex flex-col items-center text-center">
                    {/* Rating */}
                    {currentTestimonial.rating && (
                      <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < currentTestimonial.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    )}

                    {/* Testimonial Content */}
                    <p className="text-gray-700 mb-8 italic" style={{ fontSize: '12px', lineHeight: '1.25rem', direction: 'rtl' }}>
                      "{currentTestimonial.content}"
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center">
                      {currentTestimonial.image && (
                        <img
                          src={currentTestimonial.image}
                          alt={currentTestimonial.name}
                          className="h-16 w-16 rounded-full object-cover ml-4 border-4 border-blue-100"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      )}
                      <div className="text-right">
                        <h4 className="font-bold text-gray-900 text-lg" style={{ direction: 'rtl' }}>
                          {currentTestimonial.name}
                        </h4>
                        <p className="text-gray-600" style={{ direction: 'rtl' }}>
                          {currentTestimonial.role}
                          {currentTestimonial.company && `، ${currentTestimonial.company}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Navigation Arrows */}
              {testimonials.length > 1 && (
                <>
                  <button
                    onClick={goToPrevious}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors"
                    aria-label="السابق"
                  >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={goToNext}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors"
                    aria-label="التالي"
                  >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* Dots Indicator */}
              {testimonials.length > 1 && (
                <div className="flex justify-center mt-8 space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`h-3 w-3 rounded-full transition-all ${
                        index === currentIndex
                          ? 'bg-blue-600 w-8'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`انتقل إلى التقييم ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;