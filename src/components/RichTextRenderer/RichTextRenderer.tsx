"use client";

import { FC } from "react";

import { clsx } from "clsx";
import Link from "next/link";
import { v4 } from "uuid";

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

  return (
    <div className={clsx(className, s["rich-text"])}>
      {parsedRichText.children.reduce<JSX.Element[][]>((rootAcc, rootCurr) => {
        const paragraphs = rootCurr.children.reduce<(JSX.Element | string)[]>(
          (childAcc, childCurr) => {
            switch (childCurr.type) {
              case "text":
                if (childCurr.value !== "") {
                  if (childCurr.bold) {
                    childAcc.push(
                      <span key={v4()} className='font-bold'>
                        {childCurr.value}
                      </span>,
                    );
                  } else if (childCurr.italic) {
                    childAcc.push(
                      <span key={v4()} className='italic'>
                        {childCurr.value}
                      </span>,
                    );
                  } else {
                    childAcc.push(childCurr.value);
                  }
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
                    target={childCurr.target}
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

        if (paragraphs.length > 0) {
          rootAcc.push([<p key={v4()}>{paragraphs}</p>]);
        }

        return rootAcc;
      }, [])}
    </div>
  );
};
