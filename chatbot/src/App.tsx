import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import Bubble from './Bubble';
import DotLoader from './DotLoader';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 32px;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (min-width: 768px) {
    width: 60%;
  }
`;

const Chat = styled.p`
  order: 1;
  margin: 0;
`;

const TextForm = styled.form`
  width: 100%;
  margin-top: 32px;
`;

const TextInput = styled.input`
  width: calc(100% - 32px);
  padding: 16px;
  border-radius: 8px;
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
		if (!isLoading) {
			focusOnInput();
		}
	}, [isLoading]);

	const addMessage = (content: string, role: 'user' | 'assistant') => {
		console.log('inputRefRef', inputRef.current);
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

	return (
		<Wrapper>
			<h1>Toi aussi viens discuter avec Chantale</h1>
			<ChatContainer>
				{messages.map((message, index) =>
					<Bubble isUser={message.role === 'user'} key={index}><Chat>{message.content}</Chat></Bubble>
				)}
				{isLoading && (
					<Bubble isUser={false}>
						<DotLoader />
					</Bubble>
				)}
				<TextForm action="" onSubmit={async (e) => { await chat(e, userInput); }}>
					<TextInput
						ref={inputRef}
						type="text"
						name="message"
						autoComplete='off'
						value={userInput}
						placeholder="Your message here and hit Enter..."
						onChange={(e) => { setUserInput(e.target.value); }}
						disabled={isLoading}
					/>
				</TextForm>
			</ChatContainer>
		</Wrapper>
	);
};

export default App;
