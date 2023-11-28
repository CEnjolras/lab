import { useRef, useEffect, useCallback, useState } from 'react';
import VanillaTilt from 'vanilla-tilt';
import { v4 as uuidv4 } from 'uuid';
import styles from './App.module.scss';

function App() {
  const [tilt, setTilt] = useState();
  const [isTiltActivated, setIsTiltActivated] = useState(false);
  const boxRef = useRef(null);

  const handleTiltChange = useCallback((evt) => {
    console.log(evt.detail);
    setTilt(evt.detail);
  }, []);

  const stopTilt = useCallback(() => {
    if (boxRef.current?.vanillaTilt) boxRef.current.vanillaTilt.destroy();
    setIsTiltActivated(false);
  }, [boxRef]);

  const startTilt = useCallback(() => {
    VanillaTilt.init(boxRef.current, {
      max: 25,
      speed: 400,
    });

    boxRef.current.addEventListener('tiltChange', handleTiltChange);
    setIsTiltActivated(true);
  }, [handleTiltChange]);

  useEffect(() => {
    boxRef.current.addEventListener('mouseover', () => {
      if (!isTiltActivated) {
        startTilt();
      }
    });
  }, [startTilt, isTiltActivated]);

  return (
    <div className={styles.container}>
      <h1>Tilting box</h1>
      <div className={styles.box} ref={boxRef}>
        {isTiltActivated ? (
          <ul>
            {Object.keys(tilt).map((key) => (
              <li key={uuidv4()}>
                {key} : {parseFloat(tilt[key]).toFixed(2)}
              </li>
            ))}
          </ul>
        ) : (
          <>Hover Me !</>
        )}
      </div>

      {isTiltActivated ? (
        <button type="button" onClick={stopTilt}>
          Stop
        </button>
      ) : (
        <button type="button" onClick={startTilt}>
          Start
        </button>
      )}
    </div>
  );
}

export default App;
