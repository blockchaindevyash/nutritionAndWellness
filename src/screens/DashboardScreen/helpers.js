export const MAX_WATER_GLASSES = 8;

export const getUpdatedWaterCount = (currentValue, delta) => {
  const safeCurrentValue = Number.isFinite(currentValue) ? currentValue : 0;
  return Math.max(0, Math.min(MAX_WATER_GLASSES, safeCurrentValue + delta));
};
