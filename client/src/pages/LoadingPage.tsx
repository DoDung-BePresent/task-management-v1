/**
 * Node modules
 */
import { AudioWaveform, LoaderCircle } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="bg-primary text-primary-foreground flex aspect-square size-16 items-center justify-center rounded-md">
          <AudioWaveform className="size-9" />
        </div>
        <LoaderCircle className="size-8 animate-spin" />
      </div>
    </div>
  );
};

export default LoadingPage;
