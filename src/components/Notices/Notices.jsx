import AddNoticeButton from '../AddNoticeButton';
import NoticesCategoriesNav from '../NoticesCategoriesNav';
import NoticesSearch from '../NoticesSearch';
import Container from '../Container';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  NoticeSection,
  NoticesToolBar,
  NoticesWrapper,
} from './Notices.styled';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ROUTES } from 'router';
import PageTitle from 'components/UIKit/PageTitle';
import useAuth from 'hooks/useAuth/useAuth';
import Notify from 'components/Notify';
import { useNotifyPosition } from 'hooks/useNotifyPosition';
import { useViewportResize } from 'hooks/useViewportResize';
// import { useDispatch } from 'react-redux';
// import { logOut } from 'redux/auth/operations';

const Notices = () => {
  //TEMP CODE FOR FUN!!!!
  // const dispatch = useDispatch();
  //TEMP CODE FOR FUN!!!!

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { isLoggedIn } = useAuth();

  const noticesNavLinks = [
    { title: 'sell', to: ROUTES.NOTICES_SELL },
    { title: 'lost-found', to: ROUTES.NOTICES_LOST_FOUND },
    { title: 'in good hands', to: ROUTES.NOTICES_FOR_FREE },
  ];

  if (isLoggedIn) {
    noticesNavLinks.push(
      { title: 'favorite ads', to: ROUTES.NOTICES_FAVORITE },
      { title: 'my ads', to: ROUTES.NOTICES_OWN }
    );
  }

  useEffect(() => {
    if (pathname === ROUTES.NOTICES) {
      navigate(ROUTES.NOTICES_SELL, { replace: true });
    }
  }, [pathname, navigate]);

  //TEST FOR NOTIFICATIONS
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  // const btnRef = useRef();
  // const [position, setPosition] = useState();

  // useEffect(() => {
  //   const { bottom, left, width } = btnRef.current.getBoundingClientRect();

  //   const x = left + width;
  //   const y = bottom;

  //   setPosition({ x, y });
  // }, []);

  const { buttonRef, position } = useNotifyPosition();
  // useViewportResize();
  //TEST FOR NOTIFICATIONS

  return (
    <NoticesWrapper>
      <NoticeSection>
        <Container>
          <button
            ref={buttonRef}
            type="button"
            style={{ fontSize: '40px', cursor: 'pointer' }}
            // onClick={() => {
            //   dispatch(logOut());
            // }}
            onClick={() => {
              setIsNotifyOpen(true);
            }}
          >
            Log Out
          </button>
          {isNotifyOpen && (
            <Notify
              position={position}
              onClose={() => {
                setIsNotifyOpen(false);
              }}
            >
              NOTIFY!
            </Notify>
          )}

          <PageTitle>Find your favorite pet</PageTitle>

          <NoticesSearch />

          <NoticesToolBar>
            <NoticesCategoriesNav links={noticesNavLinks} />
            <AddNoticeButton />
          </NoticesToolBar>
        </Container>
      </NoticeSection>

      <Outlet context={noticesNavLinks} />
    </NoticesWrapper>
  );
};

export default Notices;
