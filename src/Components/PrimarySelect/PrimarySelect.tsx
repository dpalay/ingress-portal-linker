import React, { useEffect } from 'react'

type IDirection = "East" | "West" | "North" | "South"

interface Iprops {
    which: IDirection
    , setWhich: React.Dispatch<React.SetStateAction<IDirection>>
    , whichAnchor: IDirection
    , title: string
}
const PrimarySelect: React.FC<Iprops> = (props: Iprops) => {

    const { whichAnchor, title, setWhich } = props
    const ns = (whichAnchor === "North" || whichAnchor === "South") ? true : false

    useEffect(() => {
        ns ? setWhich("West") : setWhich("North");
    },[whichAnchor, ns, setWhich])

    return (
        <>
            <div className={"ingress-text"}>{title}</div>
            <table className="ingress-text compass">
                <tbody>

                    <tr>
                        <td></td>
                        <td className={((ns) ? "ingress-disabled" : "") + " ingress-frame selector"} onClick={() => { if (!ns) { props.setWhich("North") } }}>North</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className={((!ns) ? "ingress-disabled" : "") + " ingress-frame selector"} onClick={() => { if (ns) { props.setWhich("West") } }}>West</td>
                        <td>{props.which}</td>
                        <td className={((!ns) ? "ingress-disabled" : "") + " ingress-frame selector"} onClick={() => { if (ns) { props.setWhich("East") } }}>East</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td className={((ns) ? "ingress-disabled" : "") + " ingress-frame selector"} onClick={() => { if (!ns) { props.setWhich("South") } }}>South</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default PrimarySelect