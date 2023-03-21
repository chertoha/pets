import styled from 'styled-components';
import { theme } from 'theme';

export const Card = styled('div').attrs(
  p =>
    p.freqProps && {
      style: {
        left: p.freqProps.left,
        top: p.freqProps.top,
        transform: `translate(${p.freqProps.transformX}, ${p.freqProps.transformY})`,
        borderRadius: `${p.freqProps.borderTL} ${p.freqProps.borderTR} ${p.freqProps.borderBR} ${p.freqProps.borderBL}`,
      },
    }
)`
  padding: 40px 20px 20px 20px;

  position: absolute;

  background-color: ${p => p.theme.colors.white};
  border: 2px solid ${p => p.theme.colors.accent};

  min-height: 150px;
  min-width: 200px;
  max-width: 450px;

  ${theme.mq.mobileOnly} {
    padding: 40px 16px 16px 20px;
    width: 280px;

    top: 50%;
    left: 50%;
    transform: translate(-50%, -30%);
    border-radius: ${p => p.theme.radii.small};
  }
`;

export const Wrapper = styled('div')`
  height: 100%;
  font-size: 20px;
  line-height: 1.375;

  ${theme.mq.mobileOnly} {
    font-size: 16px;
  }
`;
