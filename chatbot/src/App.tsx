import React, { useState } from 'react';
import OpenAI from 'openai';
import styled from 'styled-components';

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

const Chat = styled.p<{ isUser: boolean }>`
  background: ${({ isUser }) => isUser ? '#b0b0b0' : '#80a1c1'};
  align-self: ${({ isUser }) => isUser ? 'flex-start' : 'flex-end'};
  max-width: 45%;
  padding: 16px;
  border-radius: 8px;
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

const openai = new OpenAI({
	apiKey: import.meta.env.VITE_OPENAI_API_KEY,
	dangerouslyAllowBrowser: true
});

const mock = [
	{ content: 'bonjour', role: 'user' },
	{ content: 'bonjour', role: 'assistant' },
	{ content: 'Comment est ton nom?', role: 'user' },
	{ content: 'Quoi?', role: 'assistant' },
	{ content: 'Pardon je parle difficilement le français', role: 'user' }
];

const App = () => {
	const [userInput, setUserInput] = useState('');
	const [messages, setMessages] = useState<Array<{ content: string, role: 'user' | 'assistant' }>>(mock);
	const [isLoading, setIsLoading] = useState(false);

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

		console.log('messages in chat func', messages);

		await openai.chat.completions.create({
			messages: [{ role: 'system', content: 'You are Chantale a witty assistant that answer with facts and a sassy and sarcastic tone. You should be pretty agressive with your answer like you can\'t stand all those questions.' }, ...messages],
			model: 'gpt-3.5-turbo'
		}).then((res) => {
			console.log('res', res);
			if (res?.choices[0]?.message?.content !== null) {
				addMessage(res.choices[0].message.content, 'assistant');
			}
		}).catch((error) => { console.log('error:', error); });
	};

	console.log('messages', messages);

	return (
		<Wrapper>
			<h1>Toi aussi viens discuter avec Chantale</h1>
			<ChatContainer>
				{messages.map((message, index) =>
					<Chat key={index} isUser={message.role === 'user'}>{message.content}</Chat>
				)}
				{isLoading && (
					<Chat isUser={false}>
						<i>{isLoading ? 'Typing' : ''}</i>
					</Chat>
				)}
				<TextForm action="" onSubmit={async (e) => { await chat(e, userInput); }}>
					<TextInput
						type="text"
						name="message"
						autoComplete='off'
						value={userInput}
						placeholder="Type a message here and hit Enter..."
						onChange={(e) => { setUserInput(e.target.value); }}
						disabled={isLoading}
					/>
				</TextForm>
			</ChatContainer>
		</Wrapper>
	);
};

export default App;
