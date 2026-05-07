import { useState, useEffect, useRef } from "react";
import {
  Beer, Star, MapPin, Calendar, Award, ChevronRight, X, Flame,
  Clock, Trophy, QrCode, Gift, Shield, TrendingUp, Zap, Heart,
  Check, ChevronDown, Users, Sparkles, ArrowRight, Home, Menu,
  Bell, Settings, User, BarChart3, Droplets, Search, Plus, Edit,
  Trash2, Send, Image, Save, AlertCircle, Activity, DollarSign,
  Dog, Scan, Eye, EyeOff, ChevronLeft, LayoutDashboard, Megaphone,
  Package, Percent, Link, Wifi, Database, ToggleLeft, ToggleRight,
  RefreshCw, ExternalLink, Filter, MoreVertical, Copy, Mail,
  Phone, Globe, Instagram, Hash, BellRing, LogOut, Camera
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════
// BREWERY CONFIG — Change this block to deploy for any brewery.
// ═══════════════════════════════════════════════════════════════

const BREWERY = {
  name: "7 SEAS",
  subtitle: "BREWING",
  city: "Gig Harbor, Washington",
  tagline: "Independent. Pacific Northwest. Since 2009.",
  memberTier: "Harbor Points",
  logo: "7S",
  address: "2905 Harborview Dr, Gig Harbor, WA 98335",
  phone: "(253) 514-8129",
  email: "info@7seasbrewing.com",
  website: "7seasbrewing.com",
  instagram: "@7seasbrewing",
  hours: "Daily 11a-10p",
  description: "First WA craft brewery to can beer. Best Beer in the South Sound six years running. Waterfront taproom accessible by boat. Two locations: Gig Harbor waterfront and Tacoma's Historic Heidelberg Brewery. Barrel room, beer lab, and 16 taps of PNW craft.",
  accentHue: 210, accentSat: 50,
  heroImages: {
    home:    "https://www.7seasbrewing.com/wp-content/uploads/MOUNTAIN-1.jpg",
    beers:   "https://www.7seasbrewing.com/wp-content/uploads/IMG_5475-crop-1681492207-2048x678.jpg",
    events:  "https://www.7seasbrewing.com/wp-content/uploads/IMG_5925.jpg",
    badges:  "https://www.7seasbrewing.com/wp-content/uploads/IMG_7523-crop-1704317594-1914x1149.jpg",
    rewards: "https://www.7seasbrewing.com/wp-content/uploads/IMG_8779-500x300.jpg",
  },
};

const C = {
  bg:"#F0F4F8", surface:"#F8FAFC", card:"#FFFFFF", cardHover:"#E6ECF2",
  border:"#C0CED8", borderLight:"#D4DEE6", text:"#14202C", textMuted:"#4A6478", textDim:"#7A94A8",
  accent:`hsl(${BREWERY.accentHue},${BREWERY.accentSat}%,35%)`,
  accentDark:`hsl(${BREWERY.accentHue},${BREWERY.accentSat}%,25%)`,
  accentGlow:`hsl(${BREWERY.accentHue},${BREWERY.accentSat}%,35%,0.18)`,
  accentFaint:`hsl(${BREWERY.accentHue},${BREWERY.accentSat}%,35%,0.07)`,
  teal:"#2A5A80", tealDark:"#1A4060", tealGlow:"rgba(42,90,128,0.12)",
  success:"#3D8A4A", warning:"#C49A0C", danger:"#C0392B", info:"#4A7FB5",
  shadow:"0 1px 3px rgba(20,32,44,0.06), 0 4px 14px rgba(20,32,44,0.04)",
};

const BEERS=[
  {id:"b1",name:"Rude Parrot IPA",style:"Northwest IPA",abv:5.9,ibu:75,pts:30,flagship:true,limited:false,avail:true,desc:"Aggressively hopped. Big juicy tropical fruit and citrusy hop aroma yields to an off-dry, pleasantly bitter finish. Nugget, Simcoe, Citra, and Cascade. The flagship.",flavor:{hoppy:85,malty:35,bitter:70,fruity:65,crisp:60},pair:"Spicy wings, sharp cheddar, fish tacos"},
  {id:"b2",name:"Hazy IPA",style:"New England IPA",abv:6.2,ibu:55,pts:30,flagship:true,limited:false,avail:true,desc:"A soft, rounded mouthfeel loaded with newfangled hop varieties for lots of juicy flavor and aroma. Citra, Mosaic, Azacca, and Ekuanot over flaked oats and wheat.",flavor:{hoppy:70,malty:25,bitter:25,fruity:95,crisp:55},pair:"Poke bowl, coconut shrimp, mango salsa"},
  {id:"b3",name:"Pilsner",style:"Northwest Pilsner",abv:5.2,ibu:32,pts:20,flagship:true,limited:false,avail:true,desc:"Extremely refreshing, dry, and crisp. Executed with precision, patience, and care. Magnum, Sterling, and Cascade hops over pilsner and NW pale malt. A true premium pilsner.",flavor:{hoppy:35,malty:45,bitter:30,fruity:10,crisp:95},pair:"Grilled fish, garden salad, soft pretzels"},
  {id:"b4",name:"Double IPA",style:"Imperial IPA",abv:8.4,ibu:84,pts:40,flagship:true,limited:false,avail:true,desc:"A loaded mash tun provides a firm, slightly sweet malt flavor while copious amounts of resiny Yakima Valley hops go berserk on bitterness, flavor, and aroma.",flavor:{hoppy:95,malty:45,bitter:85,fruity:60,crisp:40},pair:"Aged cheddar, carnitas, smoked brisket"},
  {id:"b5",name:"Cutts Island Amber",style:"Northwest Amber Ale",abv:5.5,ibu:35,pts:25,flagship:true,limited:false,avail:true,desc:"Named for our local island, also known as Dead Man's Island. Brilliantly clear burgundy hue with a pleasant floral and fruity aroma. Caramel malt and a lingering hop bitterness.",flavor:{hoppy:40,malty:70,bitter:35,fruity:30,crisp:55},pair:"BBQ ribs, mushroom burger, smoked gouda"},
  {id:"b6",name:"Pale Ale",style:"British-Inspired Pale",abv:5.2,ibu:35,pts:25,flagship:true,limited:false,avail:true,desc:"A very approachable pale drawing inspiration from proper British brewing traditions. Generous UK Golden Promise malt with noble hops. Fresh fruit aromas, earthy notes, and a clean, snappy finish.",flavor:{hoppy:50,malty:50,bitter:35,fruity:40,crisp:65},pair:"Roast chicken, fish and chips, garden salad"},
  {id:"b7",name:"Sour Raspberry Blend",style:"Fruited Sour",abv:5.5,ibu:5,pts:30,flagship:false,limited:true,avail:true,desc:"2019 WA Beer Awards Bronze. Our barrel-aged sour blended with raspberries. Tart, fruity, and complex. From the barrel room beneath the Heidelberg.",flavor:{hoppy:5,malty:20,bitter:5,fruity:90,crisp:80},pair:"Goat cheese, fruit tart, charcuterie"},
  {id:"b8",name:"Berliner Weisse",style:"Berliner Weisse",abv:3.8,ibu:5,pts:15,flagship:false,limited:false,avail:true,desc:"Light, tart, and refreshing. A traditional German sour wheat beer. Perfect for the waterfront on a sunny day.",flavor:{hoppy:5,malty:25,bitter:5,fruity:50,crisp:90},pair:"Light seafood, fruit salad, summer salads"},
  {id:"b9",name:"Stout",style:"American Stout",abv:6.0,ibu:45,pts:25,flagship:false,limited:false,avail:true,desc:"Rich, roasty, and satisfying. Chocolate and coffee notes with a firm hop backbone. Warming from harbor to heart.",flavor:{hoppy:25,malty:85,bitter:40,fruity:15,crisp:30},pair:"Dark chocolate, braised short ribs, bread pudding"},
  {id:"b10",name:"Belgian Golden Strong",style:"Belgian Golden Strong",abv:8.5,ibu:25,pts:35,flagship:false,limited:true,avail:true,desc:"Effervescent, fruity, and deceptively drinkable for its strength. Belgian yeast character with subtle spice and a dry finish.",flavor:{hoppy:15,malty:45,bitter:20,fruity:65,crisp:70},pair:"Lobster, Thai curry, stone fruit desserts"},
  {id:"b11",name:"Barrel-Aged Wild Ale",style:"Wild Ale",abv:6.5,ibu:8,pts:40,flagship:false,limited:true,avail:true,desc:"From our 10,000 sq ft barrel room beneath the Heidelberg. Mixed fermentation, oak-aged, complex and evolving. Every batch is a conversation with time.",flavor:{hoppy:5,malty:30,bitter:5,fruity:75,crisp:65},pair:"Aged cheese, oysters, charcuterie"},
  {id:"b12",name:"Seasonal Lager",style:"Seasonal Lager",abv:5.0,ibu:20,pts:20,flagship:false,limited:true,avail:true,desc:"Rotating seasonal lager. Clean, crisp, and built for whatever the Pacific Northwest weather throws at you. Check the tap list for this month's version.",flavor:{hoppy:20,malty:45,bitter:15,fruity:15,crisp:90},pair:"Grilled sausage, light pasta, pub snacks"},
];

const EVENTS_INIT=[
  {id:"e1",name:"Dock Day Saturday",date:"2026-04-11",time:"11:00 AM",desc:"Arrive by boat, bike, or foot. The dock is open and the taps are flowing. Where the dock is blue, that's for you.",rsvpCount:42,capacity:80,tag:"Weekly"},
  {id:"e2",name:"Barrel Room Release",date:"2026-05-16",time:"12:00 PM",desc:"New barrel-aged wild ale from the cellar beneath the Heidelberg. Limited bottles and draft pours.",rsvpCount:68,capacity:100,tag:"Release"},
  {id:"e3",name:"Anniversary Party",date:"2026-09-12",time:"12:00 PM",desc:"Celebrating 17 years of PNW craft beer. Special releases, live music, food trucks, and both taprooms open late.",rsvpCount:186,capacity:300,tag:"Release"},
  {id:"e4",name:"Food Truck Friday",date:"2026-04-10",time:"4:00 PM",desc:"The Galley is serving burgers and sandwiches on the waterfront. Pair with a Rude Parrot and watch the boats.",rsvpCount:36,capacity:60,tag:"Weekly"},
  {id:"e5",name:"Beer Lab Preview",date:"2026-04-25",time:"3:00 PM",desc:"Taste what's coming out of the Beer Lab. Experimental batches, pilot recipes, and beers that may never make it to cans.",rsvpCount:18,capacity:25,tag:"Dinner"},
];
const BADGES=[
  {id:"first-visit",name:"First Tide",desc:"Check in for the first time",icon:"Beer",req:1,type:"checkin"},
  {id:"regular",name:"Harbor Regular",desc:"10 check-ins",icon:"TrendingUp",req:10,type:"checkin"},
  {id:"dedicated",name:"South Sound Local",desc:"25 check-ins",icon:"Shield",req:25,type:"checkin"},
  {id:"legend",name:"Seven Seas Legend",desc:"50 check-ins",icon:"Trophy",req:50,type:"checkin"},
  {id:"century",name:"Captain",desc:"100 check-ins",icon:"Award",req:100,type:"checkin"},
  {id:"taster",name:"Curious Drinker",desc:"Rate 3 beers",icon:"Star",req:3,type:"rating"},
  {id:"explorer",name:"Tap Explorer",desc:"Rate 8 beers",icon:"Sparkles",req:8,type:"rating"},
  {id:"connoisseur",name:"Barrel Master",desc:"Rate all beers",icon:"Heart",req:12,type:"rating"},
  {id:"social",name:"Crew Member",desc:"RSVP to 3 events",icon:"Users",req:3,type:"rsvp"},
  {id:"eventgoer",name:"Gig Harbor Regular",desc:"RSVP to 8 events",icon:"Calendar",req:8,type:"rsvp"},
];
const REWARDS_INIT=[
  {id:"r1",name:"Free Pint",pts:500,desc:"Any of our 16 taps",icon:"Beer",active:true},
  {id:"r2",name:"Flight Sampler",pts:350,desc:"4-beer tasting flight",icon:"Droplets",active:true},
  {id:"r3",name:"Merch Credit",pts:750,desc:"$15 toward 7 Seas merch",icon:"Gift",active:true},
  {id:"r4",name:"Crowler To Go",pts:600,desc:"32oz crowler, any beer",icon:"Beer",active:true},
  {id:"r5",name:"Barrel Room Tour",pts:1500,desc:"Private barrel room tour for four",icon:"MapPin",active:true},
  {id:"r6",name:"Beer Lab Seat",pts:2000,desc:"Reserved seat at Beer Lab Preview",icon:"Sparkles",active:true},
];

const MOCK_MEMBERS=[
  {id:"m1",name:"Alex Martinez",pts:4820,level:"silver",checkIns:38,badges:5,since:"Mar 2025",email:"alex@example.com",lastVisit:"2 hours ago"},
  {id:"m2",name:"Sarah Kim",pts:8450,level:"gold",checkIns:72,badges:7,since:"Jan 2025",email:"sarah@example.com",lastVisit:"Yesterday"},
  {id:"m3",name:"Mike Thompson",pts:1680,level:"bronze",checkIns:14,badges:3,since:"Oct 2025",email:"mike@example.com",lastVisit:"3 days ago"},
  {id:"m4",name:"Emily Rodriguez",pts:13200,level:"platinum",checkIns:108,badges:9,since:"Sep 2024",email:"emily@example.com",lastVisit:"Today"},
  {id:"m5",name:"Chris Baker",pts:950,level:"bronze",checkIns:8,badges:2,since:"Feb 2026",email:"chris@example.com",lastVisit:"1 week ago"},
  {id:"m6",name:"Jordan Lee",pts:3100,level:"silver",checkIns:26,badges:4,since:"Jul 2025",email:"jordan@example.com",lastVisit:"Today"},
  {id:"m7",name:"Priya Patel",pts:6800,level:"gold",checkIns:55,badges:6,since:"Apr 2025",email:"priya@example.com",lastVisit:"Yesterday"},
  {id:"m8",name:"Devon Nguyen",pts:420,level:"bronze",checkIns:4,badges:1,since:"Mar 2026",email:"devon@example.com",lastVisit:"5 days ago"},
];
const INTEGRATIONS=[
  {id:"pos",name:"Square POS",desc:"Sync transactions and auto-award points",icon:DollarSign,connected:true,status:"Syncing"},
  {id:"taproom",name:"DigitalPour",desc:"Live tap list sync and menu updates",icon:Beer,connected:true,status:"Connected"},
  {id:"email",name:"Mailchimp",desc:"Email campaigns and segmentation",icon:Mail,connected:false,status:"Not connected"},
  {id:"social",name:"Instagram",desc:"Auto-post releases and events",icon:Instagram,connected:false,status:"Not connected"},
  {id:"res",name:"Yelp Reservations",desc:"Sync RSVPs and reservations",icon:Calendar,connected:true,status:"Connected"},
  {id:"analytics",name:"Google Analytics",desc:"Track engagement and conversions",icon:BarChart3,connected:false,status:"Not connected"},
];
const ACTIVITY=[
  {type:"checkin",who:"Alex M.",what:"checked in",when:"5 min ago"},
  {type:"badge",who:"Sarah K.",what:"earned Tap Explorer",when:"12 min ago"},
  {type:"reward",who:"Mike T.",what:"redeemed Free Pint",when:"25 min ago"},
  {type:"checkin",who:"Emily R.",what:"checked in (Dock Day)",when:"32 min ago"},
  {type:"level",who:"Chris B.",what:"reached Silver status",when:"1 hr ago"},
  {type:"checkin",who:"Jordan L.",what:"checked in",when:"1.5 hr ago"},
  {type:"rating",who:"Priya P.",what:"rated Rude Parrot 5 stars",when:"2 hr ago"},
];

// HELPERS
const LEVELS=[{name:"Bronze",min:0,color:C.accent},{name:"Silver",min:2500,color:"#4A6478"},{name:"Gold",min:6000,color:C.warning},{name:"Platinum",min:12000,color:"#2A5A80"}];
const getLevel=p=>{for(let i=LEVELS.length-1;i>=0;i--)if(p>=LEVELS[i].min)return LEVELS[i];return LEVELS[0]};
const getNextLevel=p=>{for(let i=0;i<LEVELS.length;i++)if(p<LEVELS[i].min)return LEVELS[i];return null};
const getLevelProg=p=>{const c=getLevel(p),n=getNextLevel(p);if(!n)return{pct:100,rem:0};return{pct:Math.round(((p-c.min)/(n.min-c.min))*100),rem:n.min-p}};
const iconMap={Beer,Star,MapPin,Calendar,Award,Trophy,Shield,TrendingUp,Sparkles,Heart,Users,Gift,Droplets,Zap};
const getIcon=n=>iconMap[n]||Star;
const levelColor=l=>l==="platinum"?"#2A5A80":l==="gold"?C.warning:l==="silver"?"#4A6478":C.accent;

// FONTS & STYLES — Montserrat display + Lato body
const font=`'Lato',system-ui,-apple-system,sans-serif`;
const fontD=`'Montserrat','Lato',system-ui,sans-serif`;
const css=`
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900&family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:${font};background:${C.bg};color:${C.text};-webkit-font-smoothing:antialiased;font-size:16px}
.shell{max-width:430px;margin:0 auto;height:100%;background:${C.bg};display:flex;flex-direction:column;overflow:hidden}
.enter{animation:si .35s ease-out}@keyframes si{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.press{transition:transform .15s,box-shadow .15s}.press:active{transform:scale(.98)}
.shimmer{position:relative;overflow:hidden}.shimmer::after{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.4),transparent);animation:sh 3s infinite}@keyframes sh{100%{left:100%}}
.pfill{transition:width .8s cubic-bezier(.4,0,.2,1)}
.fin{animation:fi .4s ease-out}@keyframes fi{from{opacity:0}to{opacity:1}}
.sup{animation:su .35s cubic-bezier(.16,1,.3,1)}@keyframes su{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
.fbr{transition:width .6s cubic-bezier(.4,0,.2,1) .2s}
.gp{animation:gp 2.5s ease-in-out infinite}@keyframes gp{0%,100%{box-shadow:${C.shadow}}50%{box-shadow:${C.shadow}, 0 0 20px ${C.accentGlow}}}
.noscr::-webkit-scrollbar{display:none}.noscr{-ms-overflow-style:none;scrollbar-width:none}
input,textarea,select{font-family:${font}}
.toggle{width:44px;height:24px;border-radius:12px;position:relative;cursor:pointer;border:none;transition:background .2s}
.toggle .dot{width:18px;height:18px;border-radius:50%;background:#fff;position:absolute;top:3px;transition:transform .2s;box-shadow:0 1px 3px rgba(0,0,0,.12)}
.toggle.on{background:${C.success}}.toggle.on .dot{transform:translateX(22px)}
.toggle.off{background:${C.border}}.toggle.off .dot{transform:translateX(3px)}
`;
const S={
  card:{background:C.card,borderRadius:14,boxShadow:C.shadow,border:"1px solid rgba(0,0,0,.04)"},
  cardP:{background:C.card,borderRadius:14,boxShadow:C.shadow,border:"1px solid rgba(0,0,0,.04)",padding:16},
  sectionTitle:{fontFamily:fontD,fontWeight:700,fontSize:30,letterSpacing:.5,textTransform:"uppercase"},
  label:{fontSize:13,fontWeight:700,color:C.textDim,textTransform:"uppercase",letterSpacing:1.5},
  input:{width:"100%",background:C.bg,border:`1px solid ${C.border}`,borderRadius:10,padding:"10px 14px",color:C.text,fontSize:16,outline:"none",fontFamily:font},
  btnPrimary:{padding:"10px 20px",borderRadius:10,fontWeight:700,fontSize:15,letterSpacing:.5,textTransform:"uppercase",cursor:"pointer",border:"none",background:C.accent,color:"#fff",display:"flex",alignItems:"center",gap:6,boxShadow:`0 2px 8px ${C.accentGlow}`},
  btnGhost:{padding:"10px 20px",borderRadius:10,fontWeight:700,fontSize:15,letterSpacing:.5,textTransform:"uppercase",cursor:"pointer",background:"transparent",border:`1px solid ${C.border}`,color:C.textMuted,display:"flex",alignItems:"center",gap:6},
};

// HERO COMPONENT
const PageHero=({image,title,subtitle,children})=>(
  <div style={{position:"relative",height:208,overflow:"hidden",marginBottom:16}}>
    <div style={{position:"absolute",inset:0,background:image?`url(${image}) center/cover no-repeat`:`linear-gradient(135deg,${C.accentDark} 0%,${C.tealDark} 100%)`,filter:image?"brightness(0.75)":"none"}}/>
    <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,transparent 40%,rgba(0,0,0,0.35) 100%)"}}/>
    <div style={{position:"relative",zIndex:1,height:"100%",display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"0 20px 18px"}}>
      <div style={{fontFamily:fontD,fontWeight:700,fontSize:30,letterSpacing:.5,textTransform:"uppercase",lineHeight:1.1,color:"#fff"}}>{title}</div>
      {subtitle&&<div style={{fontSize:15,color:"rgba(255,255,255,.7)",marginTop:4,fontWeight:500}}>{subtitle}</div>}
      {children}
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function BreweryLoyaltyApp({isAdmin=false,onOpenAdmin,onExitAdmin}){
  const[tab,setTab]=useState("home");
  const[adminTab,setAdminTab]=useState("dashboard");
  const contentRef=useRef(null);

  useEffect(()=>{contentRef.current?.scrollTo(0,0)},[tab,adminTab,isAdmin]);

  const[user,setUser]=useState({
    name:"Harbor Local",email:"sevenseas@example.com",birthday:"1990-06-15",
    pts:1680,checkIns:14,memberSince:"Oct 2025",
    badges:["first-visit","regular","taster"],rsvps:["e1","e4"],
    ratings:{b1:{r:5,n:"Best IPA in the South Sound."},b2:{r:5,n:"Juicy perfection."},b3:{r:4,n:"Precision pilsner."},b5:{r:4,n:""}},
    notifications:{pushEnabled:true,emailUpdates:true,eventReminders:true,newReleases:true},
  });
  const[events,setEvents]=useState(EVENTS_INIT);
  const[rewards,setRewards]=useState(REWARDS_INIT);
  const[beers,setBeers]=useState(BEERS);
  const[modal,setModal]=useState(null);
  const[toast,setToast]=useState(null);
  const[beerFilter,setBeerFilter]=useState("all");
  const[pointsCfg,setPointsCfg]=useState({regular:50,happyHour:100,event:125,dogBonus:75,silverAt:2500,goldAt:6000,platinumAt:12000});
  const[integrations,setIntegrations]=useState(INTEGRATIONS);

  const showToast=(msg,type="success")=>{setToast({msg,type,id:Date.now()});setTimeout(()=>setToast(null),3000)};
  const addPoints=(n,reason)=>{setUser(u=>({...u,pts:u.pts+n,checkIns:reason.includes("check")?u.checkIns+1:u.checkIns}));showToast(`+${n} ${BREWERY.memberTier}! ${reason}`)};
  const rateBeer=(id,r,n)=>{setUser(u=>({...u,ratings:{...u.ratings,[id]:{r,n}}}));addPoints(r>=4?25:15,`Rated ${beers.find(b=>b.id===id)?.name}`);setModal(null)};
  const toggleRSVP=id=>{const has=user.rsvps.includes(id);setUser(u=>({...u,rsvps:has?u.rsvps.filter(x=>x!==id):[...u.rsvps,id]}));showToast(has?"RSVP cancelled":"RSVP confirmed!",has?"info":"success")};
  const earnedBadges=BADGES.filter(b=>b.type==="checkin"?user.checkIns>=b.req:b.type==="rating"?Object.keys(user.ratings).length>=b.req:user.rsvps.length>=b.req);
  const level=getLevel(user.pts);const nextLevel=getNextLevel(user.pts);const progress=getLevelProg(user.pts);
  const filteredBeers=beerFilter==="all"?beers:beerFilter==="flagship"?beers.filter(b=>b.flagship):beerFilter==="limited"?beers.filter(b=>b.limited):beerFilter==="tried"?beers.filter(b=>user.ratings[b.id]):beerFilter==="untried"?beers.filter(b=>!user.ratings[b.id]):beers;

  // HEADER
  const Header=()=>(
    <div style={{background:"rgba(248,250,252,.92)",backdropFilter:"blur(16px)",borderBottom:`1px solid ${C.border}`,padding:"14px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:40}}>
      <div style={{display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:38,height:38,background:C.accent,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:font,fontWeight:700,fontSize:14,letterSpacing:1,color:"#fff",borderRadius:8,boxShadow:`0 2px 8px ${C.accentGlow}`}}>{BREWERY.logo}</div>
        <div><div style={{fontFamily:fontD,fontWeight:700,fontSize:19,letterSpacing:.5,textTransform:"uppercase"}}>{BREWERY.name}</div><div style={{fontSize:12,color:C.textDim,fontWeight:600,letterSpacing:1.5,textTransform:"uppercase"}}>{BREWERY.subtitle}</div></div>
      </div>
      <div style={{display:"flex",gap:8}}>
        {!isAdmin&&<><button onClick={()=>setModal({type:"settings"})} style={{width:38,height:38,background:C.bg,border:`1px solid ${C.border}`,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:C.textMuted}}><User size={18}/></button>
        <button onClick={()=>setModal({type:"qr"})} style={{width:38,height:38,background:C.bg,border:`1px solid ${C.border}`,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:C.text}}><QrCode size={18}/></button></>}
        <button onClick={()=>{if(isAdmin){onExitAdmin&&onExitAdmin();setAdminTab("dashboard")}else{onOpenAdmin&&onOpenAdmin()}}} style={{width:38,height:38,background:isAdmin?C.accentFaint:C.bg,border:`1px solid ${isAdmin?C.accent+"40":C.border}`,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:isAdmin?C.accent:C.textMuted}}>{isAdmin?<ChevronLeft size={18}/>:<Settings size={18}/>}</button>
      </div>
    </div>
  );

  // CONSUMER NAV
  const NavBar=()=>{const tabs=[{id:"home",icon:Home,label:"Home"},{id:"beers",icon:Beer,label:"Beers"},{id:"events",icon:Calendar,label:"Events"},{id:"badges",icon:Award,label:"Badges"},{id:"rewards",icon:Gift,label:"Rewards"}];return(
    <div style={{flexShrink:0,width:"100%",background:"rgba(248,250,252,.92)",backdropFilter:"blur(16px)",borderTop:`1px solid ${C.border}`,display:"flex",zIndex:40,paddingBottom:"env(safe-area-inset-bottom,0px)"}}>
      {tabs.map(t=>{const I=t.icon;const a=tab===t.id;return(<button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"10px 0 8px",background:"none",border:"none",cursor:"pointer",color:a?C.accent:C.textDim,transition:"color .2s"}}><I size={20} strokeWidth={a?2.2:1.5}/><span style={{fontSize:11,fontWeight:a?700:500,letterSpacing:.5,textTransform:"uppercase"}}>{t.label}</span>{a&&<div style={{width:4,height:4,borderRadius:"50%",background:C.accent,marginTop:-1}}/>}</button>)})}
    </div>)};

  // ADMIN NAV
  const AdminNav=()=>{const tabs=[{id:"dashboard",icon:LayoutDashboard,label:"Dashboard"},{id:"scanner",icon:Scan,label:"Scanner"},{id:"beers",icon:Beer,label:"Beers"},{id:"events",icon:Calendar,label:"Events"},{id:"rewards",icon:Gift,label:"Rewards"},{id:"broadcast",icon:Megaphone,label:"Broadcast"},{id:"settings",icon:Settings,label:"Settings"}];return(
    <div className="noscr" style={{flexShrink:0,width:"100%",background:"rgba(248,250,252,.92)",backdropFilter:"blur(16px)",borderTop:`1px solid ${C.border}`,display:"flex",zIndex:40,overflowX:"auto",paddingBottom:"env(safe-area-inset-bottom,0px)"}}>
      {tabs.map(t=>{const I=t.icon;const a=adminTab===t.id;return(<button key={t.id} onClick={()=>setAdminTab(t.id)} style={{flex:"0 0 auto",minWidth:60,display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"10px 8px 8px",background:"none",border:"none",cursor:"pointer",color:a?C.accent:C.textDim,transition:"color .2s"}}><I size={18} strokeWidth={a?2.2:1.5}/><span style={{fontSize:11,fontWeight:a?700:500,letterSpacing:.3,textTransform:"uppercase",whiteSpace:"nowrap"}}>{t.label}</span></button>)})}
    </div>)};

  // ════════════════════════════════════════════════════
  // CONSUMER SCREENS — all with hero images
  // ════════════════════════════════════════════════════

  const HomeScreen=()=>(<div className="enter" style={{paddingBottom:20}}>
    <PageHero image={BREWERY.heroImages.home} title={BREWERY.tagline} subtitle={BREWERY.city}/>
    <div style={{padding:"0 16px"}}>
      <div className="shimmer gp" style={{background:`linear-gradient(135deg,${C.accent},${C.accentDark})`,borderRadius:16,padding:"24px 20px",marginBottom:14,position:"relative",overflow:"hidden",color:"#fff"}}>
        <div style={{position:"absolute",top:-30,right:-30,width:120,height:120,background:"rgba(255,255,255,.1)",borderRadius:"50%",filter:"blur(40px)"}}/>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div><div style={{fontSize:13,fontWeight:700,color:"rgba(255,255,255,.7)",letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>{BREWERY.memberTier}</div><div style={{fontFamily:fontD,fontSize:46,fontWeight:700,letterSpacing:-1,lineHeight:1}}>{user.pts.toLocaleString()}</div><div style={{fontSize:14,fontWeight:600,color:"rgba(255,255,255,.85)",marginTop:6,textTransform:"uppercase",letterSpacing:1}}>{level.name} Member</div></div>
            <div style={{width:52,height:52,background:"rgba(255,255,255,.15)",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(8px)"}}><Beer size={26} color="#fff"/></div>
          </div>
          {nextLevel&&<div style={{marginTop:16}}><div style={{height:5,background:"rgba(255,255,255,.2)",borderRadius:3,overflow:"hidden"}}><div className="pfill" style={{height:"100%",width:`${progress.pct}%`,background:"rgba(255,255,255,.85)",borderRadius:3}}/></div><div style={{fontSize:13,color:"rgba(255,255,255,.6)",marginTop:5,fontWeight:600}}>{progress.rem.toLocaleString()} to {nextLevel.name}</div></div>}
        </div>
      </div>
      <button className="press" onClick={()=>setModal({type:"qr"})} style={{width:"100%",...S.cardP,marginBottom:14,display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer",color:C.text,textAlign:"left"}}>
        <div style={{display:"flex",alignItems:"center",gap:14}}><div style={{width:44,height:44,background:C.accentFaint,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center"}}><MapPin size={22} color={C.accent}/></div><div><div style={{fontWeight:700,fontSize:16}}>{BREWERY.name} {BREWERY.subtitle}</div><div style={{fontSize:14,color:C.accent,fontWeight:600}}>{BREWERY.city}</div><div style={{fontSize:13,color:C.textDim,marginTop:2}}>Tap to check in</div></div></div>
        <div style={{background:`linear-gradient(135deg,${C.teal},${C.tealDark})`,padding:"10px 18px",borderRadius:8,fontWeight:700,fontSize:14,letterSpacing:1,textTransform:"uppercase",color:"#fff"}}>QR</div>
      </button>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
        {[{l:"Check-ins",v:user.checkIns,i:TrendingUp,c:C.accent},{l:"Badges",v:earnedBadges.length,i:Award,c:C.teal},{l:"Beers Rated",v:Object.keys(user.ratings).length,i:Star,c:C.warning},{l:"Member Since",v:user.memberSince,i:Calendar,c:"#4A6478",sm:true}].map((s,i)=>{const I=s.i;return(<div key={i} style={{...S.cardP,borderLeft:`3px solid ${s.c}`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}><I size={16} color={s.c}/><span style={{...S.label}}>{s.l}</span></div><div style={{fontFamily:fontD,fontSize:s.sm?17:30,fontWeight:700}}>{s.v}</div></div>)})}
      </div>
      <div style={{...S.cardP,marginBottom:14}}>
        <div style={{fontFamily:fontD,fontWeight:700,fontSize:16,letterSpacing:1,textTransform:"uppercase",marginBottom:12,display:"flex",alignItems:"center",gap:8}}><Zap size={16} color={C.accent}/> Quick Actions</div>
        {[{l:"Explore Beers",s:`${beers.length} on tap`,d:"beers",c:C.accent},{l:"Upcoming Events",s:`${events.length} this month`,d:"events",c:C.teal}].map((a,i)=>(<button key={i} className="press" onClick={()=>setTab(a.d)} style={{width:"100%",background:C.surface,border:`1px solid ${C.border}`,borderLeft:`3px solid ${a.c}`,borderRadius:8,padding:"14px 16px",marginBottom:i===0?8:0,display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer",color:C.text,textAlign:"left"}}><div><div style={{fontWeight:700,fontSize:15,textTransform:"uppercase",letterSpacing:.5}}>{a.l}</div><div style={{fontSize:13,color:C.textDim,marginTop:2}}>{a.s}</div></div><ArrowRight size={16} color={a.c}/></button>))}
      </div>
      <div style={{background:`linear-gradient(135deg,${C.tealDark},${C.teal})`,borderRadius:12,padding:20,color:"#fff"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}><Award size={18}/><span style={{fontFamily:fontD,fontWeight:700,fontSize:16,letterSpacing:1,textTransform:"uppercase"}}>Your {level.name} Perks</span></div>
        {["Priority Beer Garden table reservation","Early access to new releases","Birthday pint on the house"].map((p,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}><div style={{width:6,height:6,background:"#fff",transform:"rotate(45deg)",flexShrink:0}}/><span style={{fontSize:15,fontWeight:600}}>{p}</span></div>))}
      </div>
    </div>
  </div>);

  const BeersScreen=()=>(<div className="enter" style={{paddingBottom:20}}>
    <PageHero image={BREWERY.heroImages.beers} title="On Tap" subtitle={`${beers.length} beers · ${beers.filter(b=>b.limited).length} limited releases`}/>
    <div style={{padding:"0 16px"}}>
      <div className="noscr" style={{display:"flex",gap:8,marginBottom:16,overflowX:"auto",paddingBottom:4}}>
        {[{id:"all",l:"All"},{id:"flagship",l:"Flagship"},{id:"limited",l:"Limited"},{id:"tried",l:"Tried"},{id:"untried",l:"Not Tried"}].map(f=>(<button key={f.id} onClick={()=>setBeerFilter(f.id)} style={{padding:"7px 18px",borderRadius:20,fontSize:14,fontWeight:700,letterSpacing:.5,whiteSpace:"nowrap",cursor:"pointer",border:beerFilter===f.id?"none":`1px solid ${C.border}`,background:beerFilter===f.id?C.accent:"transparent",color:beerFilter===f.id?"#fff":C.textMuted,transition:"all .2s"}}>{f.l}</button>))}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {filteredBeers.map(beer=>{const rated=user.ratings[beer.id];return(<button key={beer.id} className="press" onClick={()=>setModal({type:"beer",data:beer})} style={{...S.cardP,cursor:"pointer",textAlign:"left",color:C.text,display:"flex",gap:14,alignItems:"flex-start"}}>
          <div style={{width:52,height:52,borderRadius:10,background:`linear-gradient(135deg,hsl(${beer.abv*5+20},70%,45%),hsl(${beer.abv*5},60%,35%))`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Beer size={24} color="rgba(255,255,255,.85)"/></div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2,flexWrap:"wrap"}}><span style={{fontFamily:fontD,fontWeight:700,fontSize:16,textTransform:"uppercase",letterSpacing:.3}}>{beer.name}</span>{beer.flagship&&<span style={{fontSize:11,fontWeight:700,background:C.accentFaint,color:C.accent,padding:"2px 6px",borderRadius:4,textTransform:"uppercase"}}>Flagship</span>}{beer.limited&&<span style={{fontSize:11,fontWeight:700,background:"rgba(196,154,12,.12)",color:C.warning,padding:"2px 6px",borderRadius:4,textTransform:"uppercase"}}>Limited</span>}</div>
            <div style={{fontSize:15,color:C.textMuted,marginBottom:6}}>{beer.style}</div>
            <div style={{display:"flex",gap:12,fontSize:13,color:C.textDim}}><span><b style={{color:C.accent}}>{beer.abv}%</b> ABV</span><span><b style={{color:C.text}}>{beer.ibu}</b> IBU</span><span><b style={{color:C.teal}}>+{beer.pts}</b> pts</span></div>
            {rated&&<div style={{display:"flex",alignItems:"center",gap:4,marginTop:6}}>{Array.from({length:5}).map((_,i)=><Star key={i} size={12} fill={i<rated.r?C.warning:"none"} color={i<rated.r?C.warning:C.textDim}/>)}<span style={{fontSize:12,color:C.textDim,marginLeft:4}}>Your rating</span></div>}
          </div><ChevronRight size={16} color={C.textDim} style={{flexShrink:0,marginTop:4}}/>
        </button>)})}
      </div>
    </div>
  </div>);

  const EventsScreen=()=>(<div className="enter" style={{paddingBottom:20}}>
    <PageHero image={BREWERY.heroImages.events} title="Upcoming Events" subtitle={`${events.length} events on the calendar`}/>
    <div style={{padding:"0 16px",display:"flex",flexDirection:"column",gap:10}}>
      {events.map(ev=>{const isR=user.rsvps.includes(ev.id);const spots=ev.capacity-ev.rsvpCount-(isR?1:0);const d=new Date(ev.date+"T12:00:00");return(<div key={ev.id} style={{...S.cardP,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,right:0,background:ev.tag==="Release"?C.accent:ev.tag==="Charity"?C.teal:ev.tag==="Dinner"?C.warning:C.textDim,padding:"4px 12px",borderRadius:"0 0 0 8px",fontSize:12,fontWeight:700,letterSpacing:1,textTransform:"uppercase",color:"#fff"}}>{ev.tag}</div>
        <div style={{fontFamily:fontD,fontWeight:700,fontSize:18,textTransform:"uppercase",marginBottom:4,paddingRight:70}}>{ev.name}</div>
        <div style={{display:"flex",gap:16,fontSize:15,color:C.textMuted,marginBottom:10}}><span style={{display:"flex",alignItems:"center",gap:4}}><Calendar size={13}/> {d.toLocaleDateString("en-US",{month:"short",day:"numeric"})}</span><span style={{display:"flex",alignItems:"center",gap:4}}><Clock size={13}/> {ev.time}</span><span style={{display:"flex",alignItems:"center",gap:4}}><Users size={13}/> {spots} spots</span></div>
        <div style={{fontSize:15,color:C.textMuted,lineHeight:1.5,marginBottom:14}}>{ev.desc}</div>
        <button className="press" onClick={()=>setModal(isR?{type:"cancel-rsvp",data:ev}:{type:"rsvp",data:ev})} style={{...isR?S.btnGhost:S.btnPrimary,border:isR?`1px solid ${C.teal}`:"none",color:isR?C.teal:"#fff",background:isR?"transparent":`linear-gradient(135deg,${C.accent},${C.accentDark})`}}>{isR?<><Check size={14}/> Going</>:<><ArrowRight size={14}/> RSVP</>}</button>
      </div>)})}
    </div>
  </div>);

  const BadgesScreen=()=>(<div className="enter" style={{paddingBottom:20}}>
    <PageHero image={BREWERY.heroImages.badges} title="Badges" subtitle={`${earnedBadges.length} of ${BADGES.length} earned`}/>
    <div style={{padding:"0 16px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
      {BADGES.map(b=>{const earned=earnedBadges.find(e=>e.id===b.id);const I=getIcon(b.icon);const prog=b.type==="checkin"?Math.min(user.checkIns/b.req,1):b.type==="rating"?Math.min(Object.keys(user.ratings).length/b.req,1):Math.min(user.rsvps.length/b.req,1);return(<div key={b.id} style={{background:earned?C.card:C.surface,border:`1px solid ${earned?C.accent+"40":C.border}`,borderRadius:12,padding:18,textAlign:"center",opacity:earned?1:.5,position:"relative"}}>
        {earned&&<div style={{position:"absolute",top:8,right:8,width:18,height:18,background:C.success,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}><Check size={10} color="#fff" strokeWidth={3}/></div>}
        <div style={{width:48,height:48,margin:"0 auto 10px",borderRadius:12,background:earned?`linear-gradient(135deg,${C.accent},${C.teal})`:C.border,display:"flex",alignItems:"center",justifyContent:"center"}}><I size={24} color={earned?"#fff":C.textDim}/></div>
        <div style={{fontFamily:fontD,fontWeight:700,fontSize:15,textTransform:"uppercase",marginBottom:4}}>{b.name}</div>
        <div style={{fontSize:13,color:C.textDim,marginBottom:8}}>{b.desc}</div>
        {!earned&&<div style={{height:4,background:"rgba(0,0,0,.04)",borderRadius:2,overflow:"hidden"}}><div style={{height:"100%",width:`${prog*100}%`,background:"rgba(255,255,255,.85)",borderRadius:2}}/></div>}
      </div>)})}
    </div>
  </div>);

  const RewardsScreen=()=>(<div className="enter" style={{paddingBottom:20}}>
    <PageHero image={BREWERY.heroImages.rewards} title="Rewards" subtitle={<>You have <b style={{color:C.accent}}>{user.pts.toLocaleString()}</b> {BREWERY.memberTier}</>}/>
    <div style={{padding:"0 16px",display:"flex",flexDirection:"column",gap:10}}>
      {rewards.filter(r=>r.active).map(rw=>{const can=user.pts>=rw.pts;const I=getIcon(rw.icon);return(<div key={rw.id} style={{...S.cardP,display:"flex",alignItems:"center",gap:14,opacity:can?1:.6,border:`1px solid ${can?C.accent+"40":C.border}`}}>
        <div style={{width:48,height:48,borderRadius:12,background:can?C.accentFaint:C.surface,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><I size={22} color={can?C.accent:C.textDim}/></div>
        <div style={{flex:1}}><div style={{fontFamily:fontD,fontWeight:700,fontSize:16,textTransform:"uppercase"}}>{rw.name}</div><div style={{fontSize:15,color:C.textMuted,marginTop:2}}>{rw.desc}</div></div>
        <div style={{textAlign:"right",flexShrink:0}}><div style={{fontFamily:fontD,fontWeight:700,fontSize:18,color:can?C.accent:C.textDim}}>{rw.pts.toLocaleString()}</div><div style={{fontSize:12,color:C.textDim,textTransform:"uppercase"}}>pts</div></div>
      </div>)})}
    </div>
  </div>);

  // ════════════════════════════════════════════════════
  // ADMIN SCREENS
  // ════════════════════════════════════════════════════

  const AdminDashboard=()=>{const stats=[{l:"Members",v:"156",sub:"+8 this month",i:Users,c:C.info},{l:"Check-ins",v:"1,247",sub:"+34 today",i:TrendingUp,c:C.accent},{l:"Badges",v:"312",sub:"all members",i:Award,c:C.teal},{l:"Rewards",v:"89",sub:"$2,140 value",i:Gift,c:C.warning}];const lvls=[{n:"Bronze",c:C.accent,ct:62,pct:40},{n:"Silver",c:"#4A6478",ct:48,pct:31},{n:"Gold",c:C.warning,ct:34,pct:22},{n:"Platinum",c:"#2A5A80",ct:12,pct:7}];return(
    <div className="enter" style={{padding:"16px 16px 100px"}}>
      <div style={{marginBottom:16}}><div style={{...S.sectionTitle}}>Dashboard</div><div style={{fontSize:15,color:C.textMuted,marginTop:2}}>{BREWERY.name} Club Overview</div></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>{stats.map((s,i)=>{const I=s.i;return(<div key={i} style={{...S.cardP}}><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}><I size={16} color={s.c}/><span style={{...S.label}}>{s.l}</span></div><div style={{fontFamily:fontD,fontWeight:700,fontSize:30}}>{s.v}</div><div style={{fontSize:13,color:C.accent,marginTop:2}}>{s.sub}</div></div>)})}</div>
      <div style={{background:`linear-gradient(135deg,${C.accent},${C.accentDark})`,borderRadius:12,padding:16,marginBottom:14,color:"#fff"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><Clock size={16}/><span style={{fontWeight:700,textTransform:"uppercase",letterSpacing:1,fontSize:15}}>Today</span></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,textAlign:"center"}}>{[{v:"34",l:"Check-ins"},{v:"6",l:"New"},{v:"12",l:"Rewards"}].map((d,i)=>(<div key={i}><div style={{fontFamily:fontD,fontWeight:700,fontSize:26}}>{d.v}</div><div style={{fontSize:12,opacity:.8,textTransform:"uppercase"}}>{d.l}</div></div>))}</div></div>
      <div style={{...S.cardP,marginBottom:14}}><div style={{...S.label,marginBottom:12}}>Member Levels</div>{lvls.map(l=>(<div key={l.n} style={{marginBottom:10}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:14,fontWeight:700,color:l.c}}>{l.n}</span><span style={{fontSize:14,fontWeight:700}}>{l.ct}</span></div><div style={{height:5,background:"rgba(255,255,255,.2)",borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",width:`${l.pct}%`,background:l.c,borderRadius:3}}/></div></div>))}</div>
      <div style={{...S.cardP}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}><Activity size={16} color={C.accent}/><span style={{...S.label}}>Recent Activity</span></div>{ACTIVITY.map((a,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:i<ACTIVITY.length-1?`1px solid ${C.border}`:"none"}}><div style={{width:8,height:8,borderRadius:"50%",background:a.type==="checkin"?C.accent:a.type==="badge"?C.teal:a.type==="reward"?C.info:a.type==="level"?"#2A5A80":C.warning,flexShrink:0}}/><div style={{flex:1,fontSize:15}}><b>{a.who}</b> <span style={{color:C.textMuted}}>{a.what}</span></div><span style={{fontSize:13,color:C.textDim,whiteSpace:"nowrap"}}>{a.when}</span></div>))}</div>
    </div>)};

  const AdminScanner=()=>{const[search,setSearch]=useState("");const[selected,setSelected]=useState(null);const[checkType,setCheckType]=useState("regular");const filtered=search?MOCK_MEMBERS.filter(m=>m.name.toLowerCase().includes(search.toLowerCase())):[];const types=[{id:"regular",l:"Regular",pts:50,i:Zap},{id:"happyHour",l:"Happy Hour",pts:100,i:Clock},{id:"event",l:"Event",pts:125,i:Calendar},{id:"dog",l:"With Pup",pts:125,i:Dog}];return(
    <div className="enter" style={{padding:"16px 16px 100px"}}>
      <div style={{marginBottom:16}}><div style={{...S.sectionTitle}}>Staff Scanner</div><div style={{fontSize:15,color:C.textMuted,marginTop:2}}>Scan QR or search members</div></div>
      {!selected?<><div style={{...S.cardP,marginBottom:14,textAlign:"center",border:`2px dashed ${C.borderLight}`,padding:32}}><div style={{width:72,height:72,background:C.surface,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px"}}><QrCode size={36} color={C.textDim}/></div><div style={{fontSize:16,color:C.textMuted,marginBottom:4}}>QR Scanner</div><div style={{fontSize:14,color:C.textDim,marginBottom:12}}>Camera access required</div><button style={{...S.btnPrimary,margin:"0 auto"}}>Enable Camera</button></div>
      <div style={{position:"relative",marginBottom:14}}><Search size={16} style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:C.textDim}}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name..." style={{...S.input,paddingLeft:36}}/></div>
      {search&&<div style={{...S.card,overflow:"hidden",marginBottom:14}}>{filtered.length===0?<div style={{padding:16,textAlign:"center",color:C.textDim,fontSize:15}}>No members found</div>:filtered.map((m,i)=>(<button key={m.id} onClick={()=>{setSelected(m);setSearch("")}} style={{width:"100%",padding:"12px 16px",display:"flex",alignItems:"center",gap:12,background:"none",border:"none",borderBottom:i<filtered.length-1?`1px solid ${C.border}`:"none",cursor:"pointer",color:C.text,textAlign:"left"}}><div style={{width:40,height:40,background:C.accentFaint,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}><User size={18} color={C.accent}/></div><div style={{flex:1}}><div style={{fontWeight:700,fontSize:16}}>{m.name}</div><div style={{fontSize:13,color:C.textDim}}>{m.pts} pts | {m.checkIns} check-ins</div></div><span style={{padding:"3px 8px",borderRadius:4,fontSize:12,fontWeight:700,textTransform:"uppercase",background:levelColor(m.level)+"20",color:levelColor(m.level)}}>{m.level}</span></button>))}</div>}
      <div style={{...S.cardP}}><div style={{...S.label,marginBottom:10}}>Recent Scans</div>{MOCK_MEMBERS.slice(0,3).map((m,i)=>(<div key={m.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:i<2?`1px solid ${C.border}`:"none"}}><div style={{width:32,height:32,background:C.surface,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}><User size={14} color={C.textDim}/></div><div style={{flex:1}}><div style={{fontSize:15,fontWeight:600}}>{m.name}</div><div style={{fontSize:13,color:C.textDim}}>Last: {m.lastVisit}</div></div></div>))}</div>
      </>:<><div style={{...S.cardP,marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:14,marginBottom:14}}><div style={{width:56,height:56,background:C.accentFaint,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}><User size={28} color={C.accent}/></div><div><div style={{fontFamily:fontD,fontWeight:700,fontSize:22,textTransform:"uppercase"}}>{selected.name}</div><div style={{display:"flex",alignItems:"center",gap:8,marginTop:4}}><span style={{padding:"3px 8px",borderRadius:4,fontSize:12,fontWeight:700,textTransform:"uppercase",background:levelColor(selected.level)+"20",color:levelColor(selected.level)}}>{selected.level}</span><span style={{fontSize:15,color:C.textMuted}}>{selected.pts} pts</span></div></div></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,background:C.surface,borderRadius:8,padding:12,textAlign:"center"}}>{[{v:selected.pts,l:"Points",c:C.accent},{v:selected.checkIns,l:"Check-ins",c:C.text},{v:selected.badges,l:"Badges",c:C.teal}].map((s,i)=>(<div key={i}><div style={{fontFamily:fontD,fontWeight:700,fontSize:20,color:s.c}}>{s.v}</div><div style={{fontSize:12,color:C.textDim,textTransform:"uppercase"}}>{s.l}</div></div>))}</div></div>
      <div style={{...S.label,marginBottom:10}}>Select Check-in Type</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>{types.map(t=>{const I=t.i;const sel=checkType===t.id;return(<button key={t.id} onClick={()=>setCheckType(t.id)} style={{...S.cardP,cursor:"pointer",textAlign:"center",border:sel?`2px solid ${C.accent}`:`1px solid ${C.border}`,background:sel?C.accentFaint:C.card}}><I size={22} color={sel?C.accent:C.textMuted} style={{margin:"0 auto 8px"}}/><div style={{fontWeight:700,fontSize:15}}>{t.l}</div><div style={{fontSize:13,color:C.accent,marginTop:2}}>+{t.pts} pts</div></button>)})}</div>
      <button onClick={()=>{showToast(`+${types.find(t=>t.id===checkType).pts} points to ${selected.name}!`);setTimeout(()=>setSelected(null),1500)}} style={{...S.btnPrimary,width:"100%",justifyContent:"center",padding:14,marginBottom:10}}><Zap size={16}/> Award {types.find(t=>t.id===checkType).pts} Points</button>
      <button onClick={()=>setSelected(null)} style={{...S.btnGhost,width:"100%",justifyContent:"center"}}>Cancel</button>
      <div style={{marginTop:14,background:"rgba(196,154,12,.06)",border:`1px solid rgba(196,154,12,.12)`,borderRadius:10,padding:12,display:"flex",gap:8}}><AlertCircle size={16} color={C.warning} style={{flexShrink:0,marginTop:2}}/><span style={{fontSize:14,color:"#1A4060"}}>Verify customer is present before awarding points.</span></div></>}
    </div>)};

  const AdminBeers=()=>{const[search,setSearch]=useState("");const[editing,setEditing]=useState(null);const filtered=beers.filter(b=>b.name.toLowerCase().includes(search.toLowerCase())||b.style.toLowerCase().includes(search.toLowerCase()));return(
    <div className="enter" style={{padding:"16px 16px 100px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div><div style={{...S.sectionTitle}}>Manage Beers</div><div style={{fontSize:15,color:C.textMuted,marginTop:2}}>{beers.length} in catalog</div></div><button onClick={()=>setEditing({id:"new",name:"",style:"",abv:5.0,ibu:30,pts:25,flagship:false,limited:false,avail:true,desc:"",flavor:{hoppy:50,malty:50,bitter:50,fruity:50,crisp:50},pair:""})} style={{...S.btnPrimary}}><Plus size={14}/> Add</button></div>
      <div style={{position:"relative",marginBottom:14}}><Search size={16} style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:C.textDim}}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search beers..." style={{...S.input,paddingLeft:36}}/></div>
      {editing&&<div style={{...S.cardP,marginBottom:14,border:`1px solid ${C.accent}40`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}><span style={{...S.label}}>{editing.id==="new"?"Add Beer":"Edit Beer"}</span><button onClick={()=>setEditing(null)} style={{background:"none",border:"none",cursor:"pointer",color:C.textDim}}><X size={16}/></button></div><div style={{display:"flex",flexDirection:"column",gap:10}}><input value={editing.name} onChange={e=>setEditing({...editing,name:e.target.value})} placeholder="Beer name" style={S.input}/><input value={editing.style} onChange={e=>setEditing({...editing,style:e.target.value})} placeholder="Style" style={S.input}/><div style={{display:"flex",gap:8}}><div style={{flex:1}}><div style={{...S.label,marginBottom:4}}>ABV</div><input type="number" step="0.1" value={editing.abv} onChange={e=>setEditing({...editing,abv:parseFloat(e.target.value)||0})} style={S.input}/></div><div style={{flex:1}}><div style={{...S.label,marginBottom:4}}>IBU</div><input type="number" value={editing.ibu} onChange={e=>setEditing({...editing,ibu:parseInt(e.target.value)||0})} style={S.input}/></div><div style={{flex:1}}><div style={{...S.label,marginBottom:4}}>Pts</div><input type="number" value={editing.pts} onChange={e=>setEditing({...editing,pts:parseInt(e.target.value)||0})} style={S.input}/></div></div><textarea value={editing.desc} onChange={e=>setEditing({...editing,desc:e.target.value})} placeholder="Description..." rows={3} style={{...S.input,resize:"none"}}/><div style={{display:"flex",gap:16}}>{[{k:"flagship",l:"Flagship"},{k:"limited",l:"Limited"},{k:"avail",l:"Available"}].map(f=>(<label key={f.k} style={{display:"flex",alignItems:"center",gap:6,fontSize:15,color:C.textMuted,cursor:"pointer"}}><button className={`toggle ${editing[f.k]?"on":"off"}`} onClick={()=>setEditing({...editing,[f.k]:!editing[f.k]})}><div className="dot"/></button>{f.l}</label>))}</div><button onClick={()=>{if(editing.id==="new"){setBeers(prev=>[...prev,{...editing,id:`b${Date.now()}`}]);showToast("Beer added!")}else{setBeers(prev=>prev.map(b=>b.id===editing.id?editing:b));showToast("Beer updated!")}setEditing(null)}} style={{...S.btnPrimary,justifyContent:"center"}}><Save size={14}/> {editing.id==="new"?"Add Beer":"Save Changes"}</button></div></div>}
      <div style={{display:"flex",flexDirection:"column",gap:8}}>{filtered.map(b=>(<div key={b.id} style={{...S.cardP,display:"flex",alignItems:"center",gap:12,padding:12}}><div style={{width:40,height:40,borderRadius:8,background:`linear-gradient(135deg,hsl(${b.abv*5+20},70%,45%),hsl(${b.abv*5},60%,35%))`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Beer size={18} color="rgba(255,255,255,.85)"/></div><div style={{flex:1,minWidth:0}}><div style={{fontWeight:700,fontSize:15,display:"flex",alignItems:"center",gap:6}}>{b.name}{b.flagship&&<span style={{fontSize:10,background:C.accentFaint,color:C.accent,padding:"1px 4px",borderRadius:3}}>FLAG</span>}{b.limited&&<span style={{fontSize:10,background:"rgba(196,154,12,.12)",color:C.warning,padding:"1px 4px",borderRadius:3}}>LTD</span>}{!b.avail&&<span style={{fontSize:10,background:"rgba(239,68,68,.15)",color:C.danger,padding:"1px 4px",borderRadius:3}}>OFF</span>}</div><div style={{fontSize:13,color:C.textDim}}>{b.style} · {b.abv}% · +{b.pts}pts</div></div><div style={{display:"flex",gap:6}}><button onClick={()=>setEditing(b)} style={{width:32,height:32,background:C.surface,border:`1px solid ${C.border}`,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:C.textMuted}}><Edit size={14}/></button><button onClick={()=>{setBeers(prev=>prev.filter(x=>x.id!==b.id));showToast("Beer removed","info")}} style={{width:32,height:32,background:C.surface,border:`1px solid ${C.border}`,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:C.danger}}><Trash2 size={14}/></button></div></div>))}</div>
    </div>)};

  const AdminEvents=()=>{const[editing,setEditing]=useState(null);return(<div className="enter" style={{padding:"16px 16px 100px"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div><div style={{...S.sectionTitle}}>Manage Events</div><div style={{fontSize:15,color:C.textMuted,marginTop:2}}>{events.length} upcoming</div></div><button onClick={()=>setEditing({id:"new",name:"",date:"",time:"",desc:"",rsvpCount:0,capacity:50,tag:"Weekly"})} style={{...S.btnPrimary}}><Plus size={14}/> Add</button></div>{editing&&<div style={{...S.cardP,marginBottom:14,border:`1px solid ${C.accent}40`}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}><span style={{...S.label}}>{editing.id==="new"?"New Event":"Edit Event"}</span><button onClick={()=>setEditing(null)} style={{background:"none",border:"none",cursor:"pointer",color:C.textDim}}><X size={16}/></button></div><div style={{display:"flex",flexDirection:"column",gap:10}}><input value={editing.name} onChange={e=>setEditing({...editing,name:e.target.value})} placeholder="Event name" style={S.input}/><div style={{display:"flex",gap:8}}><div style={{flex:1}}><div style={{...S.label,marginBottom:4}}>Date</div><input type="date" value={editing.date} onChange={e=>setEditing({...editing,date:e.target.value})} style={S.input}/></div><div style={{flex:1}}><div style={{...S.label,marginBottom:4}}>Time</div><input value={editing.time} onChange={e=>setEditing({...editing,time:e.target.value})} placeholder="7:00 PM" style={S.input}/></div></div><div style={{display:"flex",gap:8}}><div style={{flex:1}}><div style={{...S.label,marginBottom:4}}>Capacity</div><input type="number" value={editing.capacity} onChange={e=>setEditing({...editing,capacity:parseInt(e.target.value)||0})} style={S.input}/></div><div style={{flex:1}}><div style={{...S.label,marginBottom:4}}>Tag</div><select value={editing.tag} onChange={e=>setEditing({...editing,tag:e.target.value})} style={S.input}><option>Weekly</option><option>Release</option><option>Charity</option><option>Dinner</option><option>Family</option></select></div></div><textarea value={editing.desc} onChange={e=>setEditing({...editing,desc:e.target.value})} placeholder="Description..." rows={3} style={{...S.input,resize:"none"}}/><button onClick={()=>{if(editing.id==="new"){setEvents(prev=>[...prev,{...editing,id:`e${Date.now()}`}]);showToast("Event created!")}else{setEvents(prev=>prev.map(e=>e.id===editing.id?editing:e));showToast("Event updated!")}setEditing(null)}} style={{...S.btnPrimary,justifyContent:"center"}}><Save size={14}/> {editing.id==="new"?"Create":"Save"}</button></div></div>}{events.map(ev=>(<div key={ev.id} style={{...S.cardP,marginBottom:10,display:"flex",alignItems:"center",gap:12}}><div style={{width:44,height:44,background:ev.tag==="Release"?C.accentFaint:ev.tag==="Charity"?C.tealGlow:C.surface,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Calendar size={20} color={ev.tag==="Release"?C.accent:ev.tag==="Charity"?C.teal:C.textMuted}/></div><div style={{flex:1}}><div style={{fontWeight:700,fontSize:15,display:"flex",alignItems:"center",gap:6}}>{ev.name}<span style={{fontSize:11,background:C.surface,color:C.textDim,padding:"2px 6px",borderRadius:4,textTransform:"uppercase"}}>{ev.tag}</span></div><div style={{fontSize:13,color:C.textDim}}>{ev.date} · {ev.rsvpCount}/{ev.capacity}</div></div><div style={{display:"flex",gap:6}}><button onClick={()=>setEditing(ev)} style={{width:32,height:32,background:C.surface,border:`1px solid ${C.border}`,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:C.textMuted}}><Edit size={14}/></button><button onClick={()=>{setEvents(prev=>prev.filter(x=>x.id!==ev.id));showToast("Cancelled","info")}} style={{width:32,height:32,background:C.surface,border:`1px solid ${C.border}`,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:C.danger}}><Trash2 size={14}/></button></div></div>))}</div>)};

  const AdminRewards=()=>{const[editing,setEditing]=useState(null);return(<div className="enter" style={{padding:"16px 16px 100px"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div><div style={{...S.sectionTitle}}>Manage Rewards</div><div style={{fontSize:15,color:C.textMuted,marginTop:2}}>{rewards.filter(r=>r.active).length} active</div></div><button onClick={()=>setEditing({id:"new",name:"",pts:500,desc:"",icon:"Gift",active:true})} style={{...S.btnPrimary}}><Plus size={14}/> Add</button></div>{editing&&<div style={{...S.cardP,marginBottom:14,border:`1px solid ${C.accent}40`}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}><span style={{...S.label}}>{editing.id==="new"?"New Reward":"Edit"}</span><button onClick={()=>setEditing(null)} style={{background:"none",border:"none",cursor:"pointer",color:C.textDim}}><X size={16}/></button></div><div style={{display:"flex",flexDirection:"column",gap:10}}><input value={editing.name} onChange={e=>setEditing({...editing,name:e.target.value})} placeholder="Reward name" style={S.input}/><div style={{display:"flex",gap:8}}><div style={{flex:1}}><div style={{...S.label,marginBottom:4}}>Points</div><input type="number" value={editing.pts} onChange={e=>setEditing({...editing,pts:parseInt(e.target.value)||0})} style={S.input}/></div><div style={{flex:1}}><div style={{...S.label,marginBottom:4}}>Active</div><div style={{marginTop:6}}><button className={`toggle ${editing.active?"on":"off"}`} onClick={()=>setEditing({...editing,active:!editing.active})}><div className="dot"/></button></div></div></div><textarea value={editing.desc} onChange={e=>setEditing({...editing,desc:e.target.value})} placeholder="Description..." rows={2} style={{...S.input,resize:"none"}}/><button onClick={()=>{if(editing.id==="new"){setRewards(prev=>[...prev,{...editing,id:`r${Date.now()}`}]);showToast("Created!")}else{setRewards(prev=>prev.map(r=>r.id===editing.id?editing:r));showToast("Updated!")}setEditing(null)}} style={{...S.btnPrimary,justifyContent:"center"}}><Save size={14}/> Save</button></div></div>}{rewards.map(rw=>{const I=getIcon(rw.icon);return(<div key={rw.id} style={{...S.cardP,marginBottom:10,display:"flex",alignItems:"center",gap:12,opacity:rw.active?1:.5}}><div style={{width:40,height:40,borderRadius:10,background:C.accentFaint,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><I size={18} color={C.accent}/></div><div style={{flex:1}}><div style={{fontWeight:700,fontSize:15}}>{rw.name}</div><div style={{fontSize:13,color:C.textDim}}>{rw.desc} · {rw.pts} pts{!rw.active?" · Off":""}</div></div><div style={{display:"flex",gap:6}}><button onClick={()=>setEditing(rw)} style={{width:32,height:32,background:C.surface,border:`1px solid ${C.border}`,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:C.textMuted}}><Edit size={14}/></button><button onClick={()=>{setRewards(prev=>prev.filter(x=>x.id!==rw.id));showToast("Removed","info")}} style={{width:32,height:32,background:C.surface,border:`1px solid ${C.border}`,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:C.danger}}><Trash2 size={14}/></button></div></div>)})}</div>)};

  const AdminBroadcast=()=>{const[msg,setMsg]=useState("");const[photo,setPhoto]=useState("");const[sched,setSched]=useState(false);const[schedDate,setSchedDate]=useState("");return(<div className="enter" style={{padding:"16px 16px 100px"}}><div style={{marginBottom:16}}><div style={{...S.sectionTitle}}>Broadcast</div><div style={{fontSize:15,color:C.textMuted,marginTop:2}}>Message all members</div></div><div style={{...S.cardP,marginBottom:14}}><div style={{...S.label,marginBottom:8}}>Message</div><textarea value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Type your broadcast..." rows={4} style={{...S.input,resize:"none",marginBottom:12}}/><div style={{...S.label,marginBottom:8,display:"flex",alignItems:"center",gap:6}}><Image size={12}/> Photo URL (optional)</div><input value={photo} onChange={e=>setPhoto(e.target.value)} placeholder="https://..." style={{...S.input,marginBottom:12}}/><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:sched?12:0}}><button className={`toggle ${sched?"on":"off"}`} onClick={()=>setSched(!sched)}><div className="dot"/></button><span style={{fontSize:15}}>Schedule for later</span></div>{sched&&<div><div style={{...S.label,marginBottom:4}}>When</div><input type="datetime-local" value={schedDate} onChange={e=>setSchedDate(e.target.value)} style={S.input}/></div>}</div><button onClick={()=>{showToast(sched&&schedDate?"Scheduled!":"Sent to all members!");setMsg("");setPhoto("");setSchedDate("");setSched(false)}} disabled={!msg.trim()} style={{...S.btnPrimary,width:"100%",justifyContent:"center",padding:14,opacity:msg.trim()?1:.5,cursor:msg.trim()?"pointer":"default"}}><Send size={16}/> {sched&&schedDate?"Schedule":"Send Now"}</button><div style={{...S.cardP,marginTop:14}}><div style={{...S.label,marginBottom:10}}>Recent</div>{[{msg:"Dock Day Saturday. Arrive by boat, bike, or foot.",when:"Today, 3:00 PM",reach:142},{msg:"New barrel-aged wild ale from the Heidelberg cellar.",when:"Yesterday",reach:156},{msg:"Beer Lab Preview next Saturday. Experimental batches on tap.",when:"Apr 1",reach:156}].map((b,i)=>(<div key={i} style={{padding:"10px 0",borderBottom:i<2?`1px solid ${C.border}`:"none"}}><div style={{fontSize:15,marginBottom:4}}>{b.msg}</div><div style={{fontSize:13,color:C.textDim}}>{b.when} · {b.reach} members</div></div>))}</div></div>)};

  const AdminSettings=()=>{const[cfg,setCfg]=useState(pointsCfg);const[dirty,setDirty]=useState(false);const upd=(k,v)=>{setCfg(p=>({...p,[k]:v}));setDirty(true)};return(<div className="enter" style={{padding:"16px 16px 100px"}}><div style={{marginBottom:16}}><div style={{...S.sectionTitle}}>Settings</div><div style={{fontSize:15,color:C.textMuted,marginTop:2}}>Points, tiers & integrations</div></div>{dirty&&<div style={{background:"rgba(196,154,12,.06)",border:`1px solid rgba(196,154,12,.12)`,borderRadius:10,padding:"10px 14px",marginBottom:14,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{display:"flex",alignItems:"center",gap:8}}><AlertCircle size={16} color={C.warning}/><span style={{fontSize:15,color:"#1A4060"}}>Unsaved changes</span></div><button onClick={()=>{setPointsCfg(cfg);setDirty(false);showToast("Saved!")}} style={{...S.btnPrimary,padding:"6px 14px"}}><Save size={12}/> Save</button></div>}<div style={{...S.cardP,marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}><Zap size={16} color={C.accent}/><span style={{...S.label}}>Check-in Points</span></div>{[{k:"regular",l:"Regular",i:Zap},{k:"happyHour",l:"Happy Hour",i:Clock},{k:"event",l:"Event",i:Calendar},{k:"dogBonus",l:"Dog Bonus",i:Dog}].map((s,i)=>{const I=s.i;return(<div key={s.k} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:i<3?`1px solid ${C.border}`:"none"}}><div style={{display:"flex",alignItems:"center",gap:8}}><I size={16} color={C.textDim}/><span style={{fontSize:15}}>{s.l}</span></div><div style={{display:"flex",alignItems:"center",gap:6}}><input type="number" value={cfg[s.k]} onChange={e=>upd(s.k,parseInt(e.target.value)||0)} style={{...S.input,width:80,textAlign:"right",padding:"6px 10px"}}/><span style={{fontSize:13,color:C.textDim}}>pts</span></div></div>)})}</div><div style={{...S.cardP,marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}><TrendingUp size={16} color={C.accent}/><span style={{...S.label}}>Level Thresholds</span></div>{[{k:"silverAt",l:"Silver",c:"#4A6478"},{k:"goldAt",l:"Gold",c:C.warning},{k:"platinumAt",l:"Platinum",c:"#2A5A80"}].map((s,i)=>(<div key={s.k} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:i<2?`1px solid ${C.border}`:"none"}}><span style={{fontSize:15,color:s.c,fontWeight:600}}>{s.l}</span><div style={{display:"flex",alignItems:"center",gap:6}}><input type="number" value={cfg[s.k]} onChange={e=>upd(s.k,parseInt(e.target.value)||0)} style={{...S.input,width:90,textAlign:"right",padding:"6px 10px"}}/><span style={{fontSize:13,color:C.textDim}}>pts</span></div></div>))}</div><div style={{...S.cardP}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}><Link size={16} color={C.accent}/><span style={{...S.label}}>Integrations</span></div>{integrations.map((ig,i)=>{const I=ig.icon;return(<div key={ig.id} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 0",borderBottom:i<integrations.length-1?`1px solid ${C.border}`:"none"}}><div style={{width:40,height:40,borderRadius:10,background:ig.connected?C.accentFaint:C.surface,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><I size={18} color={ig.connected?C.accent:C.textDim}/></div><div style={{flex:1}}><div style={{fontWeight:700,fontSize:15,display:"flex",alignItems:"center",gap:6}}>{ig.name}<span style={{fontSize:11,fontWeight:600,color:ig.connected?C.success:C.textDim,display:"flex",alignItems:"center",gap:3}}><div style={{width:6,height:6,borderRadius:"50%",background:ig.connected?C.success:C.textDim}}/>{ig.status}</span></div><div style={{fontSize:13,color:C.textDim}}>{ig.desc}</div></div><button onClick={()=>setIntegrations(prev=>prev.map(x=>x.id===ig.id?{...x,connected:!x.connected,status:x.connected?"Not connected":x.id==="pos"?"Syncing":"Connected"}:x))} className={`toggle ${ig.connected?"on":"off"}`}><div className="dot"/></button></div>)})}</div><div style={{marginTop:20,textAlign:"center"}}><div style={{fontSize:13,color:C.textDim}}>{BREWERY.name} Club Admin v2.0</div><div style={{fontSize:12,color:C.border,marginTop:4}}>Built by Nimbus Theory™</div></div></div>)};

  // ════════════════════════════════════════════════════
  // MODALS
  // ════════════════════════════════════════════════════

  const BeerModal=({beer})=>{const[rating,setRating]=useState(0);const[hover,setHover]=useState(0);const[notes,setNotes]=useState("");const existing=user.ratings[beer.id];const fk=[{key:"hoppy",l:"Hoppy",c:C.accent},{key:"malty",l:"Malty",c:"#b45309"},{key:"bitter",l:"Bitter",c:C.warning},{key:"fruity",l:"Fruity",c:C.teal},{key:"crisp",l:"Crisp",c:"#06b6d4"}];return(
    <div className="fin" style={{position:"fixed",inset:0,zIndex:50,display:"flex",alignItems:"flex-end",justifyContent:"center"}}><div style={{position:"absolute",inset:0,background:"rgba(20,32,44,.4)",backdropFilter:"blur(8px)"}} onClick={()=>setModal(null)}/><div className="sup" style={{position:"relative",width:"100%",maxWidth:430,maxHeight:"90vh",overflowY:"auto",background:C.surface,borderRadius:"16px 16px 0 0"}}>
      <div style={{height:208,background:`linear-gradient(135deg,hsl(${beer.abv*5+20},70%,35%),hsl(${beer.abv*5},50%,22%))`,position:"relative"}}><button onClick={()=>setModal(null)} style={{position:"absolute",top:14,right:14,width:36,height:36,background:"rgba(0,0,0,.5)",borderRadius:"50%",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff"}}><X size={18}/></button><div style={{position:"absolute",top:14,left:14,display:"flex",gap:6}}>{beer.flagship&&<span style={{fontSize:12,fontWeight:700,background:C.accent,color:"#fff",padding:"3px 8px",borderRadius:4,display:"flex",alignItems:"center",gap:4,textTransform:"uppercase"}}><Flame size={10}/> Flagship</span>}{beer.limited&&<span style={{fontSize:12,fontWeight:700,background:C.warning,color:"#000",padding:"3px 8px",borderRadius:4,display:"flex",alignItems:"center",gap:4,textTransform:"uppercase"}}><Clock size={10}/> Limited</span>}</div><div style={{position:"absolute",bottom:0,left:0,right:0,padding:18,background:"linear-gradient(to top,rgba(20,20,20,1),transparent)"}}><div style={{fontFamily:fontD,fontWeight:700,fontSize:26,textTransform:"uppercase",letterSpacing:.5,lineHeight:1.1}}>{beer.name}</div><div style={{fontSize:16,color:C.textMuted,marginTop:4}}>{beer.style}</div></div></div>
      <div style={{padding:18}}>
        <div style={{display:"flex",background:C.card,borderRadius:10,overflow:"hidden",marginBottom:18}}>{[{l:"ABV",v:`${beer.abv}%`,c:C.accent},{l:"IBU",v:beer.ibu,c:C.text},{l:"Points",v:`+${beer.pts}`,c:C.teal}].map((s,i)=>(<div key={i} style={{flex:1,textAlign:"center",padding:"14px 0",borderRight:i<2?`1px solid ${C.border}`:"none"}}><div style={{fontFamily:fontD,fontWeight:700,fontSize:22,color:s.c}}>{s.v}</div><div style={{fontSize:12,color:C.textDim,textTransform:"uppercase",letterSpacing:1}}>{s.l}</div></div>))}</div>
        <div style={{marginBottom:18}}><div style={{...S.label,marginBottom:6}}>About</div><div style={{fontSize:15,color:C.textMuted,lineHeight:1.6}}>{beer.desc}</div></div>
        <div style={{marginBottom:18}}><div style={{...S.label,marginBottom:10}}>Flavor Profile</div>{fk.map(f=>(<div key={f.key} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}><span style={{fontSize:15,color:C.textMuted,width:50,textAlign:"right"}}>{f.l}</span><div style={{flex:1,height:5,background:"rgba(255,255,255,.2)",borderRadius:3,overflow:"hidden"}}><div className="fbr" style={{height:"100%",width:`${beer.flavor[f.key]}%`,background:f.c,borderRadius:3}}/></div><span style={{fontSize:12,color:C.textDim,width:24,textAlign:"right"}}>{beer.flavor[f.key]}</span></div>))}</div>
        {existing&&<div style={{background:"rgba(196,154,12,.06)",border:`1px solid rgba(196,154,12,.12)`,borderRadius:10,padding:16,marginBottom:18}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}><span style={{fontSize:13,fontWeight:700,color:C.warning,textTransform:"uppercase",letterSpacing:1}}>Your Rating</span><div style={{display:"flex",gap:2}}>{Array.from({length:5}).map((_,i)=><Star key={i} size={14} fill={i<existing.r?"#C49A0C":"none"} color={i<existing.r?"#C49A0C":C.textDim}/>)}</div></div>{existing.n&&<div style={{fontSize:15,color:C.textMuted,fontStyle:"italic"}}>"{existing.n}"</div>}</div>}
        {!existing&&<div style={{background:C.card,borderRadius:10,padding:16,marginBottom:18}}><div style={{...S.label,marginBottom:12}}>Rate This Beer</div><div style={{display:"flex",justifyContent:"center",gap:6,marginBottom:14}}>{Array.from({length:5}).map((_,i)=>(<button key={i} onMouseEnter={()=>setHover(i+1)} onMouseLeave={()=>setHover(0)} onClick={()=>setRating(i+1)} style={{background:"none",border:"none",cursor:"pointer",padding:4,transition:"transform .15s",transform:(hover||rating)>i?"scale(1.15)":"scale(1)"}}><Star size={28} fill={(hover||rating)>i?"#C49A0C":"none"} color={(hover||rating)>i?"#C49A0C":C.textDim}/></button>))}</div><textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Tasting notes (optional)..." style={{...S.input,resize:"none",height:70,marginBottom:10}}/><button onClick={()=>rating>0&&rateBeer(beer.id,rating,notes)} disabled={rating===0} style={{...S.btnPrimary,width:"100%",justifyContent:"center",padding:12,opacity:rating>0?1:.5,cursor:rating>0?"pointer":"default"}}><Zap size={14}/> Submit {rating>0&&`(+${rating>=4?25:15} pts)`}</button></div>}
        <div style={{background:C.card,borderRadius:10,padding:16,border:`1px solid ${C.border}`}}><div style={{...S.label,marginBottom:6}}>Pairs Well With</div><div style={{fontSize:15,color:C.textMuted}}>{beer.pair}</div></div>
        <div style={{height:20}}/>
      </div>
    </div></div>)};

  const QRModal=()=>(<div className="fin" style={{position:"fixed",inset:0,zIndex:50,display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{position:"absolute",inset:0,background:"rgba(20,32,44,.4)",backdropFilter:"blur(8px)"}} onClick={()=>setModal(null)}/><div className="sup" style={{position:"relative",background:C.surface,borderRadius:16,padding:28,textAlign:"center",width:"85%",maxWidth:340}}><button onClick={()=>setModal(null)} style={{position:"absolute",top:12,right:12,background:"none",border:"none",cursor:"pointer",color:C.textDim}}><X size={18}/></button><div style={{fontFamily:fontD,fontWeight:700,fontSize:18,textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>Check In</div><div style={{fontSize:15,color:C.textMuted,marginBottom:20}}>Show this code to your server</div><div style={{width:180,height:180,margin:"0 auto 16px",background:"#fff",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}><div style={{display:"grid",gridTemplateColumns:"repeat(9,1fr)",gap:2,width:140,height:140}}>{Array.from({length:81}).map((_,i)=>(<div key={i} style={{background:[0,1,2,6,7,8,9,17,18,24,26,27,35,36,44,45,53,54,55,56,62,63,71,72,73,74,78,79,80].includes(i)?"#000":Math.random()>.5?"#000":"#fff",borderRadius:1}}/>))}</div><div style={{position:"absolute",width:36,height:36,background:C.accent,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center"}}><Beer size={18} color="#fff"/></div></div><div style={{fontSize:15,fontWeight:700}}>{user.name}</div><div style={{fontSize:13,color:C.textDim,marginTop:2}}>{level.name} · {user.pts.toLocaleString()} pts</div></div></div>);

  // USER SETTINGS MODAL
  const SettingsModal=()=>{const[name,setName]=useState(user.name);const[email,setEmail]=useState(user.email);const[bday,setBday]=useState(user.birthday);const[notifs,setNotifs]=useState({...user.notifications});const handleSave=()=>{setUser(u=>({...u,name,email,birthday:bday,notifications:notifs}));showToast("Profile updated!");setModal(null)};return(
    <div className="fin" style={{position:"fixed",inset:0,zIndex:50,display:"flex",alignItems:"flex-end",justifyContent:"center"}}><div style={{position:"absolute",inset:0,background:"rgba(20,32,44,.4)",backdropFilter:"blur(8px)"}} onClick={()=>setModal(null)}/><div className="sup" style={{position:"relative",width:"100%",maxWidth:430,maxHeight:"90vh",overflowY:"auto",background:C.surface,borderRadius:"16px 16px 0 0"}}>
      <div style={{background:`linear-gradient(135deg,${C.accent},${C.accentDark})`,padding:"24px 20px 20px",position:"relative"}}><button onClick={()=>setModal(null)} style={{position:"absolute",top:14,right:14,width:36,height:36,background:"rgba(0,0,0,.3)",borderRadius:"50%",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff"}}><X size={18}/></button><div style={{display:"flex",alignItems:"center",gap:14}}><div style={{width:60,height:60,background:"rgba(255,255,255,.15)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}><User size={30} color="#fff"/></div><div><div style={{fontFamily:fontD,fontWeight:700,fontSize:22,color:"#fff",textTransform:"uppercase"}}>Profile Settings</div><div style={{fontSize:15,color:"rgba(255,255,255,.7)",marginTop:2}}>{level.name} · {user.pts.toLocaleString()} pts</div></div></div></div>
      <div style={{padding:20}}>
        <div style={{marginBottom:16}}><div style={{display:"flex",alignItems:"center",gap:6,...S.label,marginBottom:6}}><User size={14} color={C.accent}/> Name</div><input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" style={S.input}/></div>
        <div style={{marginBottom:16}}><div style={{display:"flex",alignItems:"center",gap:6,...S.label,marginBottom:6}}><Mail size={14} color={C.teal}/> Email</div><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com" style={S.input}/></div>
        <div style={{marginBottom:16}}><div style={{display:"flex",alignItems:"center",gap:6,...S.label,marginBottom:6}}><Calendar size={14} color={C.warning}/> Birthday</div><input type="date" value={bday} onChange={e=>setBday(e.target.value)} style={S.input}/><div style={{fontSize:13,color:C.textDim,marginTop:4}}>We'll send you a birthday pint reward!</div></div>
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderLeft:`3px solid ${C.accent}`,borderRadius:10,padding:16,marginBottom:16}}><div style={{display:"flex",alignItems:"center",gap:6,...S.label,marginBottom:8}}><Calendar size={14} color={C.accent}/> Member Since</div><div style={{fontFamily:fontD,fontWeight:700,fontSize:20}}>{user.memberSince}</div><div style={{display:"flex",gap:16,marginTop:10}}><div><div style={{fontSize:22,fontFamily:fontD,fontWeight:700,color:C.accent}}>{user.checkIns}</div><div style={{fontSize:12,color:C.textDim}}>Check-ins</div></div><div><div style={{fontSize:22,fontFamily:fontD,fontWeight:700,color:C.teal}}>{earnedBadges.length}</div><div style={{fontSize:12,color:C.textDim}}>Badges</div></div><div><div style={{fontSize:22,fontFamily:fontD,fontWeight:700,color:C.warning}}>{Object.keys(user.ratings).length}</div><div style={{fontSize:12,color:C.textDim}}>Ratings</div></div></div></div>
        <div style={{...S.cardP,marginBottom:20}}><div style={{display:"flex",alignItems:"center",gap:6,...S.label,marginBottom:12}}><BellRing size={14} color={C.accent}/> Notifications</div>{[{k:"pushEnabled",l:"Push Notifications",s:"Alerts for points, badges & events"},{k:"emailUpdates",l:"Email Updates",s:"Weekly summary & special offers"},{k:"eventReminders",l:"Event Reminders",s:"Before events you've RSVP'd to"},{k:"newReleases",l:"New Release Alerts",s:"First to know about new beers"}].map((n,i)=>(<div key={n.k} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:i<3?`1px solid ${C.border}`:"none"}}><div><div style={{fontSize:15,fontWeight:600}}>{n.l}</div><div style={{fontSize:13,color:C.textDim,marginTop:2}}>{n.s}</div></div><button className={`toggle ${notifs[n.k]?"on":"off"}`} onClick={()=>setNotifs(p=>({...p,[n.k]:!p[n.k]}))}><div className="dot"/></button></div>))}</div>
        <div style={{display:"flex",gap:10}}><button onClick={()=>setModal(null)} style={{...S.btnGhost,flex:1,justifyContent:"center"}}>Cancel</button><button onClick={handleSave} style={{...S.btnPrimary,flex:1,justifyContent:"center"}}><Save size={14}/> Save</button></div>
        <div style={{height:20}}/>
      </div>
    </div></div>)};

  // ════════════════════════════════════════════════════
  // RENDER
  // ════════════════════════════════════════════════════
  // FULL-SCREEN ADMIN SHELL
  // ════════════════════════════════════════════════════

  const adminNavItems=[
    {id:"dashboard",icon:LayoutDashboard,label:"Dashboard"},
    {id:"scanner",icon:Scan,label:"Scanner"},
    {id:"beers",icon:Beer,label:"Beers"},
    {id:"events",icon:Calendar,label:"Events"},
    {id:"rewards",icon:Gift,label:"Rewards"},
    {id:"broadcast",icon:Megaphone,label:"Broadcast"},
    {id:"settings",icon:Settings,label:"Settings"},
  ];

  if(isAdmin) return(
    <div style={{position:"fixed",inset:0,display:"flex",fontFamily:font,background:"#111118",zIndex:9999,overflow:"hidden"}}>
      <style>{`.admin-content [class~="cardP"],[class~="card"]{background:#1e2235!important;border-color:rgba(255,255,255,.1)!important}.admin-content input,.admin-content textarea,.admin-content select{background:#252840!important;border-color:rgba(255,255,255,.12)!important;color:#E8E8E8!important}.admin-content [style*="background:${C.card}"],.admin-content [style*=\"background:\"#FFFFFF\""]{background:#1e2235!important}`}</style>
      <aside style={{width:240,flexShrink:0,background:"#1a1a28",borderRight:"1px solid rgba(255,255,255,.08)",display:"flex",flexDirection:"column",height:"100vh",overflowY:"auto"}}>
        <div style={{padding:"20px 20px 12px"}}>
          <button onClick={()=>onExitAdmin&&onExitAdmin()} style={{display:"flex",alignItems:"center",gap:6,fontSize:13,fontWeight:600,color:"rgba(255,255,255,.5)",background:"none",border:"none",cursor:"pointer",marginBottom:20,padding:0}}>
            <ChevronLeft size={14}/> Exit Admin
          </button>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
            <div style={{width:36,height:36,borderRadius:8,background:`linear-gradient(135deg,${C.accent},${C.accentDark})`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:fontD,fontWeight:700,fontSize:13,color:"#fff"}}>{BREWERY.logo}</div>
            <div><div style={{fontFamily:fontD,fontWeight:700,fontSize:14,letterSpacing:1,textTransform:"uppercase",color:"#E8E8E8"}}>{BREWERY.name}</div><div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:1}}>Admin Panel</div></div>
          </div>
        </div>
        <nav style={{flex:1,padding:"0 12px"}}>
          {adminNavItems.map(item=>{const I=item.icon;const a=adminTab===item.id;
            return(<button key={item.id} onClick={()=>setAdminTab(item.id)} style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:8,marginBottom:2,background:a?`${C.accent}28`:"transparent",border:"none",cursor:"pointer",color:a?C.accent:"rgba(255,255,255,.55)",fontWeight:a?700:500,fontSize:14,textAlign:"left"}}>
              <I size={16} strokeWidth={a?2.2:1.5}/>{item.label}
              {a&&<div style={{marginLeft:"auto",width:6,height:6,borderRadius:"50%",background:C.accent}}/>}
            </button>);
          })}
        </nav>
        <div style={{padding:"12px 20px 20px",borderTop:"1px solid rgba(255,255,255,.08)"}}>
          <div style={{fontSize:11,color:"rgba(255,255,255,.25)",fontWeight:600,textTransform:"uppercase",letterSpacing:1}}>BUILT BY NIMBUS THEORY™</div>
        </div>
      </aside>
      <main style={{flex:1,overflowY:"auto",background:"#111118"}}>
        <div style={{borderBottom:"1px solid rgba(255,255,255,.08)",background:"#1a1a28",padding:"16px 32px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <div style={{fontFamily:fontD,fontSize:22,fontWeight:700,textTransform:"uppercase",letterSpacing:.5,color:"#E8E8E8"}}>{adminNavItems.find(n=>n.id===adminTab)?.label}</div>
            <div style={{fontSize:13,color:"rgba(255,255,255,.45)",marginTop:2}}>Overview of {BREWERY.name} {BREWERY.subtitle} operations</div>
          </div>
          <button onClick={()=>onExitAdmin&&onExitAdmin()} style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",borderRadius:8,border:"1px solid rgba(255,255,255,.12)",background:"rgba(255,255,255,.06)",cursor:"pointer",fontSize:14,fontWeight:600,color:"rgba(255,255,255,.6)"}}>
            <ChevronLeft size={14}/> Back to App
          </button>
        </div>
        <div className="admin-content" style={{padding:"24px 32px",color:"#E8E8E8"}}>
          {adminTab==="dashboard"&&<AdminDashboard/>}
          {adminTab==="scanner"&&<AdminScanner/>}
          {adminTab==="beers"&&<AdminBeers/>}
          {adminTab==="events"&&<AdminEvents/>}
          {adminTab==="rewards"&&<AdminRewards/>}
          {adminTab==="broadcast"&&<AdminBroadcast/>}
          {adminTab==="settings"&&<AdminSettings/>}
        </div>
      </main>
      {toast&&<div style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",zIndex:60,background:toast.type==="success"?"#166534":toast.type==="info"?"#1e40af":"#991b1b",color:"#fff",padding:"10px 20px",borderRadius:10,fontSize:15,fontWeight:700,boxShadow:"0 8px 32px rgba(0,0,0,.4)",maxWidth:360,textAlign:"center"}}>{toast.msg}</div>}
    </div>
  );

  // ════════════════════════════════════════════════════
  // RENDER — CONSUMER APP
  // ════════════════════════════════════════════════════

  return(<><style>{css}</style><div className="shell">
    <Header/>
    <div ref={contentRef} style={{flex:1,overflowY:"auto",overflowX:"hidden"}}>
      {tab==="home"&&<HomeScreen/>}
      {tab==="beers"&&<BeersScreen/>}
      {tab==="events"&&<EventsScreen/>}
      {tab==="badges"&&<BadgesScreen/>}
      {tab==="rewards"&&<RewardsScreen/>}
    </div>
    <NavBar/>
    {modal?.type==="beer"&&<BeerModal beer={modal.data}/>}
    {modal?.type==="rsvp"&&<RsvpModal ev={modal.data}/>}
    {modal?.type==="cancel-rsvp"&&<CancelRsvpModal ev={modal.data}/>}
    {modal?.type==="qr"&&<QRModal/>}
    {modal?.type==="settings"&&<SettingsModal/>}
    {toast&&<div className="sup" style={{position:"fixed",top:70,left:"50%",transform:"translateX(-50%)",zIndex:60,background:toast.type==="success"?C.success:toast.type==="info"?C.info:C.danger,color:"#fff",padding:"10px 20px",borderRadius:10,fontSize:15,fontWeight:700,boxShadow:"0 8px 32px rgba(0,0,0,.4)",maxWidth:360,textAlign:"center"}}>{toast.msg}</div>}
  </div></>);
}
