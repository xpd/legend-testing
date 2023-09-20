const radixColors = require('@radix-ui/colors');

const transformedColors = Object
  .entries(radixColors)
  .reduce((acc, [paletteName, palette]) => {

      // Transform the palette names so they look more Tailwind-ish
      // Hacky scheme reversal for now
      paletteName = paletteName
          .replace(/(?<!A|Dark|DarkAlpha)$/, 'l')
          .replace(/A$/, 'la')

          .replace(/Dark$/, '')
          .replace(/DarkA$/, 'a');

      // Remove the color name and 'A' from hue levels
      palette = Object
          .entries(palette)
          .reduce((acc, [hueLevel, color]) => {
              hueLevel = hueLevel.replace(/[a-z]/gi, '');
              acc[hueLevel] = color;
              return acc;
          }, {});

      acc[paletteName] = palette;
      return acc;
  }, {});

export default transformedColors;
