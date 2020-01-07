import React from "react";

type IDirection = "East" | "West" | "North" | "South"

interface Iprops {
    which: IDirection
    , setWhich: React.Dispatch<React.SetStateAction<IDirection>>
    , title: string
}
const AnchorSelect: React.FC<Iprops> = (props: Iprops) => {


  return (
    <>
      <div className={"ingress-text"}>{props.title}</div>
      <table className="ingress-text compass">
        <tbody>

          <tr>
            <td></td>
            <td className="ingress-frame selector" onClick={() => props.setWhich("North")}>North</td>
            <td></td>
          </tr>
          <tr>
            <td className="ingress-frame selector" onClick={() => props.setWhich("West")}>West</td>
            <td>{props.which}</td>
            <td className="ingress-frame selector" onClick={() => props.setWhich("East")}>East</td>
          </tr>
          <tr>
            <td></td>
            <td className="ingress-frame selector" onClick={() => props.setWhich("South")}>South</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default AnchorSelect;