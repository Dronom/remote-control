import robot from 'robotjs';
import { drawCircle, drawRectangle } from './draw';
import { printScreenHandler } from './printScreenHandler';

export const commandHandler = async (command: string, args: Array<String>, duplex: any) => {
  const { x, y } = robot.getMousePos();
  const argsToNumber = args.map((arg) => Number(arg));
  switch (command) {
    case 'mouse_position':
      duplex.write(`mouse_position ${x},${y} \0`);
      break;
    case 'mouse_up':
      robot.moveMouse(x, y - argsToNumber[0]);
      duplex.write(`mouse_up ${y - argsToNumber[0]} \0`);
      break;
    case 'mouse_down':
      robot.moveMouse(x, y + argsToNumber[0]);
      duplex.write(`mouse_down ${y + argsToNumber[0]} \0`);
      break;
    case 'mouse_left':
      robot.moveMouse(x - argsToNumber[0], y);
      duplex.write(`mouse_left ${x - argsToNumber[0]} \0`);
      break;
    case 'mouse_right':
      robot.moveMouse(x + argsToNumber[0], y);
      duplex.write(`mouse_right ${x + argsToNumber[0]} \0`);
      break;
    case 'draw_circle':
      const radius = argsToNumber[0];
      drawCircle(x, y, radius);
      duplex.write(`draw_circle ${radius} \0`);
      break;
    case 'draw_square': {
      const [width] = argsToNumber;
      drawRectangle(x, y, width, width);
      duplex.write(`draw_square \0`);
      break;
    }
    case 'draw_rectangle':
      const [width, height] = argsToNumber;
      drawRectangle(x, y, width, height);
      duplex.write(`draw_square ${width}\0`);
      break;
    case 'prnt_scrn':
      const base64String = await printScreenHandler(x, y);
      duplex.write(`prnt_scrn ${base64String} \0`);
      break;
    default:
      console.log('Unknown command:', command);
  }
};
