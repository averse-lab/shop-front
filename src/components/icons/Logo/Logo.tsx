import { FC } from "react";

interface IProps {
  className?: string;
  transparent?: boolean;
}

export const Logo: FC<IProps> = (props) => {
  const { className, transparent } = props;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      className={className}
    >
      <rect
        width='24'
        height='24'
        rx='.5'
        ry='.5'
        className={transparent ? "fill-transparent" : "fill-black"}
      />
      <path
        d='m6,9.1h12v2.44H6v-2.44Z'
        className={transparent ? "fill-neutral-700" : "fill-white"}
      />
      <path
        d='m11.52,17.69h.63l3.7-8.21c.46-1.03.81-1.68,1.04-1.95.32-.37.69-.59,1.1-.66v-.55h-3.7v.55c.39,0,.71.05.95.14.17.07.3.16.39.29.09.13.13.27.13.44,0,.14-.03.32-.09.52s-.22.61-.49,1.21l-2.24,4.97-2.39-5.59c-.26-.59-.41-.96-.45-1.09s-.07-.25-.07-.35c0-.16.06-.28.19-.37.18-.12.51-.18,1-.18h.18v-.55h-5.41v.55c.44.05.74.17.9.36.16.19.47.82.94,1.91,0,0,3.69,8.56,3.69,8.56Z'
        className={transparent ? "fill-neutral-700" : "fill-white"}
      />
    </svg>
  );
};
