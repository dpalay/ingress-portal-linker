import React from 'react';
import Button from 'antd/es/button';

interface IProps {
    data?: {}[]
    value?: number
    handleclick?: () => void
    text?: string
}



const TestControl: React.FC<IProps> = (props: IProps)  => {
    

    return (<div>
        <Button className="ingress-button" type="primary" title="clickme!" onClick={props.handleclick}>{props.text || "click me!"} </Button>
    </div>
    )
}

export default TestControl