'use client';

import React from 'react';
import Hero from '@/components/Hero';
import InteractiveDemoSection from '@/components/InteractiveDemoSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import PersonalitiesSection from '@/components/PersonalitiesSection';
import ViralPreviewSection from '@/components/ViralPreviewSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FaqSection from '@/components/FaqSection';
import CtaSection from '@/components/CtaSection';
import OnboardingModal from '@/components/OnboardingModal';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const handleStartChat = () => {
    router.push('/chat');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <OnboardingModal onStartChat={handleStartChat} />
      <Hero />
      <InteractiveDemoSection />
      <HowItWorksSection />
      <PersonalitiesSection />
      <ViralPreviewSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
    </div>
  );
}
