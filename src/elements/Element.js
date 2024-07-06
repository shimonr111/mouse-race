import React from 'react';

function Element({ elements }) {

  return (
    <div>
      {elements.map((element, index) => { // loop over the elements
        // get their top and left positions
        let top = element.position.top;
        let left = element.position.left;

        // Moving Collect type randomly every 2 seconds
        if (element.type === 'Collect' && element.direction === 'down') {
          top += 15; // adjustment for downward movement
        } else if (element.type === 'Collect' && element.direction === 'up') {
          top -= 15; // adjustment for upward movement
        }

        // Moving Avoid type randomly every 3 seconds
        if (element.type === 'Avoid' && element.direction === 'left') {
            left -= 15; // Example adjustment for leftward movement
        } else if (element.type === 'Avoid' && element.direction === 'right') {
            left += 15; // Example adjustment for rightward movement
        }

        return (
          <div className="element"
            key={index}
            onClick={() => element.onClick()}
            style={{
              position: 'absolute',
              top: `${top}%`, // Update based on calculated top position
              left: `${left}%`, // Update based on calculated left position
              width: `${element.shape === 'rectangle' ? `${element.size * 2}px` : `${element.size}px`}`,
              height: `${element.shape === 'rectangle' ? `${element.size}px` : `${element.size}px`}`,
              backgroundColor: element.color,
              borderRadius: element.shape === 'circle' ? '50%' : '0',
              border: '3px solid black'
            }}
          />
        );
      })}
    </div>
  );
}

export default Element;
