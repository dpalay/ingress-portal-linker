import React, {useState} from 'react'
import Portal from '../../Utils/Objects/Portal';
import Link from '../../Utils/Objects/Link';
import {Tree, Icon } from 'antd';
import {  AntTreeNodeCheckedEvent, AntTreeNodeExpandedEvent } from 'antd/lib/tree/Tree';

interface ICompiledPortal { portal: Portal, linksFrom: Link[], linksTo: Link[], numKeys: number }
interface Iprops {
    compiledPortals: ICompiledPortal[]
}

const {TreeNode} = Tree

const CardResults: React.FC<Iprops> = (props: Iprops) => {
    const {compiledPortals} = props;
    const [expandedKeys, setExpandedKeys] = useState<string[]>([])
    const [checkedKeys, setCheckedKeys] = useState<string[]>([])


    const onExpand = (expandedKeys: string[], info:AntTreeNodeExpandedEvent) => {
        console.log('onExpand', expandedKeys);
        setExpandedKeys(expandedKeys)
      };
    
const onCheck = (checkedKeys: string[] , e: AntTreeNodeCheckedEvent) => {
        console.log('onCheck', checkedKeys);
        console.log('onCheck', e);
        setCheckedKeys(checkedKeys);
  };


const  onSelect = (selectedKeys: string[], info: any) => {
    console.log('onSelect', info);
    console.log('onSelect', selectedKeys);
    setExpandedKeys( [...selectedKeys,...expandedKeys] );
  };

    return (
        <div  style={{background: "white", overflow: "scroll", maxHeight:"400px"}}>
            <Tree 
            defaultExpandAll={true}
            checkable
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            //@ts-ignore
            onCheck={onCheck}
            onSelect={onSelect}
            checkedKeys={checkedKeys}
            showLine
            switcherIcon={<Icon type="down" />}
            >
                {compiledPortals.map((cPortal) =>  (
                <TreeNode checkable title={`${cPortal.numKeys} ${cPortal.portal.title}`} key={`Tree_Portal_${cPortal.portal.key}`}>
                    {cPortal.linksFrom.map(link => (
                        <TreeNode title={link.dest.title} key={`Tree_Link_${cPortal.portal.key}_${link.dest.key}`} />
                    ))}
                </TreeNode> ))}
            </Tree>

        </div>
    )

}

export default CardResults;