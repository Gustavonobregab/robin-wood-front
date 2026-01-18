'use server';

import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import os from 'os';
// Fallback para UUID caso não tenha instalado
const uuidv4 = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

// --- CORREÇÃO DE IMPORTAÇÃO ---
// Tenta carregar a lib de todas as formas possíveis
// @ts-ignore
const RobinWoodLib = require('robin-wood');

// Debug: Isso vai aparecer no seu terminal do VS Code quando você rodar
console.log("🌲 Conteúdo da lib robin-wood:", Object.keys(RobinWoodLib));

// Extração segura: Tenta pegar do raiz OU do .default
const steal = RobinWoodLib.steal || RobinWoodLib.default?.steal;
const decodeAudio = RobinWoodLib.decodeAudio || RobinWoodLib.default?.decodeAudio;
const encodeAudio = RobinWoodLib.encodeAudio || RobinWoodLib.default?.encodeAudio;

export async function processAudioAction(formData: FormData) {
  let tempInputPath: string | null = null;

  try {
    // 0. Verificação de Sanidade da Lib
    if (!decodeAudio || typeof decodeAudio !== 'function') {
      throw new Error(`A função decodeAudio não foi encontrada na lib. Chaves disponíveis: ${Object.keys(RobinWoodLib).join(', ')}`);
    }

    const file = formData.get('file') as File;
    if (!file) throw new Error("Nenhum arquivo encontrado.");

    console.log("🌲 Processando:", file.name);

    // 1. Salvar Arquivo Temporário
    const arrayBuffer = await file.arrayBuffer();
    const inputBuffer = Buffer.from(arrayBuffer);

    const tempDir = os.tmpdir();
    const uniqueName = `robin-wood-${uuidv4()}.${file.name.split('.').pop()}`;
    tempInputPath = join(tempDir, uniqueName);
    
    await writeFile(tempInputPath, inputBuffer);

    // 2. Executar Pipeline
    const rawPcmBuffer = await decodeAudio(tempInputPath);
    
    const pipelineResult = await steal.audio(rawPcmBuffer)
      .removeSilence()
      .normalize()
      .run();

    const outputMp3Buffer = await encodeAudio(pipelineResult.data, 'mp3', '64k');

    // 3. Calcular Resultados
    const originalSize = inputBuffer.length;
    const newSize = outputMp3Buffer.length;
    
    let savings = 0;
    if (originalSize > 0) {
      savings = ((originalSize - newSize) / originalSize) * 100;
    }

    // 4. Limpeza
    if (tempInputPath) {
      await unlink(tempInputPath).catch(() => {});
    }

    return {
      success: true,
      size: `${(newSize / 1024).toFixed(1)} KB`,
      savings: `${savings.toFixed(0)}%`,
    };

  } catch (error: any) {
    console.error("❌ Erro CRÍTICO no Server Action:", error);
    
    // Limpeza de emergência
    if (tempInputPath) {
      await unlink(tempInputPath).catch(() => {}); 
    }

    return { 
      success: false, 
      error: error.message || "Erro desconhecido no servidor." 
    };
  }
}