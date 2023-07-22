import  { useEffect, useState } from 'preact/hooks';
import useWindowSize from '../../hooks/useWindowSize.ts';
import useDebounce from '../../hooks/useDebounce.ts';

const Gradient = () => {
  const [boxHeight, setHeight] = useState<number | null>(null);
  const [boxWidth, setWidth] = useState<number | null>(null);
  const [color, setColor] = useState<string>('');
  const [random, setRandom] = useState('');
  const size = useWindowSize();
  const debouncedSize = useDebounce(size, 200);

  const luma = (color: string) => {
    var rgb = typeof color === 'string' ? hexToRGBArray(color) : color;
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  };

  const hexToRGBArray = (color: string) => {
    if (color.length === 3)
      color =
        color.charAt(0) +
        color.charAt(0) +
        color.charAt(1) +
        color.charAt(1) +
        color.charAt(2) +
        color.charAt(2);
    else if (color.length !== 6) throw 'Invalid hex color: ' + color;
    var rgb = [];
    for (var i = 0; i <= 2; i++) rgb[i] = parseInt(color.substr(i * 2, 2), 16);
    return rgb;
  };

  const getRandomArbitrary = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  const randomColor = (): string => {
    const color = Math.random().toString(16).slice(2, 8).toUpperCase();
    if (luma(color) >= 200) {
      return randomColor();
    } else {
      return `#${color}`;
    }
  };

  const r = getRandomArbitrary(
    getRandomArbitrary(1.3432, 270.6546),
    getRandomArbitrary(1.3432, 70.6546)
  );

  const updateBlock = () => {
    const { height, width } = size;
    if (height && width) {
      document.body.style.overflowX = 'hidden';
      setHeight(height);
      setWidth(width);
      setColor(randomColor());
      setRandom(`rotate(${r}deg)`);
    }
  };

  useEffect(() => {
    self.addEventListener('resize', () => updateBlock());
    self.addEventListener('orientationchange', () => updateBlock());
    return () => {
      self.removeEventListener('resize', () => updateBlock());
      self.removeEventListener('orientationchange', () => updateBlock());
    };
  }, []);

  useEffect(() => {
    if (debouncedSize) {
      updateBlock();
    }
  }, [debouncedSize]);

  return (
    <>
      <div
        id="block"
        className="block"
        style={{
          transform: random,
          background: `linear-gradient(${color} 0%, transparent 100%)`,
          height: boxHeight ? boxHeight : 0,
          width: boxWidth ? boxWidth : 0,
        }}
      />
      <div className="clear" />
    </>
  );
};

export default Gradient;
