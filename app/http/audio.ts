import { clientApi } from './api';
import type { AudioPreset, AudioOperation, ProcessAudioResponse } from '@/types';


export const processAudio = async (
  file: File, 
  preset?: AudioPreset, 
  operations?: AudioOperation[]
): Promise<ProcessAudioResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  
  if (preset && preset !== 'custom' as any) {
    formData.append('preset', preset);
  }

  if (operations && operations.length > 0) {
    formData.append('operations', JSON.stringify(operations));
  }

  return clientApi.post('audio', { 
    body: formData,
    timeout: 60000 
  }).json();
};
