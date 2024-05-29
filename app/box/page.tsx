'use client'
import React, { useState } from 'react';

interface Box {
    id: number;
    x: number;
    y: number;
}

const Page: React.FC = () => {
    const [boxes, setBoxes] = useState<Box[]>([]);
    const [lastBoxId, setLastBoxId] = useState<number | null>(null);
    const [boxIdCounter, setBoxIdCounter] = useState<number>(0);

    const handleClick = (id: number) => {
        const filteredBoxes = boxes.filter(box => box.id !== id);
        setBoxes(filteredBoxes);
    };

    const handleBoxClick = (id: number) => {
        if (id !== lastBoxId) {
            setLastBoxId(id);
        }
    };

    const handleContainerClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newBox: Box = { id: boxIdCounter, x, y };
        setBoxes([...boxes, newBox]);
        setBoxIdCounter(boxIdCounter + 1);

        if (lastBoxId !== null) {
            setLastBoxId(null);
        } else {
            setLastBoxId(newBox.id);
        }
    };

    const renderArrows = () => {
        const arrows = [];
        for (let i = 0; i < boxes.length - 1; i++) {
            const startX = boxes[i].x + 25;
            const startY = boxes[i].y + 25;
            const endX = boxes[i + 1].x + 25;
            const endY = boxes[i + 1].y + 25;
            const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);
            const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
            arrows.push(
                <div
                    key={i}
                    className="absolute"
                    style={{
                        left: startX,
                        top: startY,
                        width: `${length}px`,
                        height: '2px',
                        backgroundColor: 'black',
                        transformOrigin: 'left',
                        transform: `rotate(${angle}deg)`
                    }}
                />
            );
        }
        return arrows;
    };

    return (
        <div className="relative w-[1000px] flex justify-center items-center h-[500px] border-2 bg-yellow-300 border-black" onClick={handleContainerClick}>
            {boxes.map((box, index) => (
                <div
                    key={box.id}
                    className="absolute w-[50px] h-[50px] bg-orange-500 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    style={{ left: box.x, top: box.y }}
                    onClick={() => handleBoxClick(box.id)}
                />
            ))}
            {renderArrows()}
        </div>
    );
};

export default Page;
