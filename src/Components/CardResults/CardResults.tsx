import React from 'react'
import PortalCard from '../PortalCard/PortalCard';
import Portal from '../../Utils/Objects/Portal';
import Link from '../../Utils/Objects/Link';
import { Row, Col } from 'antd';

interface ICompiledPortal { portal: Portal, linksFrom: Link[], linksTo: Link[], numKeys: number }
interface Iprops {
    compiledPortals: ICompiledPortal[];
}

const CardResults: React.FC<Iprops> = (props: Iprops) => {
    return (
        <div className={"ingress-frame"} style={{overflow: "scroll", maxHeight:"250px"}}>
            

                {props.compiledPortals.map((cPortal, i, arr) => {
                    return (
                        <>
                            {i % 2 === 0 && (
                                <Row  align="bottom" gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
                                <Col span={12}>
                                    <PortalCard key={cPortal.portal.key} cPortal={cPortal} />
                                </Col>
                                <Col span={12}>
                                    {arr[i + 1] && (
                                        <PortalCard key={arr[i + 1].portal.key} cPortal={arr[i + 1]} />)}
                                        </Col>
                                </Row>
                            )}
                            </>
                    )
                }

                )} 
        </div>
    )

}

export default CardResults;