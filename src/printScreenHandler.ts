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

  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
    const color = screen.colorAt(x, y);
    const red = parseInt(color[0] + color[1], 16);
    const green = parseInt(color[2] + color[3], 16);
    const blue = parseInt(color[4] + color[5], 16);

    image.bitmap.data[idx + 0] = Number(red);
    image.bitmap.data[idx + 1] = Number(green);
    image.bitmap.data[idx + 2] = Number(blue);
    image.bitmap.data[idx + 3] = 255;
  });
  const imageBuffer = await image.getBase64Async('image/png');

  const splitted = imageBuffer.split(',');
  const [, base64String] = splitted;

  return base64String;
};
