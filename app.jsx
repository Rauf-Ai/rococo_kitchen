/* global React, ReactDOM, Header, Hero, Portfolio, About, Calculator, Stages, Installment, Reviews, Lead, FAQ, Footer, useReveal, TweaksPanel, useTweaks, TweakSection, TweakColor, TweakToggle */
const { useEffect, useState: useSA } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#A78877",
  "heroVignette": true,
  "scrollSnap": true
}/*EDITMODE-END*/;

function App() {
  useReveal();
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    document.documentElement.style.setProperty('--mocha-deep', t.accent);
    document.documentElement.style.setProperty('--mocha', t.accent);
  }, [t.accent]);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Portfolio />
        <About />
        <Calculator />
        <Stages />
        <Installment />
        <Reviews />
        <Lead />
        <FAQ />
      </main>
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Brand">
          <TweakColor
            label="Mocha accent"
            value={t.accent}
            onChange={(v) => setTweak('accent', v)}
            options={["#A78877", "#BF9F86", "#0C0E0E", "#C9A88C", "#7E6E63"]}
          />
        </TweakSection>
        <TweakSection label="Hero">
          <TweakToggle label="Vignette overlay"
            value={t.heroVignette}
            onChange={(v) => setTweak('heroVignette', v)} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
