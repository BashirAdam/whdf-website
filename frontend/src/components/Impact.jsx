import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Heart, Users, GraduationCap, Award, TrendingUp, MapPin } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from './ui/carousel';
import { api, getPublicSiteContent, getSuccessStories, getDetailedPageSections } from '../api';
import Header from './Header';
import Footer from './Footer';
import ImpactHighlightsSection from './ImpactHighlightsSection';

const Impact = () => {
  // Site content state
  const [siteContent, setSiteContent] = useState({});
  // Success stories state
  const [successStories, setSuccessStories] = useState([]);
  // Impact statistics state
  const [impactStats, setImpactStats] = useState({});
  // Detailed page sections state
  const [pageSections, setPageSections] = useState([]);
  // Impact highlights state
  const [impactHighlights, setImpactHighlights] = useState([]);

  // Load site content on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Try to load from public API first
        const backendContent = await getPublicSiteContent();
        if (backendContent.content && Object.keys(backendContent.content).length > 0) {
          setSiteContent(backendContent.content);
        } else {
          setSiteContent({});
        }

        // Load success stories
        try {
          const storiesData = await getSuccessStories();
          if (storiesData.stories && storiesData.stories.length > 0) {
            setSuccessStories(storiesData.stories);
          }
        } catch (storiesError) {
          console.log('Using empty success stories');
        }

        // Load impact statistics
        try {
          const statsData = await api.getImpactStats();
          if (statsData && Object.keys(statsData).length > 0) {
            setImpactStats(statsData);
          }
        } catch (statsError) {
          console.log('Using fallback impact statistics');
        }

        // Load detailed page sections
        try {
          const sectionsData = await getDetailedPageSections('impact');
          setPageSections(sectionsData.sections || []);
        } catch (sectionsError) {
          console.log('Using empty page sections');
        }
      } catch (error) {
        console.log('Using fallback data for site content');
        setSiteContent({});
      }
    };
    
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      




      {/* Impact Highlights Section - Dynamic from Admin Panel */}
      <ImpactHighlightsSection />

      {/* Legacy Impact Highlights (keeping for reference) */}
      {/*
      {impactHighlights.length > 0 && (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Additional Highlights</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Key achievements that demonstrate our commitment to community transformation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {impactHighlights.map((highlight, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    {highlight.icon === 'Users' && <Users className="h-8 w-8 text-blue-600" />}
                    {highlight.icon === 'Heart' && <Heart className="h-8 w-8 text-yellow-500" />}
                    {highlight.icon === 'TrendingUp' && <TrendingUp className="h-8 w-8 text-blue-600" />}
                    <CardTitle className="text-xl text-gray-900">{highlight.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{highlight.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-600 font-semibold">{highlight.metric}</span>
                    <span className="text-gray-500">{highlight.period}</span>
                  </div>
                  <Progress value={highlight.progress} className="mt-3" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      )}
      */}

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
             يمكنكم معرفة اعلانات ومواعيد الاجتماعات | المؤتمرات | الاحتفالات | اللقاءات 
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {successStories.length > 0 ? (
              successStories.map((story, index) => (
                <Card key={index} className="border-0 shadow-lg overflow-hidden">
                  <div className="relative w-full h-48 flex items-center justify-center bg-gray-100 overflow-hidden">
                    <img 
                      src={story.image} 
                      alt={story.name}
                      className="max-h-full max-w-full object-contain"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {story.program}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{story.name}</h3>
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-blue-600 font-semibold">{story.achievement}</span>
                      <div className="flex items-center text-gray-500 text-sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        {story.location}
                      </div>
                    </div>
                    <p className="text-gray-600">{story.story}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-2 text-center py-12">
                <p className="text-gray-500 text-lg">Success stories coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </section>


      {/* Dynamic Page Sections */}
      {pageSections.length > 0 && (
        <div className="space-y-16">
          {pageSections.map((section, index) => (
            <section key={section.id} className="py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {section.title}
                  </h2>
                </div>

                <div className="space-y-8">
                  {/* Text Content */}
                  {section.content.text && (
                    <div className="prose max-w-none text-lg text-gray-600 leading-relaxed">
                      <p>{section.content.text}</p>
                    </div>
                  )}

                  {/* HTML Content */}
                  {section.content.html && (
                    <div 
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: section.content.html }}
                    />
                  )}

                  {/* Featured Image */}
                  {section.content.image_url && (
                    <div className="text-center">
                      <img 
                        src={section.content.image_url} 
                        alt={section.title}
                        className="max-w-full h-auto rounded-lg shadow-lg mx-auto"
                      />
                    </div>
                  )}

                  {/* Dynamic Items */}
                  {section.content.items && section.content.items.length > 0 && (
                    (section.content.metadata?.display_as_carousel === true) ? (
                      <div className="w-full max-w-6xl mx-auto relative">
                        <Carousel className="w-full">
                          <CarouselContent className="-ml-2 md:-ml-4">
                            {section.content.items.map((item, itemIndex) => (
                              <CarouselItem key={itemIndex} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                                <div className="bg-white p-6 rounded-lg shadow-md h-full">
                                  {item.image_url && item.image_url.trim() !== '' && (
                                    <div className="mb-4 flex items-center justify-center bg-gray-50 rounded-lg p-4" style={{ minHeight: '160px', maxHeight: '160px' }}>
                                      <img 
                                        src={item.image_url} 
                                        alt={item.title || 'Item image'}
                                        className="max-w-full max-h-full object-contain"
                                        style={{ display: 'block', width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '132px' }}
                                        onError={(e) => {
                                          console.error('Failed to load image:', item.image_url, 'for item:', item.title);
                                          e.target.style.display = 'none';
                                        }}
                                        onLoad={() => {
                                          console.log('Image loaded successfully:', item.image_url);
                                        }}
                                      />
                                    </div>
                                  )}
                                  {item.title && (
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                      {item.title}
                                    </h3>
                                  )}
                                  {item.description && (
                                    <p className="text-gray-600">
                                      {item.description}
                                    </p>
                                  )}
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious className="left-0 md:-left-12" />
                          <CarouselNext className="right-0 md:-right-12" />
                        </Carousel>
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {section.content.items.map((item, itemIndex) => {
                          // Debug: log item data
                          if (item.image_url) {
                            console.log('Item with image:', { index: itemIndex, title: item.title, image_url: item.image_url });
                          }
                          return (
                          <div key={itemIndex} className="bg-white p-6 rounded-lg shadow-md">
                            {item.image_url && item.image_url.trim() !== '' && (
                              <div className="mb-4 flex items-center justify-center bg-gray-50 rounded-lg p-4" style={{ minHeight: '160px', maxHeight: '160px' }}>
                                <img 
                                  src={item.image_url} 
                                  alt={item.title || 'Item image'}
                                  className="max-w-full max-h-full object-contain"
                                  style={{ display: 'block', width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '132px' }}
                                  onError={(e) => {
                                    console.error('Failed to load image:', item.image_url, 'for item:', item.title);
                                    e.target.style.display = 'none';
                                  }}
                                  onLoad={() => {
                                    console.log('Image loaded successfully:', item.image_url);
                                  }}
                                />
                              </div>
                            )}
                            {item.title && (
                              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                {item.title}
                              </h3>
                            )}
                            {item.description && (
                              <p className="text-gray-600">
                                {item.description}
                              </p>
                            )}
                          </div>
                          );
                        })}
                      </div>
                    )
                  )}
                </div>
              </div>
            </section>
          ))}
        </div>
      )}



      <Footer />
    </div>
  );
};

export default Impact;
