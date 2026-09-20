function hexToRgb(hex) {
  const value = hex.replace("#", "");
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

function mixHex(hexA, hexB, t) {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  const mix = (channelA, channelB) => Math.round(channelA + (channelB - channelA) * t);
  const toHex = (channel) => channel.toString(16).padStart(2, "0");
  return `#${toHex(mix(a.r, b.r))}${toHex(mix(a.g, b.g))}${toHex(mix(a.b, b.b))}`;
}

// `count` evenly-spaced colors from a muted starting tone to a vivid end
// tone, used so a badge looks richer at higher lesson numbers.
export function levelColors(mutedHex, vividHex, count) {
  return Array.from({ length: count }, (_, index) => mixHex(mutedHex, vividHex, index / (count - 1)));
}
