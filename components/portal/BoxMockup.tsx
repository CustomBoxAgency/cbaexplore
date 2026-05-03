import CbaMark from "./CbaMark";
import { readableOn } from "@/lib/theme";

type Props = {
  brandName: string;
  color1: string;
  color2: string;
  size?: "lg" | "sm";
};

export default function BoxMockup({ brandName, color1, color2, size = "lg" }: Props) {
  const dim = size === "lg" ? "aspect-square max-w-md" : "aspect-square max-w-xs";
  const text = readableOn(color1);

  return (
    <div className={`relative w-full ${dim} mx-auto`}>
      <div
        className="absolute inset-0 shadow-2xl"
        style={{
          background: `linear-gradient(140deg, ${color1} 0%, ${color1} 60%, ${color2} 100%)`,
        }}
      />
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
        style={{ color: text }}
      >
        <CbaMark size={size === "lg" ? 56 : 36} color={color2} />
        <div
          className="font-display mt-6 text-3xl"
          style={{ fontSize: size === "lg" ? "2rem" : "1.4rem" }}
        >
          {brandName}
        </div>
        <div
          className="mt-3 text-[10px] uppercase tracking-[0.4em] opacity-70"
        >
          Custom Box Agency
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-1.5"
        style={{ background: color2 }}
      />
    </div>
  );
}
