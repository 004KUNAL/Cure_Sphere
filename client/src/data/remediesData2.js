// Home Remedies Data - Part 2 (Skin, Fever, Eye/Ear, Mental Health)
const remediesPart2 = [
  {
    category: "Skin Issues",
    icon: "🧴",
    conditions: [
      {
        name: "Acne & Pimples",
        keywords: ["acne","pimples","breakout","zits","face bumps","blemishes","oily skin"],
        severity: "mild",
        remedies: [
          { title: "Tea Tree Oil", desc: "Natural antibacterial that kills acne-causing bacteria.", ingredients: ["Tea tree oil","Carrier oil"], steps: ["Dilute 1 drop tea tree in 10 drops carrier oil","Apply to pimples with cotton swab","Leave overnight"], duration: "1-2 weeks" },
          { title: "Turmeric & Honey Mask", desc: "Antibacterial and anti-inflammatory face mask.", ingredients: ["Turmeric","Honey","Yogurt"], steps: ["Mix 1 tsp turmeric + 1 tbsp honey + 1 tbsp yogurt","Apply to face for 15 min","Rinse with lukewarm water"], duration: "2-3 weeks" },
          { title: "Aloe Vera Gel", desc: "Soothes inflammation and promotes skin healing.", ingredients: ["Fresh aloe vera leaf"], steps: ["Extract gel from aloe leaf","Apply directly to affected areas","Leave for 20 min, rinse"], duration: "1-2 weeks" },
          { title: "Neem Paste", desc: "Neem has powerful antimicrobial properties.", ingredients: ["Neem leaves","Water"], steps: ["Grind neem leaves into paste","Apply to affected areas","Leave 20 min, rinse"], duration: "1-2 weeks" },
          { title: "Ice Cube Treatment", desc: "Reduces redness and swelling of pimples quickly.", ingredients: ["Ice cubes","Clean cloth"], steps: ["Wrap ice in cloth","Press on pimple for 1-2 min","Repeat 3-4 times"], duration: "Instant" }
        ]
      },
      {
        name: "Eczema / Dry Skin",
        keywords: ["eczema","dry skin","itchy skin","flaky skin","dermatitis","rash","skin irritation"],
        severity: "moderate",
        remedies: [
          { title: "Coconut Oil", desc: "Deep moisturizer with antibacterial properties.", ingredients: ["Virgin coconut oil"], steps: ["Apply generously to affected areas","Massage gently","Apply after shower when skin is damp"], duration: "Ongoing" },
          { title: "Oatmeal Bath", desc: "Colloidal oatmeal soothes itching and inflammation.", ingredients: ["Oatmeal","Warm bath"], steps: ["Blend 1 cup oats into fine powder","Add to warm bath water","Soak for 15-20 min"], duration: "Immediate" },
          { title: "Aloe Vera", desc: "Anti-inflammatory and deeply hydrating.", ingredients: ["Aloe vera gel"], steps: ["Apply fresh gel to dry patches","Leave on, don't rinse","Apply 2-3 times daily"], duration: "1-2 weeks" },
          { title: "Honey Mask", desc: "Natural humectant that locks in moisture.", ingredients: ["Raw honey"], steps: ["Apply thin layer to affected skin","Leave for 20 min","Rinse with lukewarm water"], duration: "1-2 weeks" }
        ]
      },
      {
        name: "Sunburn",
        keywords: ["sunburn","sun damage","burned skin","red skin from sun","peeling skin","sun rash"],
        severity: "mild",
        remedies: [
          { title: "Aloe Vera Gel", desc: "The gold standard for sunburn relief.", ingredients: ["Fresh aloe vera"], steps: ["Apply cool aloe gel liberally","Reapply every 2-3 hours","Store gel in fridge for extra cooling"], duration: "2-3 days" },
          { title: "Cool Milk Compress", desc: "Milk proteins and fat soothe and cool burned skin.", ingredients: ["Cold milk","Cloth"], steps: ["Soak cloth in cold milk","Apply to sunburned areas for 15 min"], duration: "Immediate" },
          { title: "Coconut Oil (after cooling)", desc: "Moisturizes and helps skin repair after initial burn cools.", ingredients: ["Coconut oil"], steps: ["Wait until skin has cooled","Apply thin layer of coconut oil","Reapply as needed"], duration: "3-5 days" }
        ]
      },
      {
        name: "Dark Circles",
        keywords: ["dark circles","under eye","eye bags","puffy eyes","tired eyes","raccoon eyes"],
        severity: "mild",
        remedies: [
          { title: "Cucumber Slices", desc: "Cooling effect reduces puffiness and lightens skin.", ingredients: ["Cold cucumber"], steps: ["Cut thick cucumber slices","Chill in fridge 30 min","Place on eyes for 15 min"], duration: "2-3 weeks" },
          { title: "Potato Slices", desc: "Natural bleaching agent that lightens dark circles.", ingredients: ["Raw potato"], steps: ["Cut thin potato slices","Place on eyes for 15 min","Do daily"], duration: "2-3 weeks" },
          { title: "Rose Water", desc: "Rejuvenates skin and reduces discoloration.", ingredients: ["Rose water","Cotton pads"], steps: ["Soak cotton pads in cold rose water","Place on eyes for 15 min","Do twice daily"], duration: "2-4 weeks" },
          { title: "Cold Tea Bags", desc: "Caffeine and antioxidants reduce puffiness.", ingredients: ["Used green or black tea bags"], steps: ["Chill used tea bags in fridge","Place on eyes for 15 min"], duration: "2-3 weeks" }
        ]
      },
      {
        name: "Fungal Infection",
        keywords: ["fungal infection","ringworm","athletes foot","jock itch","fungus","itchy rash","skin fungus"],
        severity: "moderate",
        remedies: [
          { title: "Tea Tree Oil", desc: "Potent antifungal that kills common skin fungi.", ingredients: ["Tea tree oil","Coconut oil"], steps: ["Mix 3 drops tea tree in 1 tbsp coconut oil","Apply to affected area 2-3 times daily"], duration: "2-4 weeks" },
          { title: "Apple Cider Vinegar", desc: "Acidic pH kills fungal infections.", ingredients: ["ACV","Water"], steps: ["Mix equal parts ACV and water","Apply with cotton ball","Let air dry, repeat 3 times daily"], duration: "1-3 weeks" },
          { title: "Garlic Paste", desc: "Ajoene in garlic is a powerful antifungal compound.", ingredients: ["Garlic","Olive oil"], steps: ["Crush garlic, mix with olive oil","Apply to area for 20 min","Rinse and dry thoroughly"], duration: "1-2 weeks" },
          { title: "Turmeric Paste", desc: "Curcumin has broad-spectrum antifungal activity.", ingredients: ["Turmeric","Water or coconut oil"], steps: ["Make thick paste","Apply to infected area","Leave 30 min, rinse"], duration: "2-3 weeks" }
        ]
      },
      {
        name: "Dandruff",
        keywords: ["dandruff","flaky scalp","itchy scalp","dry scalp","white flakes","scalp","head itching"],
        severity: "mild",
        remedies: [
          { title: "Apple Cider Vinegar Rinse", desc: "Restores scalp pH and reduces flaking.", ingredients: ["ACV","Water"], steps: ["Mix equal parts ACV and water","Apply to scalp after shampoo","Leave 5 min, rinse"], duration: "2-3 weeks" },
          { title: "Tea Tree Oil Shampoo", desc: "Antifungal properties target dandruff-causing yeast.", ingredients: ["Tea tree oil","Regular shampoo"], steps: ["Add 5 drops tea tree oil to shampoo","Massage into scalp 5 min","Rinse thoroughly"], duration: "2-4 weeks" },
          { title: "Coconut Oil & Lemon", desc: "Moisturizes scalp while lemon fights fungus.", ingredients: ["Coconut oil","Lemon juice"], steps: ["Mix 2 tbsp coconut oil + 1 tbsp lemon juice","Massage into scalp","Leave 30 min before washing"], duration: "2-3 weeks" },
          { title: "Neem Water Rinse", desc: "Neem is antibacterial and antifungal.", ingredients: ["Neem leaves","Water"], steps: ["Boil neem leaves in water 15 min","Cool and strain","Use as final hair rinse"], duration: "2-3 weeks" }
        ]
      }
    ]
  },
  {
    category: "Fever & Infections",
    icon: "🤒",
    conditions: [
      {
        name: "Mild Fever",
        keywords: ["fever","temperature","hot body","body heat","mild fever","low grade fever","feeling hot"],
        severity: "moderate",
        remedies: [
          { title: "Wet Cloth on Forehead", desc: "Evaporative cooling helps bring down body temperature.", ingredients: ["Cool water","Cloth"], steps: ["Soak cloth in cool water","Place on forehead","Replace when warm","Repeat continuously"], duration: "1-2 hours" },
          { title: "Tulsi & Ginger Tea", desc: "Tulsi is antipyretic, ginger boosts immunity.", ingredients: ["Tulsi leaves","Ginger","Honey"], steps: ["Boil tulsi + ginger in water 10 min","Add honey","Drink 2-3 times daily"], duration: "1-3 days" },
          { title: "Hydration", desc: "Fever causes fluid loss; staying hydrated is essential.", ingredients: ["Water","ORS","Coconut water"], steps: ["Drink fluids every 30 min","Include electrolytes","Avoid caffeine and alcohol"], duration: "Until fever breaks" },
          { title: "Raisin Water", desc: "Raisins have antioxidants that help fight infection.", ingredients: ["Raisins","Water"], steps: ["Soak 25 raisins in water for 1 hour","Crush raisins in the water","Strain and drink twice daily"], duration: "1-2 days" }
        ]
      },
      {
        name: "Urinary Tract Infection",
        keywords: ["uti","urinary infection","burning urination","frequent urination","bladder infection","painful pee"],
        severity: "moderate",
        remedies: [
          { title: "Cranberry Juice", desc: "Prevents bacteria from adhering to urinary tract walls.", ingredients: ["Unsweetened cranberry juice"], steps: ["Drink 2-3 glasses daily","Choose unsweetened variety"], duration: "3-5 days" },
          { title: "Lots of Water", desc: "Flushes bacteria out of the urinary system.", ingredients: ["Water"], steps: ["Drink 8-10 glasses daily","Urinate frequently, don't hold"], duration: "Ongoing" },
          { title: "Baking Soda Water", desc: "Neutralizes urine acidity to reduce burning.", ingredients: ["Baking soda","Water"], steps: ["Mix 1 tsp baking soda in glass of water","Drink once daily for 3 days max"], duration: "1-3 days" }
        ]
      },
      {
        name: "Flu / Influenza",
        keywords: ["flu","influenza","body aches","chills","fever with body pain","seasonal flu"],
        severity: "moderate",
        remedies: [
          { title: "Elderberry Syrup", desc: "Elderberry shortens flu duration and severity.", ingredients: ["Elderberry syrup"], steps: ["Take 1 tbsp 4 times daily at onset","Continue for 5 days"], duration: "3-5 days" },
          { title: "Chicken Soup", desc: "Anti-inflammatory, hydrating, and nutrient-rich.", ingredients: ["Chicken","Vegetables","Garlic","Ginger"], steps: ["Make soup with garlic, ginger, veggies","Eat warm 2-3 times daily"], duration: "3-5 days" },
          { title: "Garlic & Honey", desc: "Antiviral combination that boosts immune response.", ingredients: ["Raw garlic","Honey"], steps: ["Crush 2 garlic cloves","Mix with 1 tbsp honey","Take 2-3 times daily"], duration: "3-5 days" },
          { title: "Rest & Sleep", desc: "Sleep is when your body produces cytokines to fight infection.", ingredients: [], steps: ["Get 8-10 hours sleep","Avoid screens before bed","Keep room cool and dark"], duration: "3-7 days" }
        ]
      }
    ]
  },
  {
    category: "Eye & Ear Issues",
    icon: "👁️",
    conditions: [
      {
        name: "Eye Strain / Dry Eyes",
        keywords: ["eye strain","dry eyes","computer eyes","tired eyes","screen fatigue","blurry vision","eye fatigue"],
        severity: "mild",
        remedies: [
          { title: "20-20-20 Rule", desc: "Every 20 min, look at something 20 feet away for 20 sec.", ingredients: [], steps: ["Set timer for 20 min","Look at distant object for 20 seconds","Blink rapidly 10 times"], duration: "Ongoing" },
          { title: "Cucumber Slices", desc: "Cool cucumbers hydrate and soothe tired eyes.", ingredients: ["Cold cucumber"], steps: ["Place chilled slices on closed eyes","Rest for 15 min"], duration: "15 min" },
          { title: "Warm Compress", desc: "Stimulates tear glands and relieves dryness.", ingredients: ["Warm damp cloth"], steps: ["Place warm cloth over closed eyes","Hold for 10 min","Repeat 2-3 times daily"], duration: "10 min" },
          { title: "Rose Water Drops", desc: "Natural soothing agent for irritated eyes.", ingredients: ["Pure rose water"], steps: ["Put 2-3 drops in each eye","Close eyes and rest for 5 min"], duration: "Immediate" }
        ]
      },
      {
        name: "Ear Pain / Earache",
        keywords: ["ear pain","earache","ear infection","blocked ear","ear hurts","ear pressure"],
        severity: "moderate",
        remedies: [
          { title: "Warm Compress", desc: "Heat increases blood flow and reduces pain.", ingredients: ["Warm cloth or heating pad"], steps: ["Apply warm compress to affected ear","Hold for 15-20 min"], duration: "20 min" },
          { title: "Garlic Oil", desc: "Garlic has natural antimicrobial properties.", ingredients: ["Garlic","Olive oil"], steps: ["Warm crushed garlic in olive oil","Strain, cool to body temp","Put 2-3 drops in ear"], duration: "1-2 days" },
          { title: "Olive Oil Drops", desc: "Softens earwax and soothes the ear canal.", ingredients: ["Warm olive oil"], steps: ["Warm oil to body temperature","Put 2-3 drops in ear","Tilt head to keep oil in for 5 min"], duration: "1-2 days" }
        ]
      }
    ]
  },
  {
    category: "Mental Health & Wellness",
    icon: "🧠",
    conditions: [
      {
        name: "Anxiety & Stress",
        keywords: ["anxiety","stress","nervous","worried","panic","tension","overwhelmed","anxious","restless"],
        severity: "moderate",
        remedies: [
          { title: "Deep Breathing (4-7-8)", desc: "Activates parasympathetic nervous system to calm you.", ingredients: [], steps: ["Inhale through nose for 4 counts","Hold for 7 counts","Exhale through mouth for 8 counts","Repeat 4 cycles"], duration: "5 min" },
          { title: "Chamomile Tea", desc: "Chamomile contains apigenin that binds anxiety receptors.", ingredients: ["Chamomile tea bag","Hot water","Honey"], steps: ["Steep chamomile in hot water 5 min","Add honey if desired","Drink 2-3 cups daily"], duration: "1-2 weeks" },
          { title: "Lavender Aromatherapy", desc: "Lavender scent reduces cortisol and promotes calm.", ingredients: ["Lavender essential oil"], steps: ["Add 3-4 drops to diffuser","Or apply diluted to wrists/temples","Use during stressful moments"], duration: "Immediate" },
          { title: "Ashwagandha", desc: "Adaptogenic herb that reduces cortisol levels.", ingredients: ["Ashwagandha powder","Warm milk"], steps: ["Mix 1 tsp ashwagandha in warm milk","Drink before bedtime daily"], duration: "2-4 weeks" },
          { title: "Journaling", desc: "Writing down thoughts reduces mental clutter and anxiety.", ingredients: ["Notebook","Pen"], steps: ["Write for 10-15 min daily","Focus on worries to externalize them","Write 3 things you're grateful for"], duration: "Ongoing" }
        ]
      },
      {
        name: "Insomnia / Sleep Issues",
        keywords: ["insomnia","cant sleep","sleep problem","sleepless","restless night","awake at night","poor sleep"],
        severity: "moderate",
        remedies: [
          { title: "Warm Milk with Nutmeg", desc: "Tryptophan in milk + nutmeg promote sleep.", ingredients: ["Warm milk","Nutmeg","Honey"], steps: ["Warm a glass of milk","Add pinch of nutmeg + honey","Drink 30 min before bed"], duration: "30 min" },
          { title: "Valerian Root Tea", desc: "Valerian increases GABA levels to promote sleep.", ingredients: ["Valerian root tea"], steps: ["Steep valerian root in hot water 10 min","Drink 1 hour before bed"], duration: "1-2 weeks" },
          { title: "Banana Tea", desc: "Magnesium and potassium in banana peel promote relaxation.", ingredients: ["Banana with peel","Water","Cinnamon"], steps: ["Boil whole banana (with peel) in water 10 min","Strain, add cinnamon","Drink before bed"], duration: "30 min" },
          { title: "Sleep Hygiene", desc: "Consistent routine trains your body's sleep clock.", ingredients: [], steps: ["Same bedtime every night","No screens 1 hour before bed","Keep room cool (65-68°F)","Use blackout curtains"], duration: "1-2 weeks" }
        ]
      },
      {
        name: "Low Energy / Fatigue",
        keywords: ["fatigue","tired","no energy","exhausted","lethargic","weak","drowsy","sluggish"],
        severity: "mild",
        remedies: [
          { title: "Green Tea", desc: "Moderate caffeine + L-theanine for sustained energy.", ingredients: ["Green tea","Honey"], steps: ["Steep green tea for 3 min (not longer)","Add honey","Drink in morning/early afternoon"], duration: "30-60 min" },
          { title: "Cold Shower", desc: "Cold water stimulates circulation and alertness.", ingredients: [], steps: ["End your shower with 30 sec cold water","Gradually increase duration","Do daily"], duration: "Immediate" },
          { title: "Iron-Rich Foods", desc: "Iron deficiency is a common cause of fatigue.", ingredients: ["Spinach","Dates","Beetroot","Jaggery"], steps: ["Include iron-rich foods in daily diet","Pair with vitamin C for better absorption"], duration: "2-4 weeks" },
          { title: "Dates & Nuts", desc: "Natural sugars and healthy fats provide sustained energy.", ingredients: ["Dates","Almonds","Walnuts"], steps: ["Eat 3-4 dates with handful of nuts","Have as mid-morning snack"], duration: "30 min" }
        ]
      },
      {
        name: "Depression (mild support)",
        keywords: ["depression","sad","low mood","hopeless","unmotivated","feeling down","depressed","blue"],
        severity: "serious",
        remedies: [
          { title: "Exercise / Walking", desc: "30 min exercise releases endorphins as powerful as medication.", ingredients: [], steps: ["Walk briskly for 30 min daily","Preferably outdoors in nature","Consistency matters more than intensity"], duration: "2-4 weeks" },
          { title: "St. John's Wort Tea", desc: "Clinically studied herb for mild-moderate depression.", ingredients: ["St. John's Wort tea"], steps: ["Steep in hot water 10 min","Drink 2-3 cups daily","Note: can interact with medications"], duration: "4-6 weeks" },
          { title: "Omega-3 Foods", desc: "Omega-3s support brain health and mood regulation.", ingredients: ["Flaxseeds","Walnuts","Fish"], steps: ["Add 1 tbsp ground flaxseed to meals daily","Eat walnuts as snack","Include fatty fish twice weekly"], duration: "4-8 weeks" },
          { title: "Sunlight Exposure", desc: "Sunlight boosts serotonin and vitamin D production.", ingredients: [], steps: ["Get 15-20 min morning sunlight daily","Go outside without sunglasses briefly","Open curtains first thing in morning"], duration: "1-2 weeks" }
        ]
      }
    ]
  }
];

export default remediesPart2;
