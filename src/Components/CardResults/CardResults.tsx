import React, {useState} from 'react'
import PortalCard from '../PortalCard/PortalCard';
import Portal from '../../Utils/Objects/Portal';
import Link from '../../Utils/Objects/Link';
import { Row, Col, Tree } from 'antd';

interface ICompiledPortal { portal: Portal, linksFrom: Link[], linksTo: Link[], numKeys: number }
interface Iprops {
    compiledPortals: ICompiledPortal[]
}

const {TreeNode} = Tree

const CardResults: React.FC<Iprops> = (props: Iprops) => {
    const {compiledPortals} = props;
    const [expandedKeys, setExpandedKeys] = useState<string[]>([])
    const [selectedKeys, setSelectedKeys] = useState<string[]>([])
    const [checkedKeys, setCheckedKeys] = useState<string[]>([])
    const [autoExpandParent, setAutoExpandParent] = useState(true)

    
    
const onCheck = (checkedKeys: []) => {
    console.log('onCheck', checkedKeys);
    setCheckedKeys(checkedKeys);
  };

const  onSelect = (selectedKeys: string[], info: any) => {
    console.log('onSelect', info);
    console.log('onSelect', selectedKeys);
    //setSelectedKeys( selectedKeys );
  };

    return (
        <div className={"ingress-frame"} style={{overflow: "scroll", maxHeight:"400px"}}>
            <Tree 
            defaultExpandAll={false}
            checkable
            //onExpand={onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            //onCheck={props.onCheck}
            onSelect={onSelect}
            checkedKeys={checkedKeys}
            selectedKeys={selectedKeys}
            showLine
            >
                {compiledPortals.map((cPortal) =>  (
                <TreeNode checkable title={cPortal.portal.title} key={`Tree_Portal_${cPortal.portal.key}`}>
                    {cPortal.linksFrom.map(link => (
                        <TreeNode title={link.dest.title} key={`Tree_Link_${cPortal.portal.key}_${link.dest.key}`} />
                    ))}
                </TreeNode> ))}
            </Tree>

        </div>
    )

}

export default CardResults;