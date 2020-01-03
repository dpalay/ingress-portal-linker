import React, { useState } from "react";
import { Button, Form, Input } from "antd";
interface IRawData {
  guid: string;
  title: string;
  coordinates: {
    lat: string;
    lng: string;
  };
  link: {
    intel: string;
    gmap: string;
  };
  image: string;
}
interface IProps {
  text: string;
  rawData: IRawData[];
  setRawData: React.Dispatch<React.SetStateAction<IRawData[]>>;
}

const PortalEntry = (props: IProps) => {
  const [inputText, setInputText] = useState(props.text);

  return (
    <div className="ingress-frame padded">
      <Form layout="vertical">
        <Form.Item>
          <Input.TextArea
            rows={8}
            allowClear
            defaultValue={props.text}
            onChange={e => setInputText(e.target.value)}
          />
        </Form.Item>
      </Form>

      <Button
        className="ingress-button"
        type="primary"
        title="clickme!"
        onClick={() => {
            //Todo:  Validate input
            props.setRawData(JSON.parse(inputText))
        }}
      >
        {"Load JSON portal data!"}
      </Button>
    </div>
  );
};

export default PortalEntry;
