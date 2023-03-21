import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
// import uuid from 'uuid/v4';

const itemsFromBackend = [
  {
    userId: 1,
    userImage:
      'https://i.discogs.com/Lv_olIaeY11SsEpuPq860kA8k5c4DyNHJWr4Q9gCXXs/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTIwODIz/NC0xNDU5MTIzODcx/LTUzODUuanBlZw.jpeg',
    userName: 'Pino Palladino',
    userJob: 'Product Manager',
    userEmail: 'email@example.com',
    status: 'COB',
  },
  {
    userId: 2,
    userImage:
      'https://i.discogs.com/SNIt6JKnkqMg316sgu4eC9DgD58GK0s9uGEXX_h8-Lw/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTM0MDU2/OC0xMjU3MzcwNzE0/LmpwZWc.jpeg',
    userName: 'Robert Glasper',
    userJob: 'CEO',
    userEmail: 'email@example.com',
    status: 'WIP',
  },
  {
    userId: 3,
    userImage: 'https://ninjatune.net/images/artists/thundercat-main.jpg',
    userName: 'ThunderCat',
    userJob: 'CTO',
    userEmail: 'email@example.com',
    status: 'WIP',
  },
  {
    userId: 4,
    userImage:
      'https://i.discogs.com/m1hqHs3YjQSIT1jOVq7Co2gthabb1NdiB00vl6cX23Y/rs:fit/g:sm/q:90/h:400/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTI1NDQ3/OS0xNjQ1Njc2NDI1/LTMyNDcuanBlZw.jpeg',
    userName: 'John Mayer',
    userJob: 'CTO',
    userEmail: 'email@example.com',
    status: 'COB',
  },
  {
    userId: 6,
    userImage:
      'https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/bltbeb5ffc091f7e13a/6125581fc203863c736d8629/253-472.png?width=2048&format=webply&dpr=2&disable=upscale&quality=80',
    userName: 'Baal',
    userJob: 'Lord of Destruction',
    userEmail: 'email@example.com',
    status: 'OTL',
  },
  {
    userId: 7,
    userImage:
      'https://i.namu.wiki/i/Ak-lxq7mdjAp6VsFJZY5pMeg8ECQeORfkFvUrSA-AuNuFcHro7uljy3bF22BYUxdMoKpsIHJ7XOC_aGutmnbshvs9qjE9L1fQZ7VrhyDtOJbGZajKZZyqmLWArjhrPkKUJvN7g0jQW9XQzQVgseKUA.webp',
    userName: 'Diablo',
    userJob: 'Lord of Terror',
    userEmail: 'email@example.com',
    status: 'OOO',
  },
  {
    userId: 8,
    userImage:
      'https://w7.pngwing.com/pngs/283/839/png-transparent-bank-of-montreal-mobile-phones-text-messaging-bmo-angle-smiley-grass.png',
    userName: 'BMO',
    userJob: 'Computer',
    userEmail: 'email@example.com',
    status: 'OOT',
  },
  {
    userId: 9,
    userImage:
      'https://www.onthisday.com/images/people/homer-simpson-medium.jpg',
    userName: 'Homer Simpson',
    userJob: 'Nuclear Technician',
    userEmail: 'email@example.com',
    status: 'IC',
  },
];

const columnsFromBackend = [
  {
    name: '식사',
    items: [],
  },

  {
    name: '근무',
    items: [],
  },
  {
    name: '회의',
    items: [],
  },
  {
    name: '휴가',
    items: [],
  },
  {
    name: '출장',
    items: [],
  },
  {
    name: '자리비움',
    items: [],
  },
  {
    name: '업무 종료',
    items: itemsFromBackend,
  },
];

const onDragEnd = (result: any, columns: any, setColumns: any) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function App() {
  const [columns, setColumns] = useState(columnsFromBackend);
  console.log(columns);
  return (
    <>
      <div
        style={{
          // width: '40vw',
          backgroundColor: 'pink',
          margin: '72px 62px 0px 48px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                style={{
                  background: 'red',
                  // width: '25%',
                  gap: '8px',
                }}
                key={columnId}
              >
                <h2>{column.name}</h2>
                <div style={{ margin: '8px', width: '100%' }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            // display: 'flex',
                            flexWrap: 'wrap',
                            border: '1px solid black',
                            // background: snapshot.isDraggingOver
                            //   ? 'lightblue'
                            //   : 'white',
                            // padding: 4,
                            minHeight: '80px',
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.userId}
                                draggableId={`${item.userId}`}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        width: '36px',
                                        height: '36px',
                                        background: 'blue',
                                        borderRadius: '50%',
                                        overflow: 'hidden',
                                        // minHeight: '50px',
                                        backgroundColor: snapshot.isDragging
                                          ? '#263B4A'
                                          : '#456C86',
                                        color: 'white',
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      <img
                                        src={item.userImage}
                                        width="100%"
                                        // height="100%"
                                      ></img>
                                    </div>
                                    // <div
                                    //   ref={provided.innerRef}
                                    //   {...provided.draggableProps}
                                    //   {...provided.dragHandleProps}
                                    //   // key={item.userId}
                                    //   style={{
                                    //     width: '36px',
                                    //     height: '36px',
                                    //     background: 'blue',
                                    //     borderRadius: '50%',
                                    //     overflow: 'hidden',
                                    //   }}
                                    // >
                                    //   <img
                                    //     src={item.userImage}
                                    //     width="100%"
                                    //     height="100%"
                                    //   ></img>
                                    // </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </>
  );
}

export default App;
