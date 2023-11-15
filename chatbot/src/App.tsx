import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import Bubble from './Bubble';
import DotLoader from './DotLoader';

import {colors} from './colors';
import {fadeIn} from './animations';

import Chantal from '/Chantal.svg';
import Send from '/Send.svg';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
	overflow: hidden;
	padding: 32px 32px 0;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
	margin-bottom: 182px;
  @media (min-width: 768px) {
    width: 60%;
  }

	transition: height .4 ease;
`;

const Title = styled.h1`
	color: ${colors.text};
`;

const SubTitle = styled.h5`
	color: ${colors.text_neutral};
	margin: 0;
`;

const ChantalSVG = styled.img<{isTitle: boolean}>`
	width: ${({isTitle}) => isTitle ? '120px' : '50px'};
	height: ${({isTitle}) => isTitle ? '120px' : '50px'};
	align-self: flex-end;
	position: relative;
	left: ${({isTitle}) => isTitle ? '-50px' : '28px'};

	transition: all .4s ease;

	@media (min-width: 768px) {
		width: ${({isTitle}) => isTitle ? '240px' : '85px'};
		height: ${({isTitle}) => isTitle ? '240px' : '85px'};
		left: ${({isTitle}) => isTitle ? '-150px' : '70px'};
	}
`;

const Chat = styled.p`
  order: 1;
  margin: 0;
	color: ${colors.text};

	${fadeIn}	
`;

const TextForm = styled.form`
	width: calc(100% + 64px);
	height: 150px;
	background: ${colors.bg};
	display: flex;
	justify-content: center;
	position: fixed;
	bottom: 0;
`;

const InputWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
`;

const TextInput = styled.input`
	background: ${colors.bg_light};
	color: ${colors.text};
	margin: 32px 0 32px 50px;
  width: 80%;
	height: 25px;
  padding: 16px 50px 16px 16px;
  border-radius: 13px;
	border: 0;

	::placeholder {
		color: ${colors.text};
	}

	:disabled {
		::placeholder {
			color: ${colors.text_neutral};
		}
	}
`;

const SendButton = styled.button`
	position: relative;
	translate: -125% 42px;
	height: 36px;
	width: 36px;
	border-radius: 28px;
	border: 0;
	background: #DF4A32;
	background: linear-gradient(165deg, #DF4A32 0%, #FFD233 100%);
`;

const SendSVG = styled.img`
	translate: 1px 2px;
`;

const App = () => {
	const [userInput, setUserInput] = useState('');
	const [messages, setMessages] = useState<Array<{ content: string, role: 'user' | 'assistant' }>>([]);
	const [isLoading, setIsLoading] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const focusOnInput = () => {
		window.scroll({
			top: window.document.body.scrollHeight,
			behavior: 'smooth',
		});
		inputRef.current?.focus();
	};

	useEffect(() => {
		focusOnInput();
	}, [isLoading]);

	const addMessage = (content: string, role: 'user' | 'assistant') => {
		const chat = messages;
		chat.push({ content, role });
		setMessages(chat);
		if (role === 'user') {
			setIsLoading(true);
		} else {
			setIsLoading(false);
		}
	};

	const chat = async (e: React.SyntheticEvent, userInput: string) => {
		e.preventDefault();

		if (!userInput) return;
		addMessage(userInput, 'user');
		setUserInput('');

		fetch('http://localhost:8000/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				messages,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				addMessage(data.output, 'assistant');
			})
			.catch((error) => {
				console.log(error);
			});
	};

	console.log('messages', messages);

	const renderTitleBubble = () => {
		return (
			<div>
				<Bubble isUser={false}>
					<div>
						<Title>Bonjour petit bolide</Title>
						<SubTitle>Toi aussi ! viens discuter avec Chantale</SubTitle>
					</div>
				</Bubble>
			</div>
		);
	};

	const renderMessages = () => {
		return messages.map((message, index) =>
			<Bubble isUser={message.role === 'user'} key={index}><Chat>{message.content}</Chat></Bubble>
		);
	};

	return (
		<Wrapper>
			<ChatContainer>
				{messages.length === 0 ? 	
					renderTitleBubble() : 
					renderMessages()
				}
				{isLoading && (
					<Bubble isUser={false}>
						<DotLoader />
					</Bubble>
				)}
				<ChantalSVG isTitle={messages.length === 0} src={Chantal}/>
			</ChatContainer>
			<TextForm action="" onSubmit={async (e) => { await chat(e, userInput); }}>
				<InputWrapper>
					<TextInput
						ref={inputRef}
						type="text"
						name="message"
						autoComplete='off'
						value={userInput}
						placeholder="Ton message ici"
						onChange={(e) => { setUserInput(e.target.value); }}
						disabled={isLoading}
					/>
					<SendButton><SendSVG src={Send}/></SendButton>
				</InputWrapper>
			</TextForm>
		</Wrapper>
	);
};

export default App;
