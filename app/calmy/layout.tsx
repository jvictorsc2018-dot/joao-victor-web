import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calmy | Um projeto especial de João Victor",
  description:
    "Conheça o desenvolvimento do Calmy, um aplicativo acolhedor inspirado por Camily e pensado para apoiar pessoas em momentos de ansiedade.",
};

export default function CalmyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
