import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
type Props = {
  text: string;
};
const Markdown = ({ text }: Props) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ className, children }) {
          // 사용된 언어
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            // 코드 (```)
            <SyntaxHighlighter style={dracula} language={match[1]} PreTag="div">
              {String(children)
                .replace(/\n$/, "")
                .replace(/\n&nbsp;\n/g, "")
                .replace(/\n&nbsp\n/g, "")}
            </SyntaxHighlighter>
          ) : (
            <SyntaxHighlighter
              style={dracula}
              background="green"
              language="textile"
              PreTag="div"
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          );
        },
        // 인용문 (>)
        blockquote({ children, ...props }) {
          return (
            <blockquote
              style={{
                background: "#eeaa8a9b",
                padding: "1px 15px",
                borderRadius: "10px",
              }}
              {...props}
            >
              {children}
            </blockquote>
          );
        },
        img({ ...props }) {
          return (
            <img
              style={{ maxWidth: "40vw" }}
              src={props.src?.replace("../../../../public/", "/")}
              alt="MarkdownRenderer__Image"
            />
          );
        },
        em({ children, ...props }) {
          return (
            <span style={{ fontStyle: "italic" }} {...props}>
              {children}
            </span>
          );
        },
      }}
    >
      {text}
    </ReactMarkdown>
  );
};
export default Markdown;
