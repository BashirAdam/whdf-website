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
          شعب الزغاوة من الكيانات الكوشية الحامية العريقة التي تعيش في المنطقة، وقد اختلطوا بالشعوب المختلفة في المنطقة خلال المراحل التاريخية لمملكة الزغاوة التي امتدت من نهر النيل إلى الساحل والصحراء شمالًا وغرب إفريقيا. لعب الزغاوة دورًا مهمًا في تاريخ المنطقة، وعُرفوا بالتجارة والرعي والزراعة، ولهم نظام اجتماعي وسياسي متماسك.
          </p>
        </div>






         {/* Who are the Zaghawa People - Full Section */}
         <div className="mb-8 mt-7">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-right border-r-4 border-[#d78525] pr-4" style={{ direction: 'rtl' }}>
          لغة الزغاوة
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify" style={{ direction: 'rtl' }}>
            يتحدث الزغاوة لغة تعرف باسم البريا او بيرا، وهي لغة من فصيلة اللغات النيلية الصحراوية، ولها عدة لهجات محلية. كما يتحدث كثير من الزغاوة العربية كلغة ثانية ، خاصة في السودان والفرنسية في تشاد. ولغة الزغاوة مكتوبة وتتكون من خمس وعشرون حرفآ وله كيبورد خاص به ويتم تدريسه في جامعة كولن بجمهورية المالنيا لطلاب الدراسات العليا . كما يوجد العديد من الكتب عن تعليم لغة الزغاوة . وتم صياغة حروف اللغة من اوشام الابل لدي قومية الزغاوة عن طريق بحث قام الاستاذ ادم تاجر في نهاية القرن الماضي . وتم وضع القواعد وتقنين الحروف بواسطة الطبيب البيطري صديق ادم عيسى خريج جامعة الخرطوم، وكما ساهمت البروفسيرة انجيلا جاكوبي من معهد كولن الالمانية في صياغة القواعد النحوية للغة الزغاوة.
          </p>
        </div>

        {/* Details in two columns */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 rounded-xl p-5">
            <h3 className="font-bold text-gray-800 mb-3 text-right" style={{ direction: 'rtl' }}>
              <Compass className="h-5 w-5 inline-block ml-2 text-[#d78525]" />
              مطورو لغة الزغاوة
            </h3>
            <ul className="space-y-2 text-gray-700" style={{ direction: 'rtl', listStyleType: 'disc', listStylePosition: 'inside' }}>
            <li className="text-right"> 'الأستاذ ادم محمد عبدالله عيسى 'ادم تاجر </li>
              <li className="text-right">الدكتور صديق ادم عيسي</li>
              <li className="text-right">الدكتور محمود ابكر الطيناوي</li>
              <li className="text-right"> الاستاذ الصادق صديق  </li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-xl p-5">
            <h3 className="font-bold text-gray-800 mb-3 text-right" style={{ direction: 'rtl' }}>
              <Languages className="h-5 w-5 inline-block ml-2 text-[#d78525]" />
              أين يقطن الزغاوة
              </h3>
            <ul className="space-y-2 text-gray-700" style={{ direction: 'rtl', listStyleType: 'disc', listStylePosition: 'inside' }}>
            <li className="text-right">    وادي هور   </li>     

              <li className="text-right">   منطقة دار زغاوة (بِرّيبي) الممتدة بين السودان وتشاد: أم برو، الطينة، كرنوي، أشيمي، مزبد، أم حراز، وأنكا وغيرها. </li>     
            
              <li className="text-right"> إقليم دارفور والمدن السودانية الكبرى، خاصة كُتُم، مليط، الفاشر، نيالا، الخرطوم، إضافة إلى انتشارهم في مختلف مدن السودان.</li>
              <li className="text-right"> تشاد ودول الجوار، في إنجمينا، أبشي، وادي فِرا، أم جرس، إلى جانب جاليات  في ليبيا والنيجر ودول أخرى.    </li>
              </ul>
          </div>
        </div>







        {/* Culture & Heritage Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-right border-r-4 border-[#d78525] pr-4" style={{ direction: 'rtl' }}>
            ثقافة وتراث شعب الزغاوة
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify" style={{ direction: 'rtl' }}>
          غنية بالعناصر التراثية تشمل (الاغنيات الحماسية والرقصات الشعبية العديدة بايقاعات نقارة الزغاوة(تسعة ايقاع) والقصص الخيالية والهيموثولجيا، وسباقات الهجن والفروسية في المناسبات الشعبية . وتُعتبر من أعمق الثقافات في المنطقة. تقوم الحياة الاجتماعية على الاحترام المتبادل والترابط القبلي، وتُعد الأسرة النواة الأساسية في بناء المجتمع، بينما تلعب المرأة دورًا محوريًا في الحياة الاجتماعية والسياسية والاقتصادية، حيث تشارك في الزراعة والتجارة والأمور السياسية.

          </p>
          <p className="text-gray-700 leading-relaxed text-justify mt-3" style={{ direction: 'rtl' }}>
          يتميّز الزغاوة بلباسهم التقليدي الذي يجمع بين الأصالة والجمال، مثل الثوب كفملي والعمامة أو الكدمول التي تُعد رمزًا للهوية والوقار. وتتميز اللبس التقليدي للمرأة الزغاوية بالوشاح المزخرف بالنقوش التراثية الكوشية والافريقية والتاج الفضي خاصة في المناسبات الرسمية كما تشتهر مناسباتهم الاجتماعية، خاصة الزواج والحصاد، بالرقصات والأغاني الشعبية التي تعبّر عن الشجاعة، الكرم، والحب والبطولة، وتُؤدى بإيقاعات الطبول والصفير الجماعي.

          </p>
          <p className="text-gray-700 leading-relaxed text-justify mt-3" style={{ direction: 'rtl' }}>
          .ومن أبرز سمات المجتمع الزغاوي نظام "التكافل القبلي" المعروف، وهو شكل من أشكال التعاون الجماعي الذي يعزز روح التضامن. وتُزين أدواتهم المنزلية والأسلحة التقليدية بالنقوش والزخارف التي تحمل رموزًا تشير إلى القوة، الشجاعة، والانتماء القبلي
          </p>
        </div>

        {/* Kingdom Section - Text Only */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-right border-r-4 border-[#d78525] pr-4" style={{ direction: 'rtl' }}>
            
            مملكة الزغاوة التاريخية
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify" style={{ direction: 'rtl' }}>
          ظهرت مملكة الزغاوة المحازية لنهر النيل من الغرب بعد انهيار حضارة كوش ، وكانت تُعرف بـ مملكة كانم ايضا" وامتدت شمالا" الي ليبيا والنيجر وغرب بحيرة تشاد في نيجيريا والكمرون. وتميزت بازدهارها الاقتصادي حيث كانت غنية بالذهب والملح والماشية، واشتهرت بالتجارة مع شمال إفريقيا عبر القوافل التجارية العابرة للصحراء الكبرى حيث أقاموا حاميات ومراكز عبور في الصحراء الكبري بين ليبيا والنيجر والسودان وتشاد . كان ملوكها يُلقبون بـ "كوي" أو "دِرِّي"، وقد عُرفوا بالحكمة والشجاعة والقدرة على التنظيم السياسي والعسكري
          </p>
        </div>

                {/* Dar Zaghawa Region Section - Text Only */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-right border-r-4 border-[#d78525] pr-4" style={{ direction: 'rtl' }}>
            
            إقليم دار زغاوة
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify" style={{ direction: 'rtl' }}>
            هو تصور ثقافي وسياسي يهدف إلى إحياء الهوية التاريخية والجغرافية لشعب الزغاوة في السودان، وجعله إقليمًا إداريًا وتنمويًا يُعرف بـ "إقليم دار زغاوة (إقليم بيربي)". يستند هذا التصور إلى الإرث الحضاري العريق لوادي هور وممالك الزغاوة القديمة، وإلى رغبة الشعب في حماية اللغة والتراث من الاندثار.
          </p>
        </div>




        {/* وادي هور */}
<div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 border border-gray-100">
  <div className="grid md:grid-cols-2 gap-0">
    <div className="h-64 md:h-auto bg-gray-200">
      <img src="/images/wa.jpg" alt="وادي هور" className="w-full h-full object-cover" />
    </div>
    <div className="p-6 md:p-8">
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-right" style={{ direction: 'rtl' }}>وادي هور  </h3>
      <p className="text-gray-700 leading-relaxed text-justify mb-4" style={{ direction: 'rtl' }}>
      يُعد وادي هور واحداً من أكبر الأودية الجافة في الصحراء الكبرى. وكان في العصور القديمة نهراً حيوياً يربط بين تشاد ونهر النيل في السودان. يمتد الوادي على مسافة تزيد عن ١٢٠٠ كلم، وينحدر من مرتفعات إنيدي شرق تشاد مروراً بدار زغاوة حتى المصب بنهر النيل عند منطقة الدبة. كان الوادي يُعرف قديماً بـ "النهر الأصفر" لكونه الرافد الرئيسي لنهر النيل من الصحراء الشرقية، وشرياناً مائياً غنياً وفر بيئة خصبة للاستقرار البشري والحياة البرية قبل أن يجف تماماً.
      </p>

    </div>
  </div>
</div>

               {/* Wadi Hur Civilization Section - Text Only */}
<div className="mb-8">
  <h2 className="text-xl font-bold text-gray-800 mb-4 text-right border-r-4 border-[#d78525] pr-4" style={{ direction: 'rtl' }}>
    حضارة وادي هور
  </h2>

  <div className="space-y-6">
    {/* الفقرة الرئيسية */}
    <p className="text-gray-700 leading-relaxed text-justify" style={{ direction: 'rtl' }}>
      حضارة وادي هور ازدهرت على ضفاف وادي هور العريقة منذ الألفية الرابعة قبل الميلاد، تاركة إرثاً أثرياً ضخماً من المستوطنات و الفخار والنقوش الصخرية التي تؤكد استيطان مجموعات بشرية رعوية وزراعية متطورة.
    </p>

    <p className="text-gray-700 leading-relaxed text-justify" style={{ direction: 'rtl' }}>
      يُعتبر وادي هور أحد أقدم المراكز الحضارية في إفريقيا، وكان في العصور القديمة نهرًا عظيمًا يتدفق من شمال دارفور حتى النيل. حول هذا الوادي قامت حضارات قديمة جداً، ويرى بعض الباحثين أن حضارة وادي هور كانت الجسر الذي وصل بين حضارة النوبة والنيل وبين ممالك إفريقيا الداخلية مثل كانم.
    </p>

    {/* الأهمية التاريخية والأثرية */}
    <div>
      <h3 className="text-base font-semibold text-gray-800 mb-3 text-right" style={{ direction: 'rtl' }}>
        الأهمية التاريخية والأثرية والاستيطان البشري
      </h3>
      <p className="text-gray-700 leading-relaxed text-justify mb-4" style={{ direction: 'rtl' }}>
        تؤكد الاكتشافات الأثرية (مثل أبحاث متحف بوزنان للآثار وجامعة كولن بجمهورية ألمانيا) أن المنطقة كانت مأهولة بالسكان منذ العصر الحجري، حيث ازدهرت حضارة متأثرة بالممالك الكوشية.
      </p>
    </div>

    {/* الاقتصاد والمجتمع */}
    <div>
      <h3 className="text-base font-semibold text-gray-800 mb-3 text-right" style={{ direction: 'rtl' }}>
        الاقتصاد والمجتمع
      </h3>
      <p className="text-gray-700 leading-relaxed text-justify" style={{ direction: 'rtl' }}>
        اعتمد سكان الوادي الأوائل على الرعي والزراعة واستئناس الحيوانات، وصناعة الفخار المتميز، وتركوا العديد من النقوش الصخرية التي توثق حياتهم اليومية وعلاقتهم بالبيئة النهرية.
      </p>
    </div>

    {/* الربط الحضاري */}
    <div>
      <h3 className="text-base font-semibold text-gray-800 mb-3 text-right" style={{ direction: 'rtl' }}>
        الربط الحضاري
      </h3>
      <p className="text-gray-700 leading-relaxed text-justify" style={{ direction: 'rtl' }}>
        لعب الوادي دوراً مهماً كممر تجاري وحلقة وصل استراتيجية بين وسط إفريقيا ووادي النيل، مما ساهم في ازدهار الحضارات النوبية القديمة.
      </p>
    </div>

    {/* الوضع الحالي */}
    <div>
      <h3 className="text-base font-semibold text-gray-800 mb-3 text-right" style={{ direction: 'rtl' }}>
        الوضع الحالي للوادي
      </h3>
      <p className="text-gray-700 leading-relaxed text-justify" style={{ direction: 'rtl' }}>
        يمثل وادي هور اليوم واحداً من أكبر المنتزهات الوطنية في العالم، ورغم جفافه السطحي إلا أنه لا يزال يشكل مورداً حيوياً للرعاة الرحل والمواشي خلال مواسم الأمطار. يحتضن الوادي مواقع أثرية بالغة الأهمية مسجلة في الخريطة الأثرية السودانية، وقد تم إعلان وادي هور محمية طبيعية عالمية من منظمة اليونسكو التابعة للأمم المتحدة.
      </p>
    </div>

    {/* النقاط الرئيسية (محدثة) */}
    <ul className="space-y-2 text-gray-700 pr-5 list-disc" style={{ direction: 'rtl', listStylePosition: 'inside' }}>
      <li>الزراعة والرعي</li>
      <li>التجارة بين الصحراء الكبرى ووادي النيل</li>
      <li>بناء المدن والقرى والممالك المحلية</li>
      <li>النقوش الصخرية والفخار كشواهد حضارية</li>
      <li>دور استراتيجي كممر تجاري بين إفريقيا الوسطى ووادي النيل</li>
    </ul>
  </div>
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
         تستخدم كرمز للهوية التاريخية والوحدة المجتمعية لشعب الزغاوة. فكرة انشاء العلم وتصميمه وتنفيذه من قبل جبهة وادي هور الديمقراطية و يتكون العلم من:
      </p>
      <ul className="space-y-2 text-gray-700" style={{ direction: 'rtl', listStyleType: 'disc', listStylePosition: 'inside' }}>
        <li className="text-right">اللون البني الداكن: الإقليم محمي بدماء شهدائه</li>
        <li className="text-right">أصفر خردلي: يرمز للصحراء</li>
        <li className="text-right">اللون الأخضر: يرمز لوادي هور والثراء الزراعي</li>
        <li className="text-right">النجمة: ترمز للحرية والمستقبل</li>
        <li className="text-right">الأربعة حروف: تعني كلمة باريا (لغة الزغاوة)</li>
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
                <img src="/images/idres.jpeg" alt="إدريس ديبي إتنو" className="rounded-lg shadow-xl w-full h-80 object-cover" />
              </div>
              <div className="md:w-1/2 text-right">
  <div className="inline-block border-r-4 border-[#d78525] pr-4 mb-3">
    <h3 className="text-xl font-bold text-gray-800">إدريس ديبي إتنو</h3>
  </div>
  <p className="text-base text-[#d78525] mb-3">Idriss Déby</p>
  <p className="text-gray-600 leading-relaxed">
    رئيس جمهورية تشاد السابق وأبرز زعماء الزغاوي في التاريخ الحديث، حكم تشاد منذ عام 1990 حتى عام 2021
  </p>
</div>
            </div>


             {/* Figure 4 -Adam Tajir*/}
             <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="md:w-1/2">
                <img src="/images/adam.jpeg" alt="   الأستاذ آدم تاجر      " className="rounded-lg shadow-xl w-full h-80 object-cover" />
              </div>
              <div className="md:w-1/2 text-right">
  <div className="inline-block border-r-4 border-[#d78525] pr-4 mb-3">
    <h3 className="text-xl font-bold text-gray-800">   الأستاذ آدم تاجر     </h3>
  </div>
  <p className="text-base text-[#d78525] mb-3">Adam Tajir</p>
  <p className="text-gray-600 leading-relaxed">
  الاستاذ ادم تاجر شخصية معروفة في جهود تطوير لغة الزغاوة في السودان وتشاد . وينسب له وضع  الحروف الاولية للغة المستوحاة من اوشام الابل . تولى الدكتور صديق ادم عيسى لاحقا مهمة تطوير وتقنين اللغة لاحقا بعد وفاة تاجر . ويحتفى بذكراه  سنويآ في 21 فبراير كيوم عالمي للغة المعتمدة لدي اليونسكو والأمم المتحدة 
    </p>
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



            {/* Figure 3 - Moussa Faki */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <img src="/images/musa.jpg" alt=" موسى فكي  " className="rounded-lg shadow-xl w-full h-80 object-cover" />
              </div>
              <div className="md:w-1/2 text-right">
  <div className="inline-block border-r-4 border-[#d78525] pr-4 mb-3">
    <h3 className="text-xl font-bold text-gray-800">  موسى فكي   </h3>
  </div>
  <p className="text-base text-[#d78525] mb-3">Moussa Faki</p>
  <p className="text-gray-600 leading-relaxed">
  رئيس مفوضية الاتحاد الأفريقي السابق، ورئيس وزراء تشاد السابق
  </p>
</div>
            </div>

             {/* Figure 10 - Sherif Hariri  */}
             <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="md:w-1/2">
                <img src="/images/sharif.jpeg" alt="   دكتور شريف حرير   " className="rounded-lg shadow-xl w-full h-80 object-cover" />
              </div>
              <div className="md:w-1/2 text-right">
  <div className="inline-block border-r-4 border-[#d78525] pr-4 mb-3">
    <h3 className="text-xl font-bold text-gray-800"> دكتور شريف حرير     </h3>
  </div>
  <p className="text-base text-[#d78525] mb-3"> Dr. Sherif Hariri</p>
  <p className="text-gray-600 leading-relaxed">
  أكاديمي وباحث سوداني متخصص في الأنثروبولوجيا عمل أستاذًا في جامعة الخرطوم وكذلك في جامعة بيرغن بالنرويج
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
    رئيس جمهورية تشاد الحالي ونجل الرئيس الراحل إدريس ديبي. تولى الحكم عام 2021
  </p>
</div>
            </div>
            
            {/* Figure 11 -  Mohamed Ahmed El Sheikh */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="md:w-1/2">
                <img src="/images/mo.jpeg" alt="        البروفيسور محمد أحمد علي الشيخ" className="rounded-lg shadow-xl w-full h-80 object-cover" />
              </div>
              <div className="md:w-1/2 text-right">
  <div className="inline-block border-r-4 border-[#d78525] pr-4 mb-3">
    <h3 className="text-xl font-bold text-gray-800">      البروفيسور محمد أحمد علي الشيخ    </h3>
  </div>
  <p className="text-base text-[#d78525] mb-3">  Prof. Mohamed Ahmed Ali Al-Sheikh</p>
  <p className="text-gray-600 leading-relaxed">
  مدير جامعة الخرطوم الأسبق اول الشهادة السودانية عام 1964

  </p>
</div>
            </div>


            {/* Figure 7 -  Dr. Abubakr Bargou */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <img src="/images/bargo.png" alt="الدكتور ابوبكر برقو   " className="rounded-lg shadow-xl w-full h-80 object-cover" />
              </div>
              <div className="md:w-1/2 text-right">
  <div className="inline-block border-r-4 border-[#d78525] pr-4 mb-3">
    <h3 className="text-xl font-bold text-gray-800">  الدكتور ابوبكر برقو  </h3>
  </div>
  <p className="text-base text-[#d78525] mb-3">Dr. Abubakr Bargou</p>
  <p 
  className="text-gray-600 leading-relaxed text-justify rtl:text-right" 
  dir="rtl"
  lang="ar"
>
  دكتوراة في الإعلام من الجامعة الاميركية بالقاهرة، المستشار الإعلامي الأسبق للرئيس الراحل إدريس ديبي والمستشار المكلف بالبعثات الدبلوماسية السابق للرئيس محمد إدريس ديبي. رئيس أتحاد التلفزة الأفريقي ومؤسس اذاعة النصر (كأول مؤسس إذاعة وتلفزيون من أبناء الكيان)، وكاتب ومحلل سياسي متخصص في الشؤون الأفريقية
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
    <h3 className="text-xl font-bold text-gray-800">الدكتور والجنرال يوسف تيارا </h3>
  </div>
  <p className="text-base text-[#d78525] mb-3">Dr. and General Youssef Tiara</p>
  <p className="text-gray-600 leading-relaxed">
  رئيس جمعية حماية التراث الثقافي للزغاوة حول العالم ومستشار الرئيس التشادي محمد إدريس ديبي، دكتور وجنرال في الجيش التشادي ولديه الكثير من المؤلفات
    
  </p>
</div>
            </div>



            {/* Figure 7 -  Zakaria Fadl Kater */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <img src="/images/pro_Snap.jpeg" alt="  البروفيسور زكريا فضل كتر    " className="rounded-lg shadow-xl w-full h-80 object-cover" />
              </div>
              <div className="md:w-1/2 text-right">
  <div className="inline-block border-r-4 border-[#d78525] pr-4 mb-3">
    <h3 className="text-xl font-bold text-gray-800">   البروفيسور زكريا فضل كتر    </h3>
  </div>
  <p className="text-base text-[#d78525] mb-3">Prof. Zakaria Fadl Kater</p>
  <p className="text-gray-600 leading-relaxed">
    اكاديمي وكاتب ودبلوماسي، شغل منصب وزير التعليم العالي التشادي وغيرها من المناصب الاكاديمية والدبلوماسية
  </p>
</div>
            </div>

             


            {/* Figure 4 - Dr. Ezz El-Din Asso */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="md:w-1/2">
                <img src="/images/Asso.png" alt="   دكتور عزالدين أسو   " className="rounded-lg shadow-xl w-full h-80 object-cover" />
              </div>
              <div className="md:w-1/2 text-right">
  <div className="inline-block border-r-4 border-[#d78525] pr-4 mb-3">
    <h3 className="text-xl font-bold text-gray-800">دكتور عزالدين أسو       </h3>
  </div>
  <p className="text-base text-[#d78525] mb-3">Dr. Ezz el-Din Asso</p>
  <p className="text-gray-600 leading-relaxed">
  اختصاصي الجراحه العامة،  مدير عام مستشفى الفاشر الجنوبي
    
    </p>
</div>
            </div>



            
            {/* Figure 7 - Madiha Hassan */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <img src="/images/mad.jpeg" alt="    مديحة حسن  " className="rounded-lg shadow-xl w-full h-80 object-cover" />
              </div>
              <div className="md:w-1/2 text-right">
  <div className="inline-block border-r-4 border-[#d78525] pr-4 mb-3">
    <h3 className="text-xl font-bold text-gray-800">   مديحة حسن   </h3>
  </div>
  <p className="text-base text-[#d78525] mb-3">Madiha Hassan</p>
  <p className="text-gray-600 leading-relaxed">
   مستقلة و ناشطة في المجتمع المدني، ومدافعه عن حقوق اللاجئين
  </p>
</div>
            </div>

            
            {/* Figure 4 -Dr. Siddig Adam Issa */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="md:w-1/2">
                <img src="/images/Siddig.png" alt="   الدكتور صديق أدم عيسي     " className="rounded-lg shadow-xl w-full h-80 object-cover" />
              </div>
              <div className="md:w-1/2 text-right">
  <div className="inline-block border-r-4 border-[#d78525] pr-4 mb-3">
    <h3 className="text-xl font-bold text-gray-800">  الدكتور صديق أدم عيسي       </h3>
  </div>
  <p className="text-base text-[#d78525] mb-3">Dr. Siddig Adam Issa</p>
  <p className="text-gray-600 leading-relaxed">
     الدكتور صديق ادم عيسي من الشخصيات التي ساهمت في تطوير لغة الزغاوة
    
    </p>
</div>
            </div>



             {/* Figure 7 - Dr. Khalil Ibrahim */}
             <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <img src="/images/kahlil.jpg" alt="   دكتور خليل إبراهيم  " className="rounded-lg shadow-xl w-full h-80 object-cover" />
              </div>
              <div className="md:w-1/2 text-right">
  <div className="inline-block border-r-4 border-[#d78525] pr-4 mb-3">
    <h3 className="text-xl font-bold text-gray-800">     دكتور خليل إبراهيم   </h3>
  </div>
  <p className="text-base text-[#d78525] mb-3"> Dr. Khalil Ibrahim</p>
  <p className="text-gray-600 leading-relaxed">
  طبيب وسياسي سوداني مؤسس حركة العدل والمساواة وأبرز قادة الكفاح المسلح في دارفور


  </p>
</div>
            </div>



              {/* Figure 4 -Najla Amer*/}
             <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="md:w-1/2">
                <img src="/images/naj.jpg" alt="      نجلاء عامر    " className="rounded-lg shadow-xl w-full h-80 object-cover" />
              </div>
              <div className="md:w-1/2 text-right">
  <div className="inline-block border-r-4 border-[#d78525] pr-4 mb-3">
    <h3 className="text-xl font-bold text-gray-800">   نجلاء عامر      </h3>
  </div>
  <p className="text-base text-[#d78525] mb-3">Najla Amer</p>
  <p className="text-gray-600 leading-relaxed">
  الأستاذة نجلاء عامر نعمان ناشطة في التراث ورئيس اللجنة الاستشارية لرابطة أبناء الزغاوة بمصر
    
    </p>
</div>
            </div>


            {/* Figure 7 - Al-Sadiq Siddiq */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <img src="/images/language.jpeg" alt="   الصادق صديق  " className="rounded-lg shadow-xl w-full h-80 object-cover" />
              </div>
              <div className="md:w-1/2 text-right">
  <div className="inline-block border-r-4 border-[#d78525] pr-4 mb-3">
    <h3 className="text-xl font-bold text-gray-800"> الصادق صديق    </h3>
  </div>
  <p className="text-base text-[#d78525] mb-3"> Al-Sadiq Siddiq</p>
  <p className="text-gray-600 leading-relaxed">
   الاستاذ الصادق صديق من الشخصيات التي ساهمت بشكل كبير ومباشر في تطوير لغة البريا 
  </p>
</div>
            </div>


            {/* Figure 4 -محي الدين بخيت جمعة*/}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="md:w-1/2">
                <img src="/images/majack.jpeg" alt="      محي الدين بخيت جمعة     " className="rounded-lg shadow-xl w-full h-80 object-cover" />
              </div>
              <div className="md:w-1/2 text-right">
  <div className="inline-block border-r-4 border-[#d78525] pr-4 mb-3">
    <h3 className="text-xl font-bold text-gray-800">   محي الدين بخيت جمعة     </h3>
  </div>
  <p className="text-base text-[#d78525] mb-3"> Muhyiddin Bakhit Juma</p>
  <p className="text-gray-600 leading-relaxed" style={{ direction: 'rtl', textAlign: 'right' }}>
  الاستاذ محي الدين بخيت جمعة 'مجك' مدير قناة بري بور <span dir="ltr">TV</span>
</p>
</div>
            </div>



            {/* Figure 7 - Saif Al-Prof*/}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <img src="/images/save.jpeg" alt="   سيف البروف    " className="rounded-lg shadow-xl w-full h-80 object-cover" />
              </div>
              <div className="md:w-1/2 text-right">
  <div className="inline-block border-r-4 border-[#d78525] pr-4 mb-3">
    <h3 className="text-xl font-bold text-gray-800"> سيف البروف      </h3>
  </div>
  <p className="text-base text-[#d78525] mb-3"> Saif Al-Prof</p>
  <p className="text-gray-600 leading-relaxed">
    سيف البروف رئيس رابطة ابناء الزغاوة بجمهورية مصر ومدير شبكة سودازول الاعلامية
  </p>
</div>
            </div>


            {/* Figure 4 - Sumaya Musa Harran  */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="md:w-1/2">
                <img src="/images/Sumaya.jpeg" alt="   سمية موسى حران       " className="rounded-lg shadow-xl w-full h-80 object-cover" />
              </div>
              <div className="md:w-1/2 text-right">
  <div className="inline-block border-r-4 border-[#d78525] pr-4 mb-3">
    <h3 className="text-xl font-bold text-gray-800">   سمية موسى حران      </h3>
  </div>
  <p className="text-base text-[#d78525] mb-3"> Sumaya Musa Harran </p>
  <p className="text-gray-600 leading-relaxed" style={{ direction: 'rtl', textAlign: 'right' }}>
  مستقلة و ناشطة في المجتمع المدني، ومساهمة في نشر الوعي الحقوقي وبناء السلام

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