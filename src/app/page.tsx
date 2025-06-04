
"use client";

import { Button } from "@/components/ui/button";
import { Heart, MapPin, Clock, CalendarDays } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const calculateTimeLeft = (targetDate: Date | null): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
  isValid: boolean;
} => {
  if (!targetDate || isNaN(targetDate.getTime())) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true, isValid: false };
  }

  const difference = +targetDate - +new Date();
  let timeLeftData: { days: number; hours: number; minutes: number; seconds: number; isPast: boolean; isValid: boolean };

  if (difference > 0) {
    timeLeftData = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isPast: false,
      isValid: true,
    };
  } else {
    timeLeftData = { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true, isValid: true };
  }
  return timeLeftData;
};

export default function HomePage() {
  const weddingDate = "26th July, 2025";
  const venueName = "A CLASS HALL";
  const venueAddress = "Along Kashim Ibrahim Way, Maitama, Abuja";
  const googleMapsLink = "https://www.google.com/maps/place/A-Class+Park+And+Recreation/@9.0858892,7.4739817,702m/data=!3m2!1e3!4b1!4m6!3m5!1s0x104e0af4036529bb:0x39d11f0c8ff26a57!8m2!3d9.0858892!4d7.476562!16s%2Fg%2F11bzr7mpqd!5m1!1e1?entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D";
  const eventTime = "1:00 PM";

  const getTargetDateTime = useCallback(() => {
    const monthNames: { [key: string]: string } = {
      "January": "01", "February": "02", "March": "03", "April": "04",
      "May": "05", "June": "06", "July": "07", "August": "08",
      "September": "09", "October": "10", "November": "11", "December": "12"
    };
    const dateRegex = /(\d+)(?:st|nd|rd|th)?\s([A-Za-z]+),\s(\d{4})/;
    const timeRegex = /(\d+):(\d+)\s(AM|PM)/;

    const dateMatch = weddingDate.match(dateRegex);
    const timeMatch = eventTime.match(timeRegex);

    if (dateMatch && timeMatch) {
      const day = dateMatch[1];
      const monthName = dateMatch[2];
      const year = dateMatch[3];
      const month = monthNames[monthName];

      let hours = parseInt(timeMatch[1]);
      const minutes = timeMatch[2];
      const ampm = timeMatch[3];

      if (ampm === "PM" && hours < 12) hours += 12;
      if (ampm === "AM" && hours === 12) hours = 0; // Midnight

      const isoDateString = `${year}-${month}-${String(day).padStart(2, '0')}T${String(hours).padStart(2, '0')}:${minutes}:00`;
      return new Date(isoDateString);
    }
    return null;
  }, [weddingDate, eventTime]);

  const [targetEventDate, setTargetEventDate] = useState<Date | null>(() => getTargetDateTime());
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetEventDate));

  useEffect(() => {
    const newTargetDate = getTargetDateTime();
    if (newTargetDate?.getTime() !== targetEventDate?.getTime()) {
        setTargetEventDate(newTargetDate);
    }
  }, [getTargetDateTime, targetEventDate]);

  useEffect(() => {
    if (!targetEventDate || timeLeft.isPast) {
      setTimeLeft(calculateTimeLeft(targetEventDate)); 
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetEventDate));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetEventDate, timeLeft.isPast]);

  const countdownItems = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-6 sm:p-12 selection:bg-primary selection:text-primary-foreground">
      <div className="w-full max-w-3xl text-center space-y-12 md:space-y-16 animate-fadeIn">
        
        <section id="hero" className="animate-slideUp">
          <h2 className="font-body text-base sm:text-lg text-accent mb-4 tracking-wider uppercase">
            Together with their families
          </h2>
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl text-primary mb-3 uppercase font-bold">
            CHIDIOGO PAMELA DURU
          </h1>
          <div className="font-headline text-3xl sm:text-4xl md:text-5xl text-primary mb-3">
            &
          </div>
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl text-primary mb-8 uppercase font-bold">
            EMMANUEL EJIRO UKUTA 
            <span className="block sm:inline text-2xl sm:text-3xl md:text-4xl font-body text-primary/80 normal-case font-normal"> (Placid)</span>
          </h1>
          
          <div className="flex justify-center items-center my-8 sm:my-10">
            <div className="flex-grow border-t border-accent/30"></div>
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-accent mx-4" fill="currentColor" />
            <div className="flex-grow border-t border-accent/30"></div>
          </div>
        </section>

        <section id="countdown" className="animate-slideUp animation-delay-600">
          <h3 className="font-headline text-2xl sm:text-3xl text-accent mb-6 text-center">
            Counting Down to Your Big Day
          </h3>
          {timeLeft.isValid && !timeLeft.isPast ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center">
              {countdownItems.map(item => (
                <div key={item.label} className="bg-primary/10 p-3 sm:p-4 rounded-xl shadow-md border border-primary/20">
                  <span className="block font-headline text-3xl sm:text-4xl text-primary">
                    {item.label === 'Days' ? item.value : String(item.value).padStart(2, '0')}
                  </span>
                  <span className="block text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">{item.label}</span>
                </div>
              ))}
            </div>
          ) : timeLeft.isValid && timeLeft.isPast ? (
            <p className="text-center font-headline text-2xl text-primary py-4">The special day is here!</p>
          ) : (
            <p className="text-center text-muted-foreground py-4">Loading countdown...</p>
          )}
        </section>

        <section id="event-details" className="space-y-8">
          <div className="bg-primary/10 p-6 rounded-xl shadow-lg border border-primary/30 text-center animate-slideUp animation-delay-200">
            <CalendarDays className="w-10 h-10 sm:w-12 sm:h-12 text-primary mx-auto mb-3 sm:mb-4" />
            <p className="font-headline text-3xl sm:text-4xl text-primary font-semibold">
              {weddingDate}
            </p>
          </div>

          <div className="space-y-6 bg-card/50 p-6 sm:p-8 rounded-xl shadow-lg border border-primary/20 text-left animate-slideUp animation-delay-400">
            <div className="space-y-4">
              <h3 className="font-headline text-xl sm:text-2xl text-accent mb-2 text-center sm:text-left">Ceremony & Reception</h3>
              
              <div>
                <p className="font-body text-lg sm:text-xl text-foreground font-semibold">
                  {venueName}
                </p>
                <div className="flex items-start mt-1">
                  <MapPin className="mr-2 h-5 w-5 text-accent mt-1 shrink-0" />
                  <p className="font-body text-base sm:text-lg text-muted-foreground">
                    {venueAddress}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-accent" />
                <p className="font-body text-base sm:text-lg text-foreground">
                  {eventTime}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">COLOUR CODE:</span> NAVY BLUE, DARK SEA GREEN, BABY PINK, WHITE
                </p>
              </div>
            </div>

            <div className="pt-4 sm:pt-6 text-center">
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
