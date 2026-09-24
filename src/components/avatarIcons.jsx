// Original cartoon animal icons (drawn as SVG, not traced from any artwork)
// that anyone can pick as a profile picture instead of uploading a photo.
// A profile stores one as "avatar:<id>" in place of a photo URL.

const INK = "#2b2140";
const line = { stroke: INK, strokeWidth: 3, strokeLinejoin: "round", strokeLinecap: "round" };

function Eye({ x, y, r = 4 }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={INK} />
      <circle cx={x + r * 0.35} cy={y - r * 0.35} r={r * 0.32} fill="#ffffff" />
    </g>
  );
}


function Cat() {
  return (
    <>
      <circle cx="50" cy="50" r="50" fill="#cfe3ff" />
      <path d="M22 50 L24 16 L45 32 Z" fill="#f2811d" {...line} />
      <path d="M78 50 L76 16 L55 32 Z" fill="#f2811d" {...line} />
      <path d="M28 36 L29 25 L38 32 Z" fill="#ff9fbf" />
      <path d="M72 36 L71 25 L62 32 Z" fill="#ff9fbf" />
      <ellipse cx="50" cy="58" rx="30" ry="26" fill="#f2811d" {...line} />
      <path d="M43 36 L45 44 M50 34 L50 43 M57 36 L55 44" {...line} strokeWidth="2.5" />
      <path d="M32 55 Q36 50 40 55 M60 55 Q64 50 68 55" fill="none" {...line} />
      <path d="M46 62 L54 62 L50 67 Z" fill="#ff9fbf" {...line} strokeWidth="2" />
      <path d="M50 67 Q44 74 40 70 M50 67 Q56 74 60 70" fill="none" {...line} />
      <path d="M24 62 L12 60 M24 67 L12 69 M76 62 L88 60 M76 67 L88 69" {...line} strokeWidth="2" />
    </>
  );
}

function Dog() {
  return (
    <>
      <circle cx="50" cy="50" r="50" fill="#e4d5ff" />
      <ellipse cx="22" cy="52" rx="11" ry="20" fill="#9a6a3a" transform="rotate(12 22 52)" {...line} />
      <ellipse cx="78" cy="52" rx="11" ry="20" fill="#9a6a3a" transform="rotate(-12 78 52)" {...line} />
      <ellipse cx="50" cy="52" rx="28" ry="30" fill="#e3a869" {...line} />
      <ellipse cx="50" cy="63" rx="15" ry="12" fill="#f7deb8" {...line} strokeWidth="2.5" />
      <ellipse cx="50" cy="57" rx="6" ry="4.5" fill={INK} />
      <Eye x={39} y={44} />
      <Eye x={61} y={44} />
      <path d="M43 67 Q50 74 57 67" fill="none" {...line} />
      <path d="M46 70 Q50 82 54 70 Z" fill="#ff7a93" {...line} strokeWidth="2" />
    </>
  );
}

function Fox() {
  return (
    <>
      <circle cx="50" cy="50" r="50" fill="#ffe9b8" />
      <path d="M14 22 L40 40 L26 64 Z" fill="#f2811d" {...line} />
      <path d="M86 22 L60 40 L74 64 Z" fill="#f2811d" {...line} />
      <path d="M20 30 L35 41 L28 54 Z" fill={INK} />
      <path d="M80 30 L65 41 L72 54 Z" fill={INK} />
      <path d="M22 52 Q50 32 78 52 Q78 82 50 90 Q22 82 22 52 Z" fill="#f2811d" {...line} />
      <path d="M30 62 Q50 60 70 62 Q64 84 50 88 Q36 84 30 62 Z" fill="#fff6e6" />
      <path d="M22 52 Q50 32 78 52 Q78 82 50 90 Q22 82 22 52 Z" fill="none" {...line} />
      <ellipse cx="50" cy="66" rx="5" ry="3.5" fill={INK} />
      <Eye x={38} y={54} />
      <Eye x={62} y={54} />
      <path d="M44 74 Q50 80 56 74" fill="none" {...line} />
    </>
  );
}

function Panda() {
  return (
    <>
      <circle cx="50" cy="50" r="50" fill="#c9efd2" />
      <circle cx="24" cy="28" r="11" fill={INK} />
      <circle cx="76" cy="28" r="11" fill={INK} />
      <ellipse cx="50" cy="54" rx="31" ry="28" fill="#ffffff" {...line} />
      <ellipse cx="36" cy="52" rx="8" ry="10.5" fill={INK} transform="rotate(20 36 52)" />
      <ellipse cx="64" cy="52" rx="8" ry="10.5" fill={INK} transform="rotate(-20 64 52)" />
      <circle cx="37" cy="51" r="3" fill="#ffffff" />
      <circle cx="63" cy="51" r="3" fill="#ffffff" />
      <ellipse cx="50" cy="63" rx="5.5" ry="4" fill={INK} />
      <path d="M42 70 Q50 78 58 70" fill="none" {...line} />
    </>
  );
}

function Bear() {
  return (
    <>
      <circle cx="50" cy="50" r="50" fill="#ffd6dd" />
      <circle cx="24" cy="26" r="12" fill="#9a6a3a" {...line} />
      <circle cx="76" cy="26" r="12" fill="#9a6a3a" {...line} />
      <circle cx="24" cy="26" r="5.5" fill="#e3a869" />
      <circle cx="76" cy="26" r="5.5" fill="#e3a869" />
      <ellipse cx="50" cy="54" rx="31" ry="29" fill="#9a6a3a" {...line} />
      <ellipse cx="50" cy="64" rx="15" ry="12" fill="#e3a869" {...line} strokeWidth="2.5" />
      <ellipse cx="50" cy="58" rx="6" ry="4.5" fill={INK} />
      <Eye x={38} y={46} />
      <Eye x={62} y={46} />
      <path d="M44 68 Q50 75 56 68" fill="none" {...line} />
    </>
  );
}

function Rabbit() {
  return (
    <>
      <circle cx="50" cy="50" r="50" fill="#fff0b8" />
      <ellipse cx="36" cy="26" rx="9" ry="24" fill="#ffffff" {...line} />
      <ellipse cx="64" cy="26" rx="9" ry="24" fill="#ffffff" {...line} />
      <ellipse cx="36" cy="27" rx="4" ry="16" fill="#ffb3c8" />
      <ellipse cx="64" cy="27" rx="4" ry="16" fill="#ffb3c8" />
      <ellipse cx="50" cy="64" rx="28" ry="25" fill="#ffffff" {...line} />
      <Eye x={39} y={60} />
      <Eye x={61} y={60} />
      <circle cx="31" cy="68" r="4.5" fill="#ffb3c8" opacity="0.8" />
      <circle cx="69" cy="68" r="4.5" fill="#ffb3c8" opacity="0.8" />
      <path d="M46 66 L54 66 L50 70 Z" fill="#ff7a93" {...line} strokeWidth="2" />
      <path d="M50 70 Q44 77 40 73 M50 70 Q56 77 60 73" fill="none" {...line} />
      <rect x="46.5" y="74" width="7" height="6" rx="1.5" fill="#ffffff" {...line} strokeWidth="2" />
    </>
  );
}

function Lion() {
  return (
    <>
      <circle cx="50" cy="50" r="50" fill="#d8ecff" />
      <circle cx="50" cy="52" r="42" fill="#d9792b" {...line} />
      <circle cx="26" cy="22" r="7" fill="#f6c453" {...line} />
      <circle cx="74" cy="22" r="7" fill="#f6c453" {...line} />
      <circle cx="50" cy="55" r="27" fill="#f6c453" {...line} />
      <ellipse cx="50" cy="65" rx="13" ry="10" fill="#fff0c9" {...line} strokeWidth="2.5" />
      <path d="M45 59 L55 59 L50 65 Z" fill={INK} {...line} strokeWidth="2" />
      <Eye x={39} y={50} />
      <Eye x={61} y={50} />
      <path d="M50 65 L50 69 M50 69 Q44 74 40 70 M50 69 Q56 74 60 70" fill="none" {...line} strokeWidth="2.5" />
    </>
  );
}

function Owl() {
  return (
    <>
      <circle cx="50" cy="50" r="50" fill="#ffe08a" />
      <path d="M20 22 L38 30 L24 46 Z" fill="#8a5cf6" {...line} />
      <path d="M80 22 L62 30 L76 46 Z" fill="#8a5cf6" {...line} />
      <ellipse cx="50" cy="58" rx="32" ry="34" fill="#8a5cf6" {...line} />
      <path d="M32 84 Q50 74 68 84 Q50 94 32 84 Z" fill="#c9b3ff" />
      <circle cx="37" cy="48" r="14" fill="#ffffff" {...line} />
      <circle cx="63" cy="48" r="14" fill="#ffffff" {...line} />
      <circle cx="38" cy="49" r="7" fill={INK} />
      <circle cx="62" cy="49" r="7" fill={INK} />
      <circle cx="40" cy="46" r="2.4" fill="#ffffff" />
      <circle cx="64" cy="46" r="2.4" fill="#ffffff" />
      <path d="M44 58 L56 58 L50 70 Z" fill="#f2811d" {...line} strokeWidth="2.5" />
    </>
  );
}

function Frog() {
  return (
    <>
      <circle cx="50" cy="50" r="50" fill="#ffd6dd" />
      <ellipse cx="50" cy="60" rx="35" ry="28" fill="#5cc26a" {...line} />
      <circle cx="30" cy="34" r="13" fill="#5cc26a" {...line} />
      <circle cx="70" cy="34" r="13" fill="#5cc26a" {...line} />
      <circle cx="30" cy="34" r="8" fill="#ffffff" {...line} strokeWidth="2.5" />
      <circle cx="70" cy="34" r="8" fill="#ffffff" {...line} strokeWidth="2.5" />
      <circle cx="31" cy="35" r="4" fill={INK} />
      <circle cx="69" cy="35" r="4" fill={INK} />
      <path d="M26 62 Q50 84 74 62" fill="#c8323c" {...line} />
      <path d="M40 60 L42 62 M60 60 L58 62" {...line} strokeWidth="2" />
      <circle cx="44" cy="52" r="1.6" fill={INK} />
      <circle cx="56" cy="52" r="1.6" fill={INK} />
    </>
  );
}

function Pig() {
  return (
    <>
      <circle cx="50" cy="50" r="50" fill="#d6f0ff" />
      <path d="M24 40 L22 16 L44 28 Z" fill="#ff9fbf" {...line} />
      <path d="M76 40 L78 16 L56 28 Z" fill="#ff9fbf" {...line} />
      <ellipse cx="50" cy="56" rx="32" ry="28" fill="#ffb3c8" {...line} />
      <ellipse cx="50" cy="64" rx="15" ry="11" fill="#ff8fb0" {...line} />
      <ellipse cx="45" cy="64" rx="2.4" ry="3.6" fill={INK} />
      <ellipse cx="55" cy="64" rx="2.4" ry="3.6" fill={INK} />
      <Eye x={35} y={48} />
      <Eye x={65} y={48} />
      <circle cx="26" cy="60" r="4.5" fill="#ff7a93" opacity="0.5" />
      <circle cx="74" cy="60" r="4.5" fill="#ff7a93" opacity="0.5" />
    </>
  );
}

function Penguin() {
  return (
    <>
      <circle cx="50" cy="50" r="50" fill="#bfe4ff" />
      <ellipse cx="50" cy="56" rx="31" ry="34" fill="#3a4a7a" {...line} />
      <path d="M50 38 Q28 34 28 58 Q30 84 50 86 Q70 84 72 58 Q72 34 50 38 Z" fill="#ffffff" />
      <path d="M50 38 Q28 34 28 58 Q30 84 50 86 Q70 84 72 58 Q72 34 50 38 Z" fill="none" {...line} strokeWidth="2.5" />
      <Eye x={40} y={52} r={4} />
      <Eye x={60} y={52} r={4} />
      <path d="M43 62 L57 62 L50 72 Z" fill="#f2811d" {...line} strokeWidth="2.5" />
      <circle cx="33" cy="64" r="4" fill="#ffb3c8" opacity="0.7" />
      <circle cx="67" cy="64" r="4" fill="#ffb3c8" opacity="0.7" />
    </>
  );
}

function Koala() {
  return (
    <>
      <circle cx="50" cy="50" r="50" fill="#e4d5ff" />
      <circle cx="21" cy="38" r="15" fill="#a9b1bd" {...line} />
      <circle cx="79" cy="38" r="15" fill="#a9b1bd" {...line} />
      <circle cx="21" cy="38" r="8" fill="#eef1f5" />
      <circle cx="79" cy="38" r="8" fill="#eef1f5" />
      <ellipse cx="50" cy="56" rx="29" ry="28" fill="#a9b1bd" {...line} />
      <Eye x={39} y={50} />
      <Eye x={61} y={50} />
      <ellipse cx="50" cy="62" rx="8" ry="11" fill={INK} />
      <ellipse cx="47" cy="58" rx="2.4" ry="3" fill="#ffffff" opacity="0.7" />
      <path d="M43 76 Q50 81 57 76" fill="none" {...line} strokeWidth="2.5" />
    </>
  );
}


function Dragon() {
  return (
    <>
      <circle cx="50" cy="50" r="50" fill="#c9d9ff" />
      <path d="M30 34 L24 10 L44 26 Z" fill="#ffd166" {...line} />
      <path d="M70 34 L76 10 L56 26 Z" fill="#ffd166" {...line} />
      <path d="M40 30 L50 16 L60 30 Z" fill="#f2811d" {...line} />
      <ellipse cx="50" cy="56" rx="30" ry="27" fill="#5cc26a" {...line} />
      <ellipse cx="50" cy="69" rx="18" ry="13" fill="#a6e8ab" {...line} strokeWidth="2.5" />
      <ellipse cx="43" cy="66" rx="2.4" ry="3.4" fill={INK} />
      <ellipse cx="57" cy="66" rx="2.4" ry="3.4" fill={INK} />
      <Eye x={37} y={48} />
      <Eye x={63} y={48} />
      <path d="M42 75 Q50 81 58 75" fill="none" {...line} strokeWidth="2.5" />
      <path d="M47 77 L49 82 L51 77 Z" fill="#ffffff" {...line} strokeWidth="1.5" />
    </>
  );
}

function Unicorn() {
  return (
    <>
      <circle cx="50" cy="50" r="50" fill="#ffe0f0" />
      <path d="M50 4 L43 34 L57 34 Z" fill="#ffd166" {...line} />
      <path d="M46 24 L54 22 M45 30 L55 28" {...line} strokeWidth="1.8" />
      <path d="M26 44 L24 22 L42 34 Z" fill="#ffffff" {...line} />
      <path d="M74 44 L76 22 L58 34 Z" fill="#ffffff" {...line} />
      <path d="M22 50 Q10 60 16 80 Q24 66 30 60 Z" fill="#b48cff" {...line} />
      <path d="M78 50 Q90 60 84 80 Q76 66 70 60 Z" fill="#ff8fbb" {...line} />
      <ellipse cx="50" cy="58" rx="28" ry="26" fill="#ffffff" {...line} />
      <ellipse cx="50" cy="70" rx="15" ry="11" fill="#ffd6e6" {...line} strokeWidth="2.5" />
      <ellipse cx="45" cy="70" rx="2" ry="2.6" fill={INK} />
      <ellipse cx="55" cy="70" rx="2" ry="2.6" fill={INK} />
      <path d="M32 55 Q38 49 44 55 M56 55 Q62 49 68 55" fill="none" {...line} />
      <circle cx="30" cy="64" r="4" fill="#ff8fbb" opacity="0.6" />
      <circle cx="70" cy="64" r="4" fill="#ff8fbb" opacity="0.6" />
    </>
  );
}

function Dinosaur() {
  return (
    <>
      <circle cx="50" cy="50" r="50" fill="#e4d5ff" />
      <path d="M36 32 L40 20 L46 30 L52 18 L58 30 L64 20 L66 32 Z" fill="#3f9a5b" {...line} />
      <ellipse cx="50" cy="56" rx="32" ry="26" fill="#5cc26a" {...line} />
      <path d="M26 44 Q36 38 46 46 M74 44 Q64 38 54 46" fill="none" {...line} strokeWidth="3.5" />
      <Eye x={37} y={51} r={4.5} />
      <Eye x={63} y={51} r={4.5} />
      <circle cx="44" cy="60" r="1.8" fill={INK} />
      <circle cx="56" cy="60" r="1.8" fill={INK} />
      <path d="M28 68 Q50 86 72 68 Q50 76 28 68 Z" fill="#c8323c" {...line} strokeWidth="2.5" />
      <path d="M36 70 L39 75 L42 71 M46 72 L50 77 L54 72 M58 71 L61 75 L64 70" fill="#ffffff" {...line} strokeWidth="2" />
      <circle cx="26" cy="58" r="3" fill="#3f9a5b" />
      <circle cx="74" cy="58" r="3" fill="#3f9a5b" />
    </>
  );
}

function Ghost() {
  return (
    <>
      <circle cx="50" cy="50" r="50" fill="#3a4a7a" />
      <path d="M22 88 L22 46 Q22 14 50 14 Q78 14 78 46 L78 88 L67 79 L58 88 L50 79 L42 88 L33 79 Z" fill="#eaf3ff" {...line} />
      <path d="M32 46 Q37 40 42 46 M58 46 Q63 40 68 46" fill="none" {...line} />
      <path d="M36 58 Q50 76 64 58 Z" fill="#c8323c" {...line} />
      <path d="M45 66 Q50 76 55 66 Q50 63 45 66 Z" fill="#ff7a93" />
      <circle cx="30" cy="58" r="4.5" fill="#ff8fbb" opacity="0.6" />
      <circle cx="70" cy="58" r="4.5" fill="#ff8fbb" opacity="0.6" />
    </>
  );
}

function Monster() {
  return (
    <>
      <circle cx="50" cy="50" r="50" fill="#ffe9b8" />
      <path d="M28 34 L22 14 L40 26 Z" fill="#ffd166" {...line} />
      <path d="M72 34 L78 14 L60 26 Z" fill="#ffd166" {...line} />
      <path d="M18 56 Q16 22 50 22 Q84 22 82 56 Q82 88 50 88 Q18 88 18 56 Z" fill="#9b6bff" {...line} />
      <circle cx="50" cy="42" r="12" fill="#ffffff" {...line} />
      <circle cx="50" cy="43" r="6" fill={INK} />
      <circle cx="52" cy="40" r="2" fill="#ffffff" />
      <circle cx="30" cy="52" r="7" fill="#ffffff" {...line} strokeWidth="2.5" />
      <circle cx="70" cy="52" r="7" fill="#ffffff" {...line} strokeWidth="2.5" />
      <circle cx="31" cy="53" r="3.2" fill={INK} />
      <circle cx="69" cy="53" r="3.2" fill={INK} />
      <path d="M32 68 Q50 86 68 68 Z" fill="#c8323c" {...line} />
      <path d="M38 69 L41 75 L44 70 M56 70 L59 75 L62 69" fill="#ffffff" {...line} strokeWidth="2" />
    </>
  );
}

function Wizard() {
  return (
    <>
      <circle cx="50" cy="50" r="50" fill="#d6f0ff" />
      <path d="M50 4 L72 44 L28 44 Z" fill="#8a5cf6" {...line} />
      <path d="M50 20 l2.4 5 5.4 .6 -4 3.8 1 5.4 -4.8 -2.7 -4.8 2.7 1 -5.4 -4 -3.8 5.4 -.6 Z" fill="#ffd166" />
      <ellipse cx="50" cy="46" rx="34" ry="8" fill="#8a5cf6" {...line} />
      <path d="M30 50 Q50 40 70 50 Q74 74 50 84 Q26 74 30 50 Z" fill="#ffd9b8" {...line} />
      <path d="M32 66 Q50 96 68 66 Q60 74 50 72 Q40 74 32 66 Z" fill="#f4f4fa" {...line} />
      <path d="M36 57 Q40 52 44 57 M56 57 Q60 52 64 57" fill="none" {...line} />
      <ellipse cx="50" cy="63" rx="4" ry="3" fill="#f0a98a" {...line} strokeWidth="2" />
    </>
  );
}

function Robot() {
  return (
    <>
      <circle cx="50" cy="50" r="50" fill="#c9efd2" />
      <path d="M50 22 L50 10" {...line} />
      <circle cx="50" cy="8" r="5" fill="#f2811d" {...line} strokeWidth="2.5" />
      <rect x="18" y="44" width="8" height="18" rx="3" fill="#7f93b8" {...line} strokeWidth="2.5" />
      <rect x="74" y="44" width="8" height="18" rx="3" fill="#7f93b8" {...line} strokeWidth="2.5" />
      <rect x="24" y="22" width="52" height="56" rx="14" fill="#b9c9e8" {...line} />
      <rect x="32" y="36" width="36" height="18" rx="8" fill="#2b2140" />
      <circle cx="42" cy="45" r="5" fill="#5be3ff" />
      <circle cx="58" cy="45" r="5" fill="#5be3ff" />
      <circle cx="43.5" cy="43.5" r="1.8" fill="#ffffff" />
      <circle cx="59.5" cy="43.5" r="1.8" fill="#ffffff" />
      <rect x="38" y="62" width="24" height="9" rx="4" fill="#ffffff" {...line} strokeWidth="2.5" />
      <path d="M44 62 L44 71 M50 62 L50 71 M56 62 L56 71" {...line} strokeWidth="1.8" />
    </>
  );
}

function Alien() {
  return (
    <>
      <circle cx="50" cy="50" r="50" fill="#d9c7ff" />
      <path d="M34 26 L28 8 M66 26 L72 8" {...line} />
      <circle cx="27" cy="7" r="4.5" fill="#ffd166" {...line} strokeWidth="2.5" />
      <circle cx="73" cy="7" r="4.5" fill="#ffd166" {...line} strokeWidth="2.5" />
      <path d="M50 22 Q82 22 78 54 Q74 86 50 88 Q26 86 22 54 Q18 22 50 22 Z" fill="#8bd28f" {...line} />
      <ellipse cx="36" cy="52" rx="10" ry="13" fill={INK} transform="rotate(20 36 52)" />
      <ellipse cx="64" cy="52" rx="10" ry="13" fill={INK} transform="rotate(-20 64 52)" />
      <circle cx="33" cy="48" r="3" fill="#ffffff" />
      <circle cx="61" cy="48" r="3" fill="#ffffff" />
      <path d="M43 74 Q50 80 57 74" fill="none" {...line} />
      <circle cx="46" cy="64" r="1.2" fill={INK} />
      <circle cx="54" cy="64" r="1.2" fill={INK} />
    </>
  );
}

export const AVATAR_ICONS = [
  { id: "kat", label: "Kat (Cat)", Icon: Cat },
  { id: "hond", label: "Hond (Dog)", Icon: Dog },
  { id: "jakkals", label: "Jakkals (Fox)", Icon: Fox },
  { id: "panda", label: "Panda", Icon: Panda },
  { id: "beer", label: "Beer (Bear)", Icon: Bear },
  { id: "haas", label: "Haas (Rabbit)", Icon: Rabbit },
  { id: "leeu", label: "Leeu (Lion)", Icon: Lion },
  { id: "uil", label: "Uil (Owl)", Icon: Owl },
  { id: "padda", label: "Padda (Frog)", Icon: Frog },
  { id: "vark", label: "Vark (Pig)", Icon: Pig },
  { id: "pikkewyn", label: "Pikkewyn (Penguin)", Icon: Penguin },
  { id: "koala", label: "Koala", Icon: Koala },
  { id: "draak", label: "Draak (Dragon)", Icon: Dragon },
  { id: "eenhoring", label: "Eenhoring (Unicorn)", Icon: Unicorn },
  { id: "dinosourus", label: "Dinosourus (Dinosaur)", Icon: Dinosaur },
  { id: "spook", label: "Spook (Ghost)", Icon: Ghost },
  { id: "monster", label: "Monster", Icon: Monster },
  { id: "towenaar", label: "Towenaar (Wizard)", Icon: Wizard },
  { id: "robot", label: "Robot", Icon: Robot },
  { id: "ruimtemannetjie", label: "Ruimtemannetjie (Alien)", Icon: Alien },
];

const PREFIX = "avatar:";

export function makeAvatarValue(id) {
  return `${PREFIX}${id}`;
}

export function findAvatarIcon(photoUrl) {
  if (typeof photoUrl !== "string" || !photoUrl.startsWith(PREFIX)) return null;
  const id = photoUrl.slice(PREFIX.length);
  return AVATAR_ICONS.find((icon) => icon.id === id) || null;
}
