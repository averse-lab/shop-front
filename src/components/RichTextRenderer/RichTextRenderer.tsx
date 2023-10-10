import { FC } from "react";

import { clsx } from "clsx";
import Link from "next/link";

import s from "./_internal/RichTextRenderer.module.scss";

type IProps = {
  className?: string;
  richText: string;
};

type RichTextParagraphType = {
  type: "paragraph";
  children: RichTextParagraphChild[];
};

type RichTextTextType = {
  type: "text";
  value: string;
  italic?: true;
  bold?: true;
};

type RichTextLinkType = {
  type: "link";
  url: string;
  title: string;
  target: string;
  children: RichTextTextType[];
};

type RichTextParagraphChild = RichTextTextType | RichTextLinkType;

type ParsedRichText = {
  type: "root";
  children: RichTextParagraphType[];
};

export const RichTextRenderer: FC<IProps> = (props) => {
  const { richText, className } = props;

  const parsedRichText: ParsedRichText = JSON.parse(richText);

  const x = parsedRichText.children.reduce<JSX.Element[][]>(
    (rootAcc, rootCurr) => {
      const paragraphs = rootCurr.children.reduce<JSX.Element[]>(
        (childAcc, childCurr) => {
          switch (childCurr.type) {
            case "text":
              if (childCurr.value !== "") {
                childAcc.push(
                  <p
                    className={clsx(
                      childCurr.bold && "font-bold",
                      childCurr.italic && "italic",
                    )}
                  >
                    {childCurr.value}
                  </p>,
                );
              }

              break;
            case "link":
              childAcc.push(
                <Link
                  className={clsx(
                    childCurr.children[0].bold && "font-bold",
                    childCurr.children[0].italic && "italic",
                  )}
                  href={childCurr.url}
                  title={childCurr.title}
                >
                  {childCurr.children[0].value}
                </Link>,
              );
              break;
          }

          return childAcc;
        },
        [],
      );

      rootAcc.push(paragraphs);

      return rootAcc;
    },
    [],
  );

  return <div className={clsx(className, s["rich-text"])}>{x}</div>;
};
