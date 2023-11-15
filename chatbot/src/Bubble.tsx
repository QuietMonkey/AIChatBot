import React from 'react';
import styled, {css} from 'styled-components';

import {colors} from './colors';
import { fadeIn } from './animations';


const shadow = css`
  box-shadow: 6px 6px 8px rgba(0, 0, 0, 0.05);
`;

const BubbleWrapper = styled.div<{isUser: boolean}>`
  background: ${({ isUser }) => isUser ? colors.bg_light : colors.highlight};
  align-self: ${({ isUser }) => isUser ? 'flex-start' : 'flex-end'};
  max-width: 85%;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  margin: 8px 0;

  ${shadow};
  ${fadeIn}
`;

const Tail = styled.span<{isUser: boolean}>`
  width: 12px;
  min-width: 12px;
  height: 12px;
  background: ${({ isUser }) => isUser ? colors.bg_light : colors.highlight};
  position: relative;
  display: inline-block;
  order: ${({ isUser }) => isUser ? '0' : '2'};
  align-self: flex-end;
  bottom: -27px;
  clip-path: ${({ isUser }) => isUser ? 'polygon(100% 0, 100% 0%, 30% 100%, 0 0%)' : 'polygon(100% 0, 100% 0%, 70% 100%, 0 0%)'};
  left: ${({isUser}) => isUser ? '-8px' : '8px'};

  ${shadow};
`;

type Props = {
  children: React.ReactElement | string;
  isUser: boolean;
};

const Bubble = ({children, isUser}: Props) => {
	return(
		<BubbleWrapper isUser={isUser}>
			<div>
				{children}
			</div>
			<Tail isUser={isUser}></Tail>
		</BubbleWrapper>
	);
};

export default Bubble;