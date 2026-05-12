// Home Remedies Data - Part 1 (Digestive, Respiratory, Pain)
const remediesPart1 = [
  {
    category: "Digestive Issues",
    icon: "🫃",
    conditions: [
      {
        name: "Acidity / Acid Reflux",
        keywords: ["acidity","acid reflux","heartburn","burning chest","sour stomach","gerd"],
        severity: "mild",
        remedies: [
          { title: "Cold Milk", desc: "Drink a glass of cold milk to neutralize stomach acid instantly.", ingredients: ["Cold milk"], steps: ["Pour a glass of cold milk","Drink slowly on empty or after meals"], duration: "Instant relief" },
          { title: "Baking Soda Water", desc: "Mix 1/2 tsp baking soda in water to neutralize acid.", ingredients: ["Baking soda","Water"], steps: ["Mix 1/2 tsp baking soda in a glass of water","Drink after meals"], duration: "5-10 min" },
          { title: "Banana", desc: "Bananas are natural antacids that coat the stomach lining.", ingredients: ["Ripe banana"], steps: ["Eat 1 ripe banana when symptoms appear"], duration: "15-30 min" },
          { title: "Fennel Seeds", desc: "Chew fennel seeds or drink fennel tea after meals.", ingredients: ["Fennel seeds"], steps: ["Chew 1 tsp fennel seeds after meals","Or boil in water for tea"], duration: "15 min" },
          { title: "Aloe Vera Juice", desc: "Aloe vera soothes the esophagus and reduces inflammation.", ingredients: ["Aloe vera juice"], steps: ["Drink 1/4 cup aloe vera juice before meals"], duration: "20-30 min" }
        ]
      },
      {
        name: "Indigestion",
        keywords: ["indigestion","bloating","heavy stomach","cant digest","stomach full","dyspepsia"],
        severity: "mild",
        remedies: [
          { title: "Ginger Tea", desc: "Ginger stimulates digestive enzymes and reduces bloating.", ingredients: ["Fresh ginger","Water","Honey"], steps: ["Boil ginger slices in water for 5 min","Add honey","Drink warm"], duration: "20 min" },
          { title: "Apple Cider Vinegar", desc: "ACV helps balance stomach pH and aids digestion.", ingredients: ["Apple cider vinegar","Water"], steps: ["Mix 1 tbsp ACV in warm water","Drink before meals"], duration: "15-20 min" },
          { title: "Ajwain (Carom Seeds)", desc: "Carom seeds release thymol which aids digestion.", ingredients: ["Ajwain seeds","Water"], steps: ["Chew 1 tsp ajwain with warm water","Or boil in water and drink"], duration: "10-15 min" },
          { title: "Peppermint Tea", desc: "Peppermint relaxes digestive muscles and relieves gas.", ingredients: ["Peppermint leaves","Hot water"], steps: ["Steep peppermint in hot water 5 min","Drink after meals"], duration: "15 min" }
        ]
      },
      {
        name: "Constipation",
        keywords: ["constipation","hard stool","cant pass stool","irregular bowel","not pooping","blocked"],
        severity: "mild",
        remedies: [
          { title: "Warm Lemon Water", desc: "Warm lemon water stimulates bowel movement in the morning.", ingredients: ["Lemon","Warm water"], steps: ["Squeeze half lemon in warm water","Drink first thing in morning"], duration: "30-60 min" },
          { title: "Isabgol (Psyllium Husk)", desc: "Psyllium adds bulk to stool and promotes regularity.", ingredients: ["Isabgol","Warm milk or water"], steps: ["Mix 2 tsp isabgol in warm milk","Drink before bedtime"], duration: "6-8 hours" },
          { title: "Triphala Powder", desc: "Ayurvedic blend that gently cleanses the digestive tract.", ingredients: ["Triphala powder","Warm water"], steps: ["Mix 1 tsp in warm water","Drink before bed"], duration: "6-8 hours" },
          { title: "Olive Oil", desc: "Olive oil lubricates the digestive system.", ingredients: ["Extra virgin olive oil"], steps: ["Take 1 tbsp olive oil on empty stomach in morning"], duration: "1-2 hours" },
          { title: "Prune Juice", desc: "Natural laxative rich in fiber and sorbitol.", ingredients: ["Prune juice"], steps: ["Drink 1 glass of prune juice in morning"], duration: "2-4 hours" }
        ]
      },
      {
        name: "Diarrhea",
        keywords: ["diarrhea","loose motion","watery stool","running stomach","frequent stool","loose stool"],
        severity: "moderate",
        remedies: [
          { title: "ORS Solution", desc: "Oral rehydration salts to prevent dehydration.", ingredients: ["Salt","Sugar","Water"], steps: ["Mix 6 tsp sugar + 1/2 tsp salt in 1L water","Sip frequently"], duration: "Ongoing" },
          { title: "BRAT Diet", desc: "Bananas, Rice, Applesauce, Toast — easy to digest foods.", ingredients: ["Bananas","Rice","Applesauce","Toast"], steps: ["Eat only BRAT foods for 24-48 hours","Gradually add other foods"], duration: "1-2 days" },
          { title: "Pomegranate Juice", desc: "Pomegranate has astringent properties that help firm stools.", ingredients: ["Pomegranate"], steps: ["Drink fresh pomegranate juice 2-3 times a day"], duration: "1-2 days" },
          { title: "Curd with Rice", desc: "Probiotics in curd restore gut flora balance.", ingredients: ["Plain curd","Cooked rice"], steps: ["Mix curd with plain rice","Eat 2-3 times a day"], duration: "1-2 days" }
        ]
      },
      {
        name: "Gas & Flatulence",
        keywords: ["gas","flatulence","bloating","stomach gas","farting","burping","belching"],
        severity: "mild",
        remedies: [
          { title: "Asafoetida (Hing) Water", desc: "Hing is a powerful anti-flatulent used in Ayurveda.", ingredients: ["Asafoetida","Warm water"], steps: ["Mix pinch of hing in warm water","Drink after meals"], duration: "10-15 min" },
          { title: "Cumin Water (Jeera)", desc: "Cumin stimulates digestive enzymes and reduces gas.", ingredients: ["Cumin seeds","Water"], steps: ["Boil 1 tsp cumin in water for 5 min","Strain and drink warm"], duration: "15-20 min" },
          { title: "Walking After Meals", desc: "A 10-15 min walk helps gas move through the digestive tract.", ingredients: [], steps: ["Walk slowly for 10-15 min after eating","Avoid lying down immediately"], duration: "15 min" }
        ]
      },
      {
        name: "Nausea & Vomiting",
        keywords: ["nausea","vomiting","feeling sick","want to vomit","throwing up","morning sickness","queasy"],
        severity: "moderate",
        remedies: [
          { title: "Ginger", desc: "Ginger is one of the most effective natural anti-nausea remedies.", ingredients: ["Fresh ginger"], steps: ["Chew small piece of ginger","Or drink ginger tea","Or smell fresh ginger"], duration: "10-20 min" },
          { title: "Peppermint", desc: "Peppermint aroma and tea can calm nausea quickly.", ingredients: ["Peppermint leaves or oil"], steps: ["Inhale peppermint oil","Or drink peppermint tea"], duration: "5-15 min" },
          { title: "Lemon", desc: "Citrus scent and vitamin C help settle the stomach.", ingredients: ["Fresh lemon"], steps: ["Smell a cut lemon","Or sip lemon water slowly"], duration: "5-10 min" },
          { title: "Rice Water", desc: "Starchy rice water soothes the stomach lining.", ingredients: ["Rice","Water"], steps: ["Boil rice in extra water","Strain and sip the water slowly"], duration: "15-20 min" }
        ]
      },
      {
        name: "Stomach Ulcer",
        keywords: ["stomach ulcer","peptic ulcer","burning stomach","stomach pain after eating","ulcer"],
        severity: "serious",
        remedies: [
          { title: "Cabbage Juice", desc: "Cabbage contains vitamin U which helps heal ulcer lining.", ingredients: ["Fresh cabbage","Water"], steps: ["Blend cabbage with water","Drink 1/2 cup before meals, twice daily"], duration: "2-3 weeks" },
          { title: "Honey", desc: "Raw honey has antibacterial properties against H. pylori.", ingredients: ["Raw honey"], steps: ["Take 1 tbsp raw honey on empty stomach daily"], duration: "Ongoing" },
          { title: "Coconut Water", desc: "Coconut water soothes and heals the stomach lining.", ingredients: ["Fresh coconut water"], steps: ["Drink 2-3 glasses of coconut water daily"], duration: "1-2 weeks" }
        ]
      }
    ]
  },
  {
    category: "Respiratory Issues",
    icon: "🫁",
    conditions: [
      {
        name: "Common Cold",
        keywords: ["cold","runny nose","sneezing","stuffy nose","nasal congestion","common cold","blocked nose"],
        severity: "mild",
        remedies: [
          { title: "Honey & Lemon in Warm Water", desc: "Soothes throat and boosts immunity with vitamin C.", ingredients: ["Honey","Lemon","Warm water"], steps: ["Mix 1 tbsp honey + juice of half lemon in warm water","Drink 2-3 times daily"], duration: "3-5 days" },
          { title: "Steam Inhalation", desc: "Steam loosens mucus and opens nasal passages.", ingredients: ["Hot water","Eucalyptus oil (optional)"], steps: ["Boil water in a bowl","Add 2-3 drops eucalyptus oil","Cover head with towel and inhale for 10 min"], duration: "Instant" },
          { title: "Turmeric Milk (Golden Milk)", desc: "Turmeric has anti-inflammatory and antiviral properties.", ingredients: ["Turmeric","Milk","Black pepper","Honey"], steps: ["Heat milk with 1 tsp turmeric and pinch of pepper","Add honey","Drink before bed"], duration: "3-5 days" },
          { title: "Garlic Soup", desc: "Garlic has allicin, a powerful antimicrobial compound.", ingredients: ["Garlic cloves","Water","Butter"], steps: ["Crush 4-5 garlic cloves","Sauté in butter, add water","Simmer and drink warm"], duration: "2-3 days" },
          { title: "Saltwater Gargle", desc: "Reduces throat inflammation and kills bacteria.", ingredients: ["Salt","Warm water"], steps: ["Mix 1/2 tsp salt in warm water","Gargle for 30 seconds","Repeat 3-4 times daily"], duration: "1-2 days" }
        ]
      },
      {
        name: "Cough",
        keywords: ["cough","dry cough","wet cough","persistent cough","coughing","throat irritation","chest cough"],
        severity: "mild",
        remedies: [
          { title: "Honey", desc: "Honey coats the throat and suppresses cough reflex.", ingredients: ["Raw honey"], steps: ["Take 1 tbsp honey directly","Or mix in warm water","Take before bedtime"], duration: "Overnight" },
          { title: "Tulsi (Holy Basil) Tea", desc: "Tulsi has expectorant properties that clear mucus.", ingredients: ["Tulsi leaves","Water","Honey"], steps: ["Boil 8-10 tulsi leaves in water","Strain, add honey","Drink 2-3 times daily"], duration: "2-3 days" },
          { title: "Black Pepper & Honey", desc: "Black pepper stimulates circulation and mucus flow.", ingredients: ["Black pepper powder","Honey"], steps: ["Mix 1/4 tsp pepper in 1 tbsp honey","Take 2-3 times daily after meals"], duration: "2-3 days" },
          { title: "Ginger & Honey", desc: "Ginger is anti-inflammatory and suppresses cough.", ingredients: ["Fresh ginger","Honey"], steps: ["Extract ginger juice","Mix with equal honey","Take 1 tsp 3 times daily"], duration: "2-3 days" }
        ]
      },
      {
        name: "Sore Throat",
        keywords: ["sore throat","throat pain","scratchy throat","painful swallowing","throat infection","strep"],
        severity: "mild",
        remedies: [
          { title: "Saltwater Gargle", desc: "Salt draws out excess fluid and reduces swelling.", ingredients: ["Salt","Warm water"], steps: ["Dissolve 1/2 tsp salt in warm water","Gargle 30 seconds, spit","Repeat every 2-3 hours"], duration: "1-2 days" },
          { title: "Licorice Root Tea", desc: "Licorice soothes and coats an irritated throat.", ingredients: ["Licorice root","Water"], steps: ["Steep licorice root in boiling water 5 min","Strain and sip slowly"], duration: "1-2 days" },
          { title: "Warm Honey-Ginger Tea", desc: "Combines antibacterial honey with anti-inflammatory ginger.", ingredients: ["Ginger","Honey","Water"], steps: ["Boil ginger in water 5 min","Add 1 tbsp honey","Drink warm"], duration: "1-2 days" }
        ]
      },
      {
        name: "Sinus Congestion",
        keywords: ["sinus","sinusitis","blocked sinus","sinus pressure","sinus headache","congestion","stuffy"],
        severity: "moderate",
        remedies: [
          { title: "Neti Pot Saline Rinse", desc: "Flushes out mucus and allergens from nasal passages.", ingredients: ["Neti pot","Distilled water","Salt"], steps: ["Mix 1/4 tsp salt in warm distilled water","Pour through one nostril, drain other","Repeat both sides"], duration: "Instant" },
          { title: "Steam with Eucalyptus", desc: "Opens blocked sinuses and reduces inflammation.", ingredients: ["Hot water","Eucalyptus oil"], steps: ["Add 5 drops oil to bowl of hot water","Inhale steam under towel for 10 min","Repeat 2-3 times daily"], duration: "30 min" },
          { title: "Spicy Foods", desc: "Capsaicin in spicy foods thins mucus and opens passages.", ingredients: ["Cayenne pepper or hot sauce"], steps: ["Add cayenne to soup or warm water","Drink/eat to promote drainage"], duration: "15-30 min" }
        ]
      },
      {
        name: "Asthma (mild relief)",
        keywords: ["asthma","breathing difficulty","wheezing","shortness of breath","chest tightness","bronchial"],
        severity: "serious",
        remedies: [
          { title: "Breathing Exercises", desc: "Pursed lip and diaphragmatic breathing ease symptoms.", ingredients: [], steps: ["Breathe in through nose for 4 counts","Purse lips, breathe out for 8 counts","Practice 10 min daily"], duration: "Ongoing" },
          { title: "Coffee/Caffeine", desc: "Caffeine acts as a mild bronchodilator for up to 4 hours.", ingredients: ["Black coffee"], steps: ["Drink 1-2 cups of strong black coffee","Use during mild episodes only"], duration: "1-4 hours" },
          { title: "Honey & Black Pepper", desc: "Clears airways and reduces bronchial inflammation.", ingredients: ["Honey","Black pepper"], steps: ["Mix 1 tsp honey with pinch of black pepper","Take before bed"], duration: "Ongoing" }
        ]
      },
      {
        name: "Bronchitis",
        keywords: ["bronchitis","chest infection","mucus cough","chest congestion","bronchial","phlegm"],
        severity: "moderate",
        remedies: [
          { title: "Ginger-Turmeric Tea", desc: "Anti-inflammatory combo that clears bronchial tubes.", ingredients: ["Ginger","Turmeric","Honey","Water"], steps: ["Boil ginger+turmeric in water","Add honey","Drink 3 times daily"], duration: "5-7 days" },
          { title: "Warm Salt Water Gargle", desc: "Helps clear mucus from the throat and upper airways.", ingredients: ["Salt","Warm water"], steps: ["Gargle every 3-4 hours","Spit out the water"], duration: "3-5 days" },
          { title: "Eucalyptus Oil Steam", desc: "Eucalyptol compound acts as a natural expectorant.", ingredients: ["Eucalyptus oil","Hot water"], steps: ["Add to hot water, inhale steam","Or apply diluted to chest"], duration: "Ongoing" }
        ]
      }
    ]
  },
  {
    category: "Pain & Inflammation",
    icon: "🩹",
    conditions: [
      {
        name: "Headache",
        keywords: ["headache","head pain","migraine","tension headache","throbbing head","head hurts"],
        severity: "mild",
        remedies: [
          { title: "Peppermint Oil", desc: "Menthol in peppermint relaxes muscles and eases pain.", ingredients: ["Peppermint essential oil"], steps: ["Dilute with carrier oil","Apply to temples and forehead","Massage gently for 5 min"], duration: "15-30 min" },
          { title: "Cold Compress", desc: "Constricts blood vessels and numbs the pain.", ingredients: ["Ice pack or cold cloth"], steps: ["Apply to forehead or back of neck","Keep for 15 min","Repeat as needed"], duration: "15-20 min" },
          { title: "Ginger Tea", desc: "Ginger blocks prostaglandins that cause pain.", ingredients: ["Fresh ginger","Water"], steps: ["Boil ginger slices for 10 min","Drink warm"], duration: "30 min" },
          { title: "Hydration", desc: "Dehydration is a common cause of headaches.", ingredients: ["Water"], steps: ["Drink 2-3 glasses of water slowly","Rest in a dark room"], duration: "30-60 min" }
        ]
      },
      {
        name: "Back Pain",
        keywords: ["back pain","lower back","upper back","spine pain","backache","back hurts","lumbar"],
        severity: "moderate",
        remedies: [
          { title: "Hot/Cold Therapy", desc: "Alternating heat and cold reduces inflammation and pain.", ingredients: ["Hot water bottle","Ice pack"], steps: ["Apply ice for 20 min first","Then heat for 20 min","Repeat 2-3 times daily"], duration: "30-60 min" },
          { title: "Epsom Salt Bath", desc: "Magnesium in epsom salt relaxes muscles and reduces pain.", ingredients: ["Epsom salt","Warm bath water"], steps: ["Add 2 cups epsom salt to warm bath","Soak for 20-30 min"], duration: "30-60 min" },
          { title: "Turmeric Paste", desc: "Curcumin is a powerful natural anti-inflammatory.", ingredients: ["Turmeric","Coconut oil"], steps: ["Make paste of turmeric and oil","Apply to painful area","Leave for 30 min"], duration: "30-60 min" },
          { title: "Gentle Stretching", desc: "Cat-cow and child's pose relieve tension.", ingredients: [], steps: ["Do cat-cow stretch 10 times","Hold child's pose for 1 min","Do morning and evening"], duration: "Ongoing" }
        ]
      },
      {
        name: "Joint Pain / Arthritis",
        keywords: ["joint pain","arthritis","knee pain","stiff joints","swollen joints","rheumatoid","osteoarthritis"],
        severity: "moderate",
        remedies: [
          { title: "Turmeric Golden Paste", desc: "Curcumin reduces joint inflammation significantly.", ingredients: ["Turmeric","Black pepper","Coconut oil"], steps: ["Mix turmeric+pepper+oil into paste","Take 1/2 tsp 2-3 times daily"], duration: "2-4 weeks" },
          { title: "Warm Mustard Oil Massage", desc: "Improves blood flow and reduces stiffness.", ingredients: ["Mustard oil"], steps: ["Warm the oil slightly","Massage affected joints for 15 min","Do twice daily"], duration: "1-2 weeks" },
          { title: "Epsom Salt Soak", desc: "Magnesium absorption reduces joint swelling.", ingredients: ["Epsom salt","Warm water"], steps: ["Soak affected joint in epsom salt water","Keep for 20 min","Do daily"], duration: "1-2 weeks" },
          { title: "Fenugreek Seeds", desc: "Anti-inflammatory properties help with arthritis.", ingredients: ["Fenugreek seeds"], steps: ["Soak 1 tsp seeds overnight in water","Eat seeds and drink water in morning"], duration: "2-3 weeks" }
        ]
      },
      {
        name: "Muscle Cramps",
        keywords: ["muscle cramp","cramp","charlie horse","muscle spasm","leg cramp","calf pain","muscle tightness"],
        severity: "mild",
        remedies: [
          { title: "Banana", desc: "Potassium deficiency is a major cause of cramps.", ingredients: ["Banana"], steps: ["Eat 1-2 bananas daily","Especially before exercise"], duration: "Preventive" },
          { title: "Warm Compress", desc: "Heat relaxes the contracted muscle fibers.", ingredients: ["Warm towel or heating pad"], steps: ["Apply warm compress to cramped muscle","Hold for 15-20 min"], duration: "15-20 min" },
          { title: "Stretching", desc: "Gentle stretching releases the muscle spasm.", ingredients: [], steps: ["Slowly stretch the cramped muscle","Hold stretch for 30 seconds","Repeat 2-3 times"], duration: "5-10 min" }
        ]
      },
      {
        name: "Toothache",
        keywords: ["toothache","tooth pain","dental pain","tooth hurts","cavity pain","gum pain","wisdom tooth"],
        severity: "moderate",
        remedies: [
          { title: "Clove Oil", desc: "Eugenol in clove is a natural dental analgesic.", ingredients: ["Clove oil","Cotton ball"], steps: ["Dip cotton in clove oil","Apply to affected tooth","Hold for 10-15 min"], duration: "1-2 hours" },
          { title: "Saltwater Rinse", desc: "Kills bacteria and reduces gum inflammation.", ingredients: ["Salt","Warm water"], steps: ["Mix 1/2 tsp salt in warm water","Swish for 30 seconds","Repeat every few hours"], duration: "1-2 hours" },
          { title: "Cold Compress", desc: "Numbs the area and reduces swelling.", ingredients: ["Ice wrapped in cloth"], steps: ["Hold against cheek near painful area","Keep for 15-20 min"], duration: "30 min" },
          { title: "Garlic", desc: "Allicin in garlic is a natural antibacterial and pain reliever.", ingredients: ["Fresh garlic"], steps: ["Crush a garlic clove into paste","Apply to affected tooth","Hold for a few minutes"], duration: "30-60 min" }
        ]
      }
    ]
  }
];

export default remediesPart1;
