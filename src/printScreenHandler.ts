import robot from 'robotjs';
import Jimp from 'jimp';

export const printScreenHandler = async (x: number, y: number) => {
  const xSize = 200;
  const ySize = 200;
  const screen = robot.screen.capture(x, y, xSize, ySize);
  const image = new Jimp({
    data: screen.image,
    width: xSize,
    height: ySize
  });

  const imageBuffer = await image.getBase64Async('image/png');

  const splitted = imageBuffer.split(',');
  const [, base64String] = splitted;

  return base64String;
};
