
import { Button } from "@/components/ui/button";
import { Heart, MapPin } from "lucide-react";

export default function HomePage() {
  const weddingDate = "26th July, 2025";
  const venueName = "A CLASS HALL";
  const venueAddress = "Along Kashim Ibrahim Way, Maitama, Abuja";
  const googleMapsLink = "https://www.google.com/maps/place/A-Class+Park+And+Recreation/@9.0858892,7.4739817,702m/data=!3m2!1e3!4b1!4m6!3m5!1s0x104e0af4036529bb:0x39d11f0c8ff26a57!8m2!3d9.0858892!4d7.476562!16s%2Fg%2F11bzr7mpqd!5m1!1e1?entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D";

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-6 sm:p-12 selection:bg-primary selection:text-primary-foreground">
      <div className="w-full max-w-3xl text-center space-y-12 md:space-y-16 animate-fadeIn">
        
        <section id="hero" className="animate-slideUp">
          <h2 className="font-body text-base sm:text-lg text-accent mb-4 tracking-wider uppercase">
            Together with their families
          </h2>
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl text-primary mb-3 uppercase font-bold">
            Chidiogo Pamela Duru
          </h1>
          <div className="font-headline text-3xl sm:text-4xl md:text-5xl text-primary mb-3">
            &
          </div>
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl text-primary mb-8 uppercase font-bold">
            Emmanuel Ejiro Ukuta 
            <span className="block sm:inline text-2xl sm:text-3xl md:text-4xl font-body text-primary/80 normal-case font-normal"> (Placid)</span>
          </h1>
          
          <div className="flex justify-center items-center my-8 sm:my-10">
            <div className="flex-grow border-t border-accent/30"></div>
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-accent mx-4" fill="currentColor" />
            <div className="flex-grow border-t border-accent/30"></div>
          </div>

          <p className="font-body text-2xl sm:text-3xl text-accent tracking-wide">
            26<sup>th</sup> July, 2025
          </p>
        </section>

        <section id="event-details" className="animate-slideUp animation-delay-200">
          <div className="space-y-6 bg-card/50 p-6 sm:p-8 rounded-xl shadow-lg border border-primary/20">
            <div>
              <h3 className="font-headline text-xl sm:text-2xl text-accent mb-1">Ceremony & Reception</h3>
              <p className="font-body text-lg sm:text-xl text-foreground font-semibold">
                {venueName}
              </p>
              <p className="font-body text-base sm:text-lg text-muted-foreground">
                {venueAddress}
              </p>
            </div>
            <div className="pt-4 sm:pt-6">
              <Button asChild size="lg" className="font-body text-base sm:text-lg rounded-full px-8 py-3 shadow-md hover:shadow-lg transition-shadow">
                <a href={googleMapsLink} target="_blank" rel="noopener noreferrer">
                  <MapPin className="mr-2 h-5 w-5" /> Get Directions
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
