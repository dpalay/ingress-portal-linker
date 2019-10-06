import React from 'react';
import Button from 'antd/es/button';

interface IProps {
    data?: {}[]
    value?: number
    handleclick?: () => void
}



const TestControl: React.FC<IProps> = (props: IProps)  => {
    

    return (<div>
        {props.value}
        <Button type="primary" title="clickme!" onClick={props.handleclick}/>
    </div>
    )
}

export default TestControl