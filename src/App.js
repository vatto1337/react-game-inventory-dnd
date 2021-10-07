import React, { useState, useEffect } from 'react';
import './Reset.css';
import './App.css';

// Components
import ItemSlot from './Components/Slot';
import DragDestination from './Components/DragDestination';
import DragAndDropAPI from './Components/DragAndDropAPI';

const App = (props) => {
  const [items, setItems] = useState([
    {
      "slot": 5,
      "title": "Sword",
      "img": "sword.png"
    },
    {
      "slot": 3,
      "title": "Gun",
      "img": "gun.png"
    }
  ]); //Let's assume this is the player's items.
  const itemsRef = React.useRef(props.items);

  const [draggingSlotId, setDraggingSlot] = useState(null);
  const getNumberOfSlots = () => new Array(25).fill().map((_, index) => index);
  const getItemDataInSlot = (slot) => items.find((item) => item.slot === slot);

  const getInventorySlotIndex = (slotIndex) => {
    let slot = itemsRef.current.filter((item) => item.slot === slotIndex)[0];
    return slot ? itemsRef.current.indexOf(slot) : null;
  }

  useEffect(() => {
    itemsRef.current = items;
  }, [items])

  const swapItemSlots = (oldSlot, newSlot) => {
    setItems((currentState) => {
      let newInventory = [...currentState];
      let oldIndex = null, newIndex = null;
      
      // Finding the old ones..

      newInventory.forEach((item, index) => {
        if(item.slot === oldSlot) {
          oldIndex = index;
        } else if (item.slot === newSlot) {
          newIndex = index;
        }
      })

      // Replacing them

      newInventory[oldIndex] = { ...newInventory[oldIndex], slot: newSlot }
      newInventory[newIndex] = { ...newInventory[newIndex], slot: oldSlot }

      return [...newInventory]
    })
  }


  const moveItemToSlot = (oldSlot, newSlot) => {
    console.log(`move slot`, oldSlot, newSlot);

    setItems((currentState) => {
      let inventory = [...currentState];

      inventory.forEach((item, index) => {
        if (item.slot === oldSlot) {
          inventory[index].slot = newSlot;
        }
      });

      return currentState
    })
  }

  const onInventoryItemDragged = ({ detail: eventData }) => {
    // console.log(`Dragging has finished`, eventData);

    const oldSlot = parseInt(eventData.slot), newSlot = parseInt(eventData.destination.slot);

    if (eventData.destination.type === "empty-slot") {
      moveItemToSlot(oldSlot, newSlot);
    } else if (eventData.destination.type === "item") {
      swapItemSlots(oldSlot, newSlot);
    } else if (eventData.destination.type === "example-1") {
      setTimeout(() => {
        const itemIndex = getInventorySlotIndex(oldSlot);
        alert(`You dropped this item in the square box:\n${JSON.stringify(itemsRef.current[itemIndex], null, 4)} `)
      }, 200)
    }
  }

  useEffect(() => {
    document.addEventListener("inventoryItemDragged", onInventoryItemDragged);
    return () => {
      document.removeEventListener("inventoryItemDragged", onInventoryItemDragged);
    }
    // eslint-disable-next-line
  }, []);

  return <React.Fragment>
    <div className="app-container">
      <DragDestination dragId={draggingSlotId} />
      <DragAndDropAPI
        activeDraggedSlot={draggingSlotId}
        setActiveDraggedSlot={setDraggingSlot}
      />
      <div className="inventory">
        {
          getNumberOfSlots().map((slot) =>
            <ItemSlot
              slot={slot}
              data={getItemDataInSlot(slot) || null}
              key={slot}
            />)
        }
      </div>
    </div>
    <pre>
      {JSON.stringify(items)}
    </pre>
  </React.Fragment>
}

export default App;