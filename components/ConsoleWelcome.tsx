'use client';

import { useEffect, useRef } from 'react';

export const ConsoleWelcome = () => {
  const hasLogged = useRef(false);

  useEffect(() => {
    if (hasLogged.current) return;
    hasLogged.current = true;

    const asciiArt = `
                                                  
                        ##                        
                ##################                
                ##################                
                  ################                
                                                  
                                                  
                  ################                
                ####################              
              ########################            
            ############    ############          
          ############        ############        
          ##########            ##########        
        ############    ####    ############      
        ############          ##############      
      ################          ############      
      ##############    ####    ############      
      ##############            ##############    
      ################        ################    
      ##################    ################      
        ####################################      
          ################################        
              ########################            
                                                  
                                                                                            
    `;
const styles = {
      art: "color: #D35400; font-family: monospace; font-weight: bold; line-height: 1.1;",
      title: "color: #00C16C; background: #121212; font-size: 16px; font-weight: 900; padding: 5px 10px; border: 2px solid #00C16C;",
      slogan: "color: #FFFFFF; background: #121212; padding: 2px 10px; font-style: italic;",
      header: "color: #FFD60A; font-weight: bold; font-size: 14px; margin-top: 10px;",
      reset: "color: inherit; background: none; border: none; padding: 0; margin: 0;" // <--- O segredo para corrigir o bug
    };

    console.log(
      // ESTRUTURA BLINDADA CONTRA BUGS
      // Usamos %c logo após o texto para resetar o estilo ANTES do \n
      `%c${asciiArt}\n` + 
      `%c ROBIN WOOD 🏹 %c\n` +  // Aplica título -> Reseta -> Pula linha
      `%c Steal from the bloat. Give to the dev. %c\n\n` + // Aplica slogan -> Reseta -> Pula linha
      
      `%c🌲 THE BLACKSMITHS BEHIND THE CODE 🌲%c\n` + 
      `Curious about who sharpened these arrows? Connect with us:\n\n` + 
      
      `👨‍💻 Gustavo Nóbrega\n` + 
      `🔗 https://www.linkedin.com/in/gustavonobregab/\n\n` + 
      `👨‍💻 Axel Vaz\n` + 
      `🔗 https://www.linkedin.com/in/axelvaz/`,

      // ARGUMENTOS DE ESTILO
      styles.art,           // 1. Arte
      styles.title,         // 2. Título
      styles.reset,         // 3. Reset (Limpa o fundo preto do título)
      styles.slogan,        // 4. Slogan
      styles.reset,         // 5. Reset (Limpa o fundo preto do slogan)
      styles.header,        // 6. Header do Time
      styles.reset          // 7. Reset final
    );

  }, []);

  return null;
};