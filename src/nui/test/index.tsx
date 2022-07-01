import { useState } from 'react';
import { useNuiEvent, useNuiEventProps } from '../nui';
import './style.scss';

const Test = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [eventData, setEventData] = useState<any>();

  useNuiEvent<useNuiEventProps>('nui-test', data => {
    setEventData(data.data);
    setIsVisible(data.nui_toggle);
  });

  return (
    <div>
      {isVisible === true && (
        <div className="test">
          <h1>
            Test
            <br />
            {JSON.stringify(eventData)}
          </h1>
        </div>
      )}
    </div>
  );
};

export default Test;
