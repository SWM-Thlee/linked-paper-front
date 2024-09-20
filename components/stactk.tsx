import React, { ReactNode } from "react";

interface StackProps {
  children: ReactNode;
  className?: string;
}

function VStack({ children, className = "", ...props }: StackProps) {
  return (
    <div className={`flex flex-col ${className}`} {...props}>
      {children}
    </div>
  );
}

function HStack({ children, className = "", ...props }: StackProps) {
  return (
    <div className={`flex flex-row ${className}`} {...props}>
      {children}
    </div>
  );
}

export { VStack, HStack };
