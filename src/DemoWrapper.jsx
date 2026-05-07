import { useState } from "react";
import App from "./App.jsx";
import { DEMO_CONFIG } from "./demo.config.js";
import {
  Star, Beer, Calendar, Award, Gift, TrendingUp, QrCode,
  LayoutDashboard, Sparkles, DollarSign, Shield, Users,
  ChevronRight, ExternalLink, Monitor
} from "lucide-react";

const C = DEMO_CONFIG;

const features = [
  { icon: Star, title: "Loyalty Points", desc: `${C.memberTier} for every visit and purchase` },
  { icon: Beer, title: "Beer Collection", desc: `${C.beerCount} craft beers with ratings and flavor profiles` },
  { icon: Calendar, title: "Events Calendar", desc: "Festivals, releases, and community gatherings" },
  { icon: Award, title: "Badge System", desc: `Earn badges from first visit to legend status` },
  { icon: Gift, title: "Rewards Program", desc: "Redeem points for pints, merch, and experiences" },
  { icon: TrendingUp, title: "Member Tiers", desc: "Bronze, Silver, Gold, and Platinum levels" },
  { icon: QrCode, title: "QR Check-in", desc: "Scan to earn points at the taproom" },
  { icon: LayoutDashboard, title: "Admin Dashboard", desc: "Full analytics, CRM, and broadcast tools" },
];

const salesCards = [
  {
    icon: LayoutDashboard,
    title: "Admin Dashboard",
    desc: "Full analytics, member CRM, beer management, event scheduling, and broadcast messaging — click Open Admin Dashboard to explore."
  },
  {
    icon: Sparkles,
    title: `Built for ${C.breweryShort}`,
    desc: `Custom-designed around ${C.possessive} brand, beer lineup, and the identity your members already love.`
  },
  {
    icon: DollarSign,
    title: "Square POS Integration",
    desc: "Connects directly with your existing Square setup for transactions, payments, and member management \u2014 no workflow changes needed."
  },
  {
    icon: Users,
    title: "Member Engagement",
    desc: "Push notifications, event RSVPs, beer ratings, and broadcast messaging keep your taproom community active between visits."
  },
  {
    icon: Shield,
    title: `Built for ${C.breweryShort}`,
    desc: `Not a template. Not a platform. A fully custom app designed specifically for ${C.breweryShort} and the community you've built.`
  },
];

export default function DemoWrapper() {
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <div style={{
      display: "flex",
      height: "100vh",
      overflow: "hidden",
      background: "radial-gradient(ellipse at 50% 115%, rgba(58,106,144,.35) 0%, rgba(37,74,104,.15) 30%, transparent 60%), radial-gradient(ellipse at 50% 50%, #0d1f30 0%, #070f18 60%, #040a10 100%)",
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      color: "#E8E8E8",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #040a10; }
        .side-scroll::-webkit-scrollbar { width: 4px; }
        .side-scroll::-webkit-scrollbar-track { background: transparent; }
        .side-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,.1); border-radius: 2px; }
        .side-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,.2); }
        @media (max-width: 1100px) {
          .demo-sidebar-left, .demo-sidebar-right { display: none !important; }
          .demo-center { flex: 1 !important; }
        }
      `}</style>

      {/* LEFT SIDEBAR */}
      <div className="demo-sidebar-left side-scroll" style={{
        width: 320,
        minWidth: 320,
        height: "100vh",
        overflowY: "auto",
        padding: "40px 32px",
        borderRight: "1px solid rgba(255,255,255,.06)",
        display: "flex",
        flexDirection: "column",
      }}>
        <div style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 2.5,
          textTransform: "uppercase",
          color: C.accentColor,
          marginBottom: 24,
        }}>Prototype Demo</div>

        <div style={{ marginBottom: 32 }}>
          <img
            src="https://www.7seasbrewing.com/wp-content/themes/seven-seas/img/logo.png"
            alt={C.breweryShort}
            style={{ height: 32, width: "auto", display: "block", filter: "brightness(0) invert(1)", opacity: 0.9 }}
            onError={e => { e.target.style.display="none"; }}
          />
          <div style={{ fontSize: 13, color: "rgba(255,255,255,.4)", marginTop: 8 }}>Brewery Loyalty App</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
          {features.map((f, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 14,
              padding: "12px 0",
              borderBottom: i < features.length - 1 ? "1px solid rgba(255,255,255,.04)" : "none",
            }}>
              <f.icon size={18} color="rgba(255,255,255,.3)" style={{ marginTop: 2, flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{f.title}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,.4)", marginTop: 2, lineHeight: 1.4, textWrap: "balance" }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 32,
          paddingTop: 20,
          borderTop: "1px solid rgba(255,255,255,.06)",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: 1.5,
          textTransform: "uppercase",
          color: "rgba(255,255,255,.2)",
        }}>Built by Nimbus Theory™</div>
      </div>

      {/* CENTER — PHONE FRAME */}
      <div className="demo-center" style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 0",
        overflow: "hidden",
      }}>
        {/* Outer phone chassis — visible black body */}
        <div style={{
          position: "relative",
          width: 414,
          height: "min(calc(100vh - 48px), 856px)",
          background: "#0a0a0a",
          borderRadius: 52,
          boxShadow: "0 0 0 1px #1a2a3a, 0 40px 100px rgba(0,0,0,.9), 0 12px 40px rgba(0,0,0,.7), 0 0 80px rgba(58,106,144,.5), 0 0 160px rgba(58,106,144,.25), inset 0 1px 0 rgba(255,255,255,.08)",
          padding: 12,
          flexShrink: 0,
        }}>
          {/* Power button */}
          <div style={{position:"absolute",right:-3,top:120,width:3,height:64,background:"#1e1e1e",borderRadius:"0 3px 3px 0"}} />
          {/* Volume buttons */}
          <div style={{position:"absolute",left:-3,top:100,width:3,height:36,background:"#1e1e1e",borderRadius:"3px 0 0 3px"}} />
          <div style={{position:"absolute",left:-3,top:148,width:3,height:64,background:"#1e1e1e",borderRadius:"3px 0 0 3px"}} />
          <div style={{position:"absolute",left:-3,top:224,width:3,height:64,background:"#1e1e1e",borderRadius:"3px 0 0 3px"}} />
          {/* Screen area */}
          <div style={{
            width: "100%",
            height: "100%",
            borderRadius: 42,
            overflow: "hidden",
            position: "relative",
            background: "#F0F4F8",
          }}>
            {/* Notch */}
            <div style={{
              position: "absolute",
              top: 0, left: "50%",
              transform: "translateX(-50%)",
              width: 120, height: 34,
              background: "#0a0a0a",
              borderRadius: "0 0 24px 24px",
              zIndex: 50,
            }} />
            {/* Dynamic Island pill */}
            <div style={{
              position: "absolute",
              top: 10, left: "50%",
              transform: "translateX(-50%)",
              width: 90, height: 14,
              background: "#000",
              borderRadius: 10,
              zIndex: 51,
            }} />
            {/* App content */}
            <div style={{
              width: "100%",
              height: "100%",
              overflowY: "auto",
              overflowX: "hidden",
            }}>
              <App isAdmin={isAdmin} onOpenAdmin={()=>setIsAdmin(true)} onExitAdmin={()=>setIsAdmin(false)} />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="demo-sidebar-right side-scroll" style={{
        width: 340,
        minWidth: 340,
        height: "100vh",
        overflowY: "auto",
        padding: "40px 32px",
        borderLeft: "1px solid rgba(255,255,255,.06)",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}>
        {salesCards.map((card, i) => (
          <div key={i} style={{
            background: "rgba(255,255,255,.03)",
            border: "1px solid rgba(255,255,255,.06)",
            borderRadius: 14,
            padding: 24,
          }}>
            <card.icon size={22} color={C.accentColor} style={{ marginBottom: 14 }} />
            <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{card.title}</div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,.5)", lineHeight: 1.6, marginBottom: i === 0 ? 16 : 0 }}>{card.desc}</div>
            {i === 0 && (
              <button onClick={() => setIsAdmin(true)} style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "9px 18px",
                background: C.accentColor,
                color: "#fff", border: "none",
                borderRadius: 8, fontWeight: 700, fontSize: 13,
                letterSpacing: .5, cursor: "pointer", marginTop: 4,
              }}>
                <LayoutDashboard size={14} /> Open Admin Dashboard
              </button>
            )}
          </div>
        ))}

        <div style={{
          background: `linear-gradient(135deg, ${C.accentColor}18, ${C.accentColor}08)`,
          border: `1px solid ${C.accentColor}25`,
          borderRadius: 14,
          padding: 24,
          marginTop: 8,
        }}>
          <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>Ready to Launch?</div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,.5)", lineHeight: 1.6, marginBottom: 16 }}>
            This demo is fully interactive. Every screen, every feature, every animation is production-ready. We build your branded app in under a week.
          </div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "10px 20px",
            background: C.accentColor,
            color: "#fff",
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: .5,
            cursor: "pointer",
          }}>
            <ExternalLink size={14} /> Get Started
          </div>
        </div>
      </div>
    </div>
  );
}
