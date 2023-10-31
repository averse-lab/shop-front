export const getCustomGridPositionStyle = (
  index: number,
  gridIndex: number,
  gridDesktopIndex: number,
): string => {
  return `.animation-${index} {
        grid-row-start: ${Math.floor(gridIndex / 2) + 1};
        grid-column-start: ${(gridIndex % 2) + 1};
    }
    
    @media(min-width: 1024px) {
        .animation-${index} {
            grid-row-start: ${Math.floor(gridDesktopIndex / 4) + 1};
            grid-column-start: ${(gridDesktopIndex % 4) + 1};
        }
    }`;
};
