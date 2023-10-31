export const getCustomGridPositionStyle = (
  index: number,
  gridIndex: number | undefined,
  gridDesktopIndex: number | undefined,
): string => {
  return `.animation-${index} {
        ${
          gridIndex !== undefined
            ? `grid-row-start: ${Math.floor(gridIndex / 2) + 1};
        grid-column-start: ${(gridIndex % 2) + 1};`
            : `display: none;`
        }
        
    }
    
    @media(min-width: 1024px) {
        .animation-${index} {
          ${
            gridDesktopIndex !== undefined
              ? `grid-row-start: ${Math.floor(gridDesktopIndex / 4) + 1};
          grid-column-start: ${(gridDesktopIndex % 4) + 1};`
              : `display: none;`
          }
            
        }
    }`;
};
