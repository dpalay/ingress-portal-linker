import React from 'react'
import PortalCard from '../PortalCard/PortalCard';

interface Iprops {
    listOfLinks: any[];
}

const CardResults: React.FC<Iprops> = (props: Iprops) => {
    return(
        <div className={"ingress-frame"}>
            {props.listOfLinks.map(links => {
                return (
                    <PortalCard links={links}/>
                )
            })}
        </div>
    )

}

export default CardResults;