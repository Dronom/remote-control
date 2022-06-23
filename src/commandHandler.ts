import robot from 'robotjs';
import { drawCircle, drawRectangle } from './draw';
import { printScreenHandler } from './printScreenHandler';

export const commandHandler = async (
  command: string,
  args: Array<String>,
  ws: any
) => {
  const { x, y } = robot.getMousePos();
  const argsToNumber = args.map((arg) => Number(arg));
  switch (command) {
    case 'mouse_position':
      ws.send(`mouse_position ${x},${y} \0`);
      break;
    case 'mouse_up':
      robot.moveMouse(x, y - argsToNumber[0]);
      ws.send(`mouse_up ${y - argsToNumber[0]} \0`);
      break;
    case 'mouse_down':
      robot.moveMouse(x, y + argsToNumber[0]);
      ws.send(`mouse_down ${y + argsToNumber[0]} \0`);
      break;
    case 'mouse_left':
      robot.moveMouse(x - argsToNumber[0], y);
      ws.send(`mouse_left ${x - argsToNumber[0]} \0`);
      break;
    case 'mouse_right':
      robot.moveMouse(x + argsToNumber[0], y);
      ws.send(`mouse_right ${x + argsToNumber[0]} \0`);
      break;
    case 'draw_circle':
      const radius = argsToNumber[0];
      drawCircle(x, y, radius);
      ws.send(`draw_circle ${radius} \0`);
      break;
    case 'draw_square': {
      const [width] = argsToNumber;
      drawRectangle(x, y, width, width);
      ws.send(`draw_square \0`);
      break;
    }
    case 'draw_rectangle':
      const [width, height] = argsToNumber;
      drawRectangle(x, y, width, height);
      ws.send(`draw_square ${width}\0`);
      break;
    case 'prnt_scrn':
      const base64String = await printScreenHandler(x, y);
      ws.send(`prnt_scrn ${base64String} \0`);
      break;
    default:
      console.log('Unknown command:', command);
  }
};
