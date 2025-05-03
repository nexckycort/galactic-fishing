/// <reference path="./.sst/platform/config.d.ts" />

const HOST = process.env.HOST ?? '';
const PORT = process.env.PORT ?? '2812';
const CODE = process.env.CODE ?? '';

const URL_GRAPH_FACEBOOK = process.env.URL_GRAPH_FACEBOOK ?? '';
const GRAPH_API_TOKEN = process.env.GRAPH_API_TOKEN ?? '';
const WHATSAPP_RECIPIENT_PHONE = process.env.WHATSAPP_RECIPIENT_PHONE ?? '';

export default $config({
  app(input) {
    return {
      name: 'galactic-fishing',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      protect: ['production'].includes(input?.stage),
      home: 'aws',
      providers: {
        aws: {
          profile: process.env.GITHUB_ACTIONS ? undefined : 'me',
        },
      },
    };
  },
  async run() {
    const vpc = new sst.aws.Vpc('MyVpc');
    const cluster = new sst.aws.Cluster('MyCluster', { vpc });

    new sst.aws.Service('MyBot', {
      cluster,
      environment: {
        HOST,
        PORT,
        CODE,
        URL_GRAPH_FACEBOOK,
        GRAPH_API_TOKEN,
        WHATSAPP_RECIPIENT_PHONE,
      },
      dev: {
        command: 'node --watch index.mjs',
      },
    });
  },
});
