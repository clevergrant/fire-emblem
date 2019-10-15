import React, { FC, MouseEvent } from 'react'
import { Tabs } from 'components'

interface IProps {
	tab: number
	setTab: Function
}

const Container: FC<IProps> = props => {

	const { tab, setTab } = props

	const handleTabChange = (newtab: number) => (e: MouseEvent<HTMLLIElement>) => {
		e.preventDefault()
		setTab(newtab)
	}

	const viewstate = {
		tab
	}

	const handlers = {
		handleTabChange
	}

	return <Tabs viewstate={viewstate} handlers={handlers} />
}

export const TabsContainer = Container
