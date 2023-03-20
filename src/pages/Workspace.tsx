import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Wrapper from '../components/common/Wrapper';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import axios from 'axios';
import userInfoMock from './userInfo.json';

const Workspace = () => {
  interface Userdata {
    userId: number;
    userImage: string;
    userName: string;
    userJob: string;
    userEmail: string;
    status: string;
    isHover: boolean;
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

    const temp = userInfoMock.map((item) => {
      return {
        ...item,
        isHover: false,
      };
    });
    setUserList(temp);
  }, []);
  const [isHover, setIsHover] = useState(false);
  const [workspaceList, setWorkspaceList] = useState([]);
  const [userList, setUserList] = useState<Userdata[] | undefined>();

  const navigate = useNavigate();
  const [searchInputVal, setSearhInputVal] = useState('');
  // const [userList, setUsers] = useState([
  //   {
  //     userId: 1,
  //     userImage:
  //       'https://i.discogs.com/Lv_olIaeY11SsEpuPq860kA8k5c4DyNHJWr4Q9gCXXs/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTIwODIz/NC0xNDU5MTIzODcx/LTUzODUuanBlZw.jpeg',
  //     userName: 'Pino Palladino',
  //     userJob: 'Product Manager',
  //     userEmail: 'email@example.com',
  //     status: 'WIP',
  //   },
  //   {
  //     userId: 2,
  //     userImage:
  //       'https://i.discogs.com/SNIt6JKnkqMg316sgu4eC9DgD58GK0s9uGEXX_h8-Lw/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTM0MDU2/OC0xMjU3MzcwNzE0/LmpwZWc.jpeg',
  //     userName: 'Robert Glasper',
  //     userJob: 'CEO',
  //     userEmail: 'email@example.com',
  //     status: 'WIP',
  //   },
  //   {
  //     userId: 3,
  //     userImage: 'https://ninjatune.net/images/artists/thundercat-main.jpg',
  //     userName: 'ThunderCat',
  //     userJob: 'CTO',
  //     userEmail: 'email@example.com',
  //     status: 'WIP',
  //   },
  //   {
  //     userId: 4,
  //     userImage:
  //       'https://i.discogs.com/m1hqHs3YjQSIT1jOVq7Co2gthabb1NdiB00vl6cX23Y/rs:fit/g:sm/q:90/h:400/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTI1NDQ3/OS0xNjQ1Njc2NDI1/LTMyNDcuanBlZw.jpeg',
  //     userName: 'John Mayer',
  //     userJob: 'CTO',
  //     userEmail: 'email@example.com',
  //     status: 'WIP',
  //   },

  //   {
  //     userId: 6,
  //     userImage:
  //       'https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/bltbeb5ffc091f7e13a/6125581fc203863c736d8629/253-472.png?width=2048&format=webply&dpr=2&disable=upscale&quality=80',
  //     userName: 'Baal',
  //     userJob: 'Lord of Destruction',
  //     userEmail: 'email@example.com',
  //     status: 'WIP',
  //   },
  //   {
  //     userId: 7,
  //     userImage:
  //       'https://i.namu.wiki/i/Ak-lxq7mdjAp6VsFJZY5pMeg8ECQeORfkFvUrSA-AuNuFcHro7uljy3bF22BYUxdMoKpsIHJ7XOC_aGutmnbshvs9qjE9L1fQZ7VrhyDtOJbGZajKZZyqmLWArjhrPkKUJvN7g0jQW9XQzQVgseKUA.webp',
  //     userName: 'Diablo',
  //     userJob: 'Lord of Terror',
  //     userEmail: 'email@example.com',
  //     status: 'WIP',
  //   },
  //   {
  //     userId: 8,
  //     userImage:
  //       'https://w7.pngwing.com/pngs/283/839/png-transparent-bank-of-montreal-mobile-phones-text-messaging-bmo-angle-smiley-grass.png',
  //     userName: 'BMO',
  //     userJob: 'Computer',
  //     userEmail: 'email@example.com',
  //     status: 'WIP',
  //   },
  //   {
  //     userId: 9,
  //     userImage:
  //       'https://www.onthisday.com/images/people/homer-simpson-medium.jpg',
  //     userName: 'Homer Simpson',
  //     userJob: 'Nuclear Technician',
  //     userEmail: 'email@example.com',
  //     status: 'WIP',
  //   },
  // ]);

  const searchInputValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearhInputVal(e.target.value);
  };

  const searchPeopleList = userList?.filter((item) => {
    return item.userName
      .toLowerCase()
      .replaceAll(' ', '')
      .includes(searchInputVal.replaceAll(' ', '').toLowerCase());
  });

  // 근무중 리스트
  const wip = userList?.filter((item) => {
    return item.status === 'WIP';
  });
  // 자리비움 리스트
  const brb = userList?.filter((item) => {
    return item.status === 'BRB';
  });
  // 업무종료 리스트
  const cob = userList?.filter((item) => {
    return item.status === 'COB';
  });
  // 휴가중 리스트
  const ooo = userList?.filter((item) => {
    return item.status === 'OOO';
  });
  // 식사중 리스트
  const otl = userList?.filter((item) => {
    return item.status === 'OTL';
  });
  // 회의중 리스트
  const ic = userList?.filter((item) => {
    return item.status === 'IC';
  });
  // 출장중 리스트
  const oot = userList?.filter((item) => {
    return item.status === 'OOT';
  });

  //  status 상태에 따라 sort하기.
  // const usersByStatus = users.sort((a, b) => {
  //   if (a.status > b.status) return 1;
  //   if (a.status < b.status) return -1;
  //   return 0;
  // });
  // console.log(usersByStatus);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(workspaceList);
    const [reorderData] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderData);
    setWorkspaceList(items);
  };
  // 인박스 드래그이벤트
  // const statusBoxDragEnd = (result: any) => {
  //   if (!result.destination) return;
  //   const items = Array.from(userList);
  //   const [reorderData] = items.splice(result.source.index, 1);
  //   items.splice(result.destination.index, 0, reorderData);
  //   setUserList(items);
  // };
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
                  <StDiv>
                    <div
                      className="asdf"
                      style={{
                        display: 'none',
                        position: 'absolute',
                        top: '20px',
                        left: '100px',
                        background: 'white',
                        width: '300px',
                        height: '300px',
                        border: '1px solid black',
                      }}
                    >
                      {item.workspaceDesc}
                    </div>
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
                          {/* <div
                          style={{
                            position: 'absolute',
                            right: '-220px',
                            width: '200px',
                            height: '120px',
                            backgroundColor: 'white',
                          }}
                        >
                          흠냐리
                        </div> */}

                          <StWorkspaceImg
                            src={item.workspaceImage}
                          ></StWorkspaceImg>
                        </StWorkspaceImgWrap>
                      )}
                    </Draggable>
                  </StDiv>
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
                onClick={() => {}}
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
                이메일 중복 조회
              </button>
              <StDiv>
                <div
                  className="asdf"
                  style={{
                    display: 'none',
                    width: '100px',
                    height: '100px',
                    background: 'red',
                    position: 'absolute',
                  }}
                >
                  gd
                </div>
                <div>test</div>
              </StDiv>
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
              <StStatusBox
                // 다시보고 이해해야됨..
                isHover={userList
                  ?.filter((item) => {
                    return item.status === 'WIP';
                  })
                  .some((item) => {
                    return item.isHover;
                  })}
                size="small"
              >
                <div
                  style={{
                    width: '100%',
                    height: '52px',

                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <h3 style={{ margin: '0px 24px' }}>근무중</h3>
                </div>
                {wip?.length !== 0 ? (
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
                    {wip?.map((item, index) => {
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
                ) : (
                  <div
                    style={{
                      height: '68%',
                      padding: '12px 24px',
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'center',

                      gap: '8px',
                    }}
                  >
                    <div
                      style={{
                        marginTop: '44px',
                        fontSize: '.9rem',
                        color: '#7F7F7F',
                      }}
                    >
                      Empty Space
                    </div>
                  </div>
                )}
              </StStatusBox>

              <StStatusBox
                isHover={userList
                  ?.filter((item) => {
                    return item.status === 'IC';
                  })
                  .some((item) => {
                    return item.isHover;
                  })}
                size="small"
              >
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
                {ic?.length !== 0 ? (
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
                    {ic?.map((item) => {
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
                ) : (
                  <div
                    style={{
                      padding: '12px 24px',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        marginTop: '44px',
                        fontSize: '.9rem',
                        color: '#7F7F7F',
                      }}
                    >
                      Empty Space
                    </div>
                  </div>
                )}
              </StStatusBox>
              <StStatusBox
                isHover={userList
                  ?.filter((item) => {
                    return item.status === 'OTL';
                  })
                  .some((item) => {
                    return item.isHover;
                  })}
                size="small"
              >
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
                {otl?.length !== 0 ? (
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
                    {otl?.map((item) => {
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
                ) : (
                  <div
                    style={{
                      padding: '12px 24px',
                      display: 'flex',

                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        marginTop: '44px',
                        fontSize: '.9rem',
                        color: '#7F7F7F',
                      }}
                    >
                      Empty Space
                    </div>
                  </div>
                )}
              </StStatusBox>
              <StStatusBox
                isHover={userList
                  ?.filter((item) => {
                    return item.status === 'BRB';
                  })
                  .some((item) => {
                    return item.isHover;
                  })}
                size="small"
              >
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

                {brb?.length !== 0 ? (
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
                    {brb?.map((item) => {
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
                ) : (
                  <div
                    style={{
                      padding: '12px 24px',
                      display: 'flex',

                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        marginTop: '44px',
                        fontSize: '.9rem',
                        color: '#7F7F7F',
                      }}
                    >
                      Empty Space
                    </div>
                  </div>
                )}
              </StStatusBox>
              <StStatusBox
                isHover={userList
                  ?.filter((item) => {
                    return item.status === 'OOT';
                  })
                  .some((item) => {
                    return item.isHover;
                  })}
                size="small"
              >
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
                {oot?.length !== 0 ? (
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
                    {oot?.map((item) => {
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
                ) : (
                  <div
                    style={{
                      padding: '12px 24px',
                      display: 'flex',

                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        marginTop: '44px',
                        fontSize: '.9rem',
                        color: '#7F7F7F',
                      }}
                    >
                      Empty Space
                    </div>
                  </div>
                )}
              </StStatusBox>
              <StStatusBox
                isHover={userList
                  ?.filter((item) => {
                    return item.status === 'OOO';
                  })
                  .some((item) => {
                    return item.isHover;
                  })}
                size="small"
              >
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
                {ooo?.length !== 0 ? (
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
                    {ooo?.map((item) => {
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
                ) : (
                  <div
                    style={{
                      padding: '12px 24px',
                      display: 'flex',

                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        marginTop: '44px',
                        fontSize: '.9rem',
                        color: '#7F7F7F',
                      }}
                    >
                      Empty Space
                    </div>
                  </div>
                )}
              </StStatusBox>
            </div>
            <div>
              <StStatusBox
                isHover={userList
                  ?.filter((item) => {
                    return item.status === 'COB';
                  })
                  .some((item) => {
                    return item.isHover;
                  })}
                size="large"
              >
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
                {cob?.length !== 0 ? (
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
                    {cob?.map((item) => {
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
                ) : (
                  <div
                    style={{
                      padding: '12px 24px',
                      display: 'flex',

                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        marginTop: '148px',
                        fontSize: '.9rem',
                        color: '#7F7F7F',
                      }}
                    >
                      Empty Space
                    </div>
                  </div>
                )}
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
          {searchPeopleList?.map((item, index) => {
            return (
              <StUserWrap
                onMouseEnter={() => {
                  const temp = userList?.map((user) => {
                    if (user.userId === item.userId) {
                      return {
                        ...user,
                        isHover: true,
                      };
                    }
                    return user;
                  });
                  setUserList(temp);
                }}
                onMouseLeave={() => {
                  const temp = userList?.map((user) => {
                    // if (user.userId === item.userId) {
                    return {
                      ...user,
                      isHover: false,
                    };
                    // }
                    // return user;
                  });
                  setUserList(temp);
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
              </StUserWrap>
            );
          })}
        </div>

        <div
          style={{
            width: '340px',
            height: '64px',
            position: 'fixed',
            bottom: '0',
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
const StDiv = styled.div`
  position: relative;
  /* .asdf {
    display: block;
    &:hover {
      display: block;
    }
  } */

  .asdf:hover {
    background-color: red;
    display: block;
  }
`;
const StUserWrap = styled.div`
  padding: 18px 14px;
  background-color: white;
  border-bottom: 1px solid #f1f1f1;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #f2f2f2;
  }
  /* style={{
                  padding: '18px 14px',
                  backgroundColor: 'white',
                  borderBottom: '1px solid #F1F1F1',
                  display: 'flex',
                  alignItems: 'center', */
`;

const StStatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-left: auto;
  background: ${(props: { status: string }) => {
    if (props.status === 'WIP') {
      return '#2e9a49';
    } else if (props.status === 'OOT') {
      return '#E31E3F';
    } else if (
      props.status === 'BRB' ||
      props.status === 'OTL' ||
      props.status === 'IC'
    ) {
      return '#FFCC00';
    } else if (props.status === 'COB' || props.status === 'OOO') {
      return '#BEBEBE';
    }
  }};
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
const StStatusBox = styled.div<{
  size: 'small' | 'large';
  isHover?: boolean | undefined;
}>`
  width: ${(props) => {
    if (props.size === 'small') return '206px';
    if (props.size === 'large') return '296px';
  }};

  height: ${(props) => {
    if (props.size === 'small') return '233px';
    if (props.size === 'large') return '480px';
  }};
  overflow: hidden;
  box-shadow: ${(props) => (props.isHover ? '0px 0px 10px red' : '')};
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
  position: relative;
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
