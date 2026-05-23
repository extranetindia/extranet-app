export type AvailabilityResult = 'available' | 'unavailable';

export type LocationSummary = {
  pincode: string;
  society: string;
  areaLabel: string;
  city: string;
};

export type OnboardingFormData = {
  pincode: string;
  society: string;
  areaLabel: string;
  city: string;
  detectedLocation: boolean;
};
