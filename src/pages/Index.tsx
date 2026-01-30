import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import ActionsSection from '@/components/home/ActionsSection';
import VideoSection from '@/components/home/VideoSection';
import MapSection from '@/components/home/MapSection';
import CTASection from '@/components/home/CTASection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <ActionsSection />
      <VideoSection />
      <MapSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
