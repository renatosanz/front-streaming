import React from 'react';
import { Dialog, DialogContent, DialogHeader } from '../components/ui/dialog';
import { PurpleCard, PurpleTitle, PurpleButton } from '../components/ui/purple';

interface VideoPlayerProps {
  open: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ open, onClose, videoUrl, title }) => {
  if (!open) return null;
  return (
    <Dialog className="z-50">
      <DialogContent>
        <DialogHeader>
          <PurpleTitle className="px-6 pt-6 text-center">{title}</PurpleTitle>
        </DialogHeader>
        <PurpleCard className="flex flex-col items-center justify-center px-6 pb-6 bg-transparent shadow-none border-0">
          <video controls autoPlay className="rounded-lg shadow-lg w-full max-h-[60vh] bg-black border-2 border-purple-700">
            <source src={videoUrl} type="video/mp4" />
            Tu navegador no soporta el video.
          </video>
          <PurpleButton className="mt-6 w-full" onClick={onClose}>Cerrar</PurpleButton>
        </PurpleCard>
      </DialogContent>
    </Dialog>
  );
};

export default VideoPlayer;
