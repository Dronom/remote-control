import { httpServer } from './src/http_server/index';
import { createWebSocketStream, WebSocketServer } from 'ws';
import { commandHandler } from './src/commandHandler';
const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port! \n http://localhost:${HTTP_PORT}/`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws): void => {
  console.log('connected');
  const duplex = createWebSocketStream(ws, { encoding: 'utf-8', decodeStrings: false });
  duplex.on('data', async (data: any) => {
    const [command, ...args] = data.toString().split(' ');
    try {
      commandHandler(command, args, duplex);
    } catch (err) {
      duplex.write(err);
    }
  });
});
