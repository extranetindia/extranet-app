import { useState } from 'react';
import { ConnectionStatus } from '@/components/home/connection-status';
import { CurrentPlanCard } from '@/components/home/current-plan-card';
import { DashboardHeader } from '@/components/home/dashboard-header';
import { NetworkQualityBar } from '@/components/home/network-quality-bar';
import { OutageAlertBanner } from '@/components/home/outage-alert-banner';
import { PromoCarousel } from '@/components/home/promo-carousel';
import { QuickActions } from '@/components/home/quick-actions';
import { UsageProgressCard } from '@/components/home/usage-progress-card';
import { FadeIn } from '@/components/ui/fade-in';
import { FloatingSupportFab } from '@/components/ui/floating-support-fab';
import { SafeScreen } from '@/components/ui/safe-screen';
import { ScreenScroll } from '@/components/ui/screen-scroll';
import { SectionHeader } from '@/components/ui/section-header';
import { DashboardSkeleton } from '@/components/ui/skeleton';
import { useCustomer } from '@/context/customer-context';
import { useScreenBootstrap } from '@/hooks/use-screen-bootstrap';

export default function HomeScreen() {
  const { ready, refresh } = useScreenBootstrap(720);
  const { runSpeedTest, speedTesting } = useCustomer();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refresh(), runSpeedTest()]);
    setRefreshing(false);
  };

  return (
    <SafeScreen edges={['top']} tone="light">
      {!ready ? (
        <ScreenScroll bottomInset={100}>
          <DashboardSkeleton />
        </ScreenScroll>
      ) : (
        <ScreenScroll
          bottomInset={100}
          onRefresh={handleRefresh}
          refreshing={refreshing || speedTesting}>
          <FadeIn index={0}>
            <DashboardHeader />
          </FadeIn>
          <FadeIn index={1}>
            <OutageAlertBanner />
          </FadeIn>
          <FadeIn index={2}>
            <NetworkQualityBar />
          </FadeIn>
          <FadeIn index={3}>
            <ConnectionStatus />
          </FadeIn>
          <FadeIn index={4}>
            <CurrentPlanCard />
          </FadeIn>
          <FadeIn index={5}>
            <UsageProgressCard />
          </FadeIn>
          <FadeIn index={6}>
            <SectionHeader title="Quick actions" />
            <QuickActions />
          </FadeIn>
          <FadeIn index={7}>
            <SectionHeader title="Offers for you" />
            <PromoCarousel />
          </FadeIn>
        </ScreenScroll>
      )}
      {ready && <FloatingSupportFab />}
    </SafeScreen>
  );
}
