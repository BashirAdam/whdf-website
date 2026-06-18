import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from './ui/carousel';
import { Heart, Users, Award, Target, Eye, Star, CheckCircle, Calendar, Building, FileText, Download } from 'lucide-react';
import { api, getPublicSiteContent, getLeadershipTeam, getDetailedPageSections } from '../api';
import Header from './Header';
import Footer from './Footer';

const About = () => {
  // Site content state
  const [siteContent, setSiteContent] = useState({});
  // Leadership team state
  const [teamMembers, setTeamMembers] = useState([]);
  // Impact statistics state
  const [impactStats, setImpactStats] = useState({});
  // Detailed page sections state
  const [pageSections, setPageSections] = useState([]);

  // Load site content and leadership team on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load site content
        const backendContent = await getPublicSiteContent();
        if (backendContent.content && Object.keys(backendContent.content).length > 0) {
          setSiteContent(backendContent.content);
        } else {
          // Set empty object if no site content available
          setSiteContent({});
        }

        // Load leadership team
        const teamData = await getLeadershipTeam();
        if (teamData.members && teamData.members.length > 0) {
          setTeamMembers(teamData.members);
        } else {
          // Fallback to default team members if no data in backend
          setTeamMembers([
            {
              name: "Mrs. Swati Ingole",
              role: "Founder & Director",
              image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
              description: "Visionary leader with over 15 years of experience in social development and community empowerment."
            },
            {
              name: "Dr. Rajesh Kumar",
              role: "Senior Medical Advisor",
              image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
              description: "Leading geriatrician specializing in senior citizen healthcare and physiotherapy services."
            },
            {
              name: "Ms. Priya Sharma",
              role: "Training Program Manager",
              image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop&crop=face",
              description: "Expert in vocational training with focus on youth skill development and employment placement."
            }
          ]);
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
          const sectionsData = await getDetailedPageSections('about');
          setPageSections(sectionsData.sections || []);
        } catch (sectionsError) {
          console.log('Using empty page sections');
        }
      } catch (error) {
        console.log('Using fallback data for site content and leadership team');
        setSiteContent({});
        // Set fallback team members
        setTeamMembers([
          {
            name: "Mrs. Swati Ingole",
            role: "Founder & Director",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
            description: "Visionary leader with over 15 years of experience in social development and community empowerment."
          },
          {
            name: "Dr. Rajesh Kumar",
            role: "Senior Medical Advisor",
            image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
            description: "Leading geriatrician specializing in senior citizen healthcare and physiotherapy services."
          },
          {
            name: "Ms. Priya Sharma",
            role: "Training Program Manager",
            image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop&crop=face",
            description: "Expert in vocational training with focus on youth skill development and employment placement."
          }
        ]);
      }
    };
    
    loadData();
  }, []);

  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description: "We approach every individual with empathy and understanding, recognizing their unique dignity and worth."
    },
    {
      icon: Users,
      title: "Community",
      description: "We believe in the power of community support and collective action to create lasting change."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for the highest standards in our programs and services, ensuring quality outcomes."
    },
    {
      icon: Target,
      title: "Impact",
      description: "We focus on measurable results that create meaningful improvements in people's lives."
    }
  ];

  // Timeline/milestones now managed through database page sections

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      

         {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-right border-r-4 border-[#d78525] pr-4" style={{ direction: 'rtl' }}>
          {siteContent.about?.story?.title || "البداية"}
        </h2>
              <div className="text-lg text-gray-800 leading-relaxed mb-6 text-justify" style={{ direction: 'rtl' }}>
  {siteContent.about?.story?.content || `تأسست جبهة وادي هور الديمقراطية في 2017م ، فيما جري التدشين الرسمي للجبهة وتشكيل هيئتها العام 2021م.`}
        </div>
            </div>
            <div className="relative">
              <img 
                src="/images/logo-preview.png"
                alt="Shield Foundation Community Work"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#d78525] text-white p-6 rounded-lg" style={{ direction: 'rtl' }}>
  <div className="text-2xl font-bold text-center">
    {siteContent.about?.story?.highlightBox?.text || "9+ سنوات"}
  </div>
  <div className="text-sm text-center">
    {siteContent.about?.story?.highlightBox?.subtext || "منذ التاسيس في العام 2017"}
  </div>
</div>
            </div>
          </div>
        </div>
      </section>

{/* About Us Page Content */}
<div className="max-w-7xl mx-auto">
  
  {/* Page Title */}
  <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-gray-300 pb-2 text-right">
    معلومات عنا
  </h2>
  
  {/* First Official Meeting Section */}
  <div className="bg-gray-50 p-6 rounded-xl shadow-lg border-4 border-white mb-8">
    <h3 className="text-2xl font-bold text-gray-700 mb-4 text-center">
      أول اجتماع رسمي للهيئة العليا
    </h3>
    
    <p className="text-black mb-4 leading-relaxed text-right" style={{
    textAlign: "justify",
    textAlignLast: "right"}}>
      في أول اجتماع رسمي للهيئة العليا لجبهة وادي هور الديمقراطية المنعقد في السودان بتاريخ - 12ابريل 2021م تم اجازة مشروع الجبهة متمثلة في إقامة اقليم وادي هور "اقليم بريبي".
       ذات خصوصية ثقافية أفريقية وهويه شمال أفريقية في إطار وحدة السودان الكنفدرالية من اجل حفظ الموروث الثقافي والحضاري لشعب الزغاوة وسكان وادي هور (التراث واللغة والأرض )وكخيارا" استراتيجيا" للتنمية عبر مركزية سياسية لبريبي ،وقد تم أيضا اجازة هِيكل تنظيمي مؤقت (الهيئة العليا والسكرتارية التنفيذية ) الي حين قيام مؤتمر عام وتم اختيار الاتي 
    </p>
    
    <p className="text-black mb-4 leading-relaxed text-justify" style={{ direction: 'rtl' }}>
      1. الدكتور احمد ابراهيم سبيل / رئيساً "مؤقتاً"<br />
      2. باشمهندس / عبد القادر سليمان دفع الله / سكرتيراً للطلاب "مؤقتاً"<br />
      3. باشمهندس / احمد جماع / سكرتير العلاقات العامة والمنظمات "مؤقتاً"<br />
      4. أستاذ / عمار تودي / سكرتيراً للإعلام "مؤقتاً"
    </p>
    
    <p className="text-black mb-4 leading-relaxed text-justify" style={{ direction: 'rtl' }}>
      و تواصلت مشاورات وحوارات مع رئيس الجبهة لاستكمال السكرتارية التنفيذية فتم تسمية:<br />
      - الأستاذ / عثمان محمد عبداً حامد (خون) / سكرتيراً للمكاتب الخارجية "مؤقتاً"<br />
      - باشمهندس / عزالدين أبكر (أنكا) / مستشار الجبهة للشؤون السياسية والثقافية
    </p>
    
    <p className="text-black mb-4 leading-relaxed text-justify" style={{ direction: 'rtl' }}>
      وسوف تتواصل برامج الحوارات والتفاكر مع أعضاء الجبهة بالداخل والخارج لاستكمال السكرتاريات.
    </p>
    
    <p className="text-black mb-4 leading-relaxed text-right">
      استاذ/عمار تودي<br />
      سكرتير الإعلام<br />
      الخرطوم -15ابريل 2021م
    </p>
    
    {/* Meeting Images Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
      <div className="bg-gray-200 rounded-xl overflow-hidden h-48 flex items-center justify-center">
        <img 
          src="/images/meeting 1.jpeg" 
          alt="صورة من الاجتماع الأول" 
          className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
        />
      </div>
      <div className="bg-gray-200 rounded-xl overflow-hidden h-48 flex items-center justify-center">
        <img 
          src="/images/meeting 2.jpeg" 
          alt="صورة من الاجتماع الأول" 
          className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
        />
      </div>
      <div className="bg-gray-200 rounded-xl overflow-hidden h-48 flex items-center justify-center">
        <img 
          src="/images/meeting 3.jpg" 
          alt="صورة من الاجتماع الأول" 
          className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
        />
      </div>
    </div>
  </div>
  
</div>

{/* Manifesto Section */}
<section className="py-16 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center" dir="rtl">
      
      <div className="flex justify-center mb-4">
        <FileText className="h-12 w-12 text-[#d78525]" />
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-3">
      مانيفستو جبهة وادي هور الديمقراطية
      </h2>

      <p className="text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
        يمكننك تصفح او تحميل المانيفستو الرسمي للجبهة الذي يوضح رؤيتنا وأهدافنا ومبادئنا الأساسية.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {/* Open in browser */}
        <a
          href="/documents/manifesto.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-[#d78525] hover:bg-[#b8681a] text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <FileText className="h-5 w-5" />
          عرض المنشور
        </a>

        {/* Download */}
        <a
          href="/documents/manifesto.pdf"
          download="منشور-جبهة-وادي-هور.pdf"
          className="inline-flex items-center justify-center gap-2 border-2 border-[#d78525] text-[#d78525] hover:bg-[#d78525] hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <Download className="h-5 w-5" />
          تحميل المنشور
        </a>
      </div>

    </div>
  </div>
</section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
  
  <p className="text-xl font-bold text-black text-center" style={{ direction: 'rtl' }}>
   (   المكتب التنفيذي 2026)   
  </p>
</div>
          
          {/* Group team members by category */}
          {(() => {
            // Group team members by category
            const groupedMembers = teamMembers.reduce((acc, member) => {
              const category = member.category || '';
              if (!acc[category]) {
                acc[category] = [];
              }
              acc[category].push(member);
              return acc;
            }, {});

            // Define category order and display names
            const categoryOrder = ['Trustee', 'Programs Team', 'Admin & Finance'];
            const categoryDisplayNames = {
              'Trustee': 'Trustee',
              'Programs Team': 'Programs Team',
              'Admin & Finance': 'Admin & Finance'
            };

            return categoryOrder.map((categoryKey) => {
              const members = groupedMembers[categoryKey] || [];
              if (members.length === 0) return null;

              return (
                <div key={categoryKey} className="mb-16">
                  <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                    {categoryDisplayNames[categoryKey]}
                  </h3>
                  <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {members.map((member, index) => (
                      <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                        <CardContent className="p-8">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                            onError={(e) => {
                              e.target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face";
                            }}
                          />
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                          <Badge className="mb-4 bg-yellow-400 text-black hover:bg-yellow-500">
                            {member.role}
                          </Badge>
                          {member.description && (
                            <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            });
          })()}

          {/* Fallback if no team members */}
          {teamMembers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No team members available at this time.</p>
            </div>
          )}
        </div>
      </section>


      {/* Dynamic Page Sections */}
      {pageSections.length > 0 && (
        <div>
          {pageSections.map((section, index) => {
            // Special handling for "Our Journey" section - Timeline Layout
            if (section.section === 'journey') {
              return (
                <section key={section.id} className="py-20 bg-gray-50">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                      <h2 className="text-4xl font-bold text-gray-900 mb-4">{section.title}</h2>
                      {section.content.text && (
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                          {section.content.text}
                        </p>
                      )}
                    </div>
                    
                    {/* Timeline Layout */}
                    {section.content.items && section.content.items.length > 0 && (
                      <div className="relative max-w-6xl mx-auto">
                        {/* Center timeline line */}
                        <div className="absolute left-1/2 transform -translate-x-0.5 top-0 bottom-0 w-1 bg-blue-600 hidden md:block"></div>
                        
                        <div className="space-y-12">
                          {section.content.items.map((milestone, milestoneIndex) => (
                            <div key={milestoneIndex} className={`relative flex items-center ${milestoneIndex % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                              {/* Timeline dot */}
                              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-yellow-400 rounded-full border-4 border-white shadow-lg z-10 hidden md:block"></div>
                              
                              <div className={`w-full md:w-5/12 ${milestoneIndex % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                                <Card className={`hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                                  milestoneIndex % 2 === 0 
                                    ? 'md:ml-0' 
                                    : 'md:mr-0'
                                }`}>
                                  <CardContent className="p-6 relative">
                                    {/* Arrow pointing to timeline */}
                                    <div className={`absolute top-8 hidden md:block ${
                                      milestoneIndex % 2 === 0 
                                        ? 'right-0 transform translate-x-full' 
                                        : 'left-0 transform -translate-x-full'
                                    }`}>
                                      <div className={`w-0 h-0 ${
                                        milestoneIndex % 2 === 0
                                          ? 'border-l-[20px] border-l-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent'
                                          : 'border-r-[20px] border-r-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent'
                                      }`}></div>
                                    </div>
                                    
                                    <div className="flex items-center mb-4">
                                      <Badge className="bg-blue-600 text-white text-sm px-3 py-1 mr-3">
                                        {milestone.title?.split(' - ')[0] || `Step ${milestoneIndex + 1}`}
                                      </Badge>
                                      <Calendar className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                      {milestone.title?.split(' - ')[1] || milestone.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                                  </CardContent>
                                </Card>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Start and End markers */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 -top-4 w-4 h-4 bg-blue-600 rounded-full hidden md:block"></div>
                        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-4 w-4 h-4 bg-blue-600 rounded-full hidden md:block"></div>
                      </div>
                    )}
                  </div>
                </section>
              );
            }
            
            // Special handling for "Our Partners" section
            if (section.section === 'partners') {
              return (
                <section key={section.id} className="py-20">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                      <h2 className="text-4xl font-bold text-gray-900 mb-4">{section.title}</h2>
                      {section.content.text && (
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                          {section.content.text}
                        </p>
                      )}
                    </div>
                    
                    {section.content.items && section.content.items.length > 0 && (
                      section.content.metadata?.display_as_carousel === true ? (
                        <div className="w-full max-w-6xl mx-auto relative">
                          <Carousel className="w-full">
                            <CarouselContent className="-ml-2 md:-ml-4">
                              {section.content.items.map((partner, partnerIndex) => (
                                <CarouselItem key={partnerIndex} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                                  <Card className="text-center border-2 border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300 h-full">
                                    <CardContent className="p-6">
                                      {partner.image_url && partner.image_url.trim() !== '' ? (
                                        <div className="mb-4 flex items-center justify-center bg-gray-50 rounded-lg p-4" style={{ minHeight: '120px', maxHeight: '120px' }}>
                                          <img 
                                            src={partner.image_url} 
                                            alt={partner.title || 'Partner logo'}
                                            className="max-w-full max-h-full object-contain"
                                            style={{ display: 'block', width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100px' }}
                                            onError={(e) => {
                                              e.target.style.display = 'none';
                                            }}
                                          />
                                        </div>
                                      ) : (
                                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                          <Building className="h-8 w-8 text-blue-600" />
                                        </div>
                                      )}
                                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {partner.title}
                                      </h3>
                                      {partner.description && (
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                          {partner.description}
                                        </p>
                                      )}
                                    </CardContent>
                                  </Card>
                                </CarouselItem>
                              ))}
                            </CarouselContent>
                            <CarouselPrevious className="left-0 md:-left-12" />
                            <CarouselNext className="right-0 md:-right-12" />
                          </Carousel>
                        </div>
                      ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                          {section.content.items.map((partner, partnerIndex) => (
                            <Card key={partnerIndex} className="text-center border-2 border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                              <CardContent className="p-6">
                                {partner.image_url && partner.image_url.trim() !== '' ? (
                                  <div className="mb-4 flex items-center justify-center bg-gray-50 rounded-lg p-4" style={{ minHeight: '120px', maxHeight: '120px' }}>
                                    <img 
                                      src={partner.image_url} 
                                      alt={partner.title || 'Partner logo'}
                                      className="max-w-full max-h-full object-contain"
                                      style={{ display: 'block', width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100px' }}
                                      onError={(e) => {
                                        e.target.style.display = 'none';
                                      }}
                                    />
                                  </div>
                                ) : (
                                  <div className="mb-4">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                      <Building className="h-8 w-8 text-blue-600" />
                                    </div>
                                  </div>
                                )}
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                  {partner.title}
                                </h3>
                                {partner.description && (
                                  <p className="text-gray-600 text-sm leading-relaxed">
                                    {partner.description}
                                  </p>
                                )}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )
                    )}
                  </div>
                </section>
              );
            }
            
            // Default layout for other sections
            return (
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
                      <div className="prose max-w-none text-lg text-gray-600 leading-relaxed text-center">
                        <p>{section.content.text}</p>
                      </div>
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
                      section.content.metadata?.display_as_carousel === true ? (
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
            );
          })}
        </div>
      )}
      

      <Footer />
    </div>
  );
};

export default About;
