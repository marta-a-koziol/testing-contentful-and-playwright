import { test as base } from '@playwright/test';
import next from 'next';
import { createServer, Server } from 'http';
import { AddressInfo } from 'net';
import path from 'path';
import { parse } from 'url';

const test = base.extend<{
  port: string;
}>({
  port: [
    // eslint-disable-next-line no-empty-pattern
    async ({}, use) => {
      const app = next({
        dev: false,
        dir: path.resolve(__dirname, '..')
      });
      await app.prepare();
      const handle = app.getRequestHandler();
      // start next server on arbitrary port
      const server: Server = await new Promise((resolve) => {
        const server = createServer((req, res) => {
          const url = req.url ? req.url : 'http://localhost:3000/';
          const parsedUrl = parse(url, true);
          handle(req, res, parsedUrl);
        });
        server.listen((error: unknown) => {
          if (error) throw error;
          resolve(server);
        });
      });
      // get the randomly assigned port from the server
      const port = String((server.address() as AddressInfo).port);
      // provide port to tests
      await use(port);
    },
    {
      //@ts-ignore
      scope: 'worker'
    }
  ]
});

export default test;
