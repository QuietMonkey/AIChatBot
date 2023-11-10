import React from 'react';
import styled, {css} from 'styled-components';


const shadow = css`
  box-shadow: 6px 6px 8px rgba(0, 0, 0, 0.05);
`;

const BubbleWrapper = styled.div<{isUser: boolean}>`
  background: ${({ isUser }) => isUser ? '#80A1C1' : '#9EADBD'};
  align-self: ${({ isUser }) => isUser ? 'flex-start' : 'flex-end'};
  max-width: 85%;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  margin: 8px 0;

  ${shadow};
`;

const Chat = styled.p`
  order: 1;
  margin: 0;
`;

const Tail = styled.span<{isUser: boolean}>`
  width: 12px;
  min-width: 12px;
  height: 12px;
  background: ${({ isUser }) => isUser ? '#80a1c1' : '#9EADBD'};
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
			<Chat>{children}</Chat>
			<Tail isUser={isUser}></Tail>
		</BubbleWrapper>
	);
};

export default Bubble;