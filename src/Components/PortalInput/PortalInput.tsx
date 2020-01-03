import React from "react";
import { Input, Tooltip, Form } from "antd";

interface IProps {
  portalList: string;
  setPortalList: () => void;
}

const { TextArea } = Input;

const PortalInput: React.FC<IProps> = (props: IProps) => {
  return (
    <div className={"ingress-frame ingress-text"}>
      <Form layout={"horizontal"}>
        <div className="ingress-text">
          Add the Portal data in JSON format here.
        </div>
        <div className="ingress-frame selector">Submit</div>
        <Form.Item>
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default PortalInput;
