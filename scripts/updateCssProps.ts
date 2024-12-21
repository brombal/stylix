import fs from 'node:fs';
import mdnCssProps from 'mdn-data/css/properties.json' assert { type: 'json' };

const standardProps = Object.entries(mdnCssProps)
  .filter(
    ([key, value]) =>
      ['standard', 'experimental'].includes(value.status) &&
      !(
        value.appliesto.includes('SVG') &&
        value.appliesto !== 'allElementsSVGContainerGraphicsAndGraphicsReferencingElements'
      ) &&
      key !== '--*',
  )
  .map(([key]) => key);

const __dirname = new URL('.', import.meta.url).pathname;
fs.writeFileSync(`${__dirname}/../src/css-props.json`, JSON.stringify(standardProps, null, 2));
