import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { Heart, Users, CheckCircle, Languages, Crown, Award, Star, MapPin, BookOpen, Compass, Landmark, Flag } from 'lucide-react';
import { getPublicSiteContent, getDetailedPageSections } from '../api';
import Header from './Header';
import Footer from './Footer';

const Programs = () => {
  // Site content state
  const [siteContent, setSiteContent] = useState({});
  // Detailed page sections state
  const [pageSections, setPageSections] = useState([]);

  // Load site content on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const backendContent = await getPublicSiteContent();
        if (backendContent.content && Object.keys(backendContent.content).length > 0) {
          setSiteContent(backendContent.content);
        } else {
          setSiteContent({});
        }

        try {
          const sectionsData = await getDetailedPageSections('programs');
          setPageSections(sectionsData.sections || []);
        } catch (sectionsError) {
          console.log('Using empty page sections');
        }
      } catch (error) {
        console.log('Using empty data for site content');
        setSiteContent({});
      }
    };
    
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      

      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
        
        {/* Who are the Zaghawa People - Full Section */}
        <div className="mb-8 mt-7">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-right border-r-4 border-[#d78525] pr-4" style={{ direction: 'rtl' }}>
            من هم شعب الزغاوة
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify" style={{ direction: 'rtl' }}>
            الزغاوة هم أحد الشعوب الإفريقية العريقة التي تعيش في منطقة الساحل الإفريقي، ويُعتبرون من أقدم المجموعات الإثنية في إقليم دارفور بغرب السودان وشمال تشاد. عُرفوا تاريخيًا بأنهم شعب محارب، تاجر، ومبدع في الزراعة والرعي، ولهم نظام اجتماعي وسياسي متماسك.
          </p>
        </div>

        {/* Details in two columns */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 rounded-xl p-5">
            <h3 className="font-bold text-gray-800 mb-3 text-right" style={{ direction: 'rtl' }}>
              <Compass className="h-5 w-5 inline-block ml-2 text-[#d78525]" />
              أين يقطن الزغاوة
            </h3>
            <ul className="space-y-2 text-gray-700" style={{ direction: 'rtl', listStyleType: 'disc', listStylePosition: 'inside' }}>
              <li className="text-right">شمال وغرب دارفور (كُتُم، كُرنوي، أم برو، الطينة، كُبكابية، مليط)</li>
              <li className="text-right">شمال ووسط تشاد (انجمينا، ابيشي، وادي فِرا، أُمّ جرس)</li>
              <li className="text-right">جاليات في ليبيا والنيجر والمدن السودانية الكبرى</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-xl p-5">
            <h3 className="font-bold text-gray-800 mb-3 text-right" style={{ direction: 'rtl' }}>
              <Languages className="h-5 w-5 inline-block ml-2 text-[#d78525]" />
              لغة الزغاوة
            </h3>
            <p className="text-gray-700 leading-relaxed text-justify" style={{ direction: 'rtl' }}>
              يتحدث الزغاوة لغة تُعرف باسم "لغة برّيا" (Beri)، وهي لغة من فصيلة اللغات النيلية الصحراوية، ولها عدة لهجات محلية. كما يتحدث كثير من الزغاوة العربية كلغة ثانية، خاصة في السودان والفرنسية في تشاد.
            </p>
          </div>
        </div>


        {/* Culture & Heritage Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-right border-r-4 border-[#d78525] pr-4" style={{ direction: 'rtl' }}>
            ثقافة وتراث شعب الزغاوة
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify" style={{ direction: 'rtl' }}>
            ثقافة الزغاوة غنية بالعناصر التي تمزج بين الأفريقية والعربية، وبين البدوية والحضرية، وتُعتبر من أعمق الثقافات في المنطقة. تقوم الحياة الاجتماعية على الاحترام المتبادل والترابط القبلي، وتُعد الأسرة النواة الأساسية في بناء المجتمع، بينما تلعب المرأة دورًا محوريًا في الحياة الاجتماعية والسياسية والاقتصادية، حيث تشارك في الزراعة والتجارة والأمور السياسية.
          </p>
          <p className="text-gray-700 leading-relaxed text-justify mt-3" style={{ direction: 'rtl' }}>
            يتميّز الزغاوة بلباسهم التقليدي الذي يجمع بين الأصالة والجمال، مثل الثوب والعمامة أو الكدمول التي تُعد رمزًا للهوية والوقار. كما تشتهر مناسباتهم الاجتماعية، خاصة الزواج والحصاد، بالرقصات والأغاني الشعبية التي تعبّر عن الشجاعة، الكرم، والحب والبطولة، وتُؤدى بإيقاعات الطبول والصفير الجماعي.
          </p>
          <p className="text-gray-700 leading-relaxed text-justify mt-3" style={{ direction: 'rtl' }}>
            ومن أبرز سمات المجتمع الزغاوي نظام "التكافل القبلي" المعروف، وهو شكل من أشكال التعاون الجماعي الذي يعزز روح التضامن. وتُزين أدواتهم المنزلية والأسلحة التقليدية بالنقوش والزخارف التي تحمل رموزًا تشير إلى القوة، الشجاعة، والانتماء القبلي.
          </p>
        </div>

                {/* Wadi Hur Civilization Section - Text Only */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-right border-r-4 border-[#d78525] pr-4" style={{ direction: 'rtl' }}>
            
            حضارة وادي هور
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify mb-4" style={{ direction: 'rtl' }}>
            يُعتبر وادي هور أحد أقدم المراكز الحضارية في إفريقيا، وكان في العصور القديمة نهرًا عظيمًا يتدفق من شمال دارفور حتى النيل. حول هذا الوادي قامت حضارات قديمة جدا رى بعض الباحثين أن حضارة وادي هور كانت الجسر الذي وصل بين حضارة النوبة والنيل وبين ممالك إفريقيا الداخلية مثل كانم.
          </p>
          <ul className="space-y-2 text-gray-700 pr-5" style={{ direction: 'rtl', listStyleType: 'disc', listStylePosition: 'inside' }}>
            <li className="text-right">الزراعة والرعي</li>
            <li className="text-right">التجارة بين الصحراء الكبرى ووادي النيل</li>
            <li className="text-right">بناء المدن والقرى والممالك المحلية</li>
          </ul>
        </div>

                {/* Kingdom Section - Text Only */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-right border-r-4 border-[#d78525] pr-4" style={{ direction: 'rtl' }}>
            
            مملكة الزغاوة التاريخية
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify" style={{ direction: 'rtl' }}>
            ظهرت مملكة الزغاوة ما بين القرن السابع والعاشر الميلادي، وكانت تُعرف بـ مملكة كانم. وتميزت بازدهارها الاقتصادي حيث كانت غنية بالذهب والملح والماشية، واشتهرت بالتجارة مع شمال إفريقيا عبر القوافل العابرة للصحراء الكبرى. كان ملوكها يُلقبون بـ "كوي" أو "دِرِّي"، وقد عُرفوا بالحكمة والشجاعة والقدرة على التنظيم السياسي.
          </p>
        </div>

                {/* Dar Zaghawa Region Section - Text Only */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-right border-r-4 border-[#d78525] pr-4" style={{ direction: 'rtl' }}>
            
            إقليم دار زغاوة
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify" style={{ direction: 'rtl' }}>
            هو تصور ثقافي وسياسي يهدف إلى إحياء الهوية التاريخية والجغرافية لشعب الزغاوة في السودان وتشاد، وجعله إقليمًا إداريًا وتنمويًا يُعرف بـ "إقليم دار زغاوة (إقليم بيربي)". يستند هذا التصور إلى الإرث الحضاري العريق لوادي هور وممالك الزغاوة القديمة، وإلى رغبة الشعب في حماية اللغة والتراث من الاندثار.
          </p>
        </div>


        {/* Flag Section */}
<div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 border border-gray-200">
  <div className="grid md:grid-cols-2 gap-0">
    <div className="p-6 md:p-8 order-2 md:order-1">
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-right" style={{ direction: 'rtl' }}>
        <Flag className="h-6 w-6 inline-block ml-2 text-yellow-400" />
        علم الزغاوة الثقافي
      </h3>
      <p className="text-gray-700 leading-relaxed text-justify mb-4" style={{ direction: 'rtl' }}>
        العلم الثقافي للزغاوة يُستخدم كرمز للهوية التاريخية والوحدة المجتمعية لشعب الزغاوة. يتكون العلم من:
      </p>
      <ul className="space-y-2 text-gray-700" style={{ direction: 'rtl', listStyleType: 'disc', listStylePosition: 'inside' }}>
        <li className="text-right">اللون البني الداكن: الإقليم محمي بدماء شهدائه</li>
        <li className="text-right">أصفر خردلي: يرمز للصحراء</li>
        <li className="text-right">اللون الأخضر: يرمز لوادي حور والثراء الزراعي</li>
        <li className="text-right">النجمة: ترمز للحرية والمستقبل</li>
        <li className="text-right">الأربعة حروف: تعني كلمة باريا (لغة الزغاوى)</li>
      </ul>
    </div>
    <div className="h-64 md:h-auto bg-gray-100 order-1 md:order-2 flex items-center justify-center p-4">
      <img src="/images/Flag.jpeg" alt="علم الزغاوة الثقافي" className="max-h-full object-contain rounded-lg shadow-lg" />
    </div>
  </div>
</div>

      </div> {/* Close main container */}
      <div className="border-t border-gray-200 my-12"></div>

      {/* Notable Figures Section - Timeline Style (Full Width) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-xl font-bold text-black max-w-3xl mx-auto" style={{ direction: 'rtl' }}>أبرز الشخصيات في تاريخ الزغاوة</p>
            <div className="h-1 w-32 bg-[#d78525] mx-auto mt-4"></div>
          </div>

          <div className="space-y-16 mt-16 max-w-5xl mx-auto">
            
            {/* Figure 1 - Idriss Déby */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <img src="/images/182981.jpg" alt="إدريس ديبي إتنو" className="rounded-lg shadow-xl w-full h-80 object-cover" />
              </div>
              <div className="md:w-1/2 text-right">
  <div className="inline-block border-r-4 border-[#d78525] pr-4 mb-3">
    <h3 className="text-xl font-bold text-gray-800">إدريس ديبي إتنو</h3>
  </div>
  <p className="text-base text-[#d78525] mb-3">Idriss Déby</p>
  <p className="text-gray-600 leading-relaxed">
    رئيس جمهورية تشاد السابق وأبرز زعماء الزغاوي في التاريخ الحديث، حكم تشاد منذ عام 1990 حتى مقتله عام 2021
  </p>
</div>
            </div>

            {/* Figure 2 - Dr. Khalil Ibrahim */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="md:w-1/2">
                <img src="/images/207.jpg" alt="دكتور خليل إبراهيم" className="rounded-lg shadow-xl w-full h-80 object-cover" />
              </div>
              <div className="md:w-1/2 text-right">
  <div className="inline-block border-r-4 border-[#d78525] pr-4 mb-3">
    <h3 className="text-xl font-bold text-gray-800">دكتور خليل إبراهيم</h3>
  </div>
  <p className="text-base text-[#d78525] mb-3">Dr. Khalil Ibrahim</p>
  <p className="text-gray-600 leading-relaxed">
  طبيب وسياسي 
  سوداني  مؤسس حركة العدل والمساواة وأبرز قادة الكفاح المسلح في دارفور  </p>
</div>
            </div>

            {/* Figure 3 - Dr. Ali Abdelrahman Hagar */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <img src="/images/ali abdull.jpeg" alt="دكتور على عبد الرحمن حقار  " className="rounded-lg shadow-xl w-full h-80 object-cover" />
              </div>
              <div className="md:w-1/2 text-right">
  <div className="inline-block border-r-4 border-[#d78525] pr-4 mb-3">
    <h3 className="text-xl font-bold text-gray-800">دكتور على عبد الرحمن حقار   </h3>
  </div>
  <p className="text-base text-[#d78525] mb-3">Dr. Ali Abdelrahman Hagar</p>
  <p className="text-gray-600 leading-relaxed">
  الدكتور على عبد الرحمن حقار مؤسس ورئيس جامعة هيك تشاد
  </p>
</div>
            </div>

             {/* Figure 10 - Professor Adam Saleh Mohamedin  */}
             <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="md:w-1/2">
                <img src="/images/Adam Saleh.jpeg" alt="  البروفيسور ادم صالح محمدين   " className="rounded-lg shadow-xl w-full h-80 object-cover" />
              </div>
              <div className="md:w-1/2 text-right">
  <div className="inline-block border-r-4 border-[#d78525] pr-4 mb-3">
    <h3 className="text-xl font-bold text-gray-800">    البروفيسور ادم صالح محمدين   </h3>
  </div>
  <p className="text-base text-[#d78525] mb-3">  Prof. Adam Saleh Mohamedin</p>
  <p className="text-gray-600 leading-relaxed">
  اختصاصي واستشاري النساء والتوليد ومدير مركز جراحه الناسور البولي في أفريقيا 
  مدير جامعة الفاشر السابق
  </p>
</div>
            </div>


            {/* Figure 5 - Mohamed Idris Déby */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <img src="/images/mohamed idres.jpg" alt="محمد ديبي إتنو" className="rounded-lg shadow-xl w-full h-80 object-cover" />
              </div>
              <div className="md:w-1/2 text-right">
  <div className="inline-block border-r-4 border-[#d78525] pr-4 mb-3">
    <h3 className="text-xl font-bold text-gray-800">محمد ديبي إتنو</h3>
  </div>
  <p className="text-base text-[#d78525] mb-3">Mahamat Déby</p>
  <p className="text-gray-600 leading-relaxed">
    رئيس جمهورية تشاد الحالي ونجل الرئيس الراحل إدريس ديبي. تولى الحكم بعد مقتل والده عام 2021
  </p>
</div>
            </div>


             {/* Figure 9 -  Yahya Dillo */}
             <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <img src="/images/yay.jpeg" alt=" يحي ديلو" className="rounded-lg shadow-xl w-full h-80 object-cover" />
              </div>
              <div className="md:w-1/2 text-right">
  <div className="inline-block border-r-4 border-[#d78525] pr-4 mb-3">
    <h3 className="text-xl font-bold text-gray-800">يحي ديلو </h3>
  </div>
  <p className="text-base text-[#d78525] mb-3">Yahya Dillo</p>
  <p className="text-gray-600 leading-relaxed">
  سياسي تشادي، وزعيم المعارضة كرئيس للحزب الاشتراكي بلا حدود
  </p>
</div>
            </div>


            {/* Figure 4 - Dr. and General Youssef Tiara */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="md:w-1/2">
                <img src="/images/yousef.jpeg" alt=" الدكتور والجنرال يوسف تيارا " className="rounded-lg shadow-xl w-full h-80 object-cover" />
              </div>
              <div className="md:w-1/2 text-right">
  <div className="inline-block border-r-4 border-[#d78525] pr-4 mb-3">
    <h3 className="text-xl font-bold text-gray-800">Dr. and General Youssef Tiara  </h3>
  </div>
  <p className="text-base text-[#d78525] mb-3">Dr. and General Youssef Tiara</p>
  <p className="text-gray-600 leading-relaxed">
  طبيب وسياسي 
  سوداني  مؤسس حركة العدل والمساواة وأبرز قادة الكفاح المسلح في دارفور  </p>
</div>
            </div>


            

            {/* Figure 6 - Mini Minawi */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="md:w-1/2">
                <img src="/images/arco.jpg" alt="مني أركو مناوي" className="rounded-lg shadow-xl w-full h-80 object-cover" />
              </div>
              <div className="md:w-1/2 text-right">
  <div className="inline-block border-r-4 border-[#d78525] pr-4 mb-3">
    <h3 className="text-xl font-bold text-gray-800">مني أركو مناوي</h3>
  </div>
  <p className="text-base text-[#d78525] mb-3">Mini Arko Minawi</p>
  <p className="text-gray-600 leading-relaxed">
    . عسكري وسياسي سوداني ، حاكم إقليم دارفور ، ورئيس حركة تحرير السودان 
  </p>
</div>
            </div>

            {/* Figure 7 -  Souleyman Sandel */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <img src="/images/sel.jpg" alt="سليمان صندل" className="rounded-lg shadow-xl w-full h-80 object-cover" />
              </div>
              <div className="md:w-1/2 text-right">
  <div className="inline-block border-r-4 border-[#d78525] pr-4 mb-3">
    <h3 className="text-xl font-bold text-gray-800">سليمان صندل</h3>
  </div>
  <p className="text-base text-[#d78525] mb-3">Souleyman Sandel</p>
  <p className="text-gray-600 leading-relaxed">
   سياسي سوداني والأمين السياسي 
لحركة العدل والمساواة
 السودانية والقيادي بالجبهة الثورية
  </p>
</div>
            </div>

            {/* Figure 8 - Jibril Ibrahim  */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="md:w-1/2">
                <img src="/images/jb.jpg" alt="جبريل خليل إبراهيم" className="rounded-lg shadow-xl w-full h-80 object-cover" />
              </div>
              <div className="md:w-1/2 text-right">
  <div className="inline-block border-r-4 border-[#d78525] pr-4 mb-3">
    <h3 className="text-xl font-bold text-gray-800">جبريل خليل إبراهيم</h3>
  </div>
  <p className="text-base text-[#d78525] mb-3">Jibril Khalil Ibrahim</p>
  <p className="text-gray-600 leading-relaxed">
        سياسي، واقتصادي، يشغل حالياً منصب وزير المالية والتخطيط الاقتصادي ورئيس حركة العدل والمساواة السودانية
  </p>
</div>
            </div>


          

             {/* Figure 11 - Sumaya Musa Harran  */}
             <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="md:w-1/2">
                <img src="/images/Sumaya.jpeg" alt="  سمية موسى حرّان" className="rounded-lg shadow-xl w-full h-80 object-cover" />
              </div>
              <div className="md:w-1/2 text-right">
  <div className="inline-block border-r-4 border-[#d78525] pr-4 mb-3">
    <h3 className="text-xl font-bold text-gray-800">  سمية موسى حرّان  </h3>
  </div>
  <p className="text-base text-[#d78525] mb-3">  Sumaya Musa Harran</p>
  <p className="text-gray-600 leading-relaxed">
  ناشطة في المجتمع المدني
  </p>
</div>
            </div>



            {/* Figure 13 -  Al-Tahir Hajar */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <img src="/images/alta.jpeg" alt=" الطاهر حجر " className="rounded-lg shadow-xl w-full h-80 object-cover" />
              </div>
              <div className="md:w-1/2 text-right">
  <div className="inline-block border-r-4 border-[#d78525] pr-4 mb-3">
    <h3 className="text-xl font-bold text-gray-800">الطاهر حجر  </h3>
  </div>
  <p className="text-base text-[#d78525] mb-3"> Al-Tahir Hajar</p>
  <p className="text-gray-600 leading-relaxed">
  هو سياسي سوداني
  </p>
</div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Programs;