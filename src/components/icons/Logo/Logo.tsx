import { FC } from "react";

import { clsx } from "clsx";

import s from "./_internal/Logo.module.scss";

interface IProps {
  className?: string;
}

export const Logo: FC<IProps> = (props) => {
  const { className } = props;

  return (
    <div className={clsx(className, "relative")}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        className={clsx("relative z-10", "h-full w-full")}
      >
        <path d='m23.5,0H.5C.22,0,0,.22,0,.5v23c0,.28.22.5.5.5h23c.28,0,.5-.22.5-.5V.5c0-.28-.22-.5-.5-.5Zm-5.5,11.54h-3.08l-2.77,6.15h-.63s-1.58-3.66-2.65-6.15h-2.87v-2.44h1.82c-.46-1.07-.77-1.69-.93-1.88-.16-.19-.46-.31-.9-.36v-.55h5.41v.55h-.18c-.49,0-.82.06-1,.18-.13.09-.19.21-.19.37,0,.1.03.22.07.35.04.13.19.5.45,1.09l.11.25h4.69c.17-.4.28-.68.33-.84.06-.2.09-.38.09-.52,0-.17-.04-.31-.13-.44-.09-.13-.22-.22-.39-.29-.24-.09-.56-.14-.95-.14v-.55h3.7v.55c-.41.07-.78.29-1.1.66-.2.23-.49.77-.86,1.57h1.97v2.44Z' />
        <polygon points='12.94 14.44 14.25 11.54 11.7 11.54 12.94 14.44' />
      </svg>
      <div
        className={clsx(
          s["logo__blur"],
          "absolute top-0 left-0 z-0",
          "w-full h-full",
        )}
      ></div>
    </div>
  );

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      className={className}
    >
      <rect width='24' height='24' rx='.5' ry='.5' className={"fill-black"} />
      <path d='m6,9.1h12v2.44H6v-2.44Z' className={"fill-transparent"} />
      <path
        d='m11.52,17.69h.63l3.7-8.21c.46-1.03.81-1.68,1.04-1.95.32-.37.69-.59,1.1-.66v-.55h-3.7v.55c.39,0,.71.05.95.14.17.07.3.16.39.29.09.13.13.27.13.44,0,.14-.03.32-.09.52s-.22.61-.49,1.21l-2.24,4.97-2.39-5.59c-.26-.59-.41-.96-.45-1.09s-.07-.25-.07-.35c0-.16.06-.28.19-.37.18-.12.51-.18,1-.18h.18v-.55h-5.41v.55c.44.05.74.17.9.36.16.19.47.82.94,1.91,0,0,3.69,8.56,3.69,8.56Z'
        className={"fill-transparent"}
      />
    </svg>
  );
};
