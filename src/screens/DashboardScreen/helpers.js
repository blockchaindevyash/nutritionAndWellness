export const MAX_WATER_GLASSES = 8;

export const getUpdatedWaterCount = (currentValue, selectedKey, delta) => {
  const safeCurrentValue = Number.isFinite(currentValue) ? currentValue : 0;
  return Math.max(0, Math.min(selectedKey, safeCurrentValue + delta));
};
