import React from 'react';

const ItemSlot = (props) => {
  return <React.Fragment>
    <div id={`item-slot-${props.slot}`} className={`item-slot`} data-slot={props.slot} data-type={`item`}>
      <div className="content">
        <div className="img" 
          style={{
            backgroundImage: `url("${props.data.img}")`
          }}
        />
      </div>
    </div>
  </React.Fragment>
}

const EmptySlot = (props) => {
  return <React.Fragment>
    <div className="item-slot empty" data-slot={props.slot} data-type={`empty-slot`}>
      <div className="content" />
    </div>
  </React.Fragment>
}

const MainComponent = (props) => {
  return props.data !== null ? <ItemSlot {...props} /> : <EmptySlot {...props} />
}

export default MainComponent;