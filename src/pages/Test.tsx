import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Cookies, CookiesProvider } from 'react-cookie';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import { setCookie, getCookie } from '../cookie/cookies';
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
    userEmail: 'byungmookim89@gmail.com',
    status: 'IC',
  },
];

const columnsFromBackend = [
  {
    name: '식사',
    status: 'OTL',
    items: [],
  },

  {
    name: '근무',
    status: 'WIP',
    items: [],
  },
  {
    name: '회의',
    status: 'IC',
    items: [],
  },
  {
    name: '휴가',
    status: 'OOO',
    items: [],
  },
  {
    name: '출장',
    status: 'OOT',
    items: [],
  },
  {
    name: '자리비움',
    status: 'BRB',
    items: [],
  },
  {
    name: '업무 종료',
    status: 'COB',
    items: [],
  },
].map((col) => {
  return {
    ...col,
    items: itemsFromBackend.filter((index) => {
      return index.status === col.status;
    }),
  };
});

// 5. 식사중 : OTL (out to lunch ), 노랑
// 1. 근무 : WIP (Work In Progress), 녹색
// 6. 회의 : IC (in conference), 노랑
// 4. 휴가중 : OOO (out of office), 회색
// 2. 자리비움 : BRB      (Be Right Back. ), 노랑
// 3. 업무종료 : COB (close of business), 회색
// 7. 출장중 : OOT (out of town), 빨강

function App() {
  useEffect(() => {
    const token = getCookie('authorization');

    if (!token) return;
    setMyEmail(JSON.parse(window.atob(token.split(' ')[1].split('.')[1])).sub);
  }, []);
  const [columns, setColumns] = useState(columnsFromBackend);
  const [myEmail, setMyEmail] = useState('');

  const onDragEnd = async (result: any) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const param = {
        // userId: result.draggableId,
        status: columns[parseInt(result.destination.droppableId)].status,
      };

      const res = await axios.post(
        `${process.env.REACT_APP_BE_SERVER}/api/status`,
        param,
        {
          headers: {
            Authorization: `${getCookie('authorization')}`,
          },
        }
      );
      if (res.data.statusCode !== 200) {
        console.error(res?.data?.message || 'API호출 실패');
        // 실패했을시 재조회 해서 실패하기 이전상태로 돌아가야함
      }

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

  return (
    <>
      {/* <button
        onClick={() => {
          console.log(
            JSON.parse(
              window.atob(
                getCookie('authorization').split(' ')[1].split('.')[1]
              )
            ).sub
          );
        }}
      >
        test
      </button> */}
      <div
        style={{
          backgroundColor: 'pink',
          margin: '72px 62px 0px 48px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                style={{
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
                            flexWrap: 'wrap',
                            border: '1px solid black',

                            minHeight: '80px',
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                isDragDisabled={item.userEmail !== myEmail}
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
      {/* 채팅기능 */}
      <div style={{ display: 'flex' }}>
        <div style={{ margin: '100px auto' }}>
          <input placeholder="메시지입력.."></input>
          <button>전송</button>
        </div>
      </div>
    </>
  );
}

export default App;
