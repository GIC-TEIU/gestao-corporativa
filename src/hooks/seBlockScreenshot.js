// src/hooks/useBlockScreenshot.js

import { useEffect } from 'react';

export function useBlockScreenshot() {
  useEffect(() => {
   
    document.body.classList.add('no-screenshot');

    // Bloqueia atalhos do teclado
    const handleKeyDown = (event) => {
     
      if (
        event.key === 'PrintScreen' ||
        event.key === 'F12' ||
        (event.ctrlKey && event.shiftKey && ['I', 'J', 'C'].includes(event.key.toUpperCase())) ||
        (event.ctrlKey && ['p', 's', 'c'].includes(event.key.toLowerCase()))
      ) {
        event.preventDefault();
        alert('Esta ação não é permitida para proteger o conteúdo.');
      }
    };

    // Bloqueia o menu de contexto (botão direito)
    const handleContextMenu = (event) => {
      event.preventDefault();
      alert('Esta ação não é permitida para proteger o conteúdo.');
    };
    
    // Bloqueia impressão
    const handleBeforePrint = (event) => {
      event.preventDefault();
      alert('A impressão não é permitida para proteger o conteúdo.');
      
      document.body.classList.add('printing'); 
    };
    
    const handleAfterPrint = () => {
      // Garante que o conteúdo volte a ser visível
      document.body.classList.remove('printing');
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);

    
    return () => {
      document.body.classList.remove('no-screenshot');
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, []); 
}