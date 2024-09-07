import { useRef } from "react";

export default function useIntersectionObserver(callback: VoidFunction) {
  const observer = useRef(
    new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
            alert("댕댕");
          }
        });
      },
      { threshold: 1 }
    )
  );

  const observe = (element: HTMLDivElement) => {
    observer.current.observe(element);
  };

  const unobserve = (element: HTMLDivElement) => {
    observer.current.unobserve(element);
  };

  return [observe, unobserve];
}
