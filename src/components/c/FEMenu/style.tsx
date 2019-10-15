import styled from 'styled-components'

import tl from './menu/menu-tl.png'
import t from './menu/menu-t.png'
import tr from './menu/menu-tr.png'
import l from './menu/menu-l.png'
import mid from './menu/menu-mid.png'
import r from './menu/menu-r.png'
import bl from './menu/menu-bl.png'
import b from './menu/menu-b.png'
import br from './menu/menu-br.png'

type WrapperProps = {
	size?: number
	top?: boolean
	right?: boolean
	bottom?: boolean
	left?: boolean
}

export const Wrapper = styled.div<WrapperProps>`
	user-select: none;
	display: grid;

	grid-template-columns: ${props => props.left ? `16px ` : ``}auto${props => props.right ? ` 20px` : ``};
	grid-template-rows: ${props => props.top ? `16px ` : ``}auto${props => props.bottom ? ` 20px` : ``};

	grid-template-areas:
		'${props => props.top && props.left ? `tl ` : ``}${props => props.top ? `t` : ``}${props => props.top && props.right ? ` tr` : ``}'
		'${props => props.left ? `l ` : ``}mid${props => props.right ? ` r` : ``}'
		'${props => props.bottom && props.left ? `bl ` : ``}${props => props.bottom ? `b` : ``}${props => props.bottom && props.right ? ` br` : ``}';
`

export const TL = styled.div`
	grid-area: tl;
	background: url(${tl}) no-repeat center;
`

export const T = styled.div`
	grid-area: t;
	background: url(${t}) repeat-x top left;
`

export const TR = styled.div`
	grid-area: tr;
	background: url(${tr}) no-repeat center;
`

export const L = styled.div`
	grid-area: l;
	background: url(${l}) repeat-y top left;
`

export const R = styled.div`
	grid-area: r;
	background: url(${r}) repeat-y top left;
`

export const BL = styled.div`
	grid-area: bl;
	background: url(${bl}) no-repeat top left;
`

export const B = styled.div`
	grid-area: b;
	background: url(${b}) repeat-x top left;
`

export const BR = styled.div`
	grid-area: br;
	background: url(${br}) no-repeat top left;
`

type MidProps = {
	size?: number
}

export const MID = styled.div<MidProps>`
	grid-area: mid;

	background: url(${mid}) repeat top left;

	display: flex;
	align-items: center;

	padding: ${props => props.size ? props.size : 1}rem;

	position: relative;

	& a {
		text-decoration: none;
	}

	& > span {
		font-size: ${props => props.size ? props.size * 44 : 44}px;
	}
`

export const Inner = styled.span`
	font-family: 'fire-emblem-inner', sans-serif;
	color: white;

	& a, & .fe-text-green {
		color: #48e820;
	}

	& :disabled, & .fe-text-gray {
		color: #b8b0b0;
	}
`

export const Outer = styled.span`
	font-family: 'fire-emblem-outer', sans-serif;
	color: black;
	position: absolute;
	text-shadow: 0 0 1px black;

	& a, & .fe-text-green {
		color: #185818;
	}

	& :disabled, & .fe-text-gray {
		color: #383028;
	}
`