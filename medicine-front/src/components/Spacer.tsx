interface SpacerProps {
    space:number;
    timeTransition?:any;
}
const Spacer=({ space, timeTransition=0 }: SpacerProps) =>
    <div
        style={{
            height:space,
            transition: `height ${timeTransition}s ease-in-out`
        }}>
    </div>

export default Spacer;