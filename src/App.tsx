import { useCallback, useEffect, useState, useRef } from 'react';
import weddingInvite from './assets/WeddingInvite-DA.png';
import weddingInvitev2 from './assets/WeddingInvite-V2.png';
import './App.css';

/* 
 Rectangle version - 1200 * 851
*/
function App() {
  const [text, setText] = useState('Damilola');
  const [fontSize, setFontSize] = useState(30);
  const [textColor, setTextColor] = useState('#935212');
  const [coordinates, setCoordinates] = useState<{ x: number, y: number; image: string; }>({ x: 165, y: 1115, image: weddingInvitev2 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const image = new Image();
    image.src = coordinates.image; // image must be 1200 * 851

    image.onload = () => {
      // Set canvas dimensions
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      // Clear canvas and redraw everything
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0);

      // Set text styles
      ctx.font = `${fontSize}px CustomFont`;
      ctx.fillStyle = textColor;

      // Add text at coordinate
      // const x = 208;
      // const y = 787;

      ctx.fillText(text, coordinates.x, coordinates.y);
    };
  }, [text, fontSize, textColor, coordinates]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `wedding invite - ${text}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div style={{ position: 'relative' }}>
      <h1>Hey Buddy, winks!!</h1>
      <div style={{
        backgroundColor: 'blue',
        border: "10px #e7ffff8f solid",
        borderRadius: "10px",
        padding: "5px",
        maxWidth: "360px",
        position: 'fixed',
        right: '50px',
        top: '100px',
        display: 'grid',
      }}>
        <nav style={{
          display: 'flex',
          gap: '6px',
          listStyle: 'none',
          margin: '0 auto 10px',
        }}>
          <li
            style={{ cursor: 'pointer', color: 'white', backgroundColor: coordinates.x === 165 ? '#0fc935' : '#ac124b', padding: '4px 10px', }}
            onClick={() => setCoordinates({
              x: 165, y: 1115, image: weddingInvitev2
            })}>SQ</li>
          <li
            style={{ cursor: 'pointer', color: 'white', backgroundColor: coordinates.x === 208 ? '#0fc935' : '#ac124b', padding: '4px 12px' }}
            onClick={() => setCoordinates({
              x: 208, y: 785, image: weddingInvite
            })}>REC</li></nav>
        <label htmlFor="textInput" style={{
          display: 'grid', fontSize: '25px', margin: "10px 2px"
        }}>Name to add
          <input
            type="text"
            id="textInput"
            placeholder="Enter your text here"
            value={text}
            style={{
              fontSize: '15px',
              textAlign: 'center',
              fontFamily: "CustomFont"
            }}
            onChange={(e) => setText(e.target.value)}
          /></label>

        <label htmlFor="fontSize" style={{
          margin: "10px 2px"
        }}>Name size:
          <input
            type="number"
            id="fontSize"
            value={fontSize}
            min="10"
            max="100"
            onChange={(e) => setFontSize(Number(e.target.value))}
          /></label>

        <label htmlFor="textColor" style={{
          margin: "10px 2px"
        }}>Name colour:
          <input
            type="color"
            id="textColor"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
          /></label>

        <input
          type="button"
          value={'Reset colour'}
          style={{ cursor: 'pointer', margin: '0 auto 10px', color: 'white', backgroundColor: '#935212' }}
          onClick={() => setTextColor('#935212')
          }
        />

        <button id="downloadBtn" disabled={!text} onClick={handleDownload}>
          Download Invite
        </button>
      </div>


      <canvas ref={canvasRef} id="canvas"></canvas>
    </div >
  );
}

export default App;