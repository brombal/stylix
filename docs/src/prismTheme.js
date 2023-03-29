// Has to be a CommonJS module because it's imported by docusaurus.config.js

exports.prismTheme = {
  plain: {
    color: '#ffa6bf',
    backgroundColor: '#212121',
    font: '14px / 24px Source Code Pro, monospace',
  },
  styles: [
    {
      types: ['plain'],
      languages: ['bash'],
      style: {
        color: '#EEFFFF',
      },
    },
    {
      types: ['function'],
      languages: ['bash'],
      style: {
        color: '#FFCB6B',
      },
    },

    {
      types: ['plain'],
      languages: ['tsx'],
      style: {
        color: '#ffa6bf',
      },
    },
    {
      types: ['keyword'],
      languages: ['tsx'],
      style: {
        color: '#C792EA',
      },
    },
    {
      types: ['builtin'],
      languages: ['tsx'],
      style: {
        color: '#FFCB6B',
      },
    },
    {
      types: ['punctuation'],
      languages: ['tsx'],
      style: {
        color: '#EEFFFF',
      },
    },
    {
      types: ['operator'],
      languages: ['tsx'],
      style: {
        color: '#CCC',
      },
    },
    {
      types: ['string', 'number'],
      languages: ['tsx'],
      style: {
        color: '#a7f3a5',
      },
    },
    {
      types: ['comment'],
      languages: ['tsx'],
      style: {
        color: '#888',
      },
    },
    {
      types: ['tag'],
      languages: ['tsx'],
      style: {
        color: '#71def0',
      },
    },
    {
      types: ['attr-name'],
      languages: ['tsx'],
      style: {
        color: '#c2f3fb',
      },
    },
    {
      types: ['attr-value'],
      languages: ['tsx'],
      style: {
        color: '#a7f3a5',
      },
    },
    {
      types: ['tag', 'spread', 'attr-value'],
      languages: ['tsx'],
      style: {
        color: '#FF6B95',
      },
    },
    {
      types: ['plain-text'],
      languages: ['tsx'],
      style: {
        color: '#EEFFFF',
      },
    },
  ],
};
