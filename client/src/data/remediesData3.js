// Home Remedies Data - Part 3 (Hair, Women's, Allergies, Heart, Dental, Children)
const remediesPart3 = [
  {
    category: "Hair Problems",
    icon: "💇",
    conditions: [
      {
        name: "Hair Fall / Hair Loss",
        keywords: ["hair fall","hair loss","balding","thinning hair","hair shedding","losing hair","alopecia"],
        severity: "moderate",
        remedies: [
          { title: "Onion Juice", desc: "Sulfur boosts collagen and promotes regrowth.", ingredients: ["Onion"], steps: ["Blend onion, extract juice","Apply to scalp, massage 15 min","Leave 30 min, then shampoo","Do twice weekly"], duration: "4-8 weeks" },
          { title: "Egg Hair Mask", desc: "Protein and biotin strengthen hair follicles.", ingredients: ["Egg","Olive oil"], steps: ["Beat egg with 1 tbsp olive oil","Apply to scalp and hair","Leave 20 min, wash with cool water"], duration: "4-6 weeks" },
          { title: "Coconut Milk", desc: "Rich in proteins and essential fats for hair.", ingredients: ["Fresh coconut milk"], steps: ["Apply to scalp and hair","Leave for 30 min","Rinse and shampoo","Do weekly"], duration: "4-6 weeks" },
          { title: "Amla (Indian Gooseberry)", desc: "Rich in vitamin C, strengthens hair from root.", ingredients: ["Amla powder","Coconut oil"], steps: ["Mix amla powder with coconut oil","Apply to scalp overnight","Wash in morning"], duration: "4-8 weeks" }
        ]
      },
      {
        name: "Premature Greying",
        keywords: ["grey hair","white hair","premature greying","silver hair","going grey early"],
        severity: "mild",
        remedies: [
          { title: "Curry Leaves & Coconut Oil", desc: "Curry leaves restore melanin pigment.", ingredients: ["Curry leaves","Coconut oil"], steps: ["Boil curry leaves in coconut oil until charred","Strain and cool","Massage into scalp, leave overnight"], duration: "8-12 weeks" },
          { title: "Black Tea Rinse", desc: "Natural darkening agent for hair.", ingredients: ["Black tea bags","Water"], steps: ["Brew 3-4 tea bags in 2 cups water","Cool and apply to hair after shampoo","Leave 1 hour, rinse"], duration: "4-6 weeks" },
          { title: "Amla & Henna Paste", desc: "Natural coloring and strengthening treatment.", ingredients: ["Amla powder","Henna","Curd"], steps: ["Mix powders with curd into paste","Apply to hair for 2 hours","Rinse thoroughly"], duration: "Ongoing" }
        ]
      }
    ]
  },
  {
    category: "Women's Health",
    icon: "♀️",
    conditions: [
      {
        name: "Menstrual Cramps",
        keywords: ["period pain","menstrual cramps","period cramps","dysmenorrhea","stomach pain during period","pms"],
        severity: "moderate",
        remedies: [
          { title: "Hot Water Bottle", desc: "Heat relaxes uterine muscles and eases cramping.", ingredients: ["Hot water bottle or heating pad"], steps: ["Place on lower abdomen","Keep for 15-20 min","Repeat as needed"], duration: "20-30 min" },
          { title: "Ginger Tea", desc: "Ginger inhibits prostaglandins that cause pain.", ingredients: ["Fresh ginger","Water","Honey"], steps: ["Boil ginger in water 10 min","Add honey","Drink 2-3 times during period"], duration: "30 min" },
          { title: "Cinnamon Tea", desc: "Anti-spasmodic that reduces menstrual pain.", ingredients: ["Cinnamon stick","Water","Honey"], steps: ["Boil cinnamon in water 10 min","Add honey","Drink twice daily during period"], duration: "30-60 min" },
          { title: "Fenugreek Seeds", desc: "Reduces inflammation and balances hormones.", ingredients: ["Fenugreek seeds","Water"], steps: ["Soak 1 tsp seeds in water overnight","Drink the water in morning","Start 3 days before period"], duration: "Preventive" }
        ]
      },
      {
        name: "PCOS Symptoms",
        keywords: ["pcos","polycystic","irregular periods","hormonal imbalance","ovarian cyst","pcos symptoms"],
        severity: "serious",
        remedies: [
          { title: "Spearmint Tea", desc: "Reduces androgen levels naturally.", ingredients: ["Spearmint tea"], steps: ["Drink 2 cups of spearmint tea daily","Continue for at least 30 days"], duration: "1-3 months" },
          { title: "Cinnamon", desc: "Improves insulin sensitivity in PCOS.", ingredients: ["Cinnamon powder"], steps: ["Add 1 tsp to warm water or tea daily","Or sprinkle on breakfast"], duration: "2-3 months" },
          { title: "Flaxseeds", desc: "Lignans help balance estrogen levels.", ingredients: ["Ground flaxseeds"], steps: ["Add 1-2 tbsp ground flaxseed to meals daily","Add to smoothies or yogurt"], duration: "2-3 months" }
        ]
      }
    ]
  },
  {
    category: "Allergies & Immunity",
    icon: "🛡️",
    conditions: [
      {
        name: "Seasonal Allergies",
        keywords: ["allergy","allergies","hay fever","sneezing","allergic rhinitis","pollen allergy","dust allergy"],
        severity: "mild",
        remedies: [
          { title: "Local Honey", desc: "Builds tolerance to local pollen over time.", ingredients: ["Local raw honey"], steps: ["Take 1 tbsp local honey daily","Start weeks before allergy season"], duration: "4-8 weeks" },
          { title: "Neti Pot / Saline Rinse", desc: "Physically flushes allergens from nasal passages.", ingredients: ["Neti pot","Distilled water","Salt"], steps: ["Mix saline solution","Flush each nostril","Do morning and evening"], duration: "Immediate" },
          { title: "Quercetin-Rich Foods", desc: "Natural antihistamine found in many foods.", ingredients: ["Onions","Apples","Berries","Green tea"], steps: ["Include quercetin-rich foods in daily diet","Start 2-3 weeks before allergy season"], duration: "Preventive" },
          { title: "Stinging Nettle Tea", desc: "Natural antihistamine that reduces allergy symptoms.", ingredients: ["Dried nettle leaves","Water"], steps: ["Steep 1 tbsp nettle in hot water 10 min","Drink 2-3 cups daily during season"], duration: "1-2 weeks" }
        ]
      },
      {
        name: "Weak Immunity",
        keywords: ["weak immunity","getting sick often","low immunity","frequent cold","immune system","immunity boost"],
        severity: "mild",
        remedies: [
          { title: "Chyawanprash", desc: "Traditional Ayurvedic immunity booster with 40+ herbs.", ingredients: ["Chyawanprash"], steps: ["Take 1 tbsp daily in morning","Can take with warm milk"], duration: "Ongoing" },
          { title: "Turmeric & Black Pepper Milk", desc: "Curcumin absorption boosted 2000% by piperine.", ingredients: ["Turmeric","Black pepper","Milk"], steps: ["Add 1 tsp turmeric + pinch pepper to warm milk","Drink before bed nightly"], duration: "Ongoing" },
          { title: "Vitamin C-Rich Foods", desc: "Vitamin C boosts white blood cell production.", ingredients: ["Amla","Orange","Lemon","Kiwi"], steps: ["Eat 1-2 vitamin C-rich fruits daily","Drink lemon water in morning"], duration: "Ongoing" },
          { title: "Garlic", desc: "Allicin in garlic enhances immune cell function.", ingredients: ["Raw garlic"], steps: ["Eat 2 raw garlic cloves daily","Crush and wait 10 min before eating for max allicin"], duration: "Ongoing" }
        ]
      }
    ]
  },
  {
    category: "Heart & Blood Pressure",
    icon: "❤️",
    conditions: [
      {
        name: "High Blood Pressure",
        keywords: ["high blood pressure","hypertension","bp high","elevated bp","blood pressure"],
        severity: "serious",
        remedies: [
          { title: "Garlic", desc: "Garlic stimulates nitric oxide production, relaxing vessels.", ingredients: ["Raw garlic"], steps: ["Eat 2 raw garlic cloves on empty stomach daily","Or take aged garlic supplement"], duration: "8-12 weeks" },
          { title: "Hibiscus Tea", desc: "Clinically shown to lower systolic BP.", ingredients: ["Dried hibiscus flowers","Water"], steps: ["Steep 1-2 tsp in hot water 5 min","Drink 2-3 cups daily"], duration: "4-6 weeks" },
          { title: "Beetroot Juice", desc: "Nitrates convert to nitric oxide, dilating blood vessels.", ingredients: ["Fresh beetroot"], steps: ["Juice 1 beetroot daily","Drink in morning"], duration: "2-4 weeks" },
          { title: "Reduce Salt + DASH Diet", desc: "Dietary changes can lower BP by 8-14 mmHg.", ingredients: [], steps: ["Limit sodium to 1500mg/day","Eat fruits, vegetables, whole grains","Reduce processed foods"], duration: "2-4 weeks" }
        ]
      },
      {
        name: "High Cholesterol",
        keywords: ["high cholesterol","ldl high","cholesterol","fatty liver","cholesterol control"],
        severity: "serious",
        remedies: [
          { title: "Oats", desc: "Beta-glucan fiber binds cholesterol in the gut.", ingredients: ["Oats"], steps: ["Eat 1.5 cups oatmeal daily for breakfast","Add berries and nuts"], duration: "4-8 weeks" },
          { title: "Garlic", desc: "Reduces total and LDL cholesterol.", ingredients: ["Raw garlic"], steps: ["Eat 2-3 raw cloves daily","On empty stomach in morning"], duration: "8-12 weeks" },
          { title: "Flaxseeds", desc: "ALA omega-3 and fiber reduce cholesterol.", ingredients: ["Ground flaxseeds"], steps: ["Add 2 tbsp ground flaxseed to meals daily","Mix in smoothies or cereal"], duration: "4-8 weeks" },
          { title: "Green Tea", desc: "Catechins block cholesterol absorption.", ingredients: ["Green tea"], steps: ["Drink 3-4 cups daily","Don't add sugar"], duration: "4-8 weeks" }
        ]
      }
    ]
  },
  {
    category: "Dental & Oral Health",
    icon: "🦷",
    conditions: [
      {
        name: "Bad Breath",
        keywords: ["bad breath","halitosis","mouth smell","breath smells","stinky breath","oral odor"],
        severity: "mild",
        remedies: [
          { title: "Oil Pulling", desc: "Swishing oil removes bacteria causing bad breath.", ingredients: ["Coconut oil"], steps: ["Swish 1 tbsp coconut oil for 15-20 min","Spit out (not in sink)","Rinse mouth, then brush teeth","Do daily in morning"], duration: "1-2 weeks" },
          { title: "Fennel Seeds", desc: "Freshen breath and increase saliva production.", ingredients: ["Fennel seeds"], steps: ["Chew 1 tsp fennel seeds after meals","Chew slowly for maximum effect"], duration: "Immediate" },
          { title: "Green Tea", desc: "Polyphenols kill odor-causing bacteria.", ingredients: ["Green tea"], steps: ["Drink 2-3 cups daily","Can also use as mouth rinse"], duration: "1 week" },
          { title: "Tongue Scraping", desc: "Removes bacteria buildup on the tongue.", ingredients: ["Tongue scraper or spoon"], steps: ["Scrape tongue gently from back to front","Do 5-10 strokes","Do every morning before brushing"], duration: "Immediate" }
        ]
      },
      {
        name: "Gum Disease / Bleeding Gums",
        keywords: ["bleeding gums","gum disease","gingivitis","swollen gums","gum pain","gum inflammation"],
        severity: "moderate",
        remedies: [
          { title: "Saltwater Rinse", desc: "Reduces bacteria and inflammation in gums.", ingredients: ["Salt","Warm water"], steps: ["Mix 1/2 tsp salt in warm water","Swish for 30 seconds","Do 2-3 times daily"], duration: "1-2 weeks" },
          { title: "Oil Pulling with Coconut Oil", desc: "Reduces plaque and gum inflammation.", ingredients: ["Coconut oil"], steps: ["Swish 1 tbsp for 15 min daily","Spit out, rinse, then brush"], duration: "2-4 weeks" },
          { title: "Vitamin C-Rich Foods", desc: "Vitamin C deficiency is a major cause of bleeding gums.", ingredients: ["Amla","Orange","Guava","Kiwi"], steps: ["Eat 2-3 vitamin C-rich fruits daily","Consider amla juice"], duration: "2-3 weeks" }
        ]
      }
    ]
  },
  {
    category: "Children's Health",
    icon: "👶",
    conditions: [
      {
        name: "Colic in Babies",
        keywords: ["colic","baby crying","infant gas","baby stomach pain","baby wont stop crying","baby fussy"],
        severity: "mild",
        remedies: [
          { title: "Gripe Water", desc: "Traditional herbal water for baby gas and colic.", ingredients: ["Gripe water (store-bought)"], steps: ["Give recommended dose for baby's age","Give before or after feeding"], duration: "15-30 min" },
          { title: "Warm Compress on Belly", desc: "Gentle heat relieves gas pain in infants.", ingredients: ["Warm (not hot) cloth"], steps: ["Place warm cloth on baby's belly","Hold gently","Ensure it's warm, not hot"], duration: "10-15 min" },
          { title: "Bicycle Legs", desc: "Gentle movement helps release trapped gas.", ingredients: [], steps: ["Lay baby on back","Gently move legs in cycling motion","Do for 2-3 min","Follow with gentle tummy massage"], duration: "5 min" }
        ]
      },
      {
        name: "Diaper Rash",
        keywords: ["diaper rash","baby rash","red bottom","nappy rash","baby skin irritation"],
        severity: "mild",
        remedies: [
          { title: "Coconut Oil", desc: "Natural moisturizer with antibacterial properties.", ingredients: ["Virgin coconut oil"], steps: ["Apply thin layer at each diaper change","Ensure area is clean and dry first"], duration: "2-3 days" },
          { title: "Oatmeal Bath", desc: "Soothes irritated skin and reduces inflammation.", ingredients: ["Colloidal oatmeal","Warm water"], steps: ["Add fine oatmeal powder to lukewarm bath","Soak baby for 10-15 min","Pat dry gently"], duration: "2-3 days" },
          { title: "Air Dry Time", desc: "Letting skin breathe is the best remedy.", ingredients: [], steps: ["Give baby 15-20 min without diaper","Place on absorbent towel","Do 2-3 times daily"], duration: "1-2 days" }
        ]
      }
    ]
  }
];

export default remediesPart3;
