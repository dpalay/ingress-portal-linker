import React from 'react'
import {Card} from 'antd'

interface Iprops {
    links: any[]
}

const PortalCard: React.FC<Iprops> = (props: Iprops) => {
    return(
        <Card headStyle={{color:"white"}} bodyStyle={{color:"green"}} title={"TitleOfCard"}>

        </Card>
    )

}

export default PortalCard;  