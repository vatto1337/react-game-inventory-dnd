import React from 'react';

const ExportingComponent = (props) => {
  return <React.Fragment>
    <div data-type="example-1" className="destination-area-example">
      {
        props.dragId === null ? `Drag an item to get started` : `Drag it here now`
      }
    </div>
  </React.Fragment>
}

export default ExportingComponent;