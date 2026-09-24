/** The design's on/off switch, drawn once so the knob can slide between states. */
export default function Switch({ on }: { on: boolean }) {
  return (
    <span className={'switch' + (on ? ' is-on' : '')} role="switch" aria-checked={on}>
      <span className="switch-knob" />
    </span>
  );
}
