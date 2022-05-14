import { useState } from "react";
import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";
import { Loading } from "../Loading";

interface ScreenshotButtonProps {
  screenshot: string | null;
  onScreenshotTook: (screenshot: string | null) => void;
}

export function ScreenshotButton({
  screenshot,
  onScreenshotTook,
}: ScreenshotButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

  async function handleTakeScreenshot() {
    setIsTakingScreenshot(true);

    const canvas = html2canvas(document.querySelector("html")!);
    const base64Image = (await canvas).toDataURL("image/png");

    onScreenshotTook(base64Image);

    setIsTakingScreenshot(false);
  }

  if (screenshot) {
    return (
      <button
        type="button"
        className={`
          flex 
          items-end 
          justify-end 
          w-10 
          h-10 
          p-1 
          transition-colors 
          border-transparent 
          rounded-md 
          text-zinc-400 
          hover:text-zinc-100
        `}
        onClick={() => onScreenshotTook(null)}
        style={{
          backgroundImage: `url(${screenshot})`,
          backgroundPosition: "right bottom",
          backgroundSize: 180,
        }}
      >
        <Trash weight="fill" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleTakeScreenshot}
      className={`
        p-2 
        border-transparent 
        rounded-md 
        bg-zinc-800 
        hover:bg-zinc-700
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-offset-zinc-900
        focus:ring-brand-500
        transition-colors
      `}
    >
      {isTakingScreenshot ? <Loading /> : <Camera className="w-6 h-6" />}
    </button>
  );
}
