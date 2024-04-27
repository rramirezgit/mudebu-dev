/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box } from 'src/components/Box/box-component';
import { RootState } from 'src/store';

interface ImageEraserProps {
  imageUrl: string;
  reload: boolean;
}

const ImageEraser: React.FC<ImageEraserProps> = ({ imageUrl, reload }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [lastPos, setLastPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const brushRadius = useSelector((state: RootState) => state.mudebuAi.brushRadius);
  const brushRadiusEditor = useSelector((state: RootState) => state.mudebuAi.brushRadiusEditor);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const image = new Image();

        image.onload = () => {
          canvas.width = document.getElementById('canvas-container')?.clientWidth || 500;
          canvas.height = document.getElementById('canvas-container')?.clientHeight || 500;
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        };

        image.src = imageUrl;
      }
    }
  }, [imageUrl, reload]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const position = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
    setIsDrawing(true);
    setLastPos(position);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDrawing && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      const position = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
      if (ctx) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(lastPos.x, lastPos.y, brushRadius, 0, Math.PI * 2);
        ctx.fill();
      }
      setLastPos(position);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleMouseOut = () => {
    setIsDrawing(false);
  };

  return (
    <Box
      id="canvas-container"
      sx={{
        cursor: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='${
          brushRadius * 2
        }' height='${
          brushRadius * 2
        }' viewport='0 0 100 100' style='fill:black;font-size:24px;'><circle cx='${brushRadius}' cy='${brushRadius}' r='${brushRadius}' stroke='none' fill='white' /></svg>") 
        ${brushRadius} ${brushRadius},
        auto`,
        height: '70vh',
        position: 'relative',
      }}
    >
      {brushRadiusEditor && (
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            left: 10,
            width: brushRadius * 2,
            height: brushRadius * 2,
            backgroundColor: 'white',
            borderRadius: '50%',
          }}
        />
      )}

      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseOut}
      />
    </Box>
  );
};

export default ImageEraser;
