import React, { FC, useState, useEffect } from 'react'
import { Root } from 'components'
import { DatabaseService } from 'services'

const Container: FC = () => {

	const [tab, setTab]: [number, Function] = useState(1)

	useEffect(() => {
		const dbservice = new DatabaseService()

		dbservice.getData()
	})

	return <Root tab={tab} setTab={setTab} />
}

export const RootContainer = Container
