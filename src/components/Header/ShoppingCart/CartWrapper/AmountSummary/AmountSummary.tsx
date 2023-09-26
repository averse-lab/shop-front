import { FC } from "react";

import s from "./_internal/AmountSummary.module.scss";

type IProps = {
  metric: string;
  value: string;
};

export const AmountSummary: FC<IProps> = (props) => {
  const { metric, value } = props;

  return (
    <div className={`${s["amount-summary"]} flex justify-between items-center`}>
      <p>{metric}</p>
      <p>{value}</p>
    </div>
  );
};
