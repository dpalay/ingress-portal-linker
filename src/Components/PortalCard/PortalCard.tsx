import React from 'react'
import { Card } from 'antd'
import Portal from '../../Utils/Objects/Portal';
import Link from '../../Utils/Objects/Link';

interface ICompiledPortal { portal: Portal, linksFrom: Link[], linksTo: Link[], numKeys: number }
interface Iprops {
    cPortal: ICompiledPortal
}

const PortalCard: React.FC<Iprops> = (props: Iprops) => {
    const { cPortal } = props;
    return (
        <Card size="small" className={"ingress-button"} title={`${cPortal.portal.title}: ${cPortal.numKeys}`}>
            <ol>
                {cPortal.linksFrom.map((link) => (
                    <li key={`${link.source.key}_${link.dest.key}`}>
                        {link.dest.title}
                    </li>
                ))}
            </ol>
        </Card>
    )

}

export default PortalCard;  