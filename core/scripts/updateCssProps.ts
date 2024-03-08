import mdnCssProps from 'mdn-data/css/properties.json' assert { type: 'json' };
import fs from 'node:fs';

const standardProps = Object.entries(mdnCssProps)
  .filter(([key, value]: [string, any]) => ['standard', 'experimental'].includes(value.status))
  .map(([key, value]: [string, any]) => key);

fs.writeFileSync(__dirname + '/../src/css-props.json', JSON.stringify(standardProps, null, 2));
