import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Wrapper from '../components/common/Wrapper';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import axios from 'axios';

const Workspace = () => {
  interface Userdata {
    userId: number;
    userImage: string;
    userName: string;
    userJob: string;
    userEmail: string;
    status: string;
  }
  interface Workspace {
    workspaceDesc: string;
    workspaceId: number;
    workspaceImage: string;
    workspaceTitle: string;
  }
  useEffect(() => {
    axios.get('http://localhost:4000/workspaceList').then(({ data }) => {
      setWorkspaceList(data);
    });
    axios.get('http://localhost:4000/users').then(({ data }) => {
      setUserList(data);
    });
  }, []);
  const [workspaceList, setWorkspaceList] = useState([]);
  const [userList, setUserList] = useState<Userdata | null>(null);

  const navigate = useNavigate();
  const [searchInputVal, setSearhInputVal] = useState('');
  const [users] = useState([
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
  ]);

  const searchInputValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearhInputVal(e.target.value);
  };

  console.log(Array.isArray(userList));
  console.log(workspaceList);

  // userList?.filter;
  // userList.map((item) => {
  //   console.log(item);
  // });
  // userList?.filter((item) => {

  // })

  const searchPeopleList = users.filter((item) => {
    return item.userName
      .toLowerCase()
      .replaceAll(' ', '')
      .includes(searchInputVal.replaceAll(' ', '').toLowerCase());
  });

  // 근무중 리스트
  const wip = users.filter((item) => {
    return item.status === 'WIP';
  });
  // 자리비움 리스트
  const brb = users.filter((item) => {
    return item.status === 'BRB';
  });
  // 업무종료 리스트
  const cob = users.filter((item) => {
    return item.status === 'COB';
  });
  // 휴가중 리스트
  const ooo = users.filter((item) => {
    return item.status === 'OOO';
  });
  // 식사중 리스트
  const otl = users.filter((item) => {
    return item.status === 'OTL';
  });
  // 회의중 리스트
  const ic = users.filter((item) => {
    return item.status === 'IC';
  });
  // 출장중 리스트
  const oot = users.filter((item) => {
    return item.status === 'OOT';
  });

  //  status 상태에 따라 sort하기.
  // const usersByStatus = users.sort((a, b) => {
  //   if (a.status > b.status) return 1;
  //   if (a.status < b.status) return -1;
  //   return 0;
  // });
  // console.log(usersByStatus);
  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;
    const items = Array.from(workspaceList);
    const [reorderData] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderData);
    setWorkspaceList(items);
  };
  return (
    <Wrapper>
      <StNav>
        <div
          onClick={() => {
            navigate('/');
          }}
          style={{ marginLeft: '24px', cursor: 'pointer' }}
        >
          로고
        </div>
        <div style={{ display: 'flex', gap: '20px', marginRight: '24px' }}>
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              navigate('/my-page');
            }}
          >
            마이페이지
          </div>
          <div>로그아웃</div>
        </div>
      </StNav>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="workspaceList">
          {(provided) => (
            <StWorkspaceListContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {workspaceList?.map((item: Workspace, index) => {
                return (
                  <Draggable
                    key={item.workspaceId}
                    draggableId={`${item.workspaceId}`}
                    index={index}
                  >
                    {(provided) => (
                      <StWorkspaceImgWrap
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        <StWorkspaceImg
                          src={item.workspaceImage}
                        ></StWorkspaceImg>
                      </StWorkspaceImgWrap>
                    )}
                  </Draggable>
                );
              })}
            </StWorkspaceListContainer>
          )}
        </Droppable>
      </DragDropContext>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* <div style={{ display: 'flex', flexDirection: 'row' }}> */}
        <StAppMainWrap>
          <div
            style={{
              background: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              padding: '12px 24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div>
                <StWorkspaceImg src="https://www.volkswagen.co.kr/idhub/etc/clientlibs/vwa-ngw18/ngw18-frontend/clientlibs/statics/img/vw-logo-2x.png"></StWorkspaceImg>
              </div>
              <div style={{ marginLeft: '16px' }}>
                <div style={{ margin: '8px 0' }}>
                  <h3>워크스페이스 이름</h3>
                </div>
                <div
                  style={{
                    fontSize: '.8rem',
                    margin: '8px 0',
                    color: 'gray',
                  }}
                >
                  이곳은 설명이 들어갑니다.
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={() => {
                  alert('멤버추가 버튼');
                }}
                style={{
                  height: '36px',
                  width: '104px',
                  border: 'none',
                  color: 'white',
                  background: '#047EFB',
                  borderRadius: '8px',
                  fontWeight: '700',
                  fontSize: '.9rem',
                  letterSpacing: '.4px',
                  cursor: 'pointer',
                }}
              >
                멤버 추가{' '}
              </button>
            </div>
          </div>
          <StStatusContainer>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'flex-end',

                gap: '12px',
              }}
            >
              <StStatusBox size="small">
                <div
                  style={{
                    width: '100%',
                    height: '52px',

                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <h3 style={{ margin: '0px 24px' }}>근무</h3>
                </div>
                <div
                  style={{
                    height: '68%',
                    padding: '12px 24px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                    alignContent: 'flex-start',
                    gap: '4px',
                  }}
                >
                  {wip.map((item) => {
                    return (
                      <div
                        key={item.userId}
                        style={{
                          width: '36px',
                          height: '36px',
                          // background: 'blue',
                          borderRadius: '50%',
                          overflow: 'hidden',
                        }}
                      >
                        <img
                          src={item.userImage}
                          width="100%"
                          height="100%"
                        ></img>
                      </div>
                    );
                  })}
                </div>
              </StStatusBox>
              <StStatusBox size="small">
                <div
                  style={{
                    width: '100%',
                    height: '52px',

                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <h3 style={{ margin: '0px 24px' }}>회의</h3>
                </div>
                <div
                  style={{
                    height: '68%',
                    padding: '12px 24px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                    alignContent: 'flex-start',
                    gap: '8px',
                  }}
                >
                  {ic.map((item) => {
                    return (
                      <div
                        key={item.userId}
                        style={{
                          width: '36px',
                          height: '36px',
                          background: 'blue',
                          borderRadius: '50%',
                          overflow: 'hidden',
                        }}
                      >
                        <img
                          src={item.userImage}
                          width="100%"
                          height="100%"
                          // height="auto"
                        ></img>
                      </div>
                    );
                  })}
                </div>
              </StStatusBox>
              <StStatusBox size="small">
                <div
                  style={{
                    width: '100%',
                    height: '52px',

                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <h3 style={{ margin: '0px 24px' }}>식사</h3>
                </div>
                <div
                  style={{
                    height: '68%',
                    padding: '12px 24px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                    alignContent: 'flex-start',
                    gap: '8px',
                  }}
                >
                  {otl.map((item) => {
                    return (
                      <div
                        key={item.userId}
                        style={{
                          width: '36px',
                          height: '36px',
                          background: 'blue',
                          borderRadius: '50%',
                          overflow: 'hidden',
                        }}
                      >
                        <img
                          src={item.userImage}
                          width="100%"
                          height="100%"
                          // height="auto"
                        ></img>
                      </div>
                    );
                  })}
                </div>
              </StStatusBox>
              <StStatusBox size="small">
                <div
                  style={{
                    width: '100%',
                    height: '52px',

                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <h3 style={{ margin: '0px 24px' }}>자리비움</h3>
                </div>
                <div
                  style={{
                    height: '68%',
                    padding: '12px 24px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                    alignContent: 'flex-start',
                    gap: '8px',
                  }}
                >
                  {brb.map((item) => {
                    return (
                      <div
                        key={item.userId}
                        style={{
                          width: '36px',
                          height: '36px',
                          background: 'blue',
                          borderRadius: '50%',
                          overflow: 'hidden',
                        }}
                      >
                        <img
                          src={item.userImage}
                          width="100%"
                          height="100%"
                        ></img>
                      </div>
                    );
                  })}
                </div>
              </StStatusBox>
              <StStatusBox size="small">
                <div
                  style={{
                    width: '100%',
                    height: '52px',

                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <h3 style={{ margin: '0px 24px' }}>출장</h3>
                </div>
                <div
                  style={{
                    height: '68%',
                    padding: '12px 24px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                    alignContent: 'flex-start',
                    gap: '8px',
                  }}
                >
                  {oot.map((item) => {
                    return (
                      <div
                        key={item.userId}
                        style={{
                          width: '36px',
                          height: '36px',
                          background: 'blue',
                          borderRadius: '50%',
                          overflow: 'hidden',
                        }}
                      >
                        <img
                          src={item.userImage}
                          width="100%"
                          height="100%"
                          // height="auto"
                        ></img>
                      </div>
                    );
                  })}
                </div>
              </StStatusBox>
              <StStatusBox size="small">
                <div
                  style={{
                    width: '100%',
                    height: '52px',

                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <h3 style={{ margin: '0px 24px' }}>휴가중</h3>
                </div>
                <div
                  style={{
                    height: '68%',
                    padding: '12px 24px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                    alignContent: 'flex-start',
                    gap: '8px',
                  }}
                >
                  {ooo.map((item) => {
                    return (
                      <div
                        key={item.userId}
                        style={{
                          width: '36px',
                          height: '36px',
                          background: 'blue',
                          borderRadius: '50%',
                          overflow: 'hidden',
                        }}
                      >
                        <img
                          src={item.userImage}
                          width="100%"
                          height="100%"
                          // height="auto"
                        ></img>
                      </div>
                    );
                  })}
                </div>
              </StStatusBox>
            </div>
            <div>
              <StStatusBox size="large">
                <div
                  style={{
                    // margin: '24px',
                    width: '100%',
                    height: '52px',

                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <h3 style={{ margin: '0px 24px' }}>업무 종료</h3>
                </div>
                <div
                  style={{
                    height: '85%',
                    padding: '12px 24px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                    alignContent: 'flex-start',
                    gap: '6px',
                  }}
                >
                  {cob.map((item) => {
                    return (
                      <div
                        key={item.userId}
                        style={{
                          width: '36px',
                          height: '36px',
                          background: 'blue',
                          borderRadius: '50%',
                          overflow: 'hidden',
                        }}
                      >
                        <img
                          src={item.userImage}
                          width="100%"
                          height="100%"
                          // height="auto"
                        ></img>
                      </div>
                    );
                  })}{' '}
                </div>
              </StStatusBox>
            </div>
          </StStatusContainer>
        </StAppMainWrap>
        <StGraphBox>
          <div>
            <h3>업무 기여도</h3>
          </div>
        </StGraphBox>
      </div>
      {/* 우측 박스 */}
      <StMessageBox>
        <div
          style={{
            background: 'white',
            padding: ' 24px',
            // position: 'sticky',
            position: 'fixed',
            top: '62px',
            // right: '0px',
            width: '292px',
            boxShadow: '0px 0px 5px lightgray',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex' }}>
              <div
                style={{
                  background: 'white',
                  height: '40px',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  fontSize: '1.1rem',
                  fontWeight: '800',
                  borderBottom: '2px solid',
                  color: '#007AFF',
                  padding: '0px 8px',
                }}
              >
                People
              </div>
              <div
                style={{
                  height: '40px',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  fontSize: '1.1rem',
                  fontWeight: '800',
                  padding: '0px 8px',
                }}
              >
                Inbox(2)
              </div>
            </div>
            <div
              style={{
                width: '100%',
                height: '48px',

                marginTop: '24px',
                borderRadius: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 5px 0 lightgray',
              }}
            >
              <input
                onChange={searchInputValueHandler}
                value={searchInputVal}
                placeholder="Search People"
                style={{
                  width: '70%',
                  fontSize: '1rem',
                  border: 'none',
                  outline: 'none',
                }}
              ></input>
              <div>🔍</div>
            </div>
          </div>
        </div>
        {/* 메세지 리스트 */}

        <div
          style={{
            marginTop: '163px',
            // background: 'red',
            height: '507px',
            overflow: 'auto',
          }}
        >
          {searchPeopleList.map((item) => {
            return (
              <div
                key={item.userId}
                style={{
                  padding: '18px 14px',
                  backgroundColor: 'white',
                  borderBottom: '1px solid #F1F1F1',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <img
                  src={item.userImage}
                  width="100%"
                  height="100%"
                  style={{
                    width: '48px',
                    height: '48px',
                    background: 'lightgray',
                    borderRadius: '50%',
                  }}
                ></img>
                <div style={{ marginLeft: '8px' }}>
                  <div
                    style={{
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.userName}
                    <span
                      style={{
                        fontSize: '.8rem',
                        marginLeft: '8px',
                        color: '#7F7F7F',
                      }}
                    >
                      {item.userJob}
                    </span>
                  </div>

                  <div
                    style={{
                      fontSize: '.8rem',
                      color: '#7F7F7F',
                      margin: '8px 0px 0px 4px',
                    }}
                  >
                    {item.userEmail}
                  </div>
                </div>

                <StStatusDot status={item.status}></StStatusDot>
              </div>
            );
          })}
        </div>

        <div
          style={{
            width: '340px',
            height: '64px',
            position: 'fixed',
            bottom: '0',

            // border: '1px solid',
            boxShadow: '0px 0px 5px lightgray',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'white',
          }}
        >
          <div>
            <h3>관리자 페이지로 이동</h3>
          </div>
        </div>
      </StMessageBox>
    </Wrapper>
  );
};
// 인간사진
// 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg'
// 워크스페이스 사진
// 'https://www.volkswagen.co.kr/idhub/etc/clientlibs/vwa-ngw18/ngw18-frontend/clientlibs/statics/img/vw-logo-2x.png';
export default Workspace;
const StStatusDot = styled.div<{
  status: string;
}>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(props) => {
    if (props.status === 'WIP') {
      return '#2e9a49';
    }
    if (props.status === 'OOT') {
      return '#E31E3F';
    }
    if (props.status === 'BRB' || 'OTL' || 'IC') {
      return '#FFCC00';
    }

    if (props.status === 'COB' || 'OOO') {
      return '#BEBEBE';
    }
    // else return '#BEBEBE';
  }};

  /* #2e9a49 WIP */
  /* #FFCC00 BRB , OTL , IC*/
  /* #E31E3F  OOT */
  /*  #BEBEBE  COB ,OOO*/
  /* 1. 근무 : WIP (Work In Progress), 녹색
2. 자리비움 : BRB      (Be Right Back. ), 노랑
3. 업무종료 : COB (close of business), 회색
4. 휴가중 : OOO (out of office), 빨강
5. 식사중 : OTL (out to lunch ), 노랑
6. 회의 : IC (in conference), 노랑
7. 출장중 : OOT (out of town), 빨강 */

  margin-left: auto;
`;
const StGraphBox = styled.div`
  position: fixed;
  bottom: 0;
  height: 74px;
  background: white;
  left: 100px;
  right: 340px;
  padding: 24px 36px;

  box-shadow: 0px -5px 5px -5px lightgray;

  @media (max-width: 1040px) {
    display: none;
  }
`;
const StAppMainWrap = styled.div`
  /* height: 100%; */
  height: 540px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background: #f6f6f6;
  /* position: fixed; */
  position: absolute;
  /* overflow: hidden; */
  /* position: relative; */
  left: 100px;
  top: 62px;
  right: 340px;

  padding: 48px 24px 24px;
  min-width: 514px;
  /* min-width: 800px; */

  @media (max-width: 920px) {
    right: 0px;
  }
  @media (max-width: 1040px) {
    left: 0px;
    height: 100%;
  }
`;

const StMessageBox = styled.div`
  width: 340px;
  /* height: 100%; */
  /* overflow: scroll; */
  position: fixed;

  /* padding-bottom: 290px; */

  right: 0px;
  top: 62px;

  border-left: 1px solid #e5e5e5;
  @media (max-width: 920px) {
    display: none;
  }
`;
//  width: '296px',
//                   height: '480px',
//                   background: 'white',
const StStatusBox = styled.div<{ size: 'small' | 'large' }>`
  width: ${(props) => {
    if (props.size === 'small') return '206px';
    if (props.size === 'large') return '296px';
  }};

  height: ${(props) => {
    if (props.size === 'small') return '233px';
    if (props.size === 'large') return '480px';
  }};
  overflow: hidden;

  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 8px;
  &:hover {
    box-shadow: 0px 0px 5px lightblue;
  }
`;
const StStatusContainer = styled.div`
  background-color: inherit;

  margin-top: 60px;
  display: flex;
`;

const StWorkspaceImgWrap = styled.div`
  width: 3.4rem;
  height: 3.4rem;
  border-radius: 50%;
  border: 1px solid;
  margin-top: 16px;
`;
const StWorkspaceListContainer = styled.div`
  height: 100%;
  width: 100px;

  border-right: 1px solid #e5e5e5;
  position: fixed;
  left: 0;
  padding-top: 5rem;
  display: flex;

  flex-direction: column;

  align-items: center;
  z-index: 1;
  @media (max-width: 1040px) {
    display: none;
  }
`;
const StNav = styled.div`
  width: 100%;
  height: 62px;
  background-color: white;
  box-shadow: 0px 0px 5px lightgray;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 2;
  position: fixed;
`;

const StWorkspaceImg = styled.img`
  width: 3.4rem;
  height: 3.4rem;
  border-radius: 50%;
  background-color: white;
`;
