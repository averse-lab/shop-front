type getCurrentValueParams = {
  placeholder: string | undefined;
  selectedIndex: number | undefined;
};

export const getCurrentValue = (
  params: getCurrentValueParams,
): string | number => {
  const { placeholder, selectedIndex } = params;

  if (selectedIndex !== undefined) {
    return selectedIndex;
  }

  if (placeholder !== undefined) {
    return "";
  }

  return 0;
};
