import { FC } from 'react';
import { TargetedCVModal } from './TargetedCVModal';
import { CareerTrack } from '../types';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTrack?: CareerTrack;
}

export const ResumeModal: FC<ResumeModalProps> = (props) => {
  return <TargetedCVModal {...props} />;
};

export { TargetedCVModal };
