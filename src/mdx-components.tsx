import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import { Callout, Cards, Card, MethodTable, Screens, Steps } from "@/components/docs/Mdx";

const components: MDXComponents = {
  a: ({ href = "", children, ...rest }) =>
    href.startsWith("/") || href.startsWith("#") ? (
      <Link href={href} {...rest}>{children}</Link>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>{children}</a>
    ),
  table: (props) => (
    <div className="docs-table">
      <table {...props} />
    </div>
  ),
  Callout,
  Cards,
  Card,
  MethodTable,
  Screens,
  Steps,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
