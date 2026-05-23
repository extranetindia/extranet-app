import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { PressableScale } from '@/components/ui/pressable-scale';
import { AppText } from '@/components/ui/typography';
import { MOCK_PROMOS } from '@/data/mock-customer';
import { Brand, ExtranetColors, Radius, Spacing } from '@/constants/extranet-theme';

const CARD_WIDTH = Dimensions.get('window').width - Spacing.xxl * 2;
const CARD_GAP = Spacing.md;
const AUTO_MS = 4500;

export function PromoCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    setActiveIndex(Math.round(x / (CARD_WIDTH + CARD_GAP)));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % MOCK_PROMOS.length;
        scrollRef.current?.scrollTo({
          x: next * (CARD_WIDTH + CARD_GAP),
          animated: true,
        });
        return next;
      });
    }, AUTO_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.wrapper}>
      <ScrollView
        ref={scrollRef}
        horizontal
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH + CARD_GAP}
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scroll}>
        {MOCK_PROMOS.map((promo) => (
          <PressableScale key={promo.id} scale={0.98}>
            <LinearGradient
              colors={promo.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.card}>
              <View style={styles.text}>
                <AppText variant="label" color="rgba(255,255,255,0.75)">
                  EXTRANET OFFER
                </AppText>
                <AppText variant="h3" color={Brand.white}>
                  {promo.title}
                </AppText>
                <AppText variant="small" color="rgba(255,255,255,0.9)">
                  {promo.subtitle}
                </AppText>
                <AppText variant="small" color={Brand.white} style={styles.cta}>
                  {promo.cta} →
                </AppText>
              </View>
              <View style={styles.iconCircle}>
                <Ionicons
                  name={promo.icon as keyof typeof Ionicons.glyphMap}
                  size={28}
                  color={Brand.white}
                />
              </View>
            </LinearGradient>
          </PressableScale>
        ))}
      </ScrollView>
      <View style={styles.dots}>
        {MOCK_PROMOS.map((_, i) => (
          <View key={i} style={[styles.dot, i === activeIndex && styles.dotActive]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: Spacing.xxl },
  scroll: { gap: CARD_GAP },
  card: {
    width: CARD_WIDTH,
    height: 136,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: { flex: 1, gap: Spacing.xs },
  cta: { marginTop: Spacing.sm, fontWeight: '600' },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: ExtranetColors.border,
  },
  dotActive: {
    width: 20,
    backgroundColor: Brand.primary,
  },
});
