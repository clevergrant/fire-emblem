import styled from 'styled-components'

export const TabList = styled.ul`
	list-style: none;
	padding: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-end;

	& > li {
		width: 6rem;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		cursor: pointer;
	}
`