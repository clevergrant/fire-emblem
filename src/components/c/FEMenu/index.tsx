import React, { FC, CSSProperties } from 'react'

import { Wrapper, TL, T, TR, L, MID, Inner, Outer, R, BL, B, BR } from './style'

interface IProps {
	top?: boolean
	right?: boolean
	bottom?: boolean
	left?: boolean
	size?: number
	style?: CSSProperties
}

const FEMenuComponent: FC<IProps> = props => {

	const {
		top,
		right,
		bottom,
		left,
		size = 1,
		style = {}
	} = props

	return (
		<Wrapper size={size} top={top} right={right} bottom={bottom} left={left}>
			{top && left && <TL />}
			{top && <T />}
			{top && right && <TR />}
			{left && <L />}
			<MID size={size} style={style}>
				<Inner>
					{props.children}
				</Inner>
				<Outer>
					{props.children}
				</Outer>
			</MID>
			{right && <R />}
			{bottom && left && <BL />}
			{bottom && <B />}
			{bottom && right && <BR />}
		</Wrapper>
	)
}

export const FEMenu = FEMenuComponent
