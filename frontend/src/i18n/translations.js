/**
 * UI translations — English, Malayalam & Hindi.
 * Keys are dot-separated: section.element
 */
export const translations = {
  en: {
    // Nav
    "nav.home": "Home",
    "nav.diagnose": "Diagnose",
    "nav.history": "History",
    "nav.about": "About",
    "nav.signin": "Sign in",
    "nav.signup": "Sign up",
    "nav.logout": "Logout",

    // Home page
    "home.title": "Protect Your Crops with",
    "home.titleHighlight": "AI",
    "home.subtitle": "Upload a photo of a diseased crop leaf and get instant disease identification and treatment advice — in your language.",
    "home.cta": "Start Diagnosis",
    "home.howItWorks": "How It Works",
    "home.feature1Title": "Snap a Photo",
    "home.feature1Desc": "Upload or capture a leaf image",
    "home.feature2Title": "AI Detects",
    "home.feature2Desc": "Custom Vision identifies the disease",
    "home.feature3Title": "Get Treatment",
    "home.feature3Desc": "GPT-4o generates actionable advice",
    "home.feature4Title": "Listen",
    "home.feature4Desc": "Hear advice in your language",
    "home.supportedCrops": "Supported Crops",
    "home.diseases": "diseases",

    // Diagnose page
    "diagnose.title": "Diagnose Your Crop",
    "diagnose.voiceLabel": "Or ask by voice:",
    "diagnose.analyzeBtn": "Analyze Crop",
    "diagnose.analyzing": "Analyzing your crop leaf...",
    "diagnose.resetBtn": "Diagnose Another Crop",
    "diagnose.youSaid": "You said:",

    // History page
    "history.title": "Diagnosis History",
    "history.loading": "Loading history...",
    "history.empty": "No diagnoses yet",
    "history.emptyHint": "Upload a leaf photo to get started.",
    "history.confidence": "confidence",

    // About page
    "about.title": "How CropGuard Vision Works",
    "about.intro": "CropGuard Vision uses 6 Microsoft Azure AI services to provide instant crop disease detection and treatment advice for farmers worldwide.",
    "about.pipelineTitle": "The AI Pipeline",
    "about.step1": "1. Farmer uploads a leaf photo",
    "about.step2": "2. Azure AI Vision verifies it is a plant image",
    "about.step3": "3. Azure Custom Vision classifies the disease (15 classes, 90%+ accuracy)",
    "about.step4": "4. Azure OpenAI generates structured treatment advice",
    "about.step5": "5. Azure Content Safety screens the advice",
    "about.step6": "6. Azure Language translates to the farmer's language",
    "about.step7": "7. Azure Speech converts advice to audio",
    "about.servicesTitle": "Azure Services Used",
    "about.svc1Name": "Azure AI Custom Vision",
    "about.svc1Role": "Disease classification from leaf images",
    "about.svc2Name": "Azure AI Vision",
    "about.svc2Role": "Scene validation (is it a plant?)",
    "about.svc3Name": "Azure OpenAI (GPT-4o-mini)",
    "about.svc3Role": "Treatment advice generation",
    "about.svc4Name": "Azure AI Speech",
    "about.svc4Role": "Voice input and output",
    "about.svc5Name": "Azure AI Language",
    "about.svc5Role": "Translation to farmer's language",
    "about.svc6Name": "Azure AI Content Safety",
    "about.svc6Role": "Filter harmful AI outputs",
    "about.techTitle": "Tech Stack",
    "about.techFrontend": "React 18 + Vite + Tailwind CSS (PWA)",
    "about.techBackend": "Python FastAPI",
    "about.techAI": "Azure Custom Vision (trained on PlantVillage dataset)",
    "about.techHosting": "Azure App Service + Azure Static Web Apps",
    "about.techCICD": "GitHub Actions",

    // Login page
    "login.title": "Welcome back",
    "login.subtitle": "Sign in to your account",
    "login.email": "Email",
    "login.emailPlaceholder": "you@example.com",
    "login.password": "Password",
    "login.passwordPlaceholder": "At least 6 characters",
    "login.submitBtn": "Sign in",
    "login.submitting": "Signing in...",
    "login.orContinue": "or continue with",
    "login.googleBtn": "Sign in with Google",
    "login.noAccount": "Don't have an account?",
    "login.createOne": "Create one",

    // Signup page
    "signup.title": "Create your account",
    "signup.subtitle": "Start protecting your crops today",
    "signup.name": "Full name",
    "signup.namePlaceholder": "John Doe",
    "signup.email": "Email",
    "signup.emailPlaceholder": "you@example.com",
    "signup.password": "Password",
    "signup.passwordPlaceholder": "At least 6 characters",
    "signup.confirm": "Confirm password",
    "signup.confirmPlaceholder": "Repeat password",
    "signup.submitBtn": "Create account",
    "signup.submitting": "Creating account...",
    "signup.orContinue": "or continue with",
    "signup.googleBtn": "Sign up with Google",
    "signup.hasAccount": "Already have an account?",
    "signup.signIn": "Sign in",
    "signup.mismatch": "Passwords do not match",

    // Image uploader
    "upload.selected": "Image selected",
    "upload.ready": "Ready to analyze",
    "upload.dragDrop": "Drag & drop a leaf photo here",
    "upload.browse": "or click to browse (JPEG, PNG — max {size} MB)",
    "upload.camera": "Use Camera",
    "upload.errFormat": "Only JPEG and PNG images are supported.",
    "upload.errSize": "File exceeds {size} MB.",

    // Crop selector
    "crop.label": "Crop Type",
    "crop.diseases": "diseases",

    // Season selector
    "season.label": "Season",
    "season.auto": "Auto-detect",
    "season.kharif": "Kharif (Jun–Oct)",
    "season.rabi": "Rabi (Nov–Mar)",
    "season.zaid": "Zaid (Apr–May)",

    // Voice input
    "voice.micRequired": "Microphone access is required for voice input.",
    "voice.recording": "Recording... {seconds}s / {max}s",
    "voice.tapToSpeak": "Tap to speak your symptoms",

    // Audio player
    "audio.listen": "Listen to treatment advice",

    // Treatment panel
    "treatment.title": "Treatment Advice",
    "treatment.translated": "Translated",
    "treatment.copy": "Copy",
    "treatment.listen": "Listen",
    "treatment.copied": "Copied to clipboard!",

    // Confidence meter
    "confidence.label": "Confidence",

    // Disclaimer
    "disclaimer.title": "AI-generated advice.",
    "disclaimer.text": "This is not a substitute for professional agricultural consultation. Always verify with a local agronomist before applying treatments.",

    // Error
    "error.tryAgain": "Try Again",

    // Loading
    "loading.default": "Analyzing your crop...",

    // Crop detail page
    "cropDetail.knownDiseases": "Known Diseases",
    "cropDetail.diseasesCount": "{count} diseases documented",
    "cropDetail.diagnoseThis": "Diagnose This Crop",
    "cropDetail.backToCrops": "Back to Crops",
    "cropDetail.noDiseasesTitle": "No diseases documented",
    "cropDetail.noDiseasesHint": "Disease data for this crop is not yet available.",
    "cropDetail.loading": "Loading crop details...",
    "cropDetail.notFound": "Crop not found",
    "cropDetail.notFoundHint": "The crop you're looking for doesn't exist.",

    // Admin
    "nav.admin": "Admin",
    "admin.title": "Admin Dashboard",
    "admin.usersTab": "Users",
    "admin.auditTab": "Audit Log",
    "admin.usageTab": "API Usage",
    "admin.userName": "Name",
    "admin.userEmail": "Email",
    "admin.userRole": "Role",
    "admin.userStatus": "Status",
    "admin.diagnoses": "Diagnoses",
    "admin.actions": "Actions",
    "admin.accessRequested": "Access Requested",
    "admin.approve": "Approve (Unlimited)",
    "admin.reject": "Reject",
    "admin.resetQuota": "Reset to 3",
    "admin.auditDate": "Date",
    "admin.auditUser": "User",
    "admin.auditCrop": "Crop",
    "admin.auditDisease": "Disease",
    "admin.auditConfidence": "Confidence",
    "admin.auditLang": "Language",
    "admin.noAuditData": "No audit data yet.",
    "admin.prev": "Previous",
    "admin.next": "Next",
    "admin.usageToday": "Today",
    "admin.usageWeek": "This Week",
    "admin.usageMonth": "This Month",
    "admin.noUsageData": "No API usage data yet.",

    // Quota
    "quota.exceeded": "Diagnosis Quota Exceeded",
    "quota.contactAdmin": "You have used all your free diagnoses. Request admin approval for more.",
    "quota.requestBtn": "Request More Access",
    "quota.requestSent": "Request sent! The admin will review it shortly.",

    // Footer
    "footer.powered": "Powered by Microsoft Azure AI Services",
  },

  ml: {
    // Nav
    "nav.home": "ഹോം",
    "nav.diagnose": "രോഗനിർണയം",
    "nav.history": "ചരിത്രം",
    "nav.about": "വിവരങ്ങൾ",
    "nav.signin": "ലോഗിൻ",
    "nav.signup": "രജിസ്റ്റർ",
    "nav.logout": "ലോഗൗട്ട്",

    // Home page
    "home.title": "AI ഉപയോഗിച്ച് നിങ്ങളുടെ വിളകൾ",
    "home.titleHighlight": "സംരക്ഷിക്കൂ",
    "home.subtitle": "രോഗബാധിതമായ ഇലയുടെ ഫോട്ടോ അപ്‌ലോഡ് ചെയ്ത് തൽക്ഷണ രോഗനിർണയവും ചികിത്സാ ഉപദേശവും നേടൂ — നിങ്ങളുടെ ഭാഷയിൽ.",
    "home.cta": "രോഗനിർണയം ആരംഭിക്കുക",
    "home.howItWorks": "ഇത് എങ്ങനെ പ്രവർത്തിക്കുന്നു",
    "home.feature1Title": "ഫോട്ടോ എടുക്കുക",
    "home.feature1Desc": "ഇലയുടെ ചിത്രം അപ്‌ലോഡ് ചെയ്യുക",
    "home.feature2Title": "AI കണ്ടെത്തുന്നു",
    "home.feature2Desc": "Custom Vision രോഗം തിരിച്ചറിയുന്നു",
    "home.feature3Title": "ചികിത്സ നേടുക",
    "home.feature3Desc": "GPT-4o ചികിത്സാ ഉപദേശം നൽകുന്നു",
    "home.feature4Title": "കേൾക്കുക",
    "home.feature4Desc": "നിങ്ങളുടെ ഭാഷയിൽ ഉപദേശം കേൾക്കൂ",
    "home.supportedCrops": "പിന്തുണയ്ക്കുന്ന വിളകൾ",
    "home.diseases": "രോഗങ്ങൾ",

    // Diagnose page
    "diagnose.title": "നിങ്ങളുടെ വിള പരിശോധിക്കുക",
    "diagnose.voiceLabel": "അല്ലെങ്കിൽ ശബ്ദത്തിൽ ചോദിക്കൂ:",
    "diagnose.analyzeBtn": "വിള വിശകലനം ചെയ്യുക",
    "diagnose.analyzing": "നിങ്ങളുടെ വിളയുടെ ഇല വിശകലനം ചെയ്യുന്നു...",
    "diagnose.resetBtn": "മറ്റൊരു വിള പരിശോധിക്കുക",
    "diagnose.youSaid": "നിങ്ങൾ പറഞ്ഞത്:",

    // History page
    "history.title": "രോഗനിർണയ ചരിത്രം",
    "history.loading": "ചരിത്രം ലോഡ് ചെയ്യുന്നു...",
    "history.empty": "ഇതുവരെ രോഗനിർണയങ്ങൾ ഇല്ല",
    "history.emptyHint": "ആരംഭിക്കാൻ ഒരു ഇലയുടെ ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുക.",
    "history.confidence": "വിശ്വാസ്യത",

    // About page
    "about.title": "CropGuard Vision എങ്ങനെ പ്രവർത്തിക്കുന്നു",
    "about.intro": "CropGuard Vision 6 Microsoft Azure AI സേവനങ്ങൾ ഉപയോഗിച്ച് കർഷകർക്ക് തൽക്ഷണ വിള രോഗനിർണയവും ചികിത്സാ ഉപദേശവും നൽകുന്നു.",
    "about.pipelineTitle": "AI പൈപ്പ്‌ലൈൻ",
    "about.step1": "1. കർഷകൻ ഇലയുടെ ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുന്നു",
    "about.step2": "2. Azure AI Vision ഇത് ഒരു സസ്യ ചിത്രമാണോ എന്ന് പരിശോധിക്കുന്നു",
    "about.step3": "3. Azure Custom Vision രോഗം തരംതിരിക്കുന്നു (15 ക്ലാസുകൾ, 90%+ കൃത്യത)",
    "about.step4": "4. Azure OpenAI ചികിത്സാ ഉപദേശം സൃഷ്ടിക്കുന്നു",
    "about.step5": "5. Azure Content Safety ഉപദേശം പരിശോധിക്കുന്നു",
    "about.step6": "6. Azure Language കർഷകന്റെ ഭാഷയിലേക്ക് വിവർത്തനം ചെയ്യുന്നു",
    "about.step7": "7. Azure Speech ഉപദേശം ഓഡിയോയിലേക്ക് മാറ്റുന്നു",
    "about.servicesTitle": "ഉപയോഗിക്കുന്ന Azure സേവനങ്ങൾ",
    "about.svc1Name": "Azure AI Custom Vision",
    "about.svc1Role": "ഇല ചിത്രങ്ങളിൽ നിന്ന് രോഗ തരംതിരിവ്",
    "about.svc2Name": "Azure AI Vision",
    "about.svc2Role": "രംഗ പരിശോധന (ഇത് ഒരു സസ്യമാണോ?)",
    "about.svc3Name": "Azure OpenAI (GPT-4o-mini)",
    "about.svc3Role": "ചികിത്സാ ഉപദേശ നിർമ്മാണം",
    "about.svc4Name": "Azure AI Speech",
    "about.svc4Role": "ശബ്ദ ഇൻപുട്ടും ഔട്ട്‌പുട്ടും",
    "about.svc5Name": "Azure AI Language",
    "about.svc5Role": "കർഷകന്റെ ഭാഷയിലേക്ക് വിവർത്തനം",
    "about.svc6Name": "Azure AI Content Safety",
    "about.svc6Role": "ഹാനികരമായ AI ഔട്ട്‌പുട്ടുകൾ ഫിൽട്ടർ ചെയ്യുക",
    "about.techTitle": "സാങ്കേതിക സ്റ്റാക്ക്",
    "about.techFrontend": "React 18 + Vite + Tailwind CSS (PWA)",
    "about.techBackend": "Python FastAPI",
    "about.techAI": "Azure Custom Vision (PlantVillage ഡാറ്റാസെറ്റിൽ പരിശീലിപ്പിച്ചത്)",
    "about.techHosting": "Azure App Service + Azure Static Web Apps",
    "about.techCICD": "GitHub Actions",

    // Login page
    "login.title": "തിരികെ സ്വാഗതം",
    "login.subtitle": "നിങ്ങളുടെ അക്കൗണ്ടിൽ ലോഗിൻ ചെയ്യുക",
    "login.email": "ഇമെയിൽ",
    "login.emailPlaceholder": "you@example.com",
    "login.password": "പാസ്‌വേഡ്",
    "login.passwordPlaceholder": "കുറഞ്ഞത് 6 അക്ഷരങ്ങൾ",
    "login.submitBtn": "ലോഗിൻ",
    "login.submitting": "ലോഗിൻ ചെയ്യുന്നു...",
    "login.orContinue": "അല്ലെങ്കിൽ ഇതുപയോഗിച്ച് തുടരുക",
    "login.googleBtn": "Google ഉപയോഗിച്ച് ലോഗിൻ ചെയ്യുക",
    "login.noAccount": "അക്കൗണ്ട് ഇല്ലേ?",
    "login.createOne": "ഒന്ന് ഉണ്ടാക്കുക",

    // Signup page
    "signup.title": "നിങ്ങളുടെ അക്കൗണ്ട് സൃഷ്ടിക്കുക",
    "signup.subtitle": "ഇന്ന് തന്നെ നിങ്ങളുടെ വിളകൾ സംരക്ഷിക്കാൻ ആരംഭിക്കൂ",
    "signup.name": "പൂർണ്ണ നാമം",
    "signup.namePlaceholder": "നിങ്ങളുടെ പേര്",
    "signup.email": "ഇമെയിൽ",
    "signup.emailPlaceholder": "you@example.com",
    "signup.password": "പാസ്‌വേഡ്",
    "signup.passwordPlaceholder": "കുറഞ്ഞത് 6 അക്ഷരങ്ങൾ",
    "signup.confirm": "പാസ്‌വേഡ് സ്ഥിരീകരിക്കുക",
    "signup.confirmPlaceholder": "പാസ്‌വേഡ് ആവർത്തിക്കുക",
    "signup.submitBtn": "അക്കൗണ്ട് സൃഷ്ടിക്കുക",
    "signup.submitting": "അക്കൗണ്ട് സൃഷ്ടിക്കുന്നു...",
    "signup.orContinue": "അല്ലെങ്കിൽ ഇതുപയോഗിച്ച് തുടരുക",
    "signup.googleBtn": "Google ഉപയോഗിച്ച് രജിസ്റ്റർ ചെയ്യുക",
    "signup.hasAccount": "ഇതിനകം അക്കൗണ്ട് ഉണ്ടോ?",
    "signup.signIn": "ലോഗിൻ ചെയ്യുക",
    "signup.mismatch": "പാസ്‌വേഡുകൾ പൊരുത്തപ്പെടുന്നില്ല",

    // Image uploader
    "upload.selected": "ചിത്രം തിരഞ്ഞെടുത്തു",
    "upload.ready": "വിശകലനത്തിന് തയ്യാർ",
    "upload.dragDrop": "ഇലയുടെ ഫോട്ടോ ഇവിടെ ഡ്രാഗ് & ഡ്രോപ്പ് ചെയ്യുക",
    "upload.browse": "അല്ലെങ്കിൽ ബ്രൗസ് ചെയ്യാൻ ക്ലിക്ക് ചെയ്യുക (JPEG, PNG — പരമാവധി {size} MB)",
    "upload.camera": "ക്യാമറ ഉപയോഗിക്കുക",
    "upload.errFormat": "JPEG, PNG ചിത്രങ്ങൾ മാത്രമേ പിന്തുണയ്ക്കൂ.",
    "upload.errSize": "ഫയൽ {size} MB-ൽ കൂടുതലാണ്.",

    // Crop selector
    "crop.label": "വിളയുടെ തരം",
    "crop.diseases": "രോഗങ്ങൾ",

    // Season selector
    "season.label": "സീസൺ",
    "season.auto": "സ്വയം കണ്ടെത്തുക",
    "season.kharif": "ഖാരിഫ് (ജൂൺ–ഒക്ടോ)",
    "season.rabi": "റാബി (നവം–മാർ)",
    "season.zaid": "സൈദ് (ഏപ്രി–മെയ്)",

    // Voice input
    "voice.micRequired": "ശബ്ദ ഇൻപുട്ടിന് മൈക്രോഫോൺ ആക്സസ് ആവശ്യമാണ്.",
    "voice.recording": "റെക്കോർഡ് ചെയ്യുന്നു... {seconds}s / {max}s",
    "voice.tapToSpeak": "നിങ്ങളുടെ ലക്ഷണങ്ങൾ പറയാൻ ടാപ്പ് ചെയ്യുക",

    // Audio player
    "audio.listen": "ചികിത്സാ ഉപദേശം കേൾക്കുക",

    // Treatment panel
    "treatment.title": "ചികിത്സാ ഉപദേശം",
    "treatment.translated": "വിവർത്തനം ചെയ്തത്",
    "treatment.copy": "കോപ്പി",
    "treatment.listen": "കേൾക്കുക",
    "treatment.copied": "ക്ലിപ്പ്ബോർഡിലേക്ക് കോപ്പി ചെയ്തു!",

    // Confidence meter
    "confidence.label": "വിശ്വാസ്യത",

    // Disclaimer
    "disclaimer.title": "AI സൃഷ്ടിച്ച ഉപദേശം.",
    "disclaimer.text": "ഇത് പ്രൊഫഷണൽ കാർഷിക ഉപദേശത്തിന് പകരമല്ല. ചികിത്സ പ്രയോഗിക്കുന്നതിന് മുമ്പ് എല്ലായ്പ്പോഴും ഒരു പ്രാദേശിക കാർഷിക വിദഗ്ധനുമായി പരിശോധിക്കുക.",

    // Error
    "error.tryAgain": "വീണ്ടും ശ്രമിക്കുക",

    // Loading
    "loading.default": "നിങ്ങളുടെ വിള വിശകലനം ചെയ്യുന്നു...",

    // Crop detail page
    "cropDetail.knownDiseases": "അറിയപ്പെടുന്ന രോഗങ്ങൾ",
    "cropDetail.diseasesCount": "{count} രോഗങ്ങൾ രേഖപ്പെടുത്തിയിട്ടുണ്ട്",
    "cropDetail.diagnoseThis": "ഈ വിള പരിശോധിക്കുക",
    "cropDetail.backToCrops": "വിളകളിലേക്ക് മടങ്ങുക",
    "cropDetail.noDiseasesTitle": "രോഗങ്ങൾ രേഖപ്പെടുത്തിയിട്ടില്ല",
    "cropDetail.noDiseasesHint": "ഈ വിളയുടെ രോഗ വിവരങ്ങൾ ഇതുവരെ ലഭ്യമല്ല.",
    "cropDetail.loading": "വിളയുടെ വിശദാംശങ്ങൾ ലോഡ് ചെയ്യുന്നു...",
    "cropDetail.notFound": "വിള കണ്ടെത്തിയില്ല",
    "cropDetail.notFoundHint": "നിങ്ങൾ തിരയുന്ന വിള നിലവിലില്ല.",

    // Admin
    "nav.admin": "അഡ്മിൻ",
    "admin.title": "അഡ്മിൻ ഡാഷ്ബോർഡ്",
    "admin.usersTab": "ഉപയോക്താക്കൾ",
    "admin.auditTab": "ഓഡിറ്റ് ലോഗ്",
    "admin.usageTab": "API ഉപയോഗം",
    "admin.userName": "പേര്",
    "admin.userEmail": "ഇമെയിൽ",
    "admin.userRole": "റോൾ",
    "admin.userStatus": "നില",
    "admin.diagnoses": "രോഗനിർണയങ്ങൾ",
    "admin.actions": "പ്രവർത്തനങ്ങൾ",
    "admin.accessRequested": "ആക്സസ് അഭ്യർത്ഥന",
    "admin.approve": "അംഗീകരിക്കുക (അൺലിമിറ്റഡ്)",
    "admin.reject": "നിരസിക്കുക",
    "admin.resetQuota": "3 ലേക്ക് റീസെറ്റ്",
    "admin.auditDate": "തീയതി",
    "admin.auditUser": "ഉപയോക്താവ്",
    "admin.auditCrop": "വിള",
    "admin.auditDisease": "രോഗം",
    "admin.auditConfidence": "വിശ്വാസ്യത",
    "admin.auditLang": "ഭാഷ",
    "admin.noAuditData": "ഇതുവരെ ഓഡിറ്റ് ഡാറ്റ ഇല്ല.",
    "admin.prev": "മുമ്പത്തെ",
    "admin.next": "അടുത്തത്",
    "admin.usageToday": "ഇന്ന്",
    "admin.usageWeek": "ഈ ആഴ്ച",
    "admin.usageMonth": "ഈ മാസം",
    "admin.noUsageData": "ഇതുവരെ API ഉപയോഗ ഡാറ്റ ഇല്ല.",

    // Quota
    "quota.exceeded": "രോഗനിർണയ പരിധി കഴിഞ്ഞു",
    "quota.contactAdmin": "നിങ്ങളുടെ എല്ലാ സൗജന്യ രോഗനിർണയങ്ങളും ഉപയോഗിച്ചു. കൂടുതലിനായി അഡ്മിൻ അംഗീകാരം അഭ്യർത്ഥിക്കുക.",
    "quota.requestBtn": "കൂടുതൽ ആക്സസ് അഭ്യർത്ഥിക്കുക",
    "quota.requestSent": "അഭ്യർത്ഥന അയച്ചു! അഡ്മിൻ ഉടൻ പരിശോധിക്കും.",

    // Footer
    "footer.powered": "Microsoft Azure AI സേവനങ്ങൾ ഉപയോഗിച്ച് പ്രവർത്തിക്കുന്നു",
  },

  hi: {
    // Nav
    "nav.home": "होम",
    "nav.diagnose": "रोग निदान",
    "nav.history": "इतिहास",
    "nav.about": "जानकारी",
    "nav.signin": "लॉग इन",
    "nav.signup": "रजिस्टर",
    "nav.logout": "लॉग आउट",

    // Home page
    "home.title": "AI की मदद से अपनी फ़सलों की",
    "home.titleHighlight": "रक्षा करें",
    "home.subtitle": "रोगग्रस्त पत्ती की फोटो अपलोड करें और तुरंत रोग पहचान व उपचार सलाह पाएं — अपनी भाषा में।",
    "home.cta": "निदान शुरू करें",
    "home.howItWorks": "यह कैसे काम करता है",
    "home.feature1Title": "फोटो लें",
    "home.feature1Desc": "पत्ती की तस्वीर अपलोड करें",
    "home.feature2Title": "AI पहचानता है",
    "home.feature2Desc": "Custom Vision रोग की पहचान करता है",
    "home.feature3Title": "उपचार पाएं",
    "home.feature3Desc": "GPT-4o उपचार सलाह देता है",
    "home.feature4Title": "सुनें",
    "home.feature4Desc": "अपनी भाषा में सलाह सुनें",
    "home.supportedCrops": "समर्थित फ़सलें",
    "home.diseases": "रोग",

    // Diagnose page
    "diagnose.title": "अपनी फ़सल की जाँच करें",
    "diagnose.voiceLabel": "या आवाज़ से पूछें:",
    "diagnose.analyzeBtn": "फ़सल का विश्लेषण करें",
    "diagnose.analyzing": "आपकी फ़सल की पत्ती का विश्लेषण हो रहा है...",
    "diagnose.resetBtn": "दूसरी फ़सल की जाँच करें",
    "diagnose.youSaid": "आपने कहा:",

    // History page
    "history.title": "निदान इतिहास",
    "history.loading": "इतिहास लोड हो रहा है...",
    "history.empty": "अभी तक कोई निदान नहीं",
    "history.emptyHint": "शुरू करने के लिए एक पत्ती की फोटो अपलोड करें।",
    "history.confidence": "विश्वसनीयता",

    // About page
    "about.title": "CropGuard Vision कैसे काम करता है",
    "about.intro": "CropGuard Vision 6 Microsoft Azure AI सेवाओं का उपयोग करके किसानों को तुरंत फ़सल रोग निदान और उपचार सलाह प्रदान करता है।",
    "about.pipelineTitle": "AI पाइपलाइन",
    "about.step1": "1. किसान पत्ती की फोटो अपलोड करता है",
    "about.step2": "2. Azure AI Vision यह जाँचता है कि यह पौधे की तस्वीर है",
    "about.step3": "3. Azure Custom Vision रोग की पहचान करता है (15 श्रेणियाँ, 90%+ सटीकता)",
    "about.step4": "4. Azure OpenAI उपचार सलाह तैयार करता है",
    "about.step5": "5. Azure Content Safety सलाह की जाँच करता है",
    "about.step6": "6. Azure Language किसान की भाषा में अनुवाद करता है",
    "about.step7": "7. Azure Speech सलाह को ऑडियो में बदलता है",
    "about.servicesTitle": "उपयोग की गई Azure सेवाएं",
    "about.svc1Name": "Azure AI Custom Vision",
    "about.svc1Role": "पत्ती की तस्वीरों से रोग वर्गीकरण",
    "about.svc2Name": "Azure AI Vision",
    "about.svc2Role": "दृश्य सत्यापन (क्या यह पौधा है?)",
    "about.svc3Name": "Azure OpenAI (GPT-4o-mini)",
    "about.svc3Role": "उपचार सलाह निर्माण",
    "about.svc4Name": "Azure AI Speech",
    "about.svc4Role": "आवाज़ इनपुट और आउटपुट",
    "about.svc5Name": "Azure AI Language",
    "about.svc5Role": "किसान की भाषा में अनुवाद",
    "about.svc6Name": "Azure AI Content Safety",
    "about.svc6Role": "हानिकारक AI आउटपुट को फ़िल्टर करें",
    "about.techTitle": "तकनीकी स्टैक",
    "about.techFrontend": "React 18 + Vite + Tailwind CSS (PWA)",
    "about.techBackend": "Python FastAPI",
    "about.techAI": "Azure Custom Vision (PlantVillage डेटासेट पर प्रशिक्षित)",
    "about.techHosting": "Azure App Service + Azure Static Web Apps",
    "about.techCICD": "GitHub Actions",

    // Login page
    "login.title": "वापस स्वागत है",
    "login.subtitle": "अपने खाते में लॉग इन करें",
    "login.email": "ईमेल",
    "login.emailPlaceholder": "you@example.com",
    "login.password": "पासवर्ड",
    "login.passwordPlaceholder": "कम से कम 6 अक्षर",
    "login.submitBtn": "लॉग इन",
    "login.submitting": "लॉग इन हो रहा है...",
    "login.orContinue": "या इसके साथ जारी रखें",
    "login.googleBtn": "Google से लॉग इन करें",
    "login.noAccount": "खाता नहीं है?",
    "login.createOne": "बनाएं",

    // Signup page
    "signup.title": "अपना खाता बनाएं",
    "signup.subtitle": "आज ही अपनी फ़सलों की रक्षा शुरू करें",
    "signup.name": "पूरा नाम",
    "signup.namePlaceholder": "आपका नाम",
    "signup.email": "ईमेल",
    "signup.emailPlaceholder": "you@example.com",
    "signup.password": "पासवर्ड",
    "signup.passwordPlaceholder": "कम से कम 6 अक्षर",
    "signup.confirm": "पासवर्ड की पुष्टि करें",
    "signup.confirmPlaceholder": "पासवर्ड दोहराएं",
    "signup.submitBtn": "खाता बनाएं",
    "signup.submitting": "खाता बन रहा है...",
    "signup.orContinue": "या इसके साथ जारी रखें",
    "signup.googleBtn": "Google से रजिस्टर करें",
    "signup.hasAccount": "पहले से खाता है?",
    "signup.signIn": "लॉग इन करें",
    "signup.mismatch": "पासवर्ड मेल नहीं खाते",

    // Image uploader
    "upload.selected": "तस्वीर चुनी गई",
    "upload.ready": "विश्लेषण के लिए तैयार",
    "upload.dragDrop": "पत्ती की फोटो यहाँ ड्रैग & ड्रॉप करें",
    "upload.browse": "या ब्राउज़ करने के लिए क्लिक करें (JPEG, PNG — अधिकतम {size} MB)",
    "upload.camera": "कैमरा उपयोग करें",
    "upload.errFormat": "केवल JPEG और PNG तस्वीरें समर्थित हैं।",
    "upload.errSize": "फ़ाइल {size} MB से अधिक है।",

    // Crop selector
    "crop.label": "फ़सल का प्रकार",
    "crop.diseases": "रोग",

    // Season selector
    "season.label": "मौसम",
    "season.auto": "स्वचालित पहचान",
    "season.kharif": "खरीफ (जून–अक्टू)",
    "season.rabi": "रबी (नवं–मार्च)",
    "season.zaid": "ज़ायद (अप्रैल–मई)",

    // Voice input
    "voice.micRequired": "आवाज़ इनपुट के लिए माइक्रोफ़ोन की अनुमति आवश्यक है।",
    "voice.recording": "रिकॉर्ड हो रहा है... {seconds}s / {max}s",
    "voice.tapToSpeak": "अपने लक्षण बताने के लिए टैप करें",

    // Audio player
    "audio.listen": "उपचार सलाह सुनें",

    // Treatment panel
    "treatment.title": "उपचार सलाह",
    "treatment.translated": "अनुवादित",
    "treatment.copy": "कॉपी",
    "treatment.listen": "सुनें",
    "treatment.copied": "क्लिपबोर्ड में कॉपी हो गया!",

    // Confidence meter
    "confidence.label": "विश्वसनीयता",

    // Disclaimer
    "disclaimer.title": "AI-जनित सलाह।",
    "disclaimer.text": "यह पेशेवर कृषि परामर्श का विकल्प नहीं है। उपचार लागू करने से पहले हमेशा किसी स्थानीय कृषि विशेषज्ञ से सत्यापित करें।",

    // Error
    "error.tryAgain": "फिर से कोशिश करें",

    // Loading
    "loading.default": "आपकी फ़सल का विश्लेषण हो रहा है...",

    // Crop detail page
    "cropDetail.knownDiseases": "ज्ञात रोग",
    "cropDetail.diseasesCount": "{count} रोग दर्ज हैं",
    "cropDetail.diagnoseThis": "इस फ़सल की जाँच करें",
    "cropDetail.backToCrops": "फ़सलों पर वापस जाएं",
    "cropDetail.noDiseasesTitle": "कोई रोग दर्ज नहीं",
    "cropDetail.noDiseasesHint": "इस फ़सल का रोग डेटा अभी उपलब्ध नहीं है।",
    "cropDetail.loading": "फ़सल विवरण लोड हो रहा है...",
    "cropDetail.notFound": "फ़सल नहीं मिली",
    "cropDetail.notFoundHint": "आप जो फ़सल ढूंढ रहे हैं वह मौजूद नहीं है।",

    // Admin
    "nav.admin": "एडमिन",
    "admin.title": "एडमिन डैशबोर्ड",
    "admin.usersTab": "उपयोगकर्ता",
    "admin.auditTab": "ऑडिट लॉग",
    "admin.usageTab": "API उपयोग",
    "admin.userName": "नाम",
    "admin.userEmail": "ईमेल",
    "admin.userRole": "भूमिका",
    "admin.userStatus": "स्थिति",
    "admin.diagnoses": "निदान",
    "admin.actions": "कार्य",
    "admin.accessRequested": "एक्सेस अनुरोध",
    "admin.approve": "अनुमोदित करें (असीमित)",
    "admin.reject": "अस्वीकार करें",
    "admin.resetQuota": "3 पर रीसेट",
    "admin.auditDate": "तारीख",
    "admin.auditUser": "उपयोगकर्ता",
    "admin.auditCrop": "फ़सल",
    "admin.auditDisease": "रोग",
    "admin.auditConfidence": "विश्वसनीयता",
    "admin.auditLang": "भाषा",
    "admin.noAuditData": "अभी तक कोई ऑडिट डेटा नहीं।",
    "admin.prev": "पिछला",
    "admin.next": "अगला",
    "admin.usageToday": "आज",
    "admin.usageWeek": "इस सप्ताह",
    "admin.usageMonth": "इस महीने",
    "admin.noUsageData": "अभी तक कोई API उपयोग डेटा नहीं।",

    // Quota
    "quota.exceeded": "निदान सीमा पार हो गई",
    "quota.contactAdmin": "आपके सभी मुफ्त निदान समाप्त हो गए हैं। अधिक के लिए एडमिन अनुमोदन का अनुरोध करें।",
    "quota.requestBtn": "और एक्सेस का अनुरोध करें",
    "quota.requestSent": "अनुरोध भेजा गया! एडमिन जल्द ही समीक्षा करेंगे।",

    // Footer
    "footer.powered": "Microsoft Azure AI सेवाओं द्वारा संचालित",
  },
};
